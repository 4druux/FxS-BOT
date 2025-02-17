import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Data items
const itemsData = [
  {
    id: 1,
    image: assets.logo_1,
    link: "/detail/item-1",
  },
  {
    id: 2,
    image: assets.logo_1,
    link: "/detail/item-2",
  },
  {
    id: 3,
    image: assets.logo_1,
    link: "/detail/item-3",
  },
  {
    id: 4,
    image: assets.logo_1,
    link: "/detail/item-4",
  },
  {
    id: 5,
    image: assets.logo_1,
    link: "/detail/item-5",
  },
];

const InfiniteScroll = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const overlayRefs = useRef([]);

  useEffect(() => {
    let scrollTween;

    const updateScroll = () => {
      if (scrollTween) {
        scrollTween.kill();
      }

      // Konfigurasi scroll yang sangat smooth dan lambat
      scrollTween = gsap.to(sectionRef.current, {
        x: () => `-${sectionRef.current.scrollWidth - window.innerWidth}px`,
        ease: "power0.out", // Menggunakan easing yang lebih linear
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${sectionRef.current.scrollWidth * 2}`, // Memperpanjang area scroll
          pin: true,
          anticipatePin: 1,
          scrub: 4, // Nilai yang lebih tinggi untuk scroll yang lebih lambat (1-10)
          snap: {
            snapTo: 1 / (itemsData.length - 1),
            duration: { min: 1, max: 2 }, // Durasi snap yang lebih lama
            ease: "power1.inOut",
            delay: 0.1,
          },
          onUpdate: (self) => {
            // Efek parallax yang lebih halus
            const progress = self.progress;
            gsap.to(sectionRef.current.children, {
              scale: 1 + progress * 0.03, // Efek scale yang lebih subtle
              // rotation: progress * 6, // Rotasi sangat halus
              duration: 2, // Durasi efek yang lebih lama
              ease: "power1.out",
            });

            // Tambahan efek opacity untuk setiap card
            Array.from(sectionRef.current.children).forEach((child, index) => {
              const childProgress = Math.abs(
                progress * itemsData.length - index
              );
              gsap.to(child, {
                opacity: 1 - childProgress * 0.2,
                duration: 1.5,
                ease: "power1.out",
              });
            });
          },
        },
      });

      // Smooth vertical scroll dengan efek yang lebih lambat
      const smoothVerticalScroll = () => {
        const currentScroll = window.pageYOffset;
        const delta = currentScroll - (window.lastScroll || 0);
        window.lastScroll = currentScroll;

        if (Math.abs(delta) > 0) {
          gsap.to(sectionRef.current, {
            y: delta * 0.3, // Mengurangi amplitudo pergerakan
            duration: 2, // Durasi yang lebih lama
            ease: "power2.out",
            onComplete: () => {
              gsap.to(sectionRef.current, {
                y: 0,
                duration: 1.5,
                ease: "power2.inOut",
              });
            },
          });
        }
      };

      window.addEventListener("scroll", smoothVerticalScroll);
    };

    updateScroll();

    // Debounced resize handler dengan delay lebih lama
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateScroll, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollTween) scrollTween.kill();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", window.smoothVerticalScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    gsap.to(overlayRefs.current[index], {
      y: "0%",
      duration: 0.7,
      ease: "expo.out",
      opacity: 1,
    });
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    gsap.to(overlayRefs.current[index], {
      y: "100%",
      duration: 0.7,
      ease: "expo.inOut",
      opacity: 0.8,
    });
  };

  return (
    <section
      className="relative h-screen overflow-hidden bg-[#121212]"
      ref={triggerRef}
    >
      <div
        ref={sectionRef}
        className="flex items-center relative h-screen space-x-8 mt-10"
        style={{
          width: "140vw",
          willChange: "transform",
          transform: "translateZ(0)",
          transition: "transform 0.5s ease-out", // Tambahan transisi default
        }}
      >
        {itemsData.map((item, index) => (
          <div
            key={item.id}
            className="relative w-[100%] border-2 border-neutral-800 rounded-3xl flex items-center justify-center overflow-hidden mx-auto transform-gpu"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            style={{
              backfaceVisibility: "hidden",
              perspective: 1000,
              transition: "all 0.8s ease-out", // Transisi yang lebih lama untuk setiap card
            }}
          >
            <img
              src={item.image}
              className="w-full h-full object-cover brightness-90"
              loading="lazy"
              style={{
                transition: "transform 1s ease-out", // Transisi lambat untuk gambar
              }}
            />
            <div
              ref={(el) => (overlayRefs.current[index] = el)}
              className="absolute inset-0 bg-black/50 flex items-center justify-center overflow-hidden"
              style={{
                transform: "translateY(100%)",
                opacity: 0.8,
                transition: "all 1s ease-out", // Transisi overlay yang lebih lama
              }}
            >
              <Link
                to={item.link}
                className="relative overflow-hidden px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition-all duration-500 
                bg-gradient-to-r from-gray-200 to-gray-50 text-black hover:bg-gradient-to-r hover:from-black
                hover:to-gray-800 hover:text-white hover:border-gray-700 transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">See Details</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfiniteScroll;
