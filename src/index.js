import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { store } from "./api/store";
import { Provider } from "react-redux";


import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
