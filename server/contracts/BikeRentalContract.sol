//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract BikeRentalContract {
    address public owner;

    event AddRenter(
        address indexed walletAddress,
        string firstName,
        string lastName
    );

    constructor() {
        owner = msg.sender;
    }

    // Add yourself as a renter

    struct Renter {
        string firstName;
        string lastName;
        bool canRent;
        bool active;
        uint balance;
        uint due;
        uint start;
        uint end;
        uint duration;
    }

    mapping(address => Renter) public renters;

    function addRenter(string memory firstName, string memory lastName) public {
        renters[owner] = Renter(
            firstName,
            lastName,
            true,
            false,
            0,
            0,
            0,
            0,
            0
        );
        emit AddRenter(owner, firstName, lastName);
    }

    function getRenter() public view returns (Renter memory) {
        return renters[owner];
    }

    // check out bike

    function checkOut() public {
        require(renters[owner].due == 0, "You have a pending balance");
        require(renters[owner].canRent == true, "You cannot rent at this time");
        renters[owner].active = true;
        renters[owner].start = block.timestamp;
        renters[owner].canRent = false;
    }

    // check in bike

    function checkIn() public {
        require(renters[owner].active == true, "You have to checkout first");
        renters[owner].active = false;
        renters[owner].end = block.timestamp;
        setDueAmount();
    }

    // Get Total time duration of bike use

    function renterTimeSpan(uint start, uint end) internal pure returns (uint) {
        return end - start;
    }

    function getTotalDuration() public returns (uint) {
        require(
            renters[owner].active == false,
            "Bike is currently checked Out"
        );
        uint timeSpan = renterTimeSpan(
            renters[owner].start,
            renters[owner].end
        );
        uint timeSpanInMinutes = timeSpan / 60;
        renters[owner].duration = timeSpanInMinutes;
        return timeSpanInMinutes;

        // return 6;
    }

    // Get Contract balance

    function balanceOf() public view returns (uint) {
        return address(this).balance;
    }

    // Get renter balance

    function balanceOfRenter() public view returns (uint) {
        return renters[owner].balance;
    }

    // Set due amount

    function setDueAmount() internal {
        uint timeSpanInMinutes = getTotalDuration();
        uint fiveMinuteIncrement = timeSpanInMinutes / 5;
        renters[owner].due = fiveMinuteIncrement * 5000000000000000;
    }

    function canRentBike() public view returns (bool) {
        return renters[owner].canRent;
    }

    // Deposit

    function Deposit() public payable {
        renters[owner].balance += msg.value;
    }

    // Make Payment

    function MakePayment() public payable {
        require(
            renters[owner].due > 0,
            "You do not have anything due right now"
        );
        require(
            renters[owner].balance > msg.value,
            "You do not have enough fund"
        );
        renters[owner].balance -= msg.value;
        renters[owner].canRent = true;
        renters[owner].due = 0;
        renters[owner].start = 0;
        renters[owner].end = 0;
        renters[owner].duration = 0;
    }
}
