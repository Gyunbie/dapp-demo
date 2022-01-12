import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlueButton from "./BlueButton";

function NoMetamask() {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="mt-3 text-3xl font-semibold">
        No MetaMask extension found!
      </h1>
      <h1 className="mb-3 text-2xl">Please install it and refresh the page.</h1>
      <a
        className="mb-6 text-blue-400 text-xl"
        href="https://metamask.io/download.html"
      >
        Metamask Install Page
      </a>
      <Link to={"/"}>
        <BlueButton text={"Return to Homepage"} />
      </Link>
    </div>
  );
}

export default NoMetamask;
