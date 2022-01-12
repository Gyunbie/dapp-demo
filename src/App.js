import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import BlueButton from "./BlueButton";
import { useNavigate } from "react-router-dom";

function App() {
  const web3react = useWeb3React();
  const navigate = useNavigate();
  const [balance, setBalance] = useState();
  const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 28] });
  const [profileName, setProfileName] = useState("");

  async function connect() {
    try {
      await web3react.activate(injected);
    } catch (error) {
      console.log(error);
    }
  }

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

  function signMessage(message) {
    web3react.library?.eth.personal
      .sign(message, web3react.account)
      .then((response) => {
        return response;
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (
      balance < 1 &&
      (!localStorage.getItem("redirected") ||
        localStorage.getItem("redirected") === undefined)
    ) {
      navigate(`/${web3react.account}`);
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

            <div className="my-3 flex flex-col items-center border-2 border-gray-300 rounded-lg">
              <input
                className="p-2 outline-none ring-2 ring-gray-300 focus:ring-black duration-150 ease-out rounded my-2 w-1/2"
                onChange={(e) => setProfileName(e.target.value)}
                type="text"
                placeholder="Enter your profile name"
              />
              <input
                className="p-2 outline-none ring-2 ring-gray-300 rounded my-2 w-1/2"
                type="text"
                placeholder={web3react.account}
                disabled
              />
              <BlueButton
                text={"Sign Message"}
                click_func={() => signMessage(profileName)}
              />
            </div>
          </div>
        ) : (
          <BlueButton text="Connect with Metamask" click_func={connect} />
        )}
      </div>

      {}
    </div>
  );
}

export default App;
