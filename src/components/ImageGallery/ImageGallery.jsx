import React, { useState } from "react";
import { images } from "../../assets/CarouselData.json";
// import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";

const ImageDownloadIcon = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <DownloadIcon color="primary" />
    </IconButton>
  );
};
const ImageViewIcon = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <VisibilityIcon />
    </IconButton>
  );
};

const ImageGallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleOpen = (src) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 20, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 20, 20));
  };
  const handleDownload = async (src, alt) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = alt || "image";
      document.body.appendChild(link);

      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <React.Fragment>
      <div style={styles.imageGalleryBody}>
        <Grid container>
          {images.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={6} lg={6}>
              <ImageListItem sx={styles.imageListItem}>
                <img
                  srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.src}?w=248&fit=crop&auto=format`}
                  alt={item.alt}
                  //   loading="eager"
                />
                <ImageListItemBar
                  title={item.title}
                  sx={styles.imageListItemBar}
                  subtitle={<span>By: {item.company}</span>}
                  position="below"
                  actionIcon={
                    <>
                      <ImageViewIcon onClick={() => handleOpen(item.src)} />
                    </>
                  }
                />
              </ImageListItem>
            </Grid>
          ))}
        </Grid>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle color={"primary"}>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Preview"
            style={{ maxWidth: `${zoomLevel}%`, maxHeight: "80vh" }}
          />
        </DialogContent>
        <DialogActions>
          <ImageDownloadIcon onClick={handleDownload} />
          <Button
            onClick={handleZoomOut}
            color="primary"
            disabled={zoomLevel <= 20}
          >
            Zoom Out
          </Button>
          <Button
            onClick={handleZoomIn}
            color="primary"
            disabled={zoomLevel >= 200}
          >
            Zoom In
          </Button>

          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ImageGallery;

// Props types

ImageDownloadIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};
ImageViewIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// Styles
const styles = {
  imageGalleryBody: {
    backgroundColor: "#F0F0F0",
  },
  imageListItem: {
    borderTop: "2px solid #555",
    overflow: "hidden",
    margin: "0.5rem",
    // borderRadius: "0.5rem",
  },
  imageListItemBar: {
    // backgroundColor: "#555",
    fontSize: "2rem",
    // color: "#555",
    // border: "1px solid #555",
    span: {
      fontSize: "1rem",
      color: "primary",
    },
  },
};
