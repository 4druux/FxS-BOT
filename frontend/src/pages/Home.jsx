import Hero from "../components/Hero";
// import CircularGallery from "../components/CircularGallery";
import CardProduct from "../components/CardProduct";
import TextMarquee from "../components/button/TextMarquee";
import TextCountUp from "../components/CountUp";
// import { WorldMap } from "../components/ui/WorldMap";
import About from "../components/about";
// import ScrollGsap from "../components/ScrollGsap";
// import InfiniteScroll from "../components/infiniteScroll";

const Home = () => {
  return (
    <div className="pt-28">
      {/* <WorldMap /> */}
      <Hero />
      <div className="mt-[10vh]">
        <TextMarquee />
      </div>
      {/* <section className="relative z-10">
        <InfiniteScroll />
      </section>{" "} */}
      {/* <section className="relative z-10">
        <ScrollGsap />
      </section> */}
      <About />
      <CardProduct />
      {/* <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div> */}
      <TextCountUp />
    </div>
  );
};

export default Home;
