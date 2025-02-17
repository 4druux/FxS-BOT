import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import PropTypes from "prop-types";

export function WorldMapUi({ dots = [], lineColor = "#14b8a6" }) {
  const svgRef = useRef(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(darkMode ? "dark" : "light");
  }, []);

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#FFFFFF40",
    shape: "circle",
    backgroundColor: "#121212",
  });

  const projectPoint = (lat, lng) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/0.5] bg-[#121212] rounded-lg relative font-sans">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(startPoint, endPoint)}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
            />
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {[dot.start, dot.end].map((point, idx) => {
              const { x, y } = projectPoint(point.lat, point.lng);
              return (
                <g key={`${idx}-${i}`}>
                  <circle cx={x} cy={y} r="4" fill={lineColor} />
                  <circle cx={x} cy={y} r="4" fill={lineColor} opacity="0.5">
                    <animate
                      attributeName="r"
                      from="4"
                      to="40"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}

WorldMapUi.propTypes = {
  dots: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      end: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  lineColor: PropTypes.string,
};

WorldMapUi.defaultProps = {
  dots: [],
  lineColor: "#14b8a6",
};
