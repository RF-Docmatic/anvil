import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AjaxResponse } from "rxjs/ajax";
import { InitialScreen } from "../../types";

const initialState: InitialScreen = {
  isRandomFactFetching: false,
  randomFactSource: null,
  randomFactSourceUrl: null,
  randomFactText: null,
  error: null,
};

const initialSlice = createSlice({
  name: "initial",
  initialState,
  reducers: {
    fetchRandomFactStart(state): void {
      state.isRandomFactFetching = true;
    },
    fetchRandomFactDone(state, action: PayloadAction<string>) {
      const result: AjaxResponse = JSON.parse(action.payload);
      const response = result.response;

      const text = response.text;
      const source = response.source;
      const sourceUrl = response.source_url;

      state.randomFactSource = source;
      state.randomFactSourceUrl = sourceUrl;
      state.randomFactText = text;
      state.isRandomFactFetching = false;
    },
    fetchRandomFactFail(state, action: PayloadAction<string>): void {
      console.log("error", action);
      state.isRandomFactFetching = false;
    },
  },
});

export default initialSlice.reducer;

const actions = initialSlice.actions;
export { actions as initialActions };
