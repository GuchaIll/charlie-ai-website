import React from 'react'
import { Text } from "@react-three/drei";

const gameTextButton = () => {

    const [isClicked, setIsClicked] = React.useState(false);    
    const [isHovered, setIsHovered] = React.useState(false);

    const expandGameSection = () => {
        setIsClicked(!isClicked);
        
    }
  return (
     <Text
            position={[1.5, 1, 0.5]} // X, Y, Z position
            fontSize={0.3} // Text size
            color="white" // Text color
            maxWidth={5} // Wrap text
            anchorX="left" // Align text horizontally
            anchorY="middle" // Align text vertically
            font = "/fonts/Nasalization.otf"
            onClick={() => expandGameSection()}
          >
            Games
            </Text>
  )
}

export default gameTextButton