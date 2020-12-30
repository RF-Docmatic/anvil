import { combineReducers } from "@reduxjs/toolkit";
import { initialSliceReducer } from "../features/initial/slices";

export const rootReducer = combineReducers({ initial: initialSliceReducer });
