import { useState, useEffect } from "react";
import TextCountUp from "./button/TextCountUp.jsx";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import ShinyText from "./button/ShinyText.jsx";

const CountUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full bg-[#121212] py-8">
      {/* Tambahkan border dan gradient mask */}
      <div
        className="relative overflow-hidden border-t-4 border-b-4 border-neutral-900 py-12
        [mask-image:linear-gradient(to_right,rgba(0,0,0,0)_5%,rgba(0,0,0,1)_10%,rgba(0,0,0,1)_95%,rgba(0,0,0,0)_100%)]"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ShinyText
                text="Product Quality"
                className="text-2xl font-bold text-neutral-400/40 mb-6"
                disabled={false}
                speed={3}
              />
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-3xl font-bold flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-yellow-500 mr-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <div className="flex items-baseline space-x-1">
                    <TextCountUp
                      from={0}
                      to={5}
                      duration={3}
                      decimals={1}
                      separator="."
                      className="text-yellow-500"
                      startWhen={isVisible}
                    />
                    <span className="text-neutral-300 text-3xl md:text-3xl font-bold">
                      /
                    </span>
                    <span className="text-neutral-300 text-3xl md:text-3xl font-bold">
                      5
                    </span>
                  </div>
                </div>

                <p className="mt-8 text-sm text-neutral-500 font-medium">
                  Based on 25k+ reviews
                </p>
              </div>
            </motion.div>

            <motion.div
              className="text-center p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ShinyText
                text="Product Sold"
                className="text-2xl font-bold text-neutral-400/40 mb-6"
                disabled={false}
                speed={3}
              />
              <div className="relative">
                <div className="text-3xl md:text-3xl font-bold text-neutral-500 flex justify-center items-center">
                  <TextCountUp
                    from={0}
                    to={50000}
                    duration={3}
                    separator=","
                    className="mr-2 bg-gradient-to-r from-neutral-200 to-neutral-400 text-transparent bg-clip-text"
                    startWhen={isVisible}
                  />
                  <Plus className="w-6 h-6 text-neutral-400" strokeWidth={4} />
                </div>
              </div>
              <p className="mt-8 text-sm text-neutral-500 font-medium">
                Worldwide Deliveries
              </p>
            </motion.div>

            {/* Total Reviews Section - Updated */}
            <motion.div
              className="text-center p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ShinyText
                text="Total Reviews"
                className="text-2xl font-bold text-neutral-400/40 mb-6"
                disabled={false}
                speed={3}
              />
              <div className="relative">
                <div className="text-3xl md:text-3xl font-bold text-neutral-500 flex justify-center items-center">
                  <TextCountUp
                    from={0}
                    to={25000}
                    duration={3}
                    separator=","
                    className="mr-2 bg-gradient-to-r from-neutral-200 to-neutral-400 text-transparent bg-clip-text"
                    startWhen={isVisible}
                  />
                  <Plus className="w-6 h-6 text-neutral-400" strokeWidth={4} />
                </div>
              </div>
              <p className="mt-8 text-sm text-neutral-500 font-medium">
                Verified Feedback
              </p>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-900/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default CountUp;
