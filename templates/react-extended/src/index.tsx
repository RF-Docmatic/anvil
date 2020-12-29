import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));

// index.js won't be updated without refresh, when the following line is missing,
// but every other file and component will work just fine.
//
// module.hot.accept();
