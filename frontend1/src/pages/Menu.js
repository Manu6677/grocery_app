import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCartItem } from "../redux/productSlice";

const Menu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id, "useParams");

  const productData = useSelector((store) => store.products.productList);
  // console.log(productData);

  const displayProduct = productData.filter((item) => item._id === id)[0];
  // console.log(displayProduct, "displayProduct");

  const dispatch = useDispatch();
  const handleItemInCart = () => {
    dispatch(addCartItem(displayProduct));
  };

  const handleBuy = () => {
    dispatch(addCartItem(displayProduct));
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  return (
    <div className="">
      <div className="md:flex md:mt-5 max-w-lg m-auto">
        <div className="max-h-72 max-w-[300px] rounded-xl overflow-hidden ml-7 m-auto ease-in-out flex items-center justify-between cursor-pointer">
          <img
            src={displayProduct?.image}
            alt="noImg"
            className="w-full h-full object-contain md:hover:scale-125 transition-all delay-75"
          />
        </div>

        <ol className="flex flex-col mt-10 ml-5 space-y-1 capitalize">
          <li className="font-semibold text-slate-500 text-3xl capitalize">
            {displayProduct?.name}
          </li>
          <li className="text-slate-500 font-medium">
            {displayProduct?.category}
          </li>
          <li className="space-x-1">
            <span className="text-green-600 font-semibold text-lg">$</span>
            <span className="font-semibold">{displayProduct?.price}</span>
          </li>

          <li className="space-x-3">
            <button
              className="bg-lime-500 rounded-lg text-white font-medium p-2"
              onClick={() => handleBuy()}
            >
              Buy
            </button>
            <button
              className="bg-lime-500 rounded-lg text-white font-medium p-2"
              onClick={() => handleItemInCart()}
            >
              Add to Cart
            </button>
          </li>

          <li className="px-1 flex flex-col">
            <span className="text-slate-500 font-medium">Description:</span>
            <span className="text-base">{displayProduct?.description}</span>
          </li>
        </ol>
      </div>

      <AllProduct heading="Related Product" />
    </div>
  );
};

export default Menu;
