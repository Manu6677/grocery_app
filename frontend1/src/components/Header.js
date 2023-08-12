import React, { useState } from "react";
import newlogo from "../assest/newlogo.jpg";
import { FaUserAlt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  // console.log(userData, "header userData");
  // console.log(process.env.REACT_APP_ADMIN_EMAIL);
  // console.log(userData.email);

  const handleLogout = () => {
    dispatch(logoutRedux(""));
    naviagte("/login");
  };

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const cartNumber = useSelector((store) => store.products.cartItem);

  // console.log("value of showusermenu", showMenu);
  return (
    <header className="fixed w-full h-20 shadow-lg p-2 z-50 bg-gray-900 md:px-1 md:py-2">
      {/*desktop*/}

      <div className="flex items-center h-full justify-between">
        <Link to={"/"}>
          <div className="h-full rounded-lg p-1">
            <img
              src={newlogo}
              alt="not loaded"
              className="h-16 w-full object-contain rounded-lg"
            />
          </div>
        </Link>

        <div className="flex gap-4 items-center pr-3 md:gap-7">
          <nav className="md:flex gap-4 text-white md:gap-6 text-base md:text-lg hidden">
            <Link to="/">Home</Link>
            <Link to="/menu/64bcef5f14dae50b7ac84dd3">Menu</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="text-2xl text-white text-slate-600 relative">
            <Link to={"/cart"}>
              <IoMdCart />
            </Link>
            <div className="absolute -top-1 m-0 p-0 -right-1 text-white bg-red-500 rounded-full w-4 h-4 text-xs text-center">
              {cartNumber.length}
            </div>
          </div>

          <div
            className="text-xl text-slate-600 w-11 h-11 text-white flex items-center"
            onClick={handleShowMenu}
          >
            {userData.image ? (
              <img
                src={userData.image}
                alt="noImg"
                className="h-full w-full rounded-full drop-shadow-md object-cover"
              />
            ) : (
              <FaUserAlt />
            )}
            {showMenu && (
              <div className="absolute bg-white cursor-pointer shadow drop-shadow-md py-2 px-2 right-2 mt-20 rounded-lg flex flex-col">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}

                {userData.firstName ? (
                  <p
                    className="whitespace-nowrap cursor-pointer px-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"/login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <div>
                  <nav className="flex flex-col text-white text-base md:text-lg  whitespace-nowrap md:hidden cursor-pointer px-2">
                    <Link to="/">Home</Link>
                    <Link to="/menu/64bcef5f14dae50b7ac84dd3">Menu</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*mobile*/}
      </div>
    </header>
  );
};

export default Header;
