'use client';

import Image from "next/image";;
import { Canvas } from "@react-three/fiber";
import RaymarchingShader from "@/components/raymarchingshader"
import Scene from "@/components/raymarchingfiber"

// interface BoxProps {
//   [key: string]: any;
// }

//  function Box(props: BoxProps) {
//    const ref = useRef<THREE.Mesh>(null);

//    const [hovered, setHover] = useState<boolean>(false);
//    const [active, setActive] = useState<boolean>(false);

//    useFrame(() => {
//      if (ref.current) {
//        ref.current.rotation.x = ref.current.rotation.y += 0.01;
//      }
//    });

//    return (
//      <mesh
//        {...props}
//        ref={ref}
//        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
//        onClick={() => setActive(!active)}
//        onPointerOver={() => setHover(true)}
//        onPointerOut={() => setHover(false)}
//      >
//        <boxGeometry args={[1, 1, 1]} />
       
//      </mesh>


//    )
//  }

export default function Home() {

  
  return (
    <div className="h-[5000px]">
      <main className="fixed pointer-events-none h-screen w-full p-16 lg:p-48">
        <Canvas gl={{ antialias: false }} className="bg-[#555]">
          <Scene />
        </Canvas>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
