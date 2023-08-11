import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productList: [],
    cartItem: [],
  },
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = action.payload;
    },
    addCartItem: (state, action) => {
      const total = action.payload.price;
      const checkItemInCart = state.cartItem.some(
        (item) => item._id === action.payload._id
      );

      if (checkItemInCart) {
        toast("Item already in Cart");
      } else {
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
        toast("Item added in Cart !!");
      }
    },
    deleteCartItem: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );
      state.cartItem.splice(index, 1);

      toast("Item Deleted");
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );
      let qtyOfItem = state.cartItem[index].qty;
      state.cartItem[index].qty = ++qtyOfItem;

      // let total = state.cartItem[index].total;
      let price = state.cartItem[index].price;
      // console.log("redux total", total);
      state.cartItem[index].total = price * qtyOfItem;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex(
        (item) => item._id === action.payload
      );
      let qtyOfItem = state.cartItem[index].qty;

      if (qtyOfItem > 1) {
        state.cartItem[index].qty = --qtyOfItem;
        // let total = state.cartItem[index].total;
        let price = state.cartItem[index].price;
        // console.log("redux total", total);
        state.cartItem[index].total = price * qtyOfItem;
      } else {
        state.cartItem.splice(index, 1);
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;
export default productSlice.reducer;
