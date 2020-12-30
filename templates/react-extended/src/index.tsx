import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// index.js won't be updated without refresh, when the following line is missing,
// but every other file and component will work just fine.
//
// module.hot.accept();
