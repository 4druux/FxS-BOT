import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../assets/assets";
gsap.registerPlugin(ScrollTrigger);
// Sample data
const data = [
  {
    title: "Title One",
    description: "Description for section one",
    imgSrc: assets.logo,
  },
  {
    title: "Title Two",
    description: "Description for section Two",
    imgSrc: assets.logo,
  },
  {
    title: "Title Three",
    description: "Description for section Three",
    imgSrc: assets.logo,
  },
  {
    title: "Title Four",
    description: "Description for section Four",
    imgSrc: assets.logo,
  },
  {
    title: "Title Five",
    description: "Description for section Five",
    imgSrc: assets.logo,
  },
  // Add more items as needed
];
const Scroll = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const lenis = document.querySelector(".lenis");
    let timeline;
    let isTransitioning = false;
    let lastDirection = null;

    const smoothTransition = (action, direction) => {
      if (isTransitioning) return;
      if (lastDirection === direction) return;

      isTransitioning = true;
      lastDirection = direction;

      // Transisi halus untuk Lenis
      if (action === "stop") {
        gsap.to(lenis, {
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            lenis?.stop();
            setTimeout(() => {
              isTransitioning = false;
            }, 300);
          },
        });
      } else {
        gsap.to(lenis, {
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            lenis?.start();
            setTimeout(() => {
              isTransitioning = false;
            }, 300);
          },
        });
      }
    };

    const createAnimation = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${window.innerWidth * (data.length - 1)}`,
          scrub: {
            ease: "power2.inOut",
            smoothing: 0.5,
          },
          anticipatePin: 1,
          markers: {
            startColor: "green",
            endColor: "red",
            fontSize: "18px",
            indent: 20,
          },
          onEnter: () => {
            smoothTransition("stop", "enter");
          },
          onLeave: () => {
            smoothTransition("start", "leave");
          },
          onEnterBack: () => {
            smoothTransition("stop", "enterBack");
          },
          onLeaveBack: () => {
            smoothTransition("start", "leaveBack");
          },
          // Optimasi tambahan
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: (self) => {
            // Menghaluskan transisi berdasarkan progress
            const progress = self.progress;
            if (progress > 0.95 || progress < 0.05) {
              gsap.to(containerRef.current, {
                duration: 0.3,
                ease: "power2.out",
              });
            }
          },
        },
      });

      timeline.to(sliderRef.current, {
        x: () => -(sliderRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        duration: 1,
      });

      return timeline;
    };

    // Create initial animation
    timeline = createAnimation();

    // Debounced resize handler
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const handleResize = debounce(() => {
      if (timeline) {
        timeline.kill();
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      timeline = createAnimation();
      ScrollTrigger.refresh();
    }, 250);

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (timeline) {
        timeline.kill();
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-primary touch-none"
    >
      <div
        ref={sliderRef}
        className="absolute top-0 left-0 flex h-full will-change-transform"
        style={{
          width: `${data.length * 100}vw`,
          touchAction: "none", // Mencegah default touch behavior
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="w-screen h-screen flex items-center justify-center"
          >
            <div className="container mx-auto max-w-7xl px-4">
              <div className="flex flex-col-reverse lg:flex-row gap-8 items-center">
                {/* Text Content */}
                <div className="content-wrapper flex-1 text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    <span className="mr-4">{item.title.split(" ")[0]}</span>
                    <span className="text-blue-500">
                      {item.title.split(" ")[1]}
                    </span>
                  </h2>
                  <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
                    {item.description}
                  </p>
                  <button
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700
                      text-white rounded-full transition-all duration-500
                      transform hover:scale-105 active:scale-95
                      hover:shadow-lg hover:shadow-blue-500/50"
                  >
                    See more
                  </button>
                </div>
                {/* Image */}
                <div className="image-container flex-1 w-full max-w-2xl">
                  <div
                    className="relative aspect-square rounded-2xl overflow-hidden
                      shadow-2xl transform hover:scale-[1.02] transition-all duration-500
                      hover:shadow-blue-500/20"
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Scroll;
