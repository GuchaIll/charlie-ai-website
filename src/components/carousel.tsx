import React, { useRef, useState, useEffect, useCallback } from "react";
import "./carousel.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Carousel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardCount = 4;

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
      title: "Machina Automaton",
      description:
        "Third person action combat game taking place in a dystopian, cyberpunk future. Built with Unreal Engine and Gameplay Ability System.",
      githubLink: "https://github.com/GuchaIll/MachinaAutomadum",
      discordLink: "https://discord.gg/abakMYaG",
      images: [
        {
          img: "/images/MA1.png",
          title: "Scene1",
          rows:1,
          cols:1
         
        },
        {
          img: "/images/MA2.png",
          title: "Burger",
          rows:2,
          cols:1
        },
        {
          img: "/images/MA3.png",
          title: "Camera",
          rows:1,
          cols:2
        },
        {
          img: "/images/MA4.png",
          title: "Camera2",
          rows:2,
          cols:2
        },
      ],
    },
    {
      id: 2,
      title: "Christmas at DQ",
      description:
        "First person horror driving simulator game where player encounters strange creatures in Ob'Mil as they discover their lost past.",
      githubLink: "https://github.com/GuchaIll/Christmas-at-DQ",
      discordLink: "https://discord.gg/EqsWKuTa",
      images: [
        {
          img: "/images/Christmas/playingScene.png",
          title: "Coffee",
          cols: 2,
        },
        {
          img: "/images/Christmas/cutScene.png",
          title: "Hats",
          rows: 1,
          cols: 2,
        },
        {
          img: "/images/Christmas/Book.png",
          title: "Honey",
          rows: 2,
          cols: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Voxel Rogue",
      description:
        "Top down rogue game with random dungeons in a voxel style based around the 9 circles of Hell.",
      githubLink: "",
      discordLink: "",
      images: [
        {
          img: "/images/VoxelRogue/cover.png",
          title: "Basketball",
        },
        {
          img: "/images/VoxelRogue/asset1.png",
          title: "Fern",
        },
        {
          img: "/images/VoxelRogue/asset2.png",
          title: "new",
        },
        {
          img: "/images/VoxelRogue/layout.png",
          title: "new",
        }
      ],
    },
    {
      id: 4,
      title: "Sweet Dreams",
      description:
        "First Person Horror Game where the player uncovers secrets of their past as they navigate through an abandoned school yard.",
      githubLink: "",
      discordLink: "",
      images: [
        {
          img: "/images/SweetDream/gnaw.gif",
          title: "Breakfast",
          rows: 2,
          cols: 2,
        },
        {
          img: "/images/SweetDream/E1.png",
          title: "Burger",
        },
        {
          img: "/images/SweetDream/E2.png",
          title: "Burger",
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
              <ImageList
                sx={{ width: "100%", height: "50%", maxHeight: 300 }}
                variant="quilted"
                cols={2}
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
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontFamily: "Nasalization",
                    fontSize: "1.05rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(200, 200, 210, 0.7)", lineHeight: 1.55, fontSize: "0.82rem" }}
                >
                  {card.description}
                </Typography>
              </CardContent>
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
                {card.discordLink ? (
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
                    href={card.discordLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </Button>
                ) : null}
              </CardActions>
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

export default Carousel;
