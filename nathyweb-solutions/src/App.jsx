import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SiteHeader from "./components/header"
import Hero from "./components/hero"
import Services from "./components/services"
import Work from "./components/work";
import About from "./components/about";
import Contact from "./components/contact";
import Footer from "./components/footer";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <>
      <SiteHeader/>
      <main>
        <Hero/>
        <Services/>
        <Work/>
        <About/>
        <Contact/>
      </main>
      <Footer/>
    </>
  )
}

export default App
