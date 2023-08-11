import React from "react";

const HomeCard = ({ image, category, price, name, onClick }) => {
  return (
    <div onClick={onClick}>
      {name ? (
        <>
          <div className="h-60 w-60 p-7 rounded-3xl bg-white shadow-lg">
            <img src={image} alt="noImg" className="h-full w-full" />
            <h3 className="font-medium text-slate-600 text-center capitalize">
              {name}
            </h3>
          </div>
        </>
      ) : (
        <div className="h-60 w-60 p-7 rounded-3xl bg-white shadow-lg"></div>
      )}
    </div>
  );
};

export default HomeCard;
