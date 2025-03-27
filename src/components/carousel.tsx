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

const Carousel: React.FC<{onClose : ()=> void}> = ({onClose}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

            <Card sx={{ width:"100%", 
                maxWidth: 480, 
                height: 600, 
                backgroundColor: "rgb(36, 34, 31)",
                color: "white"}}>
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
                        objectFit: "cover", // Ensure the image fills the container without distortion
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
        <CardContent>
         <Typography gutterBottom variant="h5" 
         component="div"
        sx={{
        fontFamily: "Nasalization", // Apply the custom font
        fontSize: "1.5rem", // Adjust font size
        }}>
         {card.title}
        </Typography>
        <Typography variant="body2" 
        sx={{ color: 'rgba(151, 146, 134, 0.7)', 
              fontFamily: "Nulshock"
        }}>
        {card.description}
        </Typography>
        </CardContent>
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

export default Carousel;