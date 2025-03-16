import { Stats } from '@react-three/drei';
import React, { useRef, useMemo, useEffect } from 'react';
import { useThree, Canvas, useFrame } from '@react-three/fiber';

import * as THREE from "three";


const vertexShaderSource = `
  // WebGL1 version: using varying instead of out
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
  }
`;

const fragmentShaderSource = `
precision mediump float;

varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

void main()
{
    vec2 normalizedPixel = gl_FragCoord.xy/600.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(color,1.0);
}
`;

const fragmentShaderSource1 = `
  precision mediump float;
  varying vec2 vUv;

  uniform vec3 u_clearColor;
  uniform float u_eps;
  uniform float u_maxDist;
  uniform int u_maxSteps;

  uniform vec3 u_camPos;
  uniform mat4 u_camToWorldMat;
  uniform mat4 u_camInvProjMat;

  uniform vec3 u_lightDir;
  uniform vec3 u_lightColor;

  uniform float u_diffIntensity;
  uniform float u_specIntensity;
  uniform float u_ambientIntensity;
  uniform float u_shininess;

  uniform float u_time;

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float scene(vec3 p) {
    float sphere1Dis = distance(p, vec3(cos(u_time), sin(u_time), 0.0)) - 1.0;
    float sphere2Dis = distance(p, vec3(sin(u_time), cos(u_time), 0.0)) - 0.75;
    return smin(sphere1Dis, sphere2Dis, 0.5);
  }

  float rayMarch(vec3 ro, vec3 rd) {
    float d = 0.0;
    float cd;
    vec3 p;
    // Use a fixed maximum loop count (u_maxSteps) is not loopable directly in GLSL ES so we use 100 here.
    for (int i = 0; i < 100; i++) {
      p = ro + rd * d;
      cd = scene(p);
      if(cd < u_eps || d > u_maxDist)
        break;
      d += cd;
    }
    return d;
  }

  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(1.0, -1.0) * u_eps;
    return normalize(
      e.xyy * scene(p + e.xyy) +
      e.yyx * scene(p + e.yyx) +
      e.yxy * scene(p + e.yxy)
    );
  }

  vec3 sceneColor(vec3 p) {
    vec3 n = calcNormal(p);
    vec3 l = normalize(u_lightDir - p);
    vec3 v = normalize(u_camPos - p);
    vec3 h = normalize(l + v);

    float diff = max(dot(n, l), 0.0);
    float spec = pow(max(dot(n, h), 0.0), u_shininess);

    vec3 diffuse = u_diffIntensity * diff * u_lightColor;
    vec3 specular = u_specIntensity * spec * u_lightColor;
    vec3 ambient = u_ambientIntensity * u_lightColor;

    return u_lightColor * (diffuse + specular + ambient);
  }

  void main() {
    vec2 uv = vUv;
    vec3 ro = u_camPos;
    vec3 rd = normalize((u_camInvProjMat * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz);
    rd = (u_camToWorldMat * vec4(rd, 0.0)).xyz;
    rd = normalize(rd);

    float disTravelled = rayMarch(ro, rd);
    vec3 hp = ro + rd * disTravelled;
    vec3 color = vec3(0.0);
    if(disTravelled >= u_maxDist) {
      color = u_clearColor;
    } else {
      color = sceneColor(hp);
    }
    gl_FragColor = vec4(color, 1.0);
  }
`;

interface RaymarchingShaderProps {
    [key: string]: any;
    }


const RaymarchingShader = (props : RaymarchingShaderProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  const { camera, gl, viewport } = useThree();
  const timeRef = useRef(Date.now());

  // Set up the scene (camera position and clear color)
  useEffect(() => {
    camera.position.z = 5;
    const bgColor = new THREE.Color(0x000);
    //gl.setClearColor(bgColor, 1);
  }, [camera, gl]);

  // Create uniforms (using useMemo to avoid recreating on each render)
  const bgColor = new THREE.Color(0xc9f8);
  const uniforms = useMemo(() => ({
    u_eps: { value: 0.01 },
    u_maxDist: { value: 1000.0 },
    u_maxSteps: { value: 100 },
    u_clearColor: { value: bgColor },
    u_camPos: { value: camera.position.clone() },
    u_camToWorldMat: { value: camera.matrixWorld.clone() },
    u_camInvProjMat: { 
      value: camera.projectionMatrixInverse
        ? camera.projectionMatrixInverse.clone()
        : new THREE.Matrix4().copy(camera.projectionMatrix).invert()
    },
    u_lightDir: { value: new THREE.Vector3(0, 0, 1) },
    u_lightColor: { value: new THREE.Color(0xffffff) },
    u_diffIntensity: { value: 0.5 },
    u_specIntensity: { value: 3 },
    u_ambientIntensity: { value: 0.1 },
    u_shininess: { value: 16 },
    u_time: { value: 1.0 },
  }), [camera, bgColor]);

  // Update uniforms and plane transform on each frame
  useFrame(() => {
    // Update time uniform
    uniforms.u_time.value = (Date.now() - timeRef.current) / 1000;
    // Update camera-related uniforms
    uniforms.u_camPos.value.copy(camera.position);
    uniforms.u_camToWorldMat.value.copy(camera.matrixWorld);
    if (camera.projectionMatrixInverse) {
      uniforms.u_camInvProjMat.value.copy(camera.projectionMatrixInverse);
    } else {
      uniforms.u_camInvProjMat.value.copy(camera.projectionMatrix).invert();
    }
    // Adjust the plane so that it covers the near plane:
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const nearPlaneWidth = perspectiveCamera.near * Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov) / 2) * 2;
    const nearPlaneHeight = nearPlaneWidth / perspectiveCamera.aspect;
    if (meshRef.current) {
      meshRef.current.scale.set(nearPlaneWidth, nearPlaneHeight, 1);
      // Position the plane at the camera’s near plane position
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.multiplyScalar(camera.near);
      const camForwardPos = camera.position.clone().add(forward);
      meshRef.current.position.copy(camForwardPos);
      meshRef.current.rotation.copy(camera.rotation);
    }
  });

  return (
    <mesh ref={meshRef}>
    <planeGeometry args={[viewport.width, viewport.height]} />
    <shaderMaterial
      fragmentShader={fragmentShaderSource}
      uniforms={uniforms}
      ref={material}
      vertexShader={vertexShaderSource}
      
    />
  </mesh>
    
    
      )
};

// Example scene that uses the shader component
const Scene = () => {
  return (
    <>
      <Stats />
      <RaymarchingShader />
    </>
   
  );
};

export default Scene;