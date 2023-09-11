import React from "react";
import { Button1 } from "./NavbarElements";
import "./Home.css";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { ethereum } = window;
  let navigate = useNavigate();

  const checkIfConnected = async () => {
    let provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length == 0) {
      alert("Please connect to wallet first!");
      return;
    } else {
      navigate("/Dashboard");
    }
  };
  return (
    <div className="container">
      <div className="firstTitle">Rent Your Bike</div>
      <div className="secondTitle">With Crypto</div>
      <div className="paragraph">
        connect your wallet, choose your bike, and you're off to the race. When
        you return it, you can easily pay your fare with goerli. And we all like
        those goerli gas fee!
      </div>

      <Button1
        onClick={() => {
          checkIfConnected();
        }}
      >
        Choose your bike
      </Button1>
    </div>
  );
};

export default Home;
