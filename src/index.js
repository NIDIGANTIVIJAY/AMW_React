import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import {store,persistor} from "./store/index"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connector from "./connector";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <Connector />
  </BrowserRouter>
  </PersistGate>
  </Provider>
);
