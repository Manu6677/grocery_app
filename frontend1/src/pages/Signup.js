import React, { useState } from "react";
import iconimg from "../assest/icons8-user-100.png";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { imagetoBase64 } from "../utilities/imagetoBase64";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleConfirmPassword = () => {
    setConfirmShowPassword((prev) => !prev);
  };

  // console.log(process.env.REACT_APP_SERVER_DOMAIN);

  const handleSubmit = async (e) => {
    // console.log("inside submit");
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = userData;

    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        // console.log(userData, "clg");
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        const dataRes = await fetchData.json();
        // console.log(dataRes);

        if (dataRes.alert) {
          toast("Successfully Created");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          toast("Not Valid email");
        }
      } else if (password !== confirmPassword) {
        toast("password does not match"); // after done by backend to send userData
      }
    } else {
      toast("Please fill all fields"); // after done by backend to send userData
    }
  };

  const profileImage = async (e) => {
    const data = await imagetoBase64(e.target.files[0]);
    // console.log(data);

    setUserData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full backdrop-blur-3xl">
      <div className="py-1 md:py-2 w-full m-auto max-w-sm flex flex-col h-full overflow-hidden items-center justify-center">
        <div className="w-24 h-24 overflow-hidden object-contain rounded-full drop-shadow-md shadow-md relative">
          <img
            src={userData.image ? userData.image : iconimg}
            alt="no-img"
            className="w-full h-full"
          />

          <label
            htmlFor="profileImage"
            className="absolute -bottom-0 text-center h-1/3 p-2 w-full bg-slate-400 opacity-75 flex items-center text-sm font-semibold rounded-full cursor-pointer"
          >
            <div className="ml-5">
              <p className="text-gray-950">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={profileImage}
            />
          </label>
        </div>

        <div>
          <form className="w-full py-3" onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
            />

            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
            />

            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
            />

            <label htmlFor="password">Password: </label>
            <div className="flex bg-slate-200 rounded -py-1 items-center mb-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
              />

              {showPassword ? (
                <span
                  className="text-2xl text-slate-700 p-2 cursor-pointer"
                  onClick={handlePassword}
                >
                  <BiHide />
                </span>
              ) : (
                <span
                  className="text-2xl text-slate-700 p-2 cursor-pointer"
                  onClick={handlePassword}
                >
                  <BiShow />
                </span>
              )}
            </div>

            <label htmlFor="confirmPassword">Confirm Password: </label>
            <div className="flex bg-slate-200 rounded items-center mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
              />

              {showConfirmPassword ? (
                <span
                  className="text-2xl text-slate-700 p-2 cursor-pointer"
                  onClick={handleConfirmPassword}
                >
                  <BiHide />
                </span>
              ) : (
                <span
                  className="text-2xl text-slate-700 p-2 cursor-pointer"
                  onClick={handleConfirmPassword}
                >
                  <BiShow />
                </span>
              )}
            </div>

            <button className="flex items-center justify-center text-white w-full rounded py-2  m-2 my-7 cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
              Signup
            </button>
          </form>

          <p className="text-white font-thin text-lg">
            Already have an account ?
            <Link
              to={"/login"}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-2 text-lg rounded-full"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
