import { useEffect, useState } from "react"
import { ethers, BigNumber } from "ethers";
import RoboPunkNFT from './utils/RoboPunkNFT.json'
// import web3 from 'web3';

const RoboPunkNFTAddress = "0x2c85fBA6b6C4C24624f1318F8AFC95862fB82d45"


const SetISPublicMintEnabled = () => {

    const [isPublicMins, setIsPublicMin] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                RoboPunkNFTAddress,
                RoboPunkNFT.abi,
                signer
            );
            // console.log(provider, signer, contract)

            try {
                const response = await contract.isPublicMintEnabled.call(function (err, res) {
                    console.log(res, "==============================");
                })
                setIsPublicMin(response);

                console.log("Response", response);
                return 0
            }
            catch (error) {
                console.log("Error:", error)

            }
            return 0
        }
        return 0
    }, [])

    async function changePublicMineValue() {
        console.log(isPublicMins, "FROMCHANGEPUBLICVALUE");

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                RoboPunkNFTAddress,
                RoboPunkNFT.abi,
                signer
            );
            // console.log(provider, signer, contract)


            try {
                // const response = await contract.SetISPublicMintEnabled(isPublicMins, { value: isPublicMins })

                setIsPublicMin(!isPublicMins)
                console.log(isPublicMins, "ATTIMEOFASSIGINFG");

                const response = await contract.setISPublicMintEnabled.call({ isPublicMintEnabled_: isPublicMins }, (error, result) => {
                    if (!error) {
                        console.log("CHNAGEDPROPERLYOOO", result);
                    }
                    else {
                        console.log(error, "ErrorError");
                    }
                })
                console.log("ChangeResponse", response);
            }
            catch (error) {
                console.log("Error : ", error);
                return
            }


        }
    }


    async function getPublicMineValue() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                RoboPunkNFTAddress,
                RoboPunkNFT.abi,
                signer
            )

            try {
                const response = await contract.isPublicMintEnabled.call(function (err, res) {
                    console.log(res, "==============================");
                })
                setIsPublicMin(response);

                console.log("Response", response);
            }
            catch (error) {
                console.log("Error:", error)
            }

        }
    }

    async function getMyBalance() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                RoboPunkNFTAddress,
                RoboPunkNFT.abi,
                signer
            )

            try {
                signer.getAddress().then((address) => {
                    console.log(address);
                    return provider.getBalance(address);
                }).then((rawBalance) => {
                    const value = parseFloat(ethers.utils.formatEther(rawBalance));
                    console.log("My BALANCE : ", value);
                });


            } catch (error) {
                console.log(error);
            }

        }
    }

    async function getContractBalance() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                RoboPunkNFTAddress,
                RoboPunkNFT.abi,
                signer
            )

            try {
                const response = await contract.checkContractBalance().call()
                console.log("Contract Balance", response);
            }
            catch (error) {
                console.log(error);
            }

        }
    }
    return (
        <div>
            <button onClick={changePublicMineValue}>Make value isPublicMine {isPublicMins ? "False" : "True"}</button>
            <button onClick={getPublicMineValue}>Get ISPublicMintEnabled : {isPublicMins.toString()}</button>
            <button onClick={getMyBalance}>Get My Balances</button>
            <button onClick={getContractBalance}>Get Contract Balance</button>
        </div>
    )
}


export default SetISPublicMintEnabled;