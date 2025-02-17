// src/pages/DetailItem.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const DetailItem = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    // Simulasi fetch data
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ganti dengan actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setItemData({
          title: `Item ${id}`,
          description: `This is the detailed description for ${id}`,
          image: "path_to_image",
        });
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-20 px-4">
      <div className="max-w-4xl mx-auto mt-10">
        <Link
          to="/"
          className="inline-block mb-6 text-sm text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6">{itemData?.title}</h1>

        <div className="bg-neutral-800 rounded-lg p-6">
          <img
            src={itemData?.image}
            alt={itemData?.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-lg">{itemData?.description}</p>
        </div>
        <div className="bg-neutral-800 my-10 rounded-lg p-6">
          <img
            src={itemData?.image}
            alt={itemData?.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-lg">{itemData?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
