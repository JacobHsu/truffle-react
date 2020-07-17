pragma solidity ^0.5.8;

import "./Owned.sol";

contract LuckyGun is Owned {
    address payable public owner;

    uint256 public playerTotalNumber = 6;
    uint256 public playerCurrentNumber;

    mapping (uint256 => address payable) public noncesToPlayer;  // nonces -> player address, start from 0
    // [0] = address1 , [1] = address2..   == address[] public players;  players.push(msg.sender);

    event Play(address payable indexed player, uint256 betSize);
    event Bet(address indexed playerAddress, uint256 playerCurrentNumber, address firstAddress, uint256 addressBalance);
    event Payout(address payable winner, uint256 payout);

    constructor() public {
        owner = msg.sender;
    }

    function kill() external {
        require(msg.sender == owner, "Only the owner can kill this contract");
        selfdestruct(owner);
    }

    function fund() external payable {}

    function bet() public payable {
        require(msg.value <= getMaxBet(), "Bet amount can not exceed max bet size");
        require(msg.value > 0, "A bet should be placed");

        noncesToPlayer[playerCurrentNumber] = msg.sender;
        playerCurrentNumber = playerCurrentNumber + 1;

        uint256 addressBalance = address(this).balance;

        emit Bet(msg.sender, playerCurrentNumber, noncesToPlayer[0], addressBalance);
    }

    function pickWinner() public onlyOwner {
        require(playerCurrentNumber > 0);

        uint winner = uint(keccak256(abi.encodePacked(block.timestamp+block.number+uint(blockhash(block.number)))))%6;
        uint loser = uint(keccak256(abi.encodePacked(block.timestamp+block.number+uint(blockhash(block.number))+winner)))%6;
        if(winner == loser){
            loser = (winner+1)%6;
        }

        payout(winner, loser, 10);

    }

    function getMaxBet() public view returns (uint256) {
        return address(this).balance; // / 100;
    }

    function generateWinningNumber() internal view returns (uint8) {
        return uint8(block.number % 10 + 1); // Don't do this in production
    }

    function payout(uint256 winner, uint256 loser, uint256 amount) internal {
        assert(amount > 0);
        assert(amount <= address(this).balance);

        for (uint i=0; i<playerTotalNumber; i++) {
            if (i == winner) {
                noncesToPlayer[i].transfer(0.12 ether);
            } else if (i == loser) {
                
            } else {
                noncesToPlayer[i].transfer(0.11 ether);
            }
        }

        emit Payout(noncesToPlayer[winner], amount);
    }
}