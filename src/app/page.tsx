'use client';

import Image from "next/image";;
import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import {useState} from "react";
import RaymarchingShader from "@/components/raymarchingshader"
import {Scene} from "@/components/raymarching2"
import RotatePrismWidget from "@/components/rotatePrismWidget";
import BoidsScene from "@/components/boid";
import * as THREE from "three";
import {Button} from "@mui/material";
import Carousel from "@/components/carousel";
import SkillTable from "@/components/skillTable";
import CarouselProject from "@/components/carouselProjects";

export default function Home() {

  const [isGameButtonClicked, setGameButtonIsClicked] = useState(false);    
  const [isGameButtonHovered, setGameButtonIsHovered] = useState(false);

  const [isProjectsButtonClicked, setProjectsButtonIsClicked] = useState(false);
  const [isProjectsButtonHovered, setProjectsButtonIsHovered] = useState(false);
  const expandGameSection = () => {
    console.log("Game button clicked");
      setGameButtonIsClicked(!isGameButtonClicked);

  }

  const expandProjectsSection = () => {
    console.log("Projects button clicked");
    setProjectsButtonIsClicked(!isProjectsButtonClicked);
  }

  const toggleOffGameSection = () => {
    setGameButtonIsClicked(false);
  }


  return (
    <div className="h-screen" style = {{backgroundColor: "#292929"}}>
    
      <main className="fixed h-screen w-screen">
        <Canvas gl={{ antialias: true }} className="bg-[#555] w-screen h-screen">
          <Scene />
          <RotatePrismWidget />
          <BoidsScene />
        <Text
        position={[0, 2.1, 1]} // X, Y, Z position
        fontSize={0.5} // Text size
        color="white" // Text color
        maxWidth={8} // Wrap text
        anchorX="left" // Align text horizontally
        anchorY="middle" // Align text vertically
        font = "/fonts/Nasalization.otf"
      >
        Resident: Charlie Ai
        </Text>

        <Text
        position={[2, 1.8, 0.8]} // X, Y, Z position
        fontSize={0.4} // Text size
        color="white" // Text color
        maxWidth={7} // Wrap text
        anchorX="left" // Align text horizontally
        anchorY="middle" // Align text vertically
        font = "/fonts/space_age.ttf"
      >
        CMU ECE 2026
        </Text>

        <Text
        position={[1, 2.1, 0.5]} // X, Y, Z position
        fontSize={1} // Text size
        color="gray" // Text color
        maxWidth={5} // Wrap text
        anchorX="left" // Align text horizontally
        anchorY="middle" // Align text vertically
        fillOpacity={0.5}
        font = "/fonts/Nasalization.otf"
      >
        C-137
        </Text>
        </Canvas>

        {isGameButtonClicked && (
           <div className="absolute top-[10%] right-[10%] p-4 rounded" style={{backgroundColor: "transparent"}}>
            <Carousel onClose={()=> setGameButtonIsClicked(false)}/>
           </div>
        
        )}

        {isProjectsButtonClicked && (
           <div className="absolute top-[10%] right-[10%] p-4 rounded " style={{backgroundColor: "transparent"}}>
            <CarouselProject onClose={()=> setProjectsButtonIsClicked(false)}/>
           </div>
        
        )}

   
        <div className = "absolute top-[30%] right-[13%]" 
           style={{
            width: "100%", // Allow full width by default
            maxWidth: "30%", // Limit to 25% of the screen width on larger screens
            minWidth: "400px",
            margin: "0 auto", // Center horizontally
            padding: "16px", // Add some padding
            backgroundColor: "transparent",
            display: "flex", // Use flexbox for layout
            flexDirection: "column", // Ensure items stack vertically
            alignItems: "center", // Center align items horizontally
            rowGap: "20px",
          }}
        >
          <SkillTable />

          <div
    style={{
      display: "flex", // Use flexbox for buttons
      flexDirection: "row", // Align buttons horizontally
      justifyContent: "center", // Center buttons horizontally
      gap: "16px", // Add spacing between buttons
      width: "100%", // Ensure buttons take up full width
    }}
  >
          <Button
            variant={isGameButtonHovered ? "outlined" : "contained"}
            onClick={() => expandGameSection()}
            onMouseEnter={() => setGameButtonIsHovered(true)}
            onMouseLeave={() => setGameButtonIsHovered(false)}
            sx={{
              color: "white",
              borderColor: "white",
              backgroundColor: isGameButtonHovered
                ? "transparent"
                : "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Games
          </Button>

          <Button
            variant={isProjectsButtonHovered ? "outlined" : "contained"}
            onClick={() => expandProjectsSection()}
            onMouseEnter={() => setProjectsButtonIsHovered(true)}
            onMouseLeave={() => setProjectsButtonIsHovered(false)}
            sx={{
              color: "white",
              borderColor: "white",
              backgroundColor: isProjectsButtonHovered
                ? "transparent"
                : "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Projects
          </Button>
          </div>
      
        </div>

       

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
       
      </footer>
    </div>
  );
}
