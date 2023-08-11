import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/productSlice";

const CardFeature = ({ image, category, price, name, onClick, _id }) => {
  const dispatch = useDispatch();

  const handleAddProductToCart = () => {
    dispatch(
      addCartItem({
        _id: _id,
        name: name,
        category: category,
        price: price,
        image: image,
      })
    );
  };

  return (
    <div className="" onClick={onClick}>
      {name ? (
        <>
          <div className="h-36 w-36 px-2 bg-white p-3 rounded-3xl cursor-pointer shadow-lg">
            <img src={image} alt="noImg" className="h-full w-full" />
          </div>
          <h3 className="font-medium text-slate-600 text-center capitalize py-2">
            {name}
          </h3>

          <button
            className="bg-lime-300 w-full text-slate-600 min-h-[30px] hover:bg-lime-500 font-semibold rounded-lg"
            onClick={handleAddProductToCart}
          >
            Cart
          </button>
        </>
      ) : (
        <div className="flex items-center h-36 w-36 px-2 bg-white p-3 rounded-3xl shadow-lg justify-center min-h-[100px]">
          <BiDotsHorizontalRounded />
        </div>
      )}
    </div>
  );
};

export default CardFeature;
