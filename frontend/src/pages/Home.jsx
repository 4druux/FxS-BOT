import Hero from "../components/Hero";
import CircularGallery from "../components/CircularGallery";
import CardProduct from "../components/CardProduct";
import TextMarquee from "../components/TextMarquee";

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <div className="mt-[10vh]">
        <TextMarquee />
      </div>
      <CardProduct />
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
      </div>
      <CardProduct />
    </div>
  );
};

export default Home;
