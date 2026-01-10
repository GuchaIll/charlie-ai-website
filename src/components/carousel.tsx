import React from "react";
import "./carousel.css"; // Import CSS for styling
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Carousel: React.FC = () => {
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
                    fontSize: "1.4rem",
                    letterSpacing: "0.02em",
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(200, 220, 255, 0.65)", fontFamily: "Nulshock" }}
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
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
