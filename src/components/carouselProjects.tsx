import React from "react";
import "./carousel.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const CarouselProject: React.FC = () => {
  const cards = [
    {
      id: 1,
      title: "CMU IS Consulting Site",
      description:
        "As part of the final project for Intro to Web Development, collaborated with the CMU IS Department to create a consultation platform connecting community partners with student consultants. The platform allows users to submit consultation requests, browse available services and past collaboration projects. Built using native JavaScript, HTML, and CSS, designed for cross-platforms.",
      showLink: false,
      githubLink: "https://github.com/GuchaIll/MachinaAutomadum",
      discordLink: "https://discord.gg/abakMYaG",
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
          title: "Burger",
          rows: 2,
          cols: 1,
        },
        {
          img: "/images/CMUConsultingIS/IS3.png",
          title: "Camera",
          rows: 1,
          cols: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Eco Hunt - TartanHacks",
      description:
        "Designed an AR-based scavenger hunt game for TartanHacks that encourages users to classify and recycle trash while earning virtual tokens. Integrated Google Maps API to provide real-time location tracking, allowing users to find and interact with AR-based environmental challenges in React Native",
      showLink: false,
      githubLink: "https://github.com/GuchaIll/Christmas-at-DQ",
      discordLink: "https://discord.gg/EqsWKuTa",
      hasImage: true,
      images: [
        {
          img: "/images/EcoHunt/ecohunt1.png",
          title: "Coffee",
          cols: 1,
          rows: 1,
        },
        {
          img: "/images/EcoHunt/ecohunt2.png",
          title: "Hats",
          rows: 1,
          cols: 1,
        },
        {
          img: "/images/EcoHunt/ecohunt3.png",
          title: "Honey",
          rows: 1,
          cols: 1,
        },
        {
          img: "/images/EcoHunt/ecohunt4.png",
          title: "Honey",
          rows: 1,
          cols: 1,
        },
        {
          img: "/images/EcoHunt/ecohunt5.png",
          title: "Honey",
          cols: 1,
          rows: 1,
        },
      ],
    },
    {
      id: 3,
      title: "Malloc Lab 18-213 (Computer Systems Project)",
      description:
        "Implemented a high-performance dynamic memory allocator in C using segregated free lists and a next-fit allocation strategy to optimize memory usage. Designed the allocator to efficiently manage memory fragmentation while maintaining fast allocation and deallocation times. Extensively tested and benchmarked the implementation against standard allocators to evaluate performance improvements.",
      showLink: false,
      githubLink: "",
      discordLink: "",
      hasImage: false,
      images: [],
    },
    {
      id: 4,
      title: "[WIP] Ray marching Engine",
      description:
        "Developing a real-time rendering engine in C++ using ray marching to generate highly detailed procedural graphics. Rendering actors using signed distance functions (SDFs) to create complex 3D scenes. Exploring volumetric lighting, reflections, and soft shadows to enhance visual realism and performance.",
      showLink: false,
      githubLink: "",
      discordLink: "",
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
    <div className="gallery-container">
      <div className="gallery-track">
        {cards.map((card) => (
          <div className="gallery-card" key={card.id}>
            <Card
              sx={{
                width: "100%",
                maxWidth: 460,
                height: 620,
                background:
                  "linear-gradient(160deg, rgba(20, 22, 28, 0.95), rgba(8, 10, 12, 0.95))",
                border: "1px solid rgba(120, 180, 255, 0.25)",
                boxShadow: "0 0 24px rgba(60, 120, 255, 0.15)",
                color: "white",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {card.hasImage ? (
                <ImageList
                  sx={{ width: "100%", height: "50%", maxHeight: 300, minHeight: 200 }}
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
                    fontSize: "1.4rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(200, 220, 255, 0.65)",
                    fontFamily: "Nulshock",
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
              {card.showLink ? (
                <CardActions sx={{ padding: "0 16px 16px" }}>
                  {card.githubLink ? (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "rgba(120, 180, 255, 0.6)",
                        "&:hover": {
                          borderColor: "white",
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
                        color: "white",
                        borderColor: "rgba(120, 180, 255, 0.6)",
                        "&:hover": {
                          borderColor: "white",
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
              ) : null}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselProject;
