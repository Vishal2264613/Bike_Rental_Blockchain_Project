import React from "react";
import { useState, useEffect } from "react";
import { Button } from "./NavbarElements";

const ConnectWalletBtn = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [btnName, setBtnName] = useState("Connect Wallet");

  useEffect(() => {
    connectWallet();
  });

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const goerliChainId = "0x5";

      if (chainId !== goerliChainId) {
        alert("you are not connected to the goerli Testnet");
        setCorrectNetwork(false);
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account" + accounts[0]);
      setCurrentAccount(accounts[0]);
      const account = accounts[0];
      setBtnName(
        account[0] +
          account[1] +
          account[2] +
          account[3] +
          account[4] +
          account[5] +
          "..." +
          account[38] +
          account[39] +
          account[40] +
          account[41]
      );
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  return <Button onClick={connectWallet}>{btnName}</Button>;
};

export default ConnectWalletBtn;
