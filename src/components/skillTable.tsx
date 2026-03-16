import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SkillGroup {
  category: string;
  skills: string[];
}

const SkillTable: React.FC = () => {
  const skillGroups: SkillGroup[] = [
    {
      category: "Languages",
      skills: ["Python", "C/C++", "Rust", "JavaScript/TypeScript", "SQL", "C#"],
    },
    {
      category: "System",
      skills: ["Linux", "Multithreading/Concurrency", "REST/gRPC APIs", "WebSockets", "LangGraph"],
    },
    {
      category: "Backend",
      skills: ["Node.js (Express)", "Django/Flask", "MongoDB", "MySQL", "PostgreSQL", "Redis"],
    },
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "React Native"],
    },
    {
      category: "Graphics / Engines",
      skills: ["Unreal Engine 5", "Unity"],
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {skillGroups.map((group) => (
        <Box key={group.category}>
          <Typography
            variant="overline"
            sx={{
              color: "rgba(180, 180, 190, 0.5)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {group.category}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: "wrap", gap: "8px" }}
          >
            {group.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                variant="outlined"
                size="small"
                sx={{
                  color: "rgba(220, 220, 225, 0.85)",
                  borderColor: "rgba(180, 180, 190, 0.25)",
                  fontSize: "0.78rem",
                  "&:hover": {
                    borderColor: "rgba(220, 220, 225, 0.5)",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default SkillTable;