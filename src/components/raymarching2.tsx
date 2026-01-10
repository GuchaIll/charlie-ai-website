import { Stats } from '@react-three/drei';
import { useThree, ThreeEvent, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ShaderMaterial } from 'three';
import { useDrag } from '@use-gesture/react';
import {useControls} from 'leva';
import { OrbitControls } from 'three-orbitcontrols-ts';


const fragmentShader = `
varying vec2 vUv;

uniform int uScrollY;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uFogColorLow;
uniform vec3 uFogColorHigh;
uniform vec3 uLightColor;
uniform vec3 uBackgroundColor;
uniform vec3 uCameraRotation;
uniform vec3 uCameraPosition;
uniform float uMandelbulbPower;
uniform int uMandelbulbIterations;

float distance_from_sphere(in vec3 p, in vec3 c, float r) {
  return length(p - c) - r;
}

mat3 rotation_matrix(vec3 angles) 
{
    float cx = cos(angles.x);
    float sx = sin(angles.x);
    float cy = cos(angles.y);
    float sy = sin(angles.y);
    float cz = cos(angles.z);
    float sz = sin(angles.z);

    mat3 rotX = mat3(1.0, 0.0, 0.0, 
                    0.0, cx, -sx, 
                    0.0, sx, cx);

    mat3 rotY = mat3(cy, 0.0, sy,
                    0.0, 1.0, 0.0,
                    -sy, 0.0, cy);
    mat3 rotZ = mat3(cz, -sz, 0.0,
                    sz, cz, 0.0,
                    0.0, 0.0, 1.0);
    
    return rotZ * rotY * rotX;
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float mandelbulb(in vec3 p, out float iterationCount) {
    vec3 z = p;
    float dr = 1.0;
    float r = 0.0;

  
    float power = uMandelbulbPower;
    int iter = uMandelbulbIterations;

    float scale = 1.0 + 0.05 * sin(uTime * 0.5);
    z *= scale;

    float angle = uTime * 0.03;
    mat3 rotation = rotation_matrix(vec3(0.0, angle, 0.0));
    z = rotation * z;

    iterationCount = 0.0;


    for (int i = 0; i < iter; i++)
    {
        r = length(z);
        if (r > 2.0)
        {
            iterationCount = float(i) / float(iter);
            break;
        }
        float theta = acos(clamp(z.z / max(r, 1e-8), -1.0, 1.0));
        float phi = atan(z.y, z.x);
        float zr = pow(r, float(power));

        float newTheta = theta * power;
        float newPhi = phi * power;

        z = zr * vec3(sin(newTheta) * cos(newPhi), sin(newTheta) * sin(newPhi), cos(newTheta));
        z += p;

        dr = max(pow(r, float(power - 1.0)) * power * dr + 1.0, 1e-8);
    }

    return 0.5 * log(r) * r / dr;
} 

float smooth_min(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float map_the_world(in vec3 p, out float iterationCount) {
 

  return mandelbulb(p, iterationCount);
}

vec3 calculate_normal(in vec3 p, out float iterationCount) {
  const vec3 small_step = vec3(0.001, 0.0, 0.0);

  float gradient_x = map_the_world(p + small_step.xyy, iterationCount) - map_the_world(p - small_step.xyy, iterationCount);
  float gradient_y = map_the_world(p + small_step.yxy, iterationCount) - map_the_world(p - small_step.yxy, iterationCount);
  float gradient_z = map_the_world(p + small_step.yyx, iterationCount) - map_the_world(p - small_step.yyx, iterationCount);

  vec3 normal = vec3(gradient_x, gradient_y, gradient_z);

  return normalize(normal);
}

vec3 ray_march(in vec3 ro, in vec3 rd) {
  float total_distance_traveled = 0.0;
  const int NUMBER_OF_STEPS = 96;
  const float MINIMUM_HIT_DISTANCE = 0.001;
  const float MAXIMUM_TRACE_DISTANCE = 1000.0;

  float godRayIntensity = 0.0;
  float godRayStrength = min(0.04 + 0.02 * sin(uTime * 0.7), 0.035);

  
  vec3 light_position = vec3(2.0, -5.0, 3.0);
  vec3 light_direction = normalize(light_position - ro);
  for(int i = 0; i < NUMBER_OF_STEPS; ++i) {
    vec3 current_position = ro + total_distance_traveled * rd;

    float iterationCount = 0.0;
    float iterPlaceholder = 0.0;
    float distance_to_closest = map_the_world(current_position, iterationCount);

    float lightDot = dot(normalize(current_position - light_position), -rd);
    float scatterFactor = smoothstep(0.7, 0.1, lightDot);
    godRayIntensity += scatterFactor * exp(-0.05 * total_distance_traveled);

    if(distance_to_closest < MINIMUM_HIT_DISTANCE) {
      vec3 normal = calculate_normal(current_position, iterPlaceholder);
      vec3 light_position = vec3(2.0, -5.0, 3.0);
      vec3 direction_to_light = normalize(current_position - light_position);

      float diffuse_intensity = max(0.2, dot(normal, direction_to_light));

      vec3 baseColor = mix(vec3(0.08, 0.14, 0.28), vec3(0.35, 0.18, 0.12), iterationCount);
     
      vec3 godRayColor = vec3(1.0, 0.8, 0.6) * godRayIntensity * godRayStrength;

        return baseColor * diffuse_intensity + godRayColor;
    }

    if(total_distance_traveled > MAXIMUM_TRACE_DISTANCE) {
      break;
    }
    total_distance_traveled += distance_to_closest;
  }
  return vec3(0.0) + vec3(1.0, 0.8, 0.6) * godRayIntensity * godRayStrength;
}

void main() {
  vec2 uv = vUv.st ;
  float aspect = uResolution.x / uResolution.y;

  if(aspect > 1.0) {
    uv.x *= aspect;
  } else {
    uv.y /= aspect;
    }
   uv = uv * 2.0 - 1.0;



    vec3 camera_position = uCameraPosition;
    vec3 ro = camera_position;
    vec3 rd = normalize(vec3(uv, 1.0));

    mat3 camera_rotation = rotation_matrix(uCameraRotation);
    rd = normalize(camera_rotation * rd);

    vec3 shaded_color = ray_march(ro, rd);

     // ----- Star Field -----
  // Scale UV coordinates to create a grid over the screen. Adjust 100.0 to control star density.
    vec2 starUV = floor(uv * 100.0);
  // Get a pseudo-random value for each grid cell
  float starRandom = hash21(starUV);
  // Create a star mask: only values above a threshold will light up as stars.
  float starMask = smoothstep(0.98, 1.0, starRandom);
  // You can also add a small glow effect by multiplying with a color gradient if desired.
  vec3 starColor = vec3(1.0) * starMask;

    vec3 background = vec3(0.07, 0.08, 0.1);
    vec3 finalColor = mix(background, shaded_color, 0.8);
    gl_FragColor = vec4(finalColor, 1.0);
}
`;
const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

