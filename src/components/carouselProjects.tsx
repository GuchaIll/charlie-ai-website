import React, { useRef, useState, useEffect, useCallback } from "react";
import "./carousel.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const CarouselProject: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardCount = 6;

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    if (!children.length) return;
    const scrollLeft = track.scrollLeft;
    const cardWidth = children[0].offsetWidth + 16; // gap
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), children.length - 1));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Convert vertical wheel → horizontal scroll (attached to container so the whole area is captured)
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, []);

  const scrollToIndex = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    if (!children[idx]) return;
    children[idx].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const scrollBy = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(activeIndex + dir, cardCount - 1));
    scrollToIndex(next);
  };

  const cards = [
    {
      id: 1,
      title: "Concept.io — Collaborative AI Concept Art Platform",
      date: "Aug 2025 – Mar 2026",
      description:
        "Real-time collaborative canvas using WebSockets for multi-user drawing and editing with integrated diffusion-based asset generation (SDXL, ControlNet, Segment Anything). Asynchronous GPU inference pipelines for image generation with optimized job orchestration. Layer-based snapshot versioning using delta-encoding with Git-style branching and state restoration.",
      showLink: true,
      githubLink: "https://github.com/GuchaIll/Concept.io",
      hasImage: true,
      images: [
        {
          img: "/images/Concept.io/Canvas.png",
          title: "Canvas",
          rows: 1,
          cols: 3,
        },
        {
          img: "/images/Concept.io/Description.png",
          title: "Description",
          rows: 1,
          cols: 1,
        },
        {
          img: "/images/Concept.io/Projects.png",
          title: "Projects",
          rows: 1,
          cols: 2,
        },
        {
          img: "/images/Concept.io/PM.png",
          title: "Pipeline",
          rows: 1,
          cols: 3,
        },
      ],
    },
    {
      id: 2,
      title: "MedScribe — Clinical Transcription Pipeline",
      date: "Dec 2025 – Mar 2026",
      description:
        "Multimodal clinical AI transcription pipeline combining Whisper speech-to-text, Silero voice activity detection, and OCR-based document ingestion. LangGraph orchestration pipeline with a semantic grounding engine for constructing digital medical records and generating SOAP notes.",
      showLink: false,
      githubLink: "https://github.com/GuchaIll/transcription-doc-pipeline",
      hasImage: true,
      images: [
        {
          img: "/images/MedicalTranscription/Interface.png",
          title: "Interface",
          rows: 1,
          cols: 3,
        },
        {
          img: "/images/MedicalTranscription/Logo.png",
          title: "Logo",
          rows: 1,
          cols: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Malloc Lab — Computer Systems (18-213)",
      date: "Aug – Oct 2023",
      description:
        "Custom dynamic memory allocator (malloc/free/realloc) in C with segregated free lists and boundary-tag coalescing, achieving high throughput and memory utilization.",
      showLink: false,
      githubLink: "",
      hasImage: false,
      images: [],
    },
    {
      id: 4,
      title: "CMU IS Consulting Platform",
      date: "2025",
      description:
        "Collaborated with the CMU IS Department to build a consultation platform connecting community partners with student consultants. Users can submit requests, browse services, and explore past collaboration projects.",
      showLink: false,
      githubLink: "https://github.com/GuchaIll/MachinaAutomadum",
      hasImage: true,
      images: [
        {
          img: "/images/CMUConsultingIS/IS1.png",
          title: "Scene1",
          rows: 1,
          cols: 3,
        },
        {
          img: "/images/CMUConsultingIS/IS2.png",
          title: "Detail",
          rows: 2,
          cols: 1,
        },
        {
          img: "/images/CMUConsultingIS/IS3.png",
          title: "Overview",
          rows: 1,
          cols: 2,
        },
      ],
    },
    {
      id: 5,
      title: "Eco Hunt — TartanHacks",
      date: "2025",
      description:
        "AR-based scavenger hunt encouraging users to classify and recycle trash while earning virtual tokens. Integrated Google Maps API for real-time location tracking and AR environmental challenges in React Native.",
      showLink: true,
      githubLink: "https://github.com/GuchaIll/ecohunt",
      hasImage: true,
      images: [
        {
          img: "/images/EcoHunt/ecohunt1.png",
          title: "Screen1",
          cols: 1,
          rows: 1,
        },
        {
          img: "/images/EcoHunt/ecohunt2.png",
          title: "Screen2",
          rows: 1,
          cols: 1,
        },
        {
          img: "/images/EcoHunt/ecohunt3.png",
          title: "Screen3",
          rows: 1,
          cols: 1,
        },
        {
          img: "/images/EcoHunt/ecohunt4.png",
          title: "Screen4",
          rows: 1,
          cols: 1,
        },
        {
          img: "/images/EcoHunt/ecohunt5.png",
          title: "Screen5",
          cols: 1,
          rows: 1,
        },
      ],
    },
    {
      id: 6,
      title: "[WIP] Amoeboculus — Custom Game Engine (Rust, Wasm)",
      date: "Ongoing",
      description:
        "Developing a real-time raymarching-focused game engine in Rust and WebAssembly.",
      showLink: false,
      githubLink: "https://github.com/GuchaIll/amoeboculus-engine",
      hasImage: true,
      images: [
        {
          img: "/images/GameEngine/ambience.png",
          title: "Ambience",
          rows: 1,
          cols: 3,
        },
      ],
    },
  ];

  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  return (
    <div className="gallery-container" ref={containerRef}>
      <div className="gallery-with-arrows">
        <button
          className="gallery-arrow-side"
          onClick={() => scrollBy(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous"
        >
          ‹
        </button>
        <div className="gallery-track" ref={trackRef}>
        {cards.map((card) => (
          <div className="gallery-card" key={card.id}>
            <Card
              sx={{
                width: "100%",
                height: 520,
                background: "rgba(18, 18, 18, 0.65)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(220, 220, 225, 0.18)",
                borderRadius: "14px",
                boxShadow: "none",
                color: "white",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {card.hasImage ? (
                <ImageList
                  sx={{ width: "100%", height: "45%", maxHeight: 240, minHeight: 160 }}
                  variant="quilted"
                  cols={3}
                  rowHeight={"auto"}
                >
                  {card.images.map((item) => (
                    <ImageListItem
                      key={item.img}
                      cols={item.cols || 1}
                      rows={item.rows || 1}
                    >
                      <img
                        {...srcset(item.img, 50, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <div className="project-no-image">
                  <span>no preview data</span>
                </div>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Nasalization",
                    fontSize: "1.05rem",
                    letterSpacing: "0.02em",
                    lineHeight: 1.3,
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(180, 180, 190, 0.5)",
                    display: "block",
                    marginBottom: "8px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontSize: "0.7rem",
                  }}
                >
                  {card.date}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(200, 200, 210, 0.7)",
                    lineHeight: 1.55,
                    fontSize: "0.82rem",
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
              {card.showLink || card.githubLink ? (
                <CardActions sx={{ padding: "0 16px 16px" }}>
                  {card.githubLink ? (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        color: "rgba(220, 220, 225, 0.85)",
                        borderColor: "rgba(180, 180, 190, 0.4)",
                        fontSize: "0.75rem",
                        "&:hover": {
                          borderColor: "rgba(220, 220, 225, 0.7)",
                        },
                      }}
                      href={card.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </Button>
                  ) : null}
                </CardActions>
              ) : null}
            </Card>
          </div>
        ))}
        </div>{/* gallery-track */}
        <button
          className="gallery-arrow-side"
          onClick={() => scrollBy(1)}
          disabled={activeIndex === cardCount - 1}
          aria-label="Next"
        >
          ›
        </button>
      </div>{/* gallery-with-arrows */}
      <div className="gallery-nav">
        <div className="gallery-dots">
          {cards.map((card, i) => (
            <button
              key={card.id}
              className={`gallery-dot${i === activeIndex ? " active" : ""}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselProject;
