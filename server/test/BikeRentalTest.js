const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("BikeRentalContract", function () {
  let renterInfo;
  let BikeRentalContract;
  let hardhatBikeRental;
  let owner;
  this.beforeEach(async function () {
    BikeRentalContract = await ethers.getContractFactory("BikeRentalContract");
    [owner, addr1, addr2] = await ethers.getSigners();

    hardhatBikeRental = await BikeRentalContract.deploy();

    await hardhatBikeRental.deployed();

    let renter = {
      firstName: "John",
      lastName: "Doe",
    };
    await hardhatBikeRental.addRenter(renter.firstName, renter.lastName);

    renterInfo = await hardhatBikeRental.getRenter();
  });

  // async function deployTokenFixture() {
  //   const BikeRentalContract = await ethers.getContractFactory("BikeRental");
  //   const [owner, addr1, addr2] = await ethers.getSigners();

  //   const hardhatBikeRental = await BikeRentalContract.deploy();

  //   await hardhatBikeRental.deployed();

  //   // Fixtures can return anything you consider useful for your tests
  //   return { BikeRentalContract, hardhatBikeRental, owner, addr1, addr2 };
  // }
  // it("should set the right owner", async function () {
  //   const { hardhatBikeRental, owner } = await loadFixture(
  //     deployTokenFixture
  //   );

  describe("Deployment", function () {
    it("should set the onwer", async function () {
      expect(await hardhatBikeRental.owner()).to.equal(owner.address);
    });
  });

  describe("Add Renter", function () {
    it("should add the renter", async function () {
      expect(renterInfo.firstName).to.equal("John");
      expect(renterInfo.lastName).to.equal("Doe");
      expect(renterInfo.canRent).to.equal(true);
      expect(renterInfo.active).to.equal(false);
      expect(renterInfo.balance).to.equal(0);
      expect(renterInfo.due).to.equal(0);
      expect(renterInfo.start).to.equal(0);
      expect(renterInfo.end).to.equal(0);
    });

    it("should emit the Add Renter event", async function () {
      let renter = {
        firstName: "John",
        lastName: "Doe",
      };
      await expect(
        await hardhatBikeRental.addRenter(renter.firstName, renter.lastName)
      )
        .to.emit(hardhatBikeRental, "AddRenter")
        .withArgs(owner.address, renter.firstName, renter.lastName);
    });
  });

  describe("Checking functions", function () {
    it("should check out the bike", async function () {
      // await expect(hardhatBikeRental.checkOut()).not.to.be.revertedWith(
      //   "You have a pending balance"
      // );
      // await expect(hardhatBikeRental.checkOut()).not.to.be.revertedWith(
      //   "You cannot rent at this time"
      // );
      await hardhatBikeRental.checkOut();
      renterInfo = await hardhatBikeRental.getRenter();
      expect(renterInfo.active).to.equal(true);
      expect(renterInfo.canRent).to.equal(false);

      await hardhatBikeRental.checkIn();
      renterInfo = await hardhatBikeRental.getRenter();
      expect(renterInfo.active).to.equal(false);
    });
  });

  describe("Payment function", function () {
    it("should complete payment", async function () {
      renterInfo = await hardhatBikeRental.getRenter();
      expect(renterInfo.canRent).to.equal(true);
      expect(renterInfo.due).to.equal(0);
      expect(renterInfo.start).to.equal(0);
      expect(renterInfo.end).to.equal(0);
    });
  });
});
