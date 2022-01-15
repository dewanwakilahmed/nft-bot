import { useState } from "react";
import "./App.css";
const { ethers } = require("ethers");
const ABI = require("./ABI.json");

function App() {
  const [ADDRESS, setADDRESS] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [GAS_LIMIT, setGAS_LIMIT] = useState(2000000);
  const [INFURA_API, setINFURA_API] = useState("");

  const buyNFT = (e) => {
    // Make sure it doesnt submit to a page
    e.preventDefault();

    console.log("Buy NFT Initialized!");

    const GAS_PRICE = ethers.utils.parseUnits("666", "gwei");

    // make sure more than 1 can actually be minted by a single address
    const MAX_AMOUNT = 3;

    // change this to represent the minting price
    const TOKEN_PRICE = ethers.utils.parseEther("0.08");
    const INTERVAL = 500;

    // use infura
    // const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API);
    const provider = new ethers.providers.JsonRpcProvider(INFURA_API);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(ADDRESS, ABI, wallet);

    async function main() {
      try {
        // make sure the .saleIsActive() function exists on the contract (or equivalent)
        const saleIsActive = await contract.saleIsActive();
        console.log(saleIsActive);
        if (saleIsActive) {
          clearInterval(timer);
          console.log("LFG");
          contract.mintCapsule(TOKEN_PRICE, MAX_AMOUNT, {
            gasLimit: GAS_LIMIT,
            gasPrice: GAS_PRICE,
            nonce: startingNonce,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    let startingNonce;
    let timer;

    (async () => {
      startingNonce = await provider.getTransactionCount(wallet.address);
      timer = setInterval(() => {
        main();
        console.alert("NFT PURCHASED!");
      }, INTERVAL);
    })();
  };

  return (
    <div className="App">
      <h1>NFT Bot</h1>
      <form onSubmit={buyNFT}>
        <label>Contract Address: </label>
        <input
          type="text"
          placeholder="NFT Contract Address"
          value={ADDRESS}
          onChange={(e) => setADDRESS(e.target.value)}
        />
        <br />
        <label>Wallet Private Key: </label>
        <input
          type="text"
          placeholder="Wallet Pvt Key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
        <br />
        <label>Infura API: </label>
        <input
          type="text"
          placeholder="Infura API Key"
          value={INFURA_API}
          onChange={(e) => setINFURA_API(e.target.value)}
        />
        <br />
        <label>Gas Limit: </label>
        <input
          type="number"
          placeholder="Wallet Private Key"
          value={GAS_LIMIT}
          onChange={(e) => setGAS_LIMIT(e.target.value)}
        />
        <br />
        <input type="submit" value="Buy NFT" />
      </form>
    </div>
  );
}

export default App;
