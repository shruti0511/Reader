/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { store } from './redux/store';
import { Provider } from 'react-redux';

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
<Provider store={store}>
  <BrowserRouter>
    <SoftUIControllerProvider>
        <App />
    </SoftUIControllerProvider>
    </BrowserRouter>
 </Provider>
);
