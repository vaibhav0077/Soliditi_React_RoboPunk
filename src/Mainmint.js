import { ethers, BigNumber } from "ethers";
import { useState } from "react";
import RoboPunkNFT from './utils/RoboPunkNFT.json'
import { Box, Button, Flex, Input, Link, Spacer } from '@chakra-ui/react';


const RoboPunkNFTAddress = "0x2c85fBA6b6C4C24624f1318F8AFC95862fB82d45"

const Mainmint = ({ accounts, setAccounts }) => {

    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        console.log(window.ethereum)
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                RoboPunkNFTAddress,
                RoboPunkNFT.abi,
                signer
            );
            console.log(provider, signer, contract)
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                })
                console.log("Response", response);
            }
            catch (error) {
                console.log("Error : ", error);
                return
            }
        }
    }

    const handleDecreament = () => {

        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1);
    }

    const handleIncreament = () => {

        if (mintAmount >= 3) return
        setMintAmount(mintAmount + 1);
    }


    return (
        <div>
            <h1>RoboPunk</h1>
            <p>Some Stuff</p>
            {isConnected ? (
                <div>
                    <div>
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F®F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleDecreament}>
                            -
                        </Button>
                        <Input
                            readOnly
                            fontFamily="inkerit"
                            width="100px"
                            height="50px"
                            textAlign="center"
                            paddingLeft="19px"
                            margin="10px"
                            type="number"
                            size="30px"
                            borderRadius="10px"
                            value={mintAmount} />
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F®F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleIncreament}>
                            +
                        </Button>
                    </div>
                    <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleMint}>
                        MINT NOW
                    </Button>
                </div>
            ) : <p>You Are Not Connected to Mint.</p>
            }
        </div >

    );

}

export default Mainmint;