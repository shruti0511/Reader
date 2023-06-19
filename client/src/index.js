import React from "react";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

if(process.env.NODE_ENV === 'production') disableReactDevTools()
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
