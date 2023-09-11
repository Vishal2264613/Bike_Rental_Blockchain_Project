import { React, useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import { AiFillWallet } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Button1 } from "./NavbarElements";
import { PayButton } from "./NavbarElements";
import { BikeRentalContractAddress } from "./config.js";
import { ethers } from "ethers";
import BikeRental from "./utils/BikeRentalContract.json";
import Web3 from "web3";
import "./HeroSection.css";
import "./RentBike.css";
import ClipLoader from "react-spinners/ClipLoader";

const RentBike = () => {
  const [firstName, setFirstName] = useState("Your Name");
  const [balance, setBalance] = useState("0");
  const [due, setDue] = useState("0.0");
  const [totalDuration, settotalDuration] = useState("0");
  const [creditAmount, setcreditAmount] = useState("");
  const [dueAmount, setdueAmount] = useState("");
  const [renterIsActive, setRenterIsActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [creditLoading, setCreditLoading] = useState(false);
  const [dueLoading, setDueLoading] = useState(false);
  const [checkOutLoading, setCheckOutLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);

  const addCredit = async () => {
    try {
      const { ethereum } = window;
      let provider;
      let signer;
      let rentalContract;

      if (ethereum) {
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
        rentalContract = new ethers.Contract(
          BikeRentalContractAddress,
          BikeRental.abi,
          signer
        );

        let depositTx = await rentalContract.Deposit({
          value: Web3.utils.toWei(creditAmount, "ether"),
        });
        setCreditLoading(true);
        await listenForTransactionMine(depositTx, provider);
        getRenter();
        setCreditLoading(false);
        setcreditAmount("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const payDue = async () => {
    try {
      const { ethereum } = window;
      let provider;
      let signer;
      let rentalContract;

      if (ethereum) {
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
        rentalContract = new ethers.Contract(
          BikeRentalContractAddress,
          BikeRental.abi,
          signer
        );

        let dueTx = await rentalContract.MakePayment({
          value: Web3.utils.toWei(dueAmount, "ether"),
        });
        setDueLoading(true);
        await listenForTransactionMine(dueTx, provider);
        getRenter();
        setDueLoading(false);
        setdueAmount("");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          let checkOutTx = await rentalContract.checkOut();
          setCheckOutLoading(true);
          await listenForTransactionMine(checkOutTx, provider);
          setCheckOutLoading(false);
          setIsActive(true);
        } else {
          let checkInTx = await rentalContract.checkIn();
          setCheckInLoading(true);
          await listenForTransactionMine(checkInTx, provider);
          setCheckInLoading(false);
          setIsActive(false);
          getRenter();
        }
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRenter = async () => {
    try {
      const { ethereum } = window;
      let provider;
      let signer;
      let rentalContract;

      if (ethereum) {
        provider = new ethers.providers.Web3Provider(ethereum);
        signer = provider.getSigner();
        rentalContract = new ethers.Contract(
          BikeRentalContractAddress,
          BikeRental.abi,
          signer
        );

        let renter = await rentalContract.getRenter();
        // let duration = await rentalContract.getTotalDuration();
        setRenterIsActive(renter.active);
        let balance = renter.balance;
        var convertedBalance = String(balance);
        let weiToEther = Web3.utils.fromWei(convertedBalance, "ether");
        setBalance(weiToEther);

        setFirstName(renter.firstName);
        // setBalance(balance.toString());

        let dues = renter.due;
        var convertedDue = String(dues);
        let weiToEtherForDue = Web3.utils.fromWei(convertedDue, "ether");
        setDue(weiToEtherForDue.toString());
        console.log(weiToEtherForDue);

        let durationTime = renter.duration;
        settotalDuration(durationTime.toString());
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
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
  useEffect(() => {
    getRenter();
    if (renterIsActive) {
      setIsActive(true);
    }
  }, [payDue, addCredit]);

  const handleChange = (event) => {
    setcreditAmount(event.target.value);
  };
  const handleChange1 = (event) => {
    setdueAmount(event.target.value);
  };
  return (
    <div className="container">
      <div className="Title">Welcome {firstName}! Here are your stats: </div>
      <div className="Info-container">
        <div className="statusContainer">
          <div>
            <h4>Your credit</h4>
            <div>{balance}</div>
          </div>
          <div className="icon">
            <AiFillWallet size={35} />
          </div>
        </div>
        <div className="statusContainer">
          <div>
            <h4>Your Due</h4>
            <div>{due}</div>
          </div>
          <div className="icon">
            <AiFillDollarCircle size={35} />
          </div>
        </div>
        <div className="statusContainer">
          <div>
            <h4>Ride Minutes</h4>
            <div>{totalDuration}</div>
          </div>
          <div className="icon">
            <AiOutlineFieldTime size={35} />
          </div>
        </div>
        <div
          className="statusContainer4"
          style={{
            backgroundColor: isActive ? "green" : "red",
          }}
        >
          <div>
            <h4>Bike status</h4>
          </div>
        </div>
      </div>
      <div className="payContainer">
        <div className="creditContainer">
          <h3>Credit your account</h3>
          <input
            placeholder="Creditbalance"
            type="number"
            name="name"
            onChange={handleChange}
            value={creditAmount}
          />
          <br />
          <PayButton onClick={addCredit}>
            {creditLoading ? (
              <div className="loader-container">
                <ClipLoader color={"#fff"} size={20} />
              </div>
            ) : (
              "Pay"
            )}
          </PayButton>
        </div>
        <div className="paymentContainer">
          <h3>Pay your due</h3>
          <input
            placeholder="payment"
            type="text"
            name="name"
            onChange={handleChange1}
            value={dueAmount}
          />
          <br />
          <PayButton onClick={payDue}>
            {dueLoading ? (
              <div className="loader-container">
                <ClipLoader color={"#fff"} size={20} />
              </div>
            ) : (
              "Pay"
            )}
          </PayButton>
        </div>
      </div>
      <div className="hero-container">
        <div className="B1Container">
          <img
            src="https://www.bosch-ebike.com/fileadmin/_processed_/2/0/csm_Stage_P03_normal_a292402e88.jpg?_=1591798783"
            alt="new"
          />
          <br />
          <div className="bikeDesc">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
          <div className="btnContainer">
            <Button1 onClick={() => check(0)}>
              {checkOutLoading ? (
                <div className="loader-container">
                  <ClipLoader color={"#fff"} size={20} />
                </div>
              ) : (
                "Check out"
              )}
            </Button1>
            <Button1 onClick={() => check(1)}>
              {checkInLoading ? (
                <div className="loader-container">
                  <ClipLoader color={"#fff"} size={20} />
                </div>
              ) : (
                "Check In"
              )}
            </Button1>
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
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
          <div className="btnContainer">
            <Button1 onClick={() => check(0)}>
              {checkOutLoading ? (
                <div className="loader-container">
                  <ClipLoader color={"#fff"} size={20} />
                </div>
              ) : (
                "Check out"
              )}
            </Button1>
            <Button1 onClick={() => check(1)}>
              {checkInLoading ? (
                <div className="loader-container">
                  <ClipLoader color={"#fff"} size={20} />
                </div>
              ) : (
                "Check In"
              )}
            </Button1>
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
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
          <div className="btnContainer">
            <Button1 onClick={() => check(0)}>
              {checkOutLoading ? (
                <div className="loader-container">
                  <ClipLoader color={"#fff"} size={20} />
                </div>
              ) : (
                "Check out"
              )}
            </Button1>
            <Button1 onClick={() => check(1)}>
              {checkInLoading ? (
                <div className="loader-container">
                  <ClipLoader color={"#fff"} size={20} />
                </div>
              ) : (
                "Check In"
              )}
            </Button1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentBike;
