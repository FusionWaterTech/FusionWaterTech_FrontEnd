import React from "react";
import "./Service.css";
import { Box, Stack, Typography } from "@mui/material";
import ServiceCard from "./ServiceCard";
import PropTypes from "prop-types";
import { ServiceData } from "./ServiceData.json";
import buy from "../../assets/buy.png";
import rent from "../../assets/rent.png";
import service from "../../assets/service.png";

////////////////////////////////////////////////////////////////

const ServiceCardItem = ({ sx, logo, serviceData }) => (
  <Box sx={{ ...styles.serviceCard, ...sx }}>
    <Box sx={styles.serviceCardHelperLogo}>
      <img src={logo} />
    </Box>
    <ServiceCard
      heading={serviceData.heading}
      body={serviceData.body}
      btnTxt={serviceData.btnTxt}
    />
  </Box>
);

const Service = () => {
  return (
    // Main service outer box
    <Box id="service" padding={2} sx={styles.serviceMainBox}>
      {/* Heading */}
      <Stack alignItems={"center"} padding={2} sx={styles.serviceHeading}>
        <Typography variant="h2" color="#3D52A0">
          Our work
        </Typography>
      </Stack>
      {/* Main Card Box */}
      <Stack sx={{ ...styles.mainServiceCardBox }}>
        {ServiceData.map((data, index) => (
          <ServiceCardItem
            key={index}
            sx={styles.cardPositions[index]}
            logo={logos[index]}
            serviceData={data}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Service;

ServiceCardItem.propTypes = {
  sx: PropTypes.object.isRequired,
  logo: PropTypes.string.isRequired,
  serviceData: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    btnTxt: PropTypes.string.isRequired,
  }).isRequired,
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const logos = [buy, rent, service];

const styles = {
  serviceMainBox: {},
  serviceHeading: {},
  mainServiceCardBox: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: {
      xs: "0.2fr auto 0.2fr",
      sm: "auto 1.5fr auto",
      md: "1fr 3fr 1fr",
      lg: "repeat(8, auto)",
      xl: "repeat(3, auto)",
    },
    gridTemplateRows: {
      xs: "repeat(3, auto)",
      sm: "repeat(3, auto)",
      md: "repeat(3, auto)",
      lg: "repeat(2, auto)",
    },
    alignItems: "center",
  },
  serviceCard: {},
  serviceCardHelperLogo: {
    height: "15%",
    width: "15%",
    position: "relative",
    zIndex: "0",
    top: "2rem",
    left: "43.5%",
    filter: "drop-shadow(2px 2px 5px #000)",
  },
  cardPositions: [
    {
      gridColumnStart: { xs: "2", sm: "2", md: "2", lg: "2", xl: "1" },
      gridColumnEnd: { xs: "3", sm: "3", md: "3", lg: "4", xl: "2" },
      gridRowStart: { xs: "1", sm: "1", md: "1", lg: "1", xl: "1" },
      gridRowEnd: { xs: "2", sm: "2", md: "2", lg: "2", xl: "2" },
    },
    {
      gridColumnStart: { xs: "2", sm: "2", md: "2", lg: "4", xl: "2" },
      gridColumnEnd: { xs: "3", sm: "3", md: "3", lg: "6", xl: "3" },
      gridRowStart: { xs: "2", sm: "2", md: "2", lg: "1", xl: "1" },
      gridRowEnd: { xs: "3", sm: "3", md: "3", lg: "2", xl: "2" },
    },
    {
      gridColumnStart: { xs: "2", sm: "2", md: "2", lg: "6", xl: "3" },
      gridColumnEnd: { xs: "3", sm: "3", md: "3", lg: "8", xl: "4" },
      gridRowStart: { xs: "3", sm: "3", md: "3", lg: "1", xl: "1" },
      gridRowEnd: { xs: "4", sm: "4", md: "4", lg: "2", xl: "2" },
    },
  ],
};
