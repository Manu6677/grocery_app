import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    firstName: "",
    image: "",
    lastName: "",
    password: "",
    _id: "",
  },
  reducers: {
    loginRedux: (state, action) => {
      state.email = action.payload.existemail.email;
      state.firstName = action.payload.existemail.firstName;
      state.image = action.payload.existemail.image;
      state.lastName = action.payload.existemail.lastName;
      state.password = action.payload.existemail.password;
      state._id = action.payload.existemail._id;
    },

    logoutRedux: (state, action) => {
      // console.log(action.payload, "action of logoutredux");
      state.email = action.payload;
      state.firstName = action.payload;
      state.image = action.payload;
      state.lastName = action.payload;
      state.password = action.payload;
      state._id = action.payload;
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
