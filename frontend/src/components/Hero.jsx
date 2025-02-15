import SplitText from "./SplitText";
import ShapeBlur from "./ShapeBlur";
import TrueFocus from "./TrueFocus";

const Hero = () => {
  return (
    <div className="sm:px-[6vw] md:px-[9vw] lg:px-[10vw] px-4 py-6">
      <div
        className="mb-4"
        style={{ position: "relative", height: "380px", overflow: "hidden" }}
      >
        <ShapeBlur
          variation={0}
          pixelRatioProp={window.devicePixelRatio || 1}
          shapeSize={1.7}
          roundness={0.5}
          borderSize={0.05}
          circleSize={0.25}
          circleEdge={1.0}
        />
      </div>
      <div className="mb-4" style={{ position: "relative", height: "150px" }}>
        <SplitText
          text="Welcome to FxS Store"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#b5b5b5a4"
          strokeColor="#ff0000"
          minFontSize={24}
          className=""
        />
      </div>
      <TrueFocus
        sentence="The highes quality tools"
        manualMode={true}
        blurAmount={5}
        borderColor="teal"
        animationDuration={0.6}
        pauseBetweenAnimations={0}
      />
    </div>
  );
};

export default Hero;
