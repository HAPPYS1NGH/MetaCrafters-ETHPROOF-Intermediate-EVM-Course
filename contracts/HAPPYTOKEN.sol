// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/IERC20.sol
interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract HAPPYTOKEN is IERC20 {
    string public name = "HAPPY";
    string public symbol = "HS";
    uint8 public decimals = 10;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowed;
    mapping(address => bool) public minters; // add mapping to track authorized minters

    event Mint(address indexed minter, uint256 value); // add Mint event

    constructor(uint256 initialSupply) {
        totalSupply = initialSupply;
        balanceOf[msg.sender] = initialSupply;
        minters[msg.sender] = true; // set initial minter
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Not Enough Tokens to send");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool success) {
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(value <= balanceOf[from] , "Not enough Tokens to send");
        require(value <= allowed[from][msg.sender], "Not enough approved tokens to send") ;
        balanceOf[from] -= value;
        allowed[from][msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
        return true;
    }

    function allowance(address owner, address spender) external view returns (uint){
        return allowed[owner][spender];
    }

    function mint(uint256 value) public {
        require(minters[msg.sender], "Only authorized minters can mint tokens"); // add modifier to check authorization
        balanceOf[msg.sender] += value;
        totalSupply += value;
        emit Mint(msg.sender, value); // emit Mint event
        emit Transfer(address(0), msg.sender, value);
    }

    // add function to allow authorized address to add or remove minters
    function setMinter(address minter, bool isMinter) public {
        require(minters[msg.sender], "Only authorized minters can add or remove minters");
        minters[minter] = isMinter;
    }
}