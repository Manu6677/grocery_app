import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import CardFeature from "../components/CardFeature";
import { useNavigate } from "react-router-dom";
import FilterProduct from "../components/FilterProduct";

const AllProduct = ({ heading }) => {
  const navigate = useNavigate();

  const productData = useSelector((store) => store.products.productList);
  // console.log(productData);

  const homeProductCartListVegetablesFruit = productData.filter(
    (el) => el.category === "vegetable" || el.category === "fruits",
    []
  );

  const loadingArrayFeature = new Array(9).fill(null);
  const categoryList = [...new Set(productData.map((item) => item.category))];
  // console.log(categoryList);

  const slideProduct = useRef();
  const nextSlide = () => {
    slideProduct.current.scrollLeft += 200;
  };
  const backSlide = () => {
    slideProduct.current.scrollLeft -= 200;
  };

  const [filterby, setFilterBy] = useState("");
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    setFilterData(productData);
  }, [productData]);

  const handleFilterCategory = (category) => {
    setFilterBy(category);
    const filterRes = productData.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
    // console.log(...filterRes);
    // console.log(filterRes);
    setFilterData(() => {
      return [...filterRes];
    });
  };
  // console.log(categoryList, "categoryList");
  //   console.log(homeProductCartListVegetablesFruit, "filter");

  return (
    <div>
      <div className="md:py-4 mt-5">
        <div className="">
          <p className="font-bold text-lime-500 text-2xl text-center">
            {heading}
          </p>
          <div className="flex items-end justify-end p-3 text-2xl gap-3">
            <button className="bg-slate-400 rounded-lg" onClick={backSlide}>
              <HiChevronLeft />
            </button>
            <button className="bg-slate-400 rounded-lg" onClick={nextSlide}>
              <HiChevronRight />
            </button>
          </div>
        </div>
        <div
          className="flex flex-row gap-5 py-1 items-center overflow-scroll scroll-smooth transition-all scrollbar-none"
          ref={slideProduct}
        >
          {!homeProductCartListVegetablesFruit[0]
            ? loadingArrayFeature.map((ele, index) => {
                return <CardFeature key={index} />;
              })
            : homeProductCartListVegetablesFruit.map((item) => {
                return (
                  <CardFeature
                    key={item._id}
                    category={item.category}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    _id={item._id}
                    onClick={() => {
                      navigate(`/menu/${item._id}`);
                      window.scrollTo({ top: "0", behavior: "smooth" });
                    }}
                  />
                );
              })}
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-5 mt-3 text-lime-500 text-2xl text-center">
          Your Product
        </h2>
        <div className="p-3 flex gap-5 items-center md:justify-center overflow-scroll scrollbar-none capitalize">
          {categoryList[0] &&
            categoryList.map((item) => {
              return (
                <FilterProduct
                  category={item}
                  key={item}
                  isActive={item.toLowerCase() === filterby.toLowerCase()}
                  onClick={() => handleFilterCategory(item)}
                />
              );
            })}
        </div>
      </div>

      <div className="flex gap-9 items-center flex-wrap justify-center py-5">
        {filterData.map((item) => {
          return (
            <CardFeature
              key={item._id}
              category={item.category}
              name={item.name}
              price={item.price}
              image={item.image}
              _id={item._id}
              onClick={() => {
                navigate(`/menu/${item._id}`);
                window.scrollTo({ top: "0", behavior: "smooth" });
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllProduct;
