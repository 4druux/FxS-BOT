import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import SplashCursor from "./components/SplashCursor";

const App = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Navbar />
      {/* <SplashCursor /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
