import React from "react";
import "./HeroSection.css";
import { Button1 } from "./NavbarElements";
import { BikeRentalContractAddress } from "./config.js";
import { ethers } from "ethers";
import BikeRental from "./utils/BikeRentalContract.json";

const HeroSection = () => {
  const check = async (status) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const rentalContract = new ethers.Contract(
          BikeRentalContractAddress,
          BikeRental.abi,
          signer
        );
        if (status == 0) {
          await rentalContract.checkOut();
        } else {
          await rentalContract.checkIn();
        }
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="hero-container">
      <div className="B1Container">
        <img
          src="https://www.bosch-ebike.com/fileadmin/_processed_/2/0/csm_Stage_P03_normal_a292402e88.jpg?_=1591798783"
          alt="new"
        />
        <br />
        <div className="bikeDesc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
      <div className="B2Container">
        <img
          src="https://i.ytimg.com/vi/tmBi618lfoI/maxresdefault.jpg"
          alt="new"
        />
        <br />
        <div className="bikeDesc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
      <div className="B3Container">
        <img
          src="https://www.manners.nl/wp-content/uploads/2019/05/anti-diefstal-elektrische-fiets-Electrified-S2-vanmoof-amsterdam-hufterproof-stijlvol-stad.jpg"
          alt="new"
        />
        <br />
        <div className="bikeDesc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
