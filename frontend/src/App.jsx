import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DetailItem from "./pages/DetailItem";
// import SplashCursor from "./components/SplashCursor";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <SplashCursor /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<DetailItem />} />
      </Routes>
    </div>
  );
};

export default App;
