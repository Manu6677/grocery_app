import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import emptyCart from "../assest/emptyCart.gif";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const items = useSelector((store) => store.products.cartItem);
  // console.log(items);

  const userCred = useSelector((store) => store.user.email);

  const totalQty = items.reduce(
    (acc, currVal) => acc + parseInt(currVal.qty),
    0
  );
  const totalPrice = items.reduce(
    (acc, currVal) => acc + parseInt(currVal.total),
    0
  );

  const handlePayment = async () => {
    if (userCred) {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLC_KEY
      );
      // console.log("handlepayment");
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(items),
        }
      );
      if (data.statusCode === 500) return;
      const res = await data.json();
      // console.log(res);
      toast("Redirect to patment Gateway...");
      stripePromise.redirectToCheckout({ sessionId: res });
    } else {
      toast("Please login first");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <div className="p-3 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-center text-slate-500">
        Cart Items
      </h2>
      {items[0] ? (
        <div className="my-2 flex gap-3">
          {/*  display cart item*/}
          <div className="w-full max-w-3xl">
            {items[0] &&
              items.map((it) => {
                return (
                  <CartProduct
                    key={it._id}
                    id={it._id}
                    image={it.image}
                    name={it.name}
                    category={it.category}
                    price={it.price}
                    qty={it.qty}
                    total={it.total}
                  />
                );
              })}
          </div>
          {/* Total Cart Items */}
          <div className="max-w-md w-full ml-auto">
            <div className="space-y-2">
              <h2 className="text-slate-500 bg-fuchsia-300 p-3 rounded-lg m-auto font-semibold text-xl">
                Summary
              </h2>
              <div className="flex w-full">
                <p>Total Qty: </p>
                <p className="ml-auto text-slate-700 font-semibold w-32 pr-10">
                  {totalQty}
                </p>
              </div>
              <div className="flex w-full">
                <p>Total Price:</p>
                <p className="ml-auto text-slate-700 font-semibold w-32 pr-10">
                  <span className="text-green-600 font-semibold text-lg">
                    $
                  </span>
                  {totalPrice}
                </p>
              </div>
              <button
                className="bg-lime-500 hover:bg-green-400 max-w-md w-full p-2 rounded-lg text-white font-semibold text-xl"
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-col items-center justify-center overflow-hidden h-96">
          <img
            src={emptyCart}
            alt="noImg"
            className="h-full w-full object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
