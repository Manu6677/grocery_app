import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const store = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/products`
      );
      const resData = await res.json();
      dispatch(setDataProduct(resData));
      // console.log(resData, "resData");
    })();
  }, []);

  // console.log("store from app", store);
  return (
    <>
      <ToastContainer />
      <div>
        <Header />
        <main className="pt-20 bg-slate-100 h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
