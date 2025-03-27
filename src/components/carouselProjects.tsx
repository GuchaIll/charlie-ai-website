import React, { useState, useEffect } from "react";
import "./carousel.css"; // Import CSS for styling
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const CarouselProject: React.FC<{onClose : ()=> void}> = ({onClose}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
          rows:1,
          cols:3
         
        },
        {
          img: "/images/CMUConsultingIS/IS2.png",
          title: "Burger",
          rows:2,
          cols:1
        },
        {
          img: "/images/CMUConsultingIS/IS3.png",
          title: "Camera",
          rows:1,
          cols:2
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
            rows:1,
            cols: 1,
          },
          {
            img: "/images/EcoHunt/ecohunt5.png",
            title: "Honey",
            cols: 1,
            rows:1,
          },
      ],
    },
    {
      id: 3,
      title: "Malloc Lab – 18-213 (Computer Systems Course Project)",
      description:
        "Implemented a high-performance dynamic memory allocator in C using segregated free lists and a next-fit allocation strategy to optimize memory usage. Designed the allocator to efficiently manage memory fragmentation while maintaining fast allocation and deallocation times. Extensively tested and benchmarked the implementation against standard allocators to evaluate performance improvements.",
        showLink: false,
        githubLink: "",
      discordLink: "",
        hasImage: false,
      images: [
        {
          img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
          title: "Basketball",
        },
        {
          img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
          title: "Fern",
        },
      ],
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
          title: "Breakfast",
            rows: 1,
            cols: 3,
        
        },
      
      ],
    },
    {
        id: 4,
        title: "Chess Bot",
        description:
          "Built a functional chess engine and AI opponent in Python, capable of evaluating board positions and making strategic moves. Implemented the Minimax algorithm with Alpha-Beta pruning to improve decision-making efficiency and reduce unnecessary computations. Designed the bot to play at various difficulty levels by adjusting search depth and heuristic evaluations.",
        showLink: false,
        githubLink: "",
        discordLink: "",
        hasImage: false,
        images: [
          {
            img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            title: "Breakfast",
            rows: 2,
            cols: 2,
          },
          {
            img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            title: "Burger",
          },
        ],
      },
  ];
  // Automatically rotate cards every 3 seconds
  

  // Navigate to the previous card
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next card
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const srcset = (image: string, size: number, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  };


  return (
    <div className="carousel-container"
    style = {{
        position: "relative",
        zIndex: 10,
    }}
    >
      {/* Left Arrow Button */}
      <button className="carousel-arrow left" onClick={handlePrev}>
        {"<"}
      </button>

      {/* Carousel Cards */}
      <div
        className="carousel"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {cards.map((card) => (
          <div className="carousel-card" key={card.id}>
           {/*<h2>{card.title}</h2>
            <p>{card.description}</p> */}

        <Card
          sx={{
            width: "100%",
            maxWidth: 480,
            height: 600,
            backgroundColor: "rgb(36, 34, 31)",
            color: "white",
            display: "flex", // Use Flexbox for layout
            flexDirection: "column", // Stack items vertically
           
          }}
        >
          {card.hasImage && (
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
                      objectFit: "cover", // Ensure the image fills the container without distortion
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <CardContent
            sx={{
              flexGrow: 1, // Allow content to grow and push the button down
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                fontFamily: "Nasalization", // Apply the custom font
                fontSize: "1.5rem", // Adjust font size
              }}
            >
              {card.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(151, 146, 134, 0.7)",
                fontFamily: "Nulshock",
              }}
            >
              {card.description}
            </Typography>
          </CardContent>
          
            {card.showLink && (
            <CardActions>
            <Button
              size="small"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white", // Set outline color
                "&:hover": {
                  borderColor: "gray", // Change outline color on hover
                },
              }}
              href={card.githubLink} // Link to GitHub
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security best practice
            >
              GitHub
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "white", // Set outline color
                "&:hover": {
                  borderColor: "gray", // Change outline color on hover
                },
              }}
              href={card.discordLink} // Link to Discord
              target="_blank" // Open in a new tab
              rel="noopener noreferrer" // Security best practice
            >
              Discord
            </Button>
            </CardActions>
            )}
          
          <div
            style={{
              marginTop: "auto", // Push the button to the bottom
              textAlign: "center", // Center the button horizontally
            }}
          >
            <button
              className="text-lg px-4 py-2 rounded"
              style={{
                fontFamily: "Nasalization", // Apply the correct font family
                backgroundColor: "rgb(36, 34, 31)", // Set the fill color
                color: "white", // Set the text color
                border: "1px solid white", // Add a border
                transition: "background-color 0.3s ease, color 0.3s ease", // Smooth hover effect
              }}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "gray"; // Change fill color on hover
                e.currentTarget.style.color = "black"; // Change text color on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgb(36, 34, 31)"; // Reset fill color
                e.currentTarget.style.color = "white"; // Reset text color
              }}
            >
              Close
            </button>
          </div>
        </Card>
          </div>
        ))}
      </div>

      {/* Right Arrow Button */}
      <button className="carousel-arrow right" onClick={handleNext}>
        {">"}
      </button>

      {/* Dots for Navigation */}
      <div className="carousel-controls">
        {cards.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselProject;