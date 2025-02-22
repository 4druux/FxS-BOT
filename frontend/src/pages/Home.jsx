import Hero from "../components/Hero";
// import CircularGallery from "../components/CircularGallery";
import CardProduct from "../components/CardProduct";
import TextMarquee from "../components/button/TextMarquee";
import TextCountUp from "../components/CountUp";
import { WorldMap } from "../components/ui/WorldMap";
import Scroll from "../components/Scroll";
// import ScrollGsap from "../components/ScrollGsap";

const Home = () => {
  return (
    <div className="pt-28">
      <WorldMap />
      <Hero />
      <div className="mt-[10vh]">
        <TextMarquee />
      </div>
      {/* <section className="relative z-10">
        <ScrollGsap />
      </section> */}

      <section className="relative z-10">
        <Scroll />
      </section>

      <CardProduct />
      {/* <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div> */}
      <TextCountUp />
    </div>
  );
};

export default Home;
