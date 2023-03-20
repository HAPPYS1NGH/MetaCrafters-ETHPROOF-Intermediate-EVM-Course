// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function main() {
  const [owner , signer1 , signer2] = await hre.ethers.getSigners();
  
  const HappyToken = await hre.ethers.getContractFactory("HAPPYTOKEN");
  const happyToken = await HappyToken.deploy(100);

  await happyToken.deployed();

  console.log(
    `ERC20 Happy Token Deployed at address ${happyToken.address}`
  );

  let tx = await happyToken.balanceOf(owner.address);
  console.log("Balance of "+ owner.address+ " is " + tx )

  let tx2 = await happyToken.balanceOf(signer1.address);
  console.log("Balance of "+ signer1.address+ " is " + tx2 )

  // await happyToken.transfer(signer1.address , 10);
  // // await happyToken.transfer(signer1.address , 1000);


  // tx2 = await happyToken.balanceOf(signer1.address);
  // console.log("Balance of "+ signer1.address+ " is " + tx2 )
  // tx = await happyToken.balanceOf(owner.address);
  // console.log("Balance of "+ owner.address+ " is " + tx )

  // console.log(await happyToken.minters(owner.address))

  // await happyToken.mint(100);
  // tx = await happyToken.balanceOf(owner.address);
  // console.log("Balance of "+ owner.address+ " is " + tx )
  // let supply = await happyToken.totalSupply();
  // console.log("Total supply "+ supply )

  // // Error
  // // await happyToken.connect(signer1).mint(100);
  // // Error
  // // await happyToken.connect(signer1).setMinter(signer1.address , true);

  // await happyToken.setMinter(signer1.address , true);
  // await happyToken.connect(signer1).mint(100);
  
  // tx2 = await happyToken.balanceOf(signer1.address);
  // console.log("Balance of "+ signer1.address+ " is " + tx2 )
  // supply = await happyToken.totalSupply();
  // console.log("Total supply "+ supply );

  // // Error
  // // await happyToken.connect(signer1).transferFrom(owner.address , signer2.address , 10);

  // await happyToken.approve(signer1.address , 50);

  // let tx3 = await happyToken.balanceOf(signer2.address);
  // console.log("Balance of Signer2 " + tx3);

  // // Error
  // // await happyToken.connect(signer1).transferFrom(owner.address , signer2.address , 100);

  // await happyToken.connect(signer1).transferFrom(owner.address , signer2.address , 10);
  // console.log("Transferring 10 Tokens ...")
  // tx3 = await happyToken.balanceOf(signer2.address);
  // console.log("Balance of Signer2 " + tx3);
  // tx2 = await happyToken.balanceOf(signer1.address);
  // console.log("Balance of "+ signer1.address+ " is " + tx2 )
  // tx = await happyToken.balanceOf(owner.address);
  // console.log("Balance of "+ owner.address+ " is " + tx )


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
