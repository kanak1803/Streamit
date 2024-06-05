import React from "react";
import { motion } from "framer-motion";

const CategoryButton = ({ title, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.10, backgroundColor: "#4a5568" }} // Add a slight scale and background color change on hover
      whileTap={{ scale: 0.95 }} // Add a slight shrink on tap/click
      type="button"
      onClick={onClick}
      className="rounded-lg inline-block px-2 py-1 bg-[#313131] font-medium text-lg cursor-pointer transition"
    >
      {title}
    </motion.button>
  );
};

export default CategoryButton;
