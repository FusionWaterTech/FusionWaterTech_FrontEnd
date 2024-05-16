import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button, Stack } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CopyrightIcon from "@mui/icons-material/Copyright";

/////////////////////////////////////////////////////////////////////////////////////////////////////

const mobile = import.meta.env.VITE_APP_WHATSAPP_PHONE_NUMBER;
const mapUrl = import.meta.env.VITE_APP_MAP_URL;

const Footer = () => {
  const openGoogleMaps = () => {
    window.open(mapUrl, "_blank");
  };

  const openDialer = () => {
    const telUrl = `tel:${mobile}`;
    window.open(telUrl, "_self");
  };
  return (
    <React.Fragment>
      <AppBar position="static" sx={styles.appBarMain}>
        <Toolbar sx={styles.toolBar}>
          <Stack
            component={Button}
            onClick={openGoogleMaps}
            sx={{ ...styles.toolBarLocation, ...styles.toolBarSections }}
          >
            <LocationOnIcon sx={styles.toolBarTypeIcon} />
            <Typography sx={styles.toolBarHeading}>
              G-57 Shayona Plaza, BRTS Canal Road, Punagam, Surat - 395010
            </Typography>
          </Stack>
          <Stack
            component={Button}
            onClick={openDialer}
            sx={{ ...styles.toolBarNumber, ...styles.toolBarSections }}
          >
            <PhoneIcon sx={styles.toolBarTypeIcon} />
            <Typography sx={styles.toolBarHeading}>{mobile}</Typography>
          </Stack>
          <Stack component={Button} sx={{ ...styles.toolBarCopy, ...styles.toolBarSections }}>
            <CopyrightIcon />
            <Typography sx={{ ...styles.toolBarHeading, ...styles.toolBarTypeIcon }}>
              2024 Fusion Water Tech
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Footer;

const styles = {
  appBarMain: {
    width: "100%",
    top: "auto",
    bottom: "0",
    maxWidth: "100vw",
    bgcolor: "#3D52A0",
    color: "#EDE8F5",
  },
  toolBar: {
    display: "grid",
    gap: "0.5rem",
    gridTemplateColumns: {
      xs: "repeat(3, auto)",
      sm: "repeat(3, auto)",
      md: "repeat(3, auto)",
      lg: "repeat(7, auto)",
      xl: "repeat(7, auto)",
    },
    gridTemplateRows: {
      xs: "repeat(7, auto)",
      sm: "repeat(7, auto)",
      md: "repeat(7, auto)",
      lg: "repeat(3, auto)",
      xl: "repeat(3, auto)",
    },
  },
  toolBarLocation: {
    gridColumnStart: { xs: "2", sm: "2", md: "2", lg: "2", xl: "2" },
    gridColumnEnd: { xs: "3", sm: "3", md: "3", lg: "3", xl: "3" },
    gridRowStart: { xs: "2", sm: "2", md: "2", lg: "2", xl: "2" },
    gridRowEnd: { xs: "3", sm: "3", md: "3", lg: "3", xl: "3" },
  },
  toolBarNumber: {
    gridColumnStart: { xs: "2", sm: "2", md: "2", lg: "4", xl: "4" },
    gridColumnEnd: { xs: "3", sm: "3", md: "3", lg: "5", xl: "5" },
    gridRowStart: { xs: "4", sm: "4", md: "4", lg: "2", xl: "2" },
    gridRowEnd: { xs: "5", sm: "5", md: "5", lg: "3", xl: "3" },
  },
  toolBarCopy: {
    gridColumnStart: { xs: "2", sm: "2", md: "2", lg: "6", xl: "6" },
    gridColumnEnd: { xs: "3", sm: "3", md: "3", lg: "7", xl: "7" },
    gridRowStart: { xs: "6", sm: "6", md: "6", lg: "2", xl: "2" },
    gridRowEnd: { xs: "7", sm: "7", md: "7", lg: "3", xl: "3" },
  },
  toolBarSections: {
    alignItems: { xs: "center" },
    justifyContent: { xs: "center" },
  },
  toolBarTypeIcon: {
    // border: "2px solid white",
  },
  toolBarHeading: {
    color: "#EDE8F5",
    textAlign: "center",
  },
};
