import BlueButton from "./BlueButton";
import { Link } from "react-router-dom";

function BuyTokenPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <p className="text-2xl mb-3">
        Wallet Address: {localStorage.getItem("account").account}
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
