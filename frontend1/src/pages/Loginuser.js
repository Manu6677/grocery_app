import React, { useState } from "react";
import iconimg from "../assest/icons8-user-100.png";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Loginuser = () => {
  const naviagte = useNavigate();
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    // console.log("inside submit");
    e.preventDefault();

    const { email, password } = data;

    // console.log(data, "clg");
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataRes = await fetchData.json();
      // console.log(dataRes.existemail);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        toast("Logined");
        setTimeout(() => {
          naviagte("/");
        });
      } else {
        toast("Email or password not matched");
      }
    } else {
      toast("Please fill all fields"); // after done by backend to send userData
    }
  };
  // console.log(userData);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full backdrop-blur-3xl">
      <div className="py-1 md:py-2 w-full m-auto max-w-sm flex flex-col h-full overflow-hidden items-center justify-center">
        <div className="">
          <div className="flex items-center justify-center">
            <img
              src={iconimg}
              alt="no-img"
              className="rounded-full shadow-lg object-contain p-2 h-24 backdrop-blur-lg border-2 border-gray-300"
            />
          </div>
          <form className="w-full py-3" onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input
              type={"email"}
              id="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className="w-full bg-slate-200 mt-1 mb-2 px-2 py-2 rounded focus-within:outline-blue-300"
            />

            <label htmlFor="password">Password: </label>
            <div className="flex bg-slate-200 rounded -py-1 items-center mb-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full bg-slate-200 mt-1 mb-2 px-2 py-1 rounded focus-within:outline-blue-300"
              />

              {showPassword ? (
                <span
                  className="text-2xl text-slate-700 p-2 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  <BiHide />
                </span>
              ) : (
                <span
                  className="text-2xl text-slate-700 p-2 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  <BiShow />
                </span>
              )}
            </div>

            <button className="flex items-center justify-center w-full text-white rounded-md py-2  m-2 my-7 cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
              Login
            </button>
          </form>

          <p className="text-white font-thin text-lg">
            Do not have an account ?{" "}
            <Link
              to={"/signup"}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-2 text-lg rounded-full"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginuser;
