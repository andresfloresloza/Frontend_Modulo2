import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const initialState = {
  token: storedToken !== null ? storedToken : "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const token = action.payload;
      state.token = token;
      localStorage.setItem("token", token.token);
    },
    userLogout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { userLogin, userLogout } = loginSlice.actions;

export default loginSlice.reducer;
