import "./App.scss";
import "./global.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { GlobalStyles, ThemeProvider } from "@mui/material";


import { BrowserRouter } from "react-router-dom";
import Dashboard from "./main";
import { LicenseInfo } from "@mui/x-license-pro";

import React from "react";
import { ToastContainer } from "react-toastify";
import theme from "./theme";

function App() {
  LicenseInfo.setLicenseKey(
    "8961da90ca02be4e643dd6ca080cba47Tz01MTQ2NixFPTE2OTU4MTE2OTczODgsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
  );

  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              fontFamily: "Lato",
            }}
          />
          <ToastContainer limit={3} />
                <Dashboard />
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
