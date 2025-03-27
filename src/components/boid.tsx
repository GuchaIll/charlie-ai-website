import React, { useState, useEffect, useRef} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Yellowtail } from 'next/font/google';
import { emissive } from 'three/tsl';

interface BoidProps {
  position: THREE.Vector3;
  color: string;
}

const Boid: React.FC<BoidProps> = ({ position, color }) => {
  const boidRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={boidRef} position={position} scale={[0.01, 0.01, 0.01]}>
      <sphereGeometry  />
      <meshStandardMaterial color={new THREE.Color("#FFE")} emissive={new THREE.Color("#FFD")} emissiveIntensity={0.5}  
      />
    </mesh>
  );
};

interface BoidData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
}

const BoidsScene: React.FC = () => {
  const [boids, setBoids] = useState<BoidData[]>([]);

  // Screen limits (adjust as needed)
  const { camera, viewport } = useThree();

  const getBounds = () => {
    const aspect = viewport.width / viewport.height;
    const vFov = camera instanceof THREE.PerspectiveCamera 
      ? THREE.MathUtils.degToRad(camera.fov) 
      : 1; // Default value for orthographic cameras
    const height = 2 * Math.tan(vFov / 2) * camera.position.z;
    const width = height * aspect;
  
    return {
      minX: -width / 2,
      maxX: width / 2,
      minY: -height / 2,
      maxY: height / 2,
      minZ: 0,
      maxZ: 2,
    };
  };
  const bounds = getBounds();

  // Max velocity limit
  const maxSpeed = 0.05;  

  useEffect(() => {
    const initialBoids: BoidData[] = Array.from({ length: 25 }, () => ({
      position: new THREE.Vector3(
        Math.random() * (bounds.maxX - bounds.minX) + bounds.minX,
        Math.random() * (bounds.maxY - bounds.minY) + bounds.minY,
        Math.random() * (bounds.maxZ - bounds.minZ) + bounds.minZ
      ),
      velocity: new THREE.Vector3(
        Math.random() * 0.02 - 0.01,
        Math.random() * 0.02 - 0.01,
        Math.random() * 0.02 - 0.01
      ),
      color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
    }));

    setBoids(initialBoids);
  }, []);

  useFrame(() => {
    setBoids((prevBoids) => {
      return prevBoids.map((boid) => {
        let newVelocity = boid.velocity.clone();
        const cohesionFactor = 0.003;
        const separationFactor = 0.003;
        const alignmentFactor = 0.04;

        // Find neighbors
        const neighbors = prevBoids.filter(
          (otherBoid) => otherBoid.position.distanceTo(boid.position) < 3
        );

        if (neighbors.length > 0) {
          // Cohesion: Move towards neighbors' center
          const centerOfMass = new THREE.Vector3();
          neighbors.forEach((other) => centerOfMass.add(other.position));
          centerOfMass.divideScalar(neighbors.length);
          newVelocity.add(centerOfMass.sub(boid.position).multiplyScalar(cohesionFactor));

          // Separation: Avoid collisions
          neighbors.forEach((other) => {
            if (boid.position.distanceTo(other.position) < 1.5) {
              newVelocity.sub(other.position.clone().sub(boid.position).multiplyScalar(separationFactor));
            }
          });

          // Alignment: Match velocity with neighbors
          const avgVelocity = new THREE.Vector3();
          neighbors.forEach((other) => avgVelocity.add(other.velocity));
          avgVelocity.divideScalar(neighbors.length);
          newVelocity.add(avgVelocity.sub(boid.velocity).multiplyScalar(alignmentFactor));
        }

        // **Clamp velocity** to prevent high speed
        if (newVelocity.length() > maxSpeed) {
          newVelocity.clampLength(0, maxSpeed);
        }

        // Apply velocity to position
        let newPosition = boid.position.clone().add(newVelocity);

        // **Wrap-around or bounce logic** (to keep boids within screen)
        if (newPosition.x < bounds.minX || newPosition.x > bounds.maxX) {
          newVelocity.x *= -0.4; // Reverse direction with damping
        }
        if (newPosition.y < bounds.minY || newPosition.y > bounds.maxY) {
          newVelocity.y *= -0.4;
        }
        if (newPosition.z < bounds.minZ || newPosition.z > bounds.maxZ) {
          newVelocity.z *= -0.4;
        }

        return { ...boid, position: newPosition, velocity: newVelocity };
      });
    });
  });

  return (
    <><directionalLight position={[5, 5, 5]} intensity={1.5} /> 
       <ambientLight intensity={0.5} />
      {boids.map((boid, index) => (
        <Boid key={index} position={boid.position} color={boid.color} />
      ))}
    </>
  );
};

export default BoidsScene;