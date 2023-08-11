import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { imagetoBase64 } from "../utilities/imagetoBase64";
import { toast } from "react-toastify";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await imagetoBase64(e.target.files[0]);
    // console.log(data);.
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { name, category, image, price, description } = data;
    if (name && category && image && price && description) {
      const productData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/newproduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let dataRes = await productData.json();
      // console.log(dataRes);
      toast("New product uploaded");
      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast("Please fill all fields");
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md gap-y-2 shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          value={data.category}
          onChange={handleChange}
        >
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
          <option value={"chicken"}>Chicken</option>
          <option value={"noodles"}>Noodles</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data?.image ? (
              <img
                src={data?.image}
                alt="noImg"
                className="h-full object-contain"
              />
            ) : (
              <span>{<BsCloudUpload className="text-4xl" />}</span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          value={data.price}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleChange}
          value={data.description}
        ></textarea>

        <button className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-1 text-lg rounded-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
