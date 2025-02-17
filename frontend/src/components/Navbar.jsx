import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import ShinyBorder from "./button/ShinyBorder";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [navSize, setNavSize] = useState(1);
  const [isDynamic, setIsDynamic] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrollY(scrollPos);

      let newSize = 1 - Math.min(scrollPos / 300, 0.7);
      setNavSize(newSize);

      setIsDynamic(scrollPos > 200); // Menunggu hingga ukuran pas sebelum menambahkan border
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full transition-opacity duration-700"
        style={{
          background: "#121212",
          opacity: scrollY > 50 ? 0 : 1,
          zIndex: 48,
        }}
      />

      <div
        className="fixed transition-all duration-500 ease-in-out"
        style={{
          top: `${Math.max(4, (1 - navSize) * 40)}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: `${Math.max(90, navSize * 100)}%`,
          maxWidth: scrollY > 50 ? "600px" : "100%",
          zIndex: 49,
        }}
      >
        <div
          className="w-full transition-all duration-500"
          style={{
            background: scrollY > 50 ? "rgba(0,0,0,0.4)" : "#121212",
            backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
            borderRadius: `${Math.min(scrollY / 200, 1) * 50}px`,
            border: isDynamic ? "1px solid rgba(255,255,255,0.1)" : "none",
          }}
        >
          <div
            className="mx-auto flex items-center justify-between transition-all duration-500"
            style={{
              padding: scrollY > 50 ? "8px 20px" : "24px 9vw",
            }}
          >
            <Link to="/">
              <img
                src={assets.logo}
                alt="logo"
                className="transition-all duration-500"
                style={{ width: "40px", borderRadius: "50%" }}
              />
            </Link>

            <ul
              className="hidden sm:flex transition-all duration-500 ml-4 font-bold"
              style={{
                gap: "16px",
                fontSize: "14px",
              }}
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative group px-2 py-1 transition-colors duration-300 ${
                        isActive
                          ? "text-teal-500/70 hover:text-teal-500 "
                          : "text-white/70 hover:text-white"
                      }`
                    }
                  >
                    {link.label}
                    <span className="absolute left-2 -bottom-1 w-full h-0.5 bg-teal-500 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-50" />
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-start md:gap-6 gap-4">
              <ShinyBorder
                text="FxS"
                disabled={false}
                speed={3}
                className="transition-all duration-500 font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
