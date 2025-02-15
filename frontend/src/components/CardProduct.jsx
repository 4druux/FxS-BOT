import SpotlightCard from "./SpotlightCard";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import ShinyText from "./ShinyText";
import { Sparkle } from "lucide-react";

const CardProduct = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "Description 1",
      imageUrl: "/placeholder-image.jpg",
      price: "$19.99",
    },
    {
      id: 2,
      title: "Product 2",
      description: "Description 2",
      imageUrl: "/placeholder-image.jpg",
      price: "$24.99",
    },
    {
      id: 3,
      title: "Product 3",
      description: "Description 3",
      imageUrl: "/placeholder-image.jpg",
      price: "$29.99",
    },
    {
      id: 4,
      title: "Product 4",
      description: "Description 4",
      imageUrl: "/placeholder-image.jpg",
      price: "$34.99",
    },
    {
      id: 5,
      title: "Product 5",
      description: "Description 5",
      imageUrl: "/placeholder-image.jpg",
      price: "$39.99",
    },
    {
      id: 6,
      title: "Product 6",
      description: "Description 6",
      imageUrl: "/placeholder-image.jpg",
      price: "$44.99",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.04 },
  };

  return (
    <div className="sm:px-[6vw] md:px-[9vw] lg:px-[10vw] px-4 py-6">
      <div className="flex items-center space-x-2 justify-center">
        <Sparkle className="text-teal-500/50" size={19} />
        <ShinyText
          text="our product"
          disabled={false}
          speed={4}
          className="uppercase manrope-regular font-bold text-2xl text-teal-500/50 my-8 transition-all duration-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.01 }}
          >
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-400">{product.description}</p>
                <p className="text-gray-300 mt-2">{product.price}</p>

                {/* Tombol Buy Now */}
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  className={`
                    relative mt-4 px-4 py-2 w-full
                    border border-teal-500/30
                    rounded-full
                    overflow-hidden
                    transition-all
                    duration-300
                    hover:border-teal-500/50
                    bg-teal-900/50
                    backdrop-blur-sm
                    flex items-center justify-center
                  `}
                >
                  <div
                    className={`text-teal-200 flex items-center bg-clip-text animate-shine`}
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, rgba(255, 255, 255, 0) 30%, rgba(34, 197, 194, 0.8) 50%, rgba(255, 255, 255, 0) 70%)", // Perbaiki gradient
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                    }}
                  >
                    <FaShoppingCart className="mr-2" />
                    Buy Now
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardProduct;
