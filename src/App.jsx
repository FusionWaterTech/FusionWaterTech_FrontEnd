import { Route, Routes } from "react-router-dom";
import "./App.css";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Service from "./components/Service/Service";
import ImageSlider from "./components/Slider/ImageSlider";
import ImageGallery from "./components/ImageGallery/ImageGallery";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ImageSlider /> <Service /> <Contact /> <Footer />
            </>
          }
        />

        <Route exact path="/gallery" element={<ImageGallery />} />
      </Routes>
    </>
  );
}

export default App;
