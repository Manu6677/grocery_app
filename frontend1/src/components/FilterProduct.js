import React from "react";
import { PiForkKnifeLight } from "react-icons/pi";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div
        className={`bg-yellow-300 hover:bg-yellow-400 rounded-full ${
          isActive ? "bg-yellow-600 text-white" : ""
        }`}
      >
        <PiForkKnifeLight className="text-6xl p-3" />
      </div>
      <p className="text-center font-normal">{category}</p>
    </div>
  );
};

export default FilterProduct;
