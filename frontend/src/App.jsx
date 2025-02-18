import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initSmoothScroll } from "./utils/SmoothScroll";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DetailItem from "./pages/DetailItem";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const location = useLocation();
  const lenisRef = useRef();

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = initSmoothScroll();

    // Connect GSAP ScrollTrigger and Lenis
    lenisRef.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current.raf(time * 1000);
    });

    return () => {
      lenisRef.current.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  useEffect(() => {
    if (lenisRef.current) {
      ScrollTrigger.refresh();
      // Reset scroll position when route changes
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<DetailItem />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
