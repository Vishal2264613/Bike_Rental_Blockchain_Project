import { React, useEffect, useState } from "react";
import "./Dashboard.css";
import HeroSection from "./HeroSection";
import { Button1 } from "./NavbarElements";
import { BikeRentalContractAddress } from "./config.js";
import { ethers } from "ethers";
import BikeRental from "./utils/BikeRentalContract.json";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import web3 from "web3";

const Dashboard = () => {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const addRenter = async () => {
    let Renter = {
      fName: firstName,
      lName: lastName,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const BikeRentalContract = new ethers.Contract(
          BikeRentalContractAddress,
          BikeRental.abi,
          signer
        );

        let BikeRentalTx = await BikeRentalContract.addRenter(
          Renter.fName,
          Renter.lName
        );
        setLoading(true);
        await listenForTransactionMine(BikeRentalTx, provider);

        console.log(BikeRentalTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error submitting new Tweet", error);
    }
  };

  function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmation} consfirmation`
        );
        resolve();
      });
    });
  }

  const sendRenter = async (e) => {
    await addRenter();

    setFirstName("");
    setLastName("");
    navigate("/RentBike");
  };
  function checkFields() {
    if (firstName == "" || lastName == "") {
      alert("Firstname and lastname cannot be empty!");
    } else {
      sendRenter();
    }
  }

  return (
    <div className="container">
      <div>
        <div className="Title">Welcome!</div>
        <div className="Title2">
          Please enter your first and last name to register
        </div>
        <div className="fieldContainer">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="Firstname"
            type="text"
            name="name"
          />
          <br />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Lastname"
            type="text"
            name="name"
          />
          <br />
          <Button1 onClick={checkFields}>
            {loading ? (
              <div className="loader-container">
                <ClipLoader color={"#fff"} size={20} />
              </div>
            ) : (
              "Submit"
            )}
          </Button1>
        </div>
      </div>
      <HeroSection />
    </div>
  );
};

export default Dashboard;
