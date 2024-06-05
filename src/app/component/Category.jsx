import React from "react";
import CategoryButton from "./CategoryButton";

const Category = ({ onCategorySelect }) => {
  const categories = [
    "ALL",
    "MUSIC",
    "GAMING",
    "COMEDY",
    "ENTERTAINMENT",
    "SPORTS",
    "FITNESS",
    "LIFESTYLE",
    "TECHNOLOGY",
    "OTHER",
  ];
  return (
    <div className="flex flex-wrap justify-center gap-2 p-4 mb-12  shadow-md rounded-lg ">
      {categories.map((title, index) => (
        <CategoryButton
          key={index}
          title={title}
          onClick={() => onCategorySelect(title === "ALL" ? "" : title)}
        />
      ))}
    </div>
  );
};

export default Category;
