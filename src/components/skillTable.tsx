import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const SkillTable: React.FC = () => {
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Django",
    "Flask",
    "TypeScript",
    "Python",
    "HTML",
    "CSS",
    "C++",
    "C#",
    'System Verilog',
    'Rust',
    "Java",
    "MongoDB",
    "MySQL",
    "Git",
    "PostgreSQL",
    "Firebase",
    "Docker",
    "Unreal Engine",
    "Unity",
  ];

  const handleClick = (skill: string) => {
    console.log(`You clicked on ${skill}`);
  };

  return (
   
      <Stack
        direction="row"
        spacing={1}
        sx={{
            flexWrap: "wrap", // Ensure chips wrap to the next line
            justifyContent: "center", // Center chips horizontally
            gap: "8px", // Add spacing between chips
          }}
      >
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onClick={() => handleClick(skill)}
            variant={ "outlined"} // Alternate between outlined and filled
            sx={{
              margin: "4px",
              color: "white" // Add spacing between chips
            }}
          />
        ))}
      </Stack>

  );
};

export default SkillTable;