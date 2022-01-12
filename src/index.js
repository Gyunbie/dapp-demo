import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuyTokenPage from "./BuyTokenPage";
import NoMetamask from "./NoMetamask";

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/wallets/:wallet_id" element={<BuyTokenPage />} />
          <Route path="/no-metamask" element={<NoMetamask />} />
          <Route
            path="*"
            element={
              <div className="h-[100vh] flex justify-center items-center">
                404
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
