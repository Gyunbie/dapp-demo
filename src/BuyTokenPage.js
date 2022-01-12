import BlueButton from "./BlueButton";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function BuyTokenPage() {
  const [account, setAccount] = useState("");
  localStorage.setItem("redirected", true);

  useEffect(() => {
    if (localStorage.getItem("account")) {
      setAccount(localStorage.getItem("account"));
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <p className="text-2xl mb-3">
        Wallet Address: {account}
      </p>
      <div className="flex">
        <BlueButton text="Refill Balance" />
        <p className="mx-5"></p>
        <Link to="/">
          <BlueButton text="Homepage" />
        </Link>
      </div>
    </div>
  );
}

export default BuyTokenPage;
