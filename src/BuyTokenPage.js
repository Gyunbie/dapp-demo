import BlueButton from "./BlueButton";
import { Link, useParams } from "react-router-dom";

function BuyTokenPage() {
  const { wallet_id } = useParams();

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <p className="text-2xl mb-3">Wallet Address: {wallet_id}</p>
      <p className="text-2xl mb-3">
        Balance: {localStorage.getItem("balance")} ETH
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
