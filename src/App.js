import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useCallback, useEffect, useState } from "react";
import BlueButton from "./BlueButton";
import { useNavigate } from "react-router-dom";

function App() {
  const web3react = useWeb3React();
  const navigate = useNavigate();
  const [balance, setBalance] = useState();
  const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 28] });

  const connect = useCallback(async () => {
    try {
      await web3react.activate(injected);
    } catch (error) {
      console.log(error);
    }
  }, [web3react, injected]);

  useEffect(() => {
    const logged_in = localStorage.getItem("account");

    if (logged_in) connect();
  }, [connect]);

  useEffect(() => {
    localStorage.setItem("account", web3react.account);
  }, [web3react.account]);

  useEffect(() => {
    web3react.library?.eth
      .getBalance(web3react.account)
      .then((balance) => {
        setBalance(balance / 1e18);
      })
      .catch((error) => console.log(error));
  }, [web3react.account, web3react.library?.eth]);

  useEffect(() => {
    if (balance < 1 && !localStorage.getItem("redirected")) {
      navigate(`/${web3react.account}`);
      localStorage.setItem("redirected", true);
    }
  }, [balance, navigate, web3react.account]);

  return (
    <div className="p-10 pt-24 flex flex-col items-center">
      <p className="text-9xl font-extrabold text-gray-700 select-none">
        DECENTRALIZED
      </p>
      <p className="text-6xl font-semibold select-none">FINANCE APP</p>

      <div className="my-10 flex items-center">
        {web3react.account ? (
          <div>
            <p className="text-2xl">Wallet Address: {web3react.account}</p>
            <p className="text-2xl">Balance: {balance} ETH</p>
          </div>
        ) : (
          <BlueButton text="Connect with Metamask" click_func={connect} />
        )}
      </div>
    </div>
  );
}

export default App;
