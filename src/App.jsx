import "./App.css";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Service from "./components/Service/Service";
import ImageSlider from "./components/Slider/ImageSlider";
//
function App() {
  return (
    <>
      <Navbar />
      <ImageSlider />
      <Service />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
