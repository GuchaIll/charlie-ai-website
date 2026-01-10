'use client';

import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/raymarching2";
import RotatePrismWidget from "@/components/rotatePrismWidget";
import BoidsScene from "@/components/boid";
import { Button } from "@mui/material";
import Carousel from "@/components/carousel";
import SkillTable from "@/components/skillTable";
import CarouselProject from "@/components/carouselProjects";

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#121212", color: "#45f2fa" }}
    >
      <div className="fixed inset-0   " aria-hidden>
        <Canvas
          gl={{ antialias: true }}
          className="w-screen h-screen"
          style={{ opacity: 0.9 }}
        >
          <Scene />
          <RotatePrismWidget position={[-1.2, -0.2, 1.2]} />
          <BoidsScene />
        </Canvas>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(60, 70, 90, 0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(100, 70, 40, 0.2), transparent 40%), linear-gradient(180deg, rgba(10, 10, 10, 0.65), rgba(18, 18, 18, 0.92))",
          }}
        />
      </div>

      <header
        className="relative z-10"
        style={{
          padding: "24px 24px 0",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div style={{ fontFamily: "Nasalization", letterSpacing: "0.04em" }}>
            Charlie Ai
          </div>
          <nav
            style={{
              display: "flex",
              gap: "16px",
              fontSize: "0.9rem",
              color: "rgba(245, 242, 234, 0.75)",
            }}
          >
            <a href="#projects" style={{ color: "inherit", textDecoration: "none" }}>
              Projects
            </a>
            <a href="#games" style={{ color: "inherit", textDecoration: "none" }}>
              Games
            </a>
            <a href="#skills" style={{ color: "inherit", textDecoration: "none" }}>
              Skills
            </a>
            <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main
        className="relative z-10"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "64px 24px 120px",
          display: "flex",
          flexDirection: "column",
          gap: "96px",
        }}
      >
        <section
          style={{
            display: "grid",
            gap: "32px",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                fontSize: "0.75rem",
                color: "rgba(245, 242, 234, 0.6)",
                marginBottom: "12px",
              }}
            >
              Full-Stack Developer / Interactive Applications
            </p>
            <h1
              style={{
                fontFamily: "Nasalization",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                marginBottom: "16px",
              }}
            >
              Charlie Ai
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(245, 242, 234, 0.75)",
                lineHeight: 1.6,
                maxWidth: "540px",
              }}
            >
              CMU ECE 2026. I develop full-stack applications with experience
              in graphics, frontend UI, and performance-focused code.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgba(245, 242, 234, 0.9)",
                  color: "#121212",
                  "&:hover": { backgroundColor: "white" },
                }}
                href="#projects"
              >
                View projects
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "rgba(245, 242, 234, 0.6)",
                  "&:hover": { borderColor: "white" },
                }}
                href="#contact"
              >
                Get in touch
              </Button>
            </div>
          </div>
          <div
            style={{
              border: "1px solid rgba(245, 242, 234, 0.15)",
              borderRadius: "16px",
              padding: "24px",
              background: "rgba(20, 20, 20, 0.6)",
            }}
          >
            <h2 style={{ fontFamily: "Nasalization", marginBottom: "12px" }}>
              Focus areas
            </h2>
            <ul style={{ lineHeight: 1.8, color: "rgba(245, 242, 234, 0.75)" }}>
              <li>Full-stack Development and Interactive Applications</li>
              <li>Gameplay prototypes and simulation systems</li>
             
            </ul>
          </div>
        </section>

        <section id="projects" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h2 style={{ fontFamily: "Nasalization", fontSize: "2rem" }}>
              Featured projects
            </h2>
            <p style={{ color: "rgba(245, 242, 234, 0.7)", maxWidth: "720px" }}>
              Full-stack interative web applications and tools
            </p>
          </div>
        
          <CarouselProject />
        </section>

        <section id="games" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h2 style={{ fontFamily: "Nasalization", fontSize: "2rem" }}>
              Games + interactive work
            </h2>
            <p style={{ color: "rgba(245, 242, 234, 0.7)", maxWidth: "720px" }}>
              Experience 
            </p>
          </div>
         
          <Carousel />
        </section>

        <section id="skills" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h2 style={{ fontFamily: "Nasalization", fontSize: "2rem" }}>
              Skills + stack
            </h2>
            <p style={{ color: "rgba(245, 242, 234, 0.7)", maxWidth: "720px" }}>
            Experience across full-stack development with a focus on
performance and maintainable code.
            </p>
          </div>
          <div
            style={{
              border: "1px solid rgba(245, 242, 234, 0.12)",
              borderRadius: "16px",
              padding: "20px",
              background: "rgba(20, 20, 20, 0.6)",
            }}
          >
            <SkillTable />
          </div>
        </section>

        <section id="contact" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h2 style={{ fontFamily: "Nasalization", fontSize: "2rem" }}>
            Lets build
          </h2>
          <p style={{ color: "rgba(245, 242, 234, 0.7)", maxWidth: "720px" }}>
            Seeking full-stack or software engineering roles, internships,
            and collaborative projects. Interested in collaborations? Feel free to reach out via email or Discord.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(245, 242, 234, 0.6)",
                "&:hover": { borderColor: "white" },
              }}
              href="mailto:charlie@example.com"
            >
              Email
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(245, 242, 234, 0.6)",
                "&:hover": { borderColor: "white" },
              }}
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
            {/* <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(245, 242, 234, 0.6)",
                "&:hover": { borderColor: "white" },
              }}
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button> */}
          </div>
        </section>
      </main>
    </div>
  );
}


