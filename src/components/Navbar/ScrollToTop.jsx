import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./ScrollToTop.css";
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <React.Fragment>
      {isVisible && (
        <IconButton
          onClick={scrollToTop}
          className="pulse "
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#3D52A0",
            color: "#fff",
            zIndex: "10000",
          }}
        >
          <ExpandLessIcon />
        </IconButton>
      )}
    </React.Fragment>
  );
};

export default ScrollToTop;
