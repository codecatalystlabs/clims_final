import authSlice from "../slices/auth";
import condomSlice from "../slices/condom";
import {combineReducers } from "@reduxjs/toolkit";


  const rootReducer = combineReducers({
    condom:condomSlice,
    auth:authSlice
  });
  
  export default rootReducer



  