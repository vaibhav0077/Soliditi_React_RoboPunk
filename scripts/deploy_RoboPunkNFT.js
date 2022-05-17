

async function main() {

  // We get the contract to deploy
  const RoboPunkNFT = await hre.ethers.getContractFactory("RoboPunkNFT");
  const roboPunknft = await RoboPunkNFT.deploy();

  await roboPunknft.deployed();

  console.log("RoboPunkNFT deployed to:", roboPunknft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
