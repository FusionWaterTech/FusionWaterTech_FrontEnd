import { Box, Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
///////////////////////////////////////////////////////////////////////////
// SX:CSS
const mainCardOuterBox = {
  // border: "2px solid red",
};
const mainCard = {
  minWidth: "40%",
  bgcolor: "#FFF",
  color: "#3D52A0",
  padding: "1rem",
  display: "grid",
  gridTemplateRows: "repeat(3, auto)",
};
const cardHeading = {
  textAlign: "center",
  marginTop: "1rem",
};
const cardBody = {
  textAlign: "justify",
  padding: "1rem",
};
const ServiceCard = (props) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const words = props.body.split(" ");
  const displayText = showMore
    ? props.body
    : `${words.slice(0, 40).join(" ")}${words.length > 40 ? "..." : ""}`;

  return (
    <>
      {/* Main Card outer box  */}
      <Box sx={mainCardOuterBox}>
        <Card elevation={2} sx={mainCard}>
          <Typography variant="h4" sx={cardHeading}>
            {props.heading}
          </Typography>
          <Typography variant="body1" marginTop={2} sx={cardBody}>
            {displayText}
            {words.length >= 40 && (
              <Button
                sx={{
                  textTransform: "lowercase",
                  color: "#3D52A0",
                  textDecoration: "underline",
                }}
                onClick={toggleShowMore}
              >
                {showMore ? "Read Less" : "Read More"}
              </Button>
            )}
          </Typography>
        </Card>
      </Box>
    </>
  );
};

export default ServiceCard;

ServiceCard.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  btnTxt: PropTypes.string.isRequired,
};
