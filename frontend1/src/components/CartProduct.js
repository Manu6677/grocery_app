import React from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  deleteCartItem,
  increaseQty,
} from "../redux/productSlice";

const CartProduct = ({ id, image, name, category, price, qty, total }) => {
  const productData = useSelector((store) => store.products.productList);
  // console.log("product data", productData);
  // console.log(id);
  const displayProduct = productData.filter((item) => item._id === id)[0];
  // console.log(displayProduct, "displayProduct");

  const dispatch = useDispatch();
  // const handleItemInCart = () => {
  //   dispatch(addCartItem(displayProduct));
  // };

  const handleDeleteItem = () => {
    // console.log();
    dispatch(deleteCartItem(id));
  };

  const handleUpdateMoreQty = () => {
    dispatch(increaseQty(id));
  };

  const handleUpdateLessQty = () => {
    dispatch(decreaseQty(id));
  };

  return (
    <div className="bg-slate-200 flex space-x-5 rounded-2xl p-2 border border-slate-300">
      <div className="bg-white rounded-xl overflow-hidden">
        <img src={image} alt="noImg" className="w-36 h-36 object-contain p-2" />
      </div>
      <ol className="flex flex-col gap-1 w-full capitalize">
        <div className="flex">
          <li className="font-semibold w-full text-slate-500 text-3xl capitalize">
            {name}
          </li>
          <div
            className="text-red-500 text-xl hover:text-slate-700 cursor-pointer flex justify-end"
            onClick={handleDeleteItem}
          >
            <MdDelete />
          </div>
        </div>
        <li className="text-slate-500 font-medium">{category}</li>
        <li className="space-x-1">
          <span className="text-green-600 font-semibold text-lg">$</span>
          <span className="font-semibold">{price}</span>
        </li>

        <div className="flex relative">
          <li className="flex space-x-3">
            <button
              className="bg-lime-400 rounded-lg text-white font-medium p-2 hover:bg-lime-500 cursor-pointer"
              onClick={handleUpdateLessQty}
            >
              <HiMinus />
            </button>
            <p className="font-semibold justify-center">{qty}</p>
            <button
              className="bg-lime-400 rounded-lg text-white font-medium p-2 hover:bg-lime-500 cursor-pointer"
              onClick={handleUpdateMoreQty}
            >
              <HiPlus />
            </button>

            <div className="flex justify-end px-4 space-x-2 absolute p w-full text-slate-700 font-medium">
              <p>Total:</p>
              <p>
                <span className="text-green-600">$</span>
                {total}
              </p>
            </div>
          </li>
        </div>
      </ol>
    </div>
  );
};

export default CartProduct;
