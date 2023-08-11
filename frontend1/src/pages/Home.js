import React from "react";
import bikedelivery from "../assest/bikedelivery.png";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllProduct from "../components/AllProduct";

const Home = () => {
  const navigate = useNavigate();

  const productData = useSelector((store) => store.products.productList);
  // console.log(productData);
  const homeProductCartList = productData.slice(0, 4);

  const loadingArray = new Array(4).fill(null);

  return (
    <div className="p-1 overflow-auto md:p-4">
      <div className="flex">
        <div className="md:w-1/2">
          <div className="font-bold py-3 md:text-5xl text:2xl">
            <h2 className="text-lime-400 flex items-center">
              Super fast...
              <span className="h-12 w-15">
                <img
                  src={bikedelivery}
                  alt="noImg"
                  className="h-full w-full shadow-2xl"
                />
              </span>
            </h2>
            <div className="text-green-500 animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-white pr-5 font-bold py-2">
              "Fresh delivery at your place 🍃"
            </div>
          </div>
          <p className="py-3 max-w-xl text-base">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy.
          </p>

          <button className="text-white font-medium bg-lime-500 backdrop-blur-lg shadow-2xl px-2 py-2 rounded-lg transition duration-700 ease-in-out">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-row items-center justify-center flex-wrap gap-4 cursor-pointer">
          {!homeProductCartList[0]
            ? loadingArray.map((ele, index) => {
                return <HomeCard key={index} />;
              })
            : homeProductCartList.map((item) => {
                return (
                  <HomeCard
                    key={item._id}
                    image={item.image}
                    category={item.category}
                    price={item.price}
                    name={item.name}
                    description={item.description}
                    onClick={() => navigate(`/menu/${item._id}`)}
                  />
                );
              })}
        </div>
      </div>
      <AllProduct heading="Fresh Vegetables and fruits" />
    </div>
  );
};

export default Home;
