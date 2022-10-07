pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract CleanToken is ERC20{
    constructor() ERC20("clean" ,"CE"){
        // mint 1000 token
        _mint(msg.sender, 1000*10**uint(decimals()));
    }
}