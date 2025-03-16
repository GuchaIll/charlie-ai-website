import * as THREE from 'three';
import {useRef, useEffect, useMemo} from 'react';
import {extend, useFrame, useThree} from '@react-three/fiber';
import { OrbitControls } from 'three-orbitcontrols-ts';

extend({OrbitControls});

const RaymarchingShader = () => {
    const {scene, camera, gl, viewport} = useThree();
    const controlsRef = useRef<OrbitControls>(null);
    const material = useRef<THREE.ShaderMaterial>(null);
    const meshRef = useRef<THREE.Mesh>(null);
//const scene = new THREE.Scene();

//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const light = new THREE.DirectionalLight(0xffffff, 1);
const backgroundColor = new THREE.Color(0x3399ee);

const uniforms = useMemo(() =>  ({
    u_eps : { value: 0.01 },
    u_maxDist : { value: 1000.0 },
    u_maxSteps : { value: 100 },

    u_clearColor : { value: backgroundColor },

    u_camPos: { value: camera.position },
    u_camToWorldMat: { value: camera.matrixWorld },
    u_camInvProjMat: { value: camera.projectionMatrixInverse},

    u_lightDir: { value: light.position },
    u_lightColor: { value: light.color },

    u_diffIntensity: { value: 0.5 },
    u_specIntensity: { value: 3 },
    u_ambientIntensity: { value: 0.1 },
    u_shininess: { value: 16 },

    u_time: { value: 1.0 }

}), []);

const vertexShader = `

varying vec2 vUv;
void main() {

    //vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    //vec3 viewDir = normalize(-worldPosition.xyz);

    //gl_Position = projectionMatrix * worldPosition;
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

}
`;


const fragmentShader = `
precision mediump float;

varying vec2 vUv;

void main()
{
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);}
`;

const fragmentShader1 = `
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

float scene(vec3 p)
{
    float sphere1Dis = distance(p, vec3(cos(0.5), sin(0.5), 0)) - 1.0;
    float sphere2Dis = distance(p, vec3(sin(0.5), cos(0.5), 0)) - 0.75;

    return smin(sphere1Dis, sphere2Dis, 0.5);
}

float rayMarch(vec3 ro, vec3 rd)
{
    float d = 0.;
    float cd;
    vec3 p;

    for(int i = 0; i < u_maxSteps; i++)
    {
        p = ro + rd * d;
        cd = scene(p);

        if(cd < u_eps || d > u_maxDist)
            break;

        d += cd;
   
    }
    return d;
}

vec3 calcNormal(vec3 p)
{
    vec2 e = vec2(1.0, -1.0) * u_eps;
    return normalize(e.xyy * scene(p + e.xyy) + e.yyx * scene(p + e.yyx) + e.yxy * scene(p + e.yxy));
}

vec3 sceneColor(vec3 p)
{
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
    vec2 uv = vUv.xy;

    vec3 ro = u_camPos;
    vec3 rd = normalize((u_camInvProjMat * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz);
    rd = (u_camToWorldMat * vec4(rd, 0)).xyz;
    rd = normalize(rd);

    float disTravelled = rayMarch(ro, rd);

    vec3 hp = ro + rd * disTravelled;
    vec3 color = vec3(0.0);
    if(disTravelled >= u_maxDist)
    {
        //gl_FragColor = vec4(u_clearColor, 1.0);
    }
    else{
        color = sceneColor(hp);}
        //gl_FragColor = vec4(color, 1.0);
        
    }
        gl_FragColor = vec4(0.0,1.0,0.0, 1.0);

}
`;

useEffect(() => {

    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    perspectiveCamera.position.z = 5;

    //const renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    //document.body.appendChild(renderer.domElement);

    const backgroundColor = new THREE.Color(0x3399ee);
    gl.setClearColor(backgroundColor, 1);

    //const controls = new OrbitControls(camera, gl.domElement);
    //controls.maxDistance = 10;
    //controls.minDistance = 2;
    //controls.enableDamping = true;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    scene.add(light);

    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.ShaderMaterial();
    const rayMarchPlane = new THREE.Mesh(geometry, material);

    const nearPlaneWidth = perspectiveCamera.near * Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov) / 2) * 2;
    const nearPlaneHeight = nearPlaneWidth / perspectiveCamera.aspect;
    rayMarchPlane.scale.set(nearPlaneWidth, nearPlaneHeight, 1);    

    scene.add(rayMarchPlane);

    let cameraForwardPos = new THREE.Vector3();
    const VECTOR3ZERO = new THREE.Vector3(0, 0, 0);

    let time = Date.now();

    

    const animate = () => {
        requestAnimationFrame(animate);

        cameraForwardPos = perspectiveCamera.position.clone().add(perspectiveCamera.getWorldDirection(VECTOR3ZERO).multiplyScalar(perspectiveCamera.near));  
        rayMarchPlane.position.copy(cameraForwardPos);
         rayMarchPlane.rotation.copy(camera.rotation);
   
        gl.render(scene, camera);
    
        //material.uniforms.u_time.value = (Date.now() - time) / 1000;

        //controls.update();

    }
    animate();

    window.addEventListener('resize', () => {
        perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
        perspectiveCamera.updateProjectionMatrix();

        const nearPlaneWidth = perspectiveCamera.near * Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov) / 2) * 2;
        const nearPlaneHeight = nearPlaneWidth / perspectiveCamera.aspect;
        rayMarchPlane.scale.set(nearPlaneWidth, nearPlaneHeight, 1);

        gl.setSize(window.innerWidth, window.innerHeight);
    
});


  

    material.uniforms = uniforms;

   

material.vertexShader = vertexShader;
material.fragmentShader = fragmentShader;
}, [camera, gl, scene]);

return (
    <mesh ref={meshRef}>
    <planeGeometry args={[1, 1]} />
    <shaderMaterial
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
    />
  </mesh>
)
};

export default RaymarchingShader;