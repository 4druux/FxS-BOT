import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const TrueFocus = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "teal",
  glowColor = "rgba(0, 255, 0, 0.6)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  textColor = "white", // Properti baru untuk warna teks
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State untuk hover
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const animationInterval = useRef(null); //ref untuk menyimpan interval

  // useEffect untuk animasi otomatis
  useEffect(() => {
    if (!manualMode && !isHovered) {
      // Hanya jalankan jika tidak manual dan tidak di-hover
      animationInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
    }

    return () => clearInterval(animationInterval.current); // Cleanup interval
  }, [
    manualMode,
    isHovered,
    animationDuration,
    pauseBetweenAnimations,
    words.length,
  ]);

  // useEffect untuk update posisi focus
  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    if (!wordRefs.current[currentIndex] || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index) => {
    setIsHovered(true);
    clearInterval(animationInterval.current); // Hentikan animasi otomatis
    setCurrentIndex(index); // Langsung update ke kata yang di-hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!manualMode) {
      animationInterval.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);
    }
  };

  return (
    <div
      className="relative flex gap-4 justify-center items-center flex-wrap"
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="relative text-[1.4rem] font-black cursor-pointer"
            style={{
              color: textColor, // Menggunakan warna teks dari properti
              filter: `blur(${isActive ? 0 : blurAmount}px)`,
              "--border-color": borderColor,
              "--glow-color": glowColor,
              transition: `filter ${animationDuration}s ease`, // Transisi hanya untuk filter
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}
      {/* Kotak fokus (motion.div) */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0, // Kontrol opasitas
        }}
        transition={{
          duration: animationDuration,
        }}
        style={{
          "--border-color": borderColor,
          "--glow-color": glowColor,
        }}
      >
        {/* ... (kode untuk sudut-sudut kotak fokus) ... */}
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
      </motion.div>
    </div>
  );
};

TrueFocus.propTypes = {
  sentence: PropTypes.string,
  manualMode: PropTypes.bool,
  blurAmount: PropTypes.number,
  borderColor: PropTypes.string,
  glowColor: PropTypes.string,
  animationDuration: PropTypes.number,
  pauseBetweenAnimations: PropTypes.number,
  textColor: PropTypes.string, // PropTypes untuk textColor
};

export default TrueFocus;
