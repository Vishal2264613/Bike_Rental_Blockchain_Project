import React from "react";
import "./Navbar.css";
import ConnectWalletBtn from "./ConnectWalletBtn";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <a href="#" className="Logo">
          Bike Rental
        </a>
        <ConnectWalletBtn />
      </nav>
    </>
  );
};

export default Navbar;
