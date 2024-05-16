import React, { useEffect, useRef, useState } from "react";
import { images } from "../../assets/CarouselData.json";
import { Box, IconButton, Stack } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

////////////////////////////////////////////////////////////
const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  const clearAndRestartInterval = () => {
    clearInterval(intervalRef.current);
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => {
      const nextIndex = (prevSlide + 1) % images.length;
      return nextIndex;
    });
    clearAndRestartInterval();
  };

  const previousSlide = () => {
    setCurrentSlide((prevSlide) => {
      const prevIndex = prevSlide === 0 ? images.length - 1 : prevSlide - 1;
      return prevIndex;
    });
    clearAndRestartInterval();
  };

  return (
    <React.Fragment>
      <Stack direction="row" sx={styles.outerMainBox}>
        <Stack sx={{ ...styles.arrowBox, ...styles.arrowLeft }}>
          <IconButton onClick={previousSlide}>
            <ArrowBackIos sx={styles.arrow} />
          </IconButton>
        </Stack>
        <Box sx={{ ...styles.slideBox }}>
          {images.map((item, index) => {
            return (
              <Box
                component="img"
                src={images[currentSlide].src}
                key={item.id}
                alt={item.alt}
                sx={currentSlide === index ? styles.slide : styles.hiddenSlide}
              ></Box>
            );
          })}
        </Box>
        <Stack sx={{ ...styles.arrowBox, ...styles.arrowRight }}>
          <IconButton onClick={nextSlide}>
            <ArrowForwardIos sx={styles.arrow} />
          </IconButton>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};
export default ImageSlider;

////////////////////////////////////////////////////////////

const styles = {
  outerMainBox: {
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
  },
  slideBox: {
    display: "grid",
    placeItems: "center",
    bgcolor: "#EDE8F5",
    width: "100vw",
  },
  hiddenSlide: {
    height: "0px",
    opacity: "0",
  },
  slide: {
    width: { xs: "100vw", sm: "100vw", md: "70vw", lg: "70vw", xl: "70vw" },
    zIndex: "0",
    filter: "drop-shadow(5px 5px 6px #555)",
    transition: "height 0.3s ease, opacity 0.3s ease",
  },
  arrow: {
    bgcolor: "#fff",
    color: "#000",
    fontSize: "2rem",
    padding: "0.5rem",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  arrowBox: {
    zIndex: "20",
    position: "absolute",
  },
  arrowLeft: {
    left: "2vw",
  },
  arrowRight: {
    right: "2vw",
  },
};