const backgroundColor = new THREE.Color(0x292929);
const Plane = () => {
  const material = useRef<ShaderMaterial>(null);
  const rayMarchPlane = useRef<THREE.Mesh>(null);
  const { viewport, gl,camera,size } = useThree();
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [onDrag, setOnDrag] = useState(false);
  const [enterPlane, setEnterPlane] = useState(false);
  
  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (material.current?.uniforms.uScrollY) {
        material.current.uniforms.uScrollY.value = scrollY || 1;
      }
    });
      gl.setClearColor(backgroundColor, 0);
      //const controls = new OrbitControls(camera, gl.domElement);
      //controls.maxDistance = 10;
      //controls.minDistance = 2;
      //controls.enableDamping = true;

     window.addEventListener('resize', () => {
              const perspectiveCamera = camera as THREE.PerspectiveCamera;
              perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
              perspectiveCamera.updateProjectionMatrix();
      
              const nearPlaneWidth = perspectiveCamera.near * Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov) / 2) * 2;
              const nearPlaneHeight = nearPlaneWidth / perspectiveCamera.aspect;
              if(rayMarchPlane.current)
              //rayMarchPlane.current.scale.set(nearPlaneWidth, nearPlaneHeight, 1);
              
      
              gl.setSize(window.innerWidth, window.innerHeight);

              if(material.current)
              material.current.uniforms.uResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
            });
  }, [gl, camera]);

  const bind = useDrag(({ active, movement: [x, y] }) => {
  
    if (active && material.current?.uniforms.uCameraRotation) 
    {
        console.log('Dragging', x, y);
        material.current.uniforms.uCameraRotation.value.x += y / 100;
        material.current.uniforms.uCameraRotation.value.y += x / 100;
    }

});


  console.log(viewport.width, viewport.height);


  useFrame(() => {
    if (material.current) {
      material.current.uniforms.uTime.value += 0.004;
    }
  })
  const uniforms = useMemo(() => {
    return {
      uScrollY: {
        value: 1,
      },
        uTime: {
            value: 0,
        },
        uResolution: {
            value : new THREE.Vector2(viewport.width, viewport.height),
        },
        uFogColorLow:{
            value : new THREE.Color(0x454134),
        },
        uFogColorHigh:{
            value : new THREE.Color(0xffc859),
        },
        uLightColor:{
            value : new THREE.Color(0xffc859),
        },
        uBackgroundColor:{
            value : backgroundColor,
        },
        uCameraRotation:{
            value : new THREE.Vector3(0,0,0),
        },
        uCameraPosition:{
            value : new THREE.Vector3(0,0,-2),
        },
        uMandelbulbPower : {
            value: 6.0,
        },

        uMandelbulbIterations : {
            value: 6,
        }
    };
  }, []);

 
  const initializeDrag = () => {
    setOnDrag(true);
   
  }
  
  const endDrag = () => { 
    setOnDrag(false);
  }

  const enterMesh = () => {
    setEnterPlane(true);
  }

  const leaveMesh = () => {
    setEnterPlane(false);
  }

  const moveMesh = (e: ThreeEvent<PointerEvent>) =>
  {
    if(onDrag && enterPlane && material.current?.uniforms.uCameraRotation)
    {
      const {movementX, movementY} = e;

      // Update camera rotation based on pointer movement
      material.current.uniforms.uCameraRotation.value.x += movementY / 100;
      material.current.uniforms.uCameraRotation.value.y += movementX / 100;
    }
  }

  const {mandelbulbPower,mandelbulbIterations } = useControls ({
    mandelbulbPower: { value: 6.0, min: 1.0, max: 16.0, step:1.0},
    mandelbulbIterations: { value: 6, min: 1, max: 20, step:1}
  })

  useFrame(() => {
    if (material.current) {
      material.current.uniforms.uMandelbulbPower.value = mandelbulbPower;
      material.current.uniforms.uMandelbulbIterations.value = mandelbulbIterations;
    }
  });

  return (
    <mesh ref={rayMarchPlane} 
        onPointerDown={(e) => initializeDrag()}
        onPointerUp={(e) => endDrag()}
        onPointerEnter={(e) => enterMesh()}
        onPointerLeave={(e) => leaveMesh()}
        onPointerMove={(e) => moveMesh(e)}
        onPointerOver={(e) => setEnterPlane(true)}
         >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial fragmentShader={fragmentShader} uniforms={uniforms} ref={material} vertexShader={vertexShader} transparent = {true} />
    </mesh>
  );
};

export const Scene = () => {
  return (
    <>
      <Stats />
      <pointLight position={[5, 5, 5]} intensity={1} color="white" />
      <ambientLight intensity={0.2} />
      <Plane />
    </>
  );
};
