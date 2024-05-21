import React, { useState } from "react";
import * as Yup from "yup";
import { images } from "../../assets/CarouselData.json";
// import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Field, Form, Formik } from "formik";

const subject = import.meta.env.VITE_APP_WHATSAPP_SUBJECT;
const phoneNumber = import.meta.env.VITE_APP_WHATSAPP_PHONE_NUMBER.replace(
  /\s+/g,
  ""
);
const body = import.meta.env.VITE_APP_WHATSAPP_BODY;

const WhatsAppContactIcon = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <WhatsAppIcon />
    </IconButton>
  );
};

WhatsAppContactIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required!")
    .matches(/^[^0-9]*$/, "Name must not contain numaric characters")
    .min(3, "Name should be minimum of 3 characters"),
  comment: Yup.string(),
});

const ImageGallery = () => {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const handleOpen = (src) => {
    setImageSrc(src);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImageSrc("");
  };

  const initialValues = {
    name: "",
    comment: "",
  };

  const submitForm = (values, onSubmitProps) => {
    // console.log(
    //   `name : ${values.name} \n comment : ${values.comment} \n imageSrc : ${imageSrc}`
    // );

    const whatsappMessage = encodeURIComponent(
      `Name:${values.name} \n Subject:${subject} \n Body:${
        values.comment || body
      } \n Model:${imageSrc}\n`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, "_blank");
    onSubmitProps.resetForm();
    onSubmitProps.isSubmitting = false;
    setImageSrc("");
    handleClose();
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
                    <WhatsAppContactIcon onClick={() => handleOpen(item.src)} />
                  }
                />
              </ImageListItem>
            </Grid>
          ))}
        </Grid>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Start Conversation With us
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fill out above details to strat conversation
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitForm}
            validateOnBlur={true}
          >
            {(formik) => {
              return (
                <Form>
                  <Box sx={styles.form}>
                    <Field name="name">
                      {({ field }) => (
                        <TextField
                          {...field}
                          sx={styles.formField}
                          label="Name"
                          size="small"
                          fullWidth
                          type="text"
                          placeholder="Jay Patel"
                          error={
                            formik.touched.name && Boolean(formik.errors.name)
                          }
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      )}
                    </Field>
                    <Field name="comment">
                      {({ field }) => (
                        <TextField
                          {...field}
                          sx={styles.formField}
                          label="Aditional Comment"
                          size="small"
                          fullWidth
                          type="text"
                          placeholder="I want to know more about this model"
                          error={
                            formik.touched.comment &&
                            Boolean(formik.errors.comment)
                          }
                          helperText={
                            formik.touched.comment && formik.errors.comment
                          }
                        />
                      )}
                    </Field>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={styles.formField}
                      endIcon={<SendIcon />}
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      {formik.isSubmitting
                        ? "Submiting..."
                        : "Start Conversation"}
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ImageGallery;

// Styles
const styles = {
  imageGalleryBody: {
    backgroundColor: "#F0F0F0",
  },
  imageListItem: {
    borderTop: "2px solid #555",
    overflow: "hidden",
    margin: "0.5rem",
  },
  imageListItemBar: {
    fontSize: "2rem",
    span: {
      fontSize: "1rem",
      color: "primary",
    },
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  formField: {
    marginTop: "0.5rem",
    "& .MuiInputLabel-root": {
      color: "#31363F", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#31363F", // Focused label color
    },
    "& .MuiInputBase-input": {
      color: "#31363F", // Text color
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#31363F !important", // Main border color
      },
      "&:hover fieldset": {
        borderColor: "#31363F", // Hover border color
      },
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#31363F", // Hover border color
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#31363F", // Placeholder color
    },
  },
  form: {
    width: { xs: "70vw", sm: "50vw", md: "50vw", lg: "50vw", xl: "50vw" },
  },
};
