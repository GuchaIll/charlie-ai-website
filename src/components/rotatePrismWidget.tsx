import * as THREE from 'three';
import {useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

interface RotatePrismWidgetProps {
    position?: [number, number, number];
}
const RotatePrismWidget: React.FC<RotatePrismWidgetProps> = ({ position = [0, 0, 1] }) => {
    const prismRef = useRef<THREE.Mesh>(null!);
    const edgeRef = useRef<THREE.Mesh>(null!);
    const [isHovered, setIsHovered] = useState(false);

    const octahedronGeometry = new THREE.OctahedronGeometry(1);
    

    const edgesGeometry = new THREE.EdgesGeometry(octahedronGeometry);

    useFrame(() => {
      if(prismRef.current) {
        prismRef.current.rotation.y += 0.01;
      }

      if(edgeRef.current) {
        edgeRef.current.rotation.y += 0.01;
      }
    });

    return(
      <>
      <mesh ref={prismRef} geometry={octahedronGeometry} position = {position} scale={[0.25, 0.25, 0.25]}
       onPointerEnter={()=>{
          setIsHovered(true);
       }}
        onPointerLeave={()=>{
          setIsHovered(false);
        }
      }>
        <meshBasicMaterial color='lightblue' transparent opacity = {isHovered? 0.5 : 0.1}/>

      </mesh>

      <lineSegments ref={edgeRef} geometry={edgesGeometry} position = {position} scale={[0.25, 0.25, 0.25]}> 
        <lineBasicMaterial color='white' linewidth={2} />
      </lineSegments> 
      </>
    )
}

export default RotatePrismWidget;