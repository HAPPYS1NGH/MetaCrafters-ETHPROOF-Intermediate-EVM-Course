async function main() {
    const HappyToken = await hre.ethers.getContractFactory("HAPPYTOKEN");
    const happyToken = await HappyToken.deploy(100);
    await happyToken.deployed();

  console.log(
    `ERC20 Happy Token Deployed at address ${happyToken.address}`
  );
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });