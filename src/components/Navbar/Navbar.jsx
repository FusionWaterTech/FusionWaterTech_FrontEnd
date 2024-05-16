import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ScrollToTop from "./ScrollToTop";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, Stack } from "@mui/material";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SX:CSS
const appBarMain = {
  // maxWidth: "100%",
  // height: { xs: "", sm: "", md: "", lg: "", xl: "" },
  bgcolor: "#3D52A0",
  color: "#EDE8F5",
  boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)",
};
const navMenu = { display: { xs: "none", md: "flex" } };
const navMenuLink = {
  fontSize: { xs: "none", sm: "none", md: "1rem", lg: "1rem", xl: "2rem" },
  marginLeft: { xs: "", sm: "", md: ".5rem", lg: ".5rem", xl: "1rem" },
};
const menuLogo = {
  variant: "h2",
  color: "inherit",
  fontSize: { xs: "", sm: "", md: "2rem", lg: "2rem", xl: "3rem" },
  flexGrow: 1,
  // m: 2,
  // p: 2,
  display: { xs: "none", md: "flex" },
};

const hamMenu = {
  display: { xs: "flex", md: "none" },
};
const hamMenuIcon = {
  fontSize: { xs: "1.5rem", sm: "1.9rem" },
};
const hamMenuLogo = {
  fontSize: { xs: "1.5rem", sm: "1.5rem" },
  m: 3,
  display: { xs: "flex", md: "none" },
};

const Navbar = () => {
  const [anchorNav, setAnchorNav] = useState(null);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorNav(null);
  };
  return (
    <>
      <ScrollToTop />
      {/* Navbar start  */}
      <Box>
        <AppBar className="appbar" position="static" sx={appBarMain}>
          <Toolbar>
            {/* Logo */}
            <Typography sx={menuLogo} aria-label="logo">
              Fusion Water Tech
            </Typography>
            {/* Navbar Navigation menu */}
            <Box sx={navMenu}>
              <Button
                color="inherit"
                size="large"
                variant="outlined"
                sx={navMenuLink}
                onClick={() => {
                  scrollToSection("home");
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                size="large"
                variant="outlined"
                sx={navMenuLink}
                onClick={() => {
                  scrollToSection("service");
                }}
              >
                Service
              </Button>
              <Button
                color="inherit"
                size="large"
                variant="outlined"
                sx={navMenuLink}
                onClick={() => {
                  scrollToSection("contact");
                }}
              >
                Contact Us
              </Button>
            </Box>
            {/* Hamburger Menue */}
            <Box sx={hamMenu}>
              {/* Ham Icon */}
              <IconButton
                edge="start"
                color="inherit"
                onClick={openMenu}
              >
                <MenuIcon sx={hamMenuIcon} />
              </IconButton>
              {/* responsive Menu */}
              <Drawer
                sx={{
                  width: { lg: "0", sm: "50%" },
                  display: { lg: "none", sm: "flex" },
                }}
                open={Boolean(anchorNav)}
                onClose={closeMenu}
                anchor="top"
              >
                <Stack bgcolor={"#3D52A0"} color={"#EDE8F5"}>
                  <Button
                    color="inherit"
                    size="large"
                    variant="outlined"
                    sx={{ m: 1 }}
                    onClick={() => {
                      scrollToSection("home");
                      closeMenu();
                    }}
                  >
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    size="large"
                    variant="outlined"
                    sx={{ m: 1 }}
                    onClick={() => {
                      scrollToSection("service");
                      closeMenu();
                    }}
                  >
                    Service
                  </Button>
                  <Button
                    color="inherit"
                    size="large"
                    variant="outlined"
                    sx={{ m: 1 }}
                    onClick={() => {
                      scrollToSection("contact");
                      closeMenu();
                    }}
                  >
                    Contact Us
                  </Button>
                  <IconButton onClick={closeMenu}>
                    <CloseIcon
                      sx={{
                        fontSize: "2.5rem",
                        padding: "0.5rem",
                        color: "#EDE8F5",
                        border: "2px solid #fff",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                </Stack>
              </Drawer>

              <Typography
                color="inherit"
                variant="h5"
                component="div"
                sx={hamMenuLogo}
                aria-label="logo"
              >
                Fusion Water Tech
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
