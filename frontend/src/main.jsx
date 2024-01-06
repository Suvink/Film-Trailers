import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
// import { store } from "./store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/**Haven't properly implemented redux , but thinking of using redux for easier global state management */}
    <App></App>
  </React.StrictMode>
);
