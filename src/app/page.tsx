'use client';

import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/raymarching2";
import RotatePrismWidget from "@/components/rotatePrismWidget";
import BoidsScene from "@/components/boid";
import { Button } from "@mui/material";
import Carousel from "@/components/carousel";
import SkillTable from "@/components/skillTable";
import CarouselProject from "@/components/carouselProjects";

type Tab = "projects" | "skills" | "games" | "contact";

const TABS: { key: Tab; label: string }[] = [
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "games", label: "Games" },
  { key: "contact", label: "Contact" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [slideDir, setSlideDir] = useState<"up" | "down">("down");
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedTab, setDisplayedTab] = useState<Tab>("projects");
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab || isAnimating) return;
    const currentIdx = TABS.findIndex((t) => t.key === activeTab);
    const nextIdx = TABS.findIndex((t) => t.key === tab);
    setSlideDir(nextIdx > currentIdx ? "down" : "up");
    setIsAnimating(true);
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!isAnimating) return;
    // Wait for the exit animation to finish, then swap content and enter
    const timeout = setTimeout(() => {
      setDisplayedTab(activeTab);
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [isAnimating, activeTab]);

  const animClass = isAnimating
    ? slideDir === "down"
      ? "panel-exit-up"
      : "panel-exit-down"
    : displayedTab !== activeTab
      ? ""
      : slideDir === "down"
        ? "panel-enter-up"
        : "panel-enter-down";

  return (
    <div
      className="min-h-screen relative"
      style={{ backgroundColor: "#121212", color: "rgba(220, 220, 225, 0.95)" }}
    >
      {/* ── 3D Background ───────────────────────────────── */}
      <div className="fixed inset-0" aria-hidden>
        <Canvas
          gl={{ antialias: true }}
          className="w-screen h-screen"
          style={{ opacity: 0.55 }}
        >
          <Scene />
          <RotatePrismWidget position={[-1.2, -0.2, 1.2]} />
          <BoidsScene />
        </Canvas>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(60, 70, 90, 0.35), transparent 45%), radial-gradient(circle at 80% 10%, rgba(100, 70, 40, 0.2), transparent 40%), linear-gradient(180deg, rgba(10, 10, 10, 0.7), rgba(18, 18, 18, 0.95))",
          }}
        />
      </div>

      {/* ── Two-column layout ───────────────────────────── */}
      <div
        className="relative z-10"
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "0px",
        }}
      >
        {/* ── LEFT: Fixed hero column ──────────────────── */}
        <aside
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "80px",
            paddingBottom: "48px",
            paddingLeft: "max(32px, calc((100% - 380px) / 2))",
            paddingRight: "32px",
            maxWidth: "100%",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontSize: "0.7rem",
              color: "rgba(200, 200, 210, 0.55)",
              marginBottom: "16px",
            }}
          >
            Software Engineer
          </p>
          <h1
            style={{
              fontFamily: "Nasalization",
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              marginBottom: "12px",
              color: "rgba(235, 235, 240, 0.95)",
            }}
          >
            Charlie Ai
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(200, 200, 210, 0.7)",
              marginBottom: "24px",
              fontFamily: "Nasalization",
              letterSpacing: "0.04em",
              lineHeight: 1.5,
            }}
          >
            B.S. Electrical &amp; Computer Engineering — Carnegie Mellon University, 2026
          </p>
          <p
            style={{
              fontSize: "0.92rem",
              color: "rgba(200, 200, 210, 0.65)",
              lineHeight: 1.7,
              maxWidth: "340px",
              marginBottom: "32px",
            }}
          >
            I build full-stack applications, real-time collaborative platforms,
            and AI-powered pipelines — with experience in systems programming,
            computer graphics, and deep learning.
          </p>

          {/* ── Nav tabs ── */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "36px" }}>
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => handleTabChange(t.key)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontFamily: "Nasalization",
                  fontSize: "0.85rem",
                  letterSpacing: "0.06em",
                  color:
                    activeTab === t.key
                      ? "rgba(240, 240, 245, 0.95)"
                      : "rgba(180, 180, 190, 0.6)",
                  backgroundColor:
                    activeTab === t.key
                      ? "rgba(255, 255, 255, 0.06)"
                      : "transparent",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: activeTab === t.key ? "32px" : "16px",
                    height: "1px",
                    backgroundColor:
                      activeTab === t.key
                        ? "rgba(240, 240, 245, 0.8)"
                        : "rgba(180, 180, 190, 0.3)",
                    transition: "all 0.2s ease",
                  }}
                />
                {t.label}
              </button>
            ))}
          </nav>

          {/* ── CTA buttons ── */}
          <div style={{ display: "flex", gap: "12px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgba(235, 235, 240, 0.9)",
                color: "#121212",
                fontWeight: 600,
                fontSize: "0.8rem",
                "&:hover": { backgroundColor: "white" },
              }}
              onClick={() => handleTabChange("projects")}
            >
              View projects
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "rgba(220, 220, 225, 0.85)",
                borderColor: "rgba(180, 180, 190, 0.4)",
                fontSize: "0.8rem",
                "&:hover": { borderColor: "rgba(220, 220, 225, 0.8)" },
              }}
              onClick={() => handleTabChange("contact")}
            >
              Get in touch
            </Button>
          </div>

          {/* ── Social links at bottom ── */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "24px",
              display: "flex",
              gap: "16px",
              fontSize: "0.8rem",
              color: "rgba(180, 180, 190, 0.5)",
            }}
          >
            <a
              href="mailto:charlie@example.com"
              style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(220,220,225,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(180,180,190,0.5)")}
            >
              Email
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(220,220,225,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(180,180,190,0.5)")}
            >
              GitHub
            </a>
          </div>
        </aside>

        {/* ── RIGHT: Sliding content panel ─────────────── */}
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100vh",
            overflow: "hidden",
            paddingLeft: "16px",
            paddingRight: "24px",
          }}
        >
          <div
            ref={panelRef}
            className={animClass}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* ── Projects panel ── */}
            {displayedTab === "projects" && (
              <>
                <div>
                  <h2 style={{ fontFamily: "Nasalization", fontSize: "1.8rem", marginBottom: "6px" }}>
                    Featured Projects
                  </h2>
                  <p style={{ color: "rgba(200, 200, 210, 0.6)", maxWidth: "600px" }}>
                    Full-stack applications, AI pipelines, and systems projects
                  </p>
                </div>
                <CarouselProject />
              </>
            )}

            {/* ── Skills panel ── */}
            {displayedTab === "skills" && (
              <>
                <div>
                  <h2 style={{ fontFamily: "Nasalization", fontSize: "1.8rem", marginBottom: "6px" }}>
                    Skills &amp; Stack
                  </h2>
                  <p style={{ color: "rgba(200, 200, 210, 0.6)", maxWidth: "600px" }}>
                    Experience across full-stack development with a focus on performance and maintainable code.
                  </p>
                </div>
                <div
                  style={{
                    border: "1px solid rgba(180, 180, 190, 0.12)",
                    borderRadius: "16px",
                    padding: "24px",
                    background: "rgba(20, 20, 20, 0.6)",
                  }}
                >
                  <SkillTable />
                </div>
              </>
            )}

            {/* ── Games panel ── */}
            {displayedTab === "games" && (
              <>
                <div>
                  <h2 style={{ fontFamily: "Nasalization", fontSize: "1.8rem", marginBottom: "6px" }}>
                    Games &amp; Interactive Work
                  </h2>
                  <p style={{ color: "rgba(200, 200, 210, 0.6)", maxWidth: "600px" }}>
                    Game projects built with Unreal Engine and Unity through Game Creation Society at CMU.
                  </p>
                </div>
                <Carousel />
              </>
            )}

            {/* ── Contact panel ── */}
            {displayedTab === "contact" && (
              <>
                <div>
                  <h2 style={{ fontFamily: "Nasalization", fontSize: "1.8rem", marginBottom: "6px" }}>
                    Let&#39;s Connect
                  </h2>
                  <p
                    style={{
                      color: "rgba(200, 200, 210, 0.6)",
                      maxWidth: "600px",
                      lineHeight: 1.7,
                      marginBottom: "8px",
                    }}
                  >
                    Currently seeking full-time software engineering roles starting Summer 2026.
                    Open to collaborations — feel free to reach out.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "rgba(220, 220, 225, 0.9)",
                      borderColor: "rgba(180, 180, 190, 0.4)",
                      "&:hover": { borderColor: "rgba(220, 220, 225, 0.8)" },
                    }}
                    href="mailto:charlie@example.com"
                  >
                    Email
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "rgba(220, 220, 225, 0.9)",
                      borderColor: "rgba(180, 180, 190, 0.4)",
                      "&:hover": { borderColor: "rgba(220, 220, 225, 0.8)" },
                    }}
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Button>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
