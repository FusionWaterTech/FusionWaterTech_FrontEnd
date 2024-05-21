import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import ContactMailIcon from "@mui/icons-material/ContactMailRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import SendIcon from "@mui/icons-material/Send";

const Contact = () => {
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //SX:CSS

  const form = {
    display: "grid",
    placeItems: "center",
    gap: "2vh",
  };

  const contactMethods = {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    padding: "1rem",
  };

  const formField = {
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
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // Form Data
  const priceRanges = [
    { value: "3000 - 5000", label: "3000 - 5000" },
    { value: "5000 - 10,000", label: "5000 - 10,000" },
    { value: "10,000 - 15,000", label: "10,000 - 15,000" },
    { value: "15,000+", label: "15,000+" },
  ];

  const initialValues = {
    name: "",
    mobile: "",
    email: "",
    comment: "",
    priceRange: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required!")
      .matches(/^[^0-9]*$/, "Name must not contain numaric characters")
      .min(3, "Name should be minimum of 3 characters"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid 10-digit phone number")
      .required("Required!"),
    email: Yup.string().email("Invalid email format!!").required("Required!"),
    comment: Yup.string(),
    priceRange: Yup.string().required("Required!"),
  });

  //////////////////////////////////////////////////////////////////////////////
  const subject = import.meta.env.VITE_APP_WHATSAPP_SUBJECT;
  const body = import.meta.env.VITE_APP_WHATSAPP_BODY;
  const phoneNumber = import.meta.env.VITE_APP_WHATSAPP_PHONE_NUMBER.replace(
    /\s+/g,
    ""
  ); // Remove any spaces

  // const phoneNumber = import.meta.env.VITE_APP_WHATSAPP_PHONE_NUMBER;
  const mapUrl = import.meta.env.VITE_APP_MAP_URL;

  const whatsappMessage = encodeURIComponent(`${subject}\n${body}`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  // console.log(`whatsappUrl is ${whatsappUrl}`);

  const serviceId = import.meta.env.VITE_APP_EMAIL_SERVICE_ID;
  const templateId = import.meta.env.VITE_APP_EMAIL_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_APP_EMAIL_PUBLIC_KEY;

  //////////////////////////////////////////////////////////////////////////////
  // Contact method
  const contactTypes = [
    {
      icon: <WhatsAppIcon fontSize="large" />,
      title: "Chat Support",
      description: "Our support team is just a click away",
      actionTitle: "chat now",
      action: openWhatsApp,
    },
    {
      icon: <ContactMailIcon fontSize="large" />,
      title: "Email Support",
      description:
        "Prefer to email? Send us an email and we'll get back to you soon",
      actionTitle: "send email",

      action: mail,
    },
    {
      icon: <HelpCenterIcon fontSize="large" />,
      title: "Help Center",
      description: "Visit our self-serve help center",
      actionTitle: "get location",
      action: openGoogleMaps,
    },
  ];

  ////////////////////////////////////////////////////////////////////////////////////////////

  // Handling Contact form
  const submitForm = async (values, onSubmitProps) => {
    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      to_name: import.meta.env.VITE_APP_EMAIL_TO_NAME,
      from_mobile: values.mobile,
      from_message: values.comment,
      from_priceRanges: values.priceRange,
    };

    // send mail using emailjs
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        alert("Your response submitted successfully", response);
        // console.log("Email sent successfully!", response);
      })
      .then(() => {
        onSubmitProps.resetForm();
        onSubmitProps.isSubmitting = false;
      })
      .catch((error) => {
        alert(
          "Error occuring during submitting response please contact help center or try again latter",
          error
        );
        // console.log("Error sending email:", error);
      });
  };

  // Whatsapp handling function
  function openWhatsApp() {
    window.open(whatsappUrl, "_blank");
  }

  // Mail handling function
  function mail() {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  // Map handling function
  function openGoogleMaps() {
    window.open(mapUrl, "_blank");
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Box
      id="contact"
      sx={{
        // border: "2px solid red",
        maxWidth: "100vw",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      <Stack
        sx={{
          // border: "2px solid black",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
          padding: "2rem",
          bgcolor: "#7091E6",
        }}
      >
        <Box>
          <Typography variant="h1">Get in touch</Typography>
          <Typography variant="h4" p={1}>
            Dive into Better Water Today!
          </Typography>
          <Typography variant="body1" p={1}>
            Let's chat about your water needs and snag the best deal on a
            purifier. Reach out now!
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
          validateOnBlur={true}
        >
          {(formik) => {
            return (
              <Form id="Form">
                <Box sx={{ ...form }}>
                  <Field name="name">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        size="small"
                        fullWidth
                        type="text"
                        placeholder="Jay Patel"
                        sx={formField}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched && formik.errors.name}
                      />
                    )}
                  </Field>
                  <Field name="mobile">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Mobile"
                        size="small"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        placeholder="+91 1234567890"
                        sx={formField}
                        error={
                          formik.touched.mobile && Boolean(formik.errors.mobile)
                        }
                        helperText={formik.touched && formik.errors.mobile}
                      />
                    )}
                  </Field>
                  <Field name="email">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        size="small"
                        variant="outlined"
                        fullWidth
                        type="email"
                        placeholder="abc@email.com"
                        sx={formField}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched && formik.errors.email}
                      />
                    )}
                  </Field>

                  <Field name="comment">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Additional Comment"
                        size="small"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={2}
                        placeholder="Want to know about XYZ model and PRICE"
                        sx={formField}
                        error={
                          formik.touched.comment &&
                          Boolean(formik.errors.comment)
                        }
                        helperText={formik.touched && formik.errors.comment}
                      />
                    )}
                  </Field>

                  <Field name="priceRange">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Preferred Price Range"
                        size="small"
                        variant="outlined"
                        fullWidth
                        select
                        sx={formField}
                        error={
                          formik.touched.priceRange &&
                          Boolean(formik.errors.priceRange)
                        }
                        helperText={formik.touched && formik.errors.priceRange}
                      >
                        {priceRanges.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  </Field>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={formField}
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
      </Stack>
      <Stack sx={contactMethods}>
        {contactTypes.map((type, index) => (
          <Paper
            key={index}
            elevation={5}
            sx={{
              display: "grid",
              gap: "0.5rem",
              padding: "1rem",
            }}
          >
            <Box sx={{ textAlign: "center", color: "#7091E6" }}>
              {type.icon}
            </Box>
            <Typography
              variant="h4"
              color="#7091E6"
              sx={{ textAlign: "center" }}
            >
              {type.title}
            </Typography>
            <Typography sx={{ textAlign: "center", color: "#7091E6" }}>
              {type.description}
            </Typography>
            {type.action && (
              <Button
                variant="outlined"
                sx={{ margin: "auto", color: "#7091E6" }}
                onClick={type.action}
              >
                {type.actionTitle}
              </Button>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Contact;
