import { useState } from "react";

import "../css/buyNFTsTab.css";

import DeleteIcon from "../assets/icons/delete-icon.svg";

const { ethers } = require("ethers");
const ABI = require("../ABI.json");

const BuyNFTsTab = () => {
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
    <div className="buy-nfts-tab">
      <div className="past-nfts-orders">
        <p className="past-nfts-orders-title">Past NFTs Orders</p>
        <table className="past-nfts-orders-table">
          <tr className="past-nfts-orders-tr-th">
            <th className="past-nfts-orders-th">Contract Address</th>
            <th className="past-nfts-orders-th">Wallet Private Key</th>
            <th className="past-nfts-orders-th">Status</th>
            <th className="past-nfts-orders-th">Actions</th>
          </tr>
          <tr className="past-nfts-orders-tr">
            <td className="past-nfts-orders-td">
              0x495f947276749Ce646f68AC8c248420045cb7b5e
            </td>
            <td className="past-nfts-orders-td">
              0x5b3256965e7C3cF26E11FCAf296DfC8807C01073
            </td>
            <td className="past-nfts-orders-td">
              <div className="nft-order-status">Checked</div>
            </td>
            <td className="past-nfts-orders-td">
              <div className="nft-order-action-btns">
                <img
                  src={DeleteIcon}
                  alt="delete-icon"
                  className="delete-icon"
                />
              </div>
            </td>
          </tr>
          <tr className="past-nfts-orders-tr">
            <td className="past-nfts-orders-td">
              0x495f947276749Ce646f68AC8c248420045cb7b5e
            </td>
            <td className="past-nfts-orders-td">
              0x5b3256965e7C3cF26E11FCAf296DfC8807C01073
            </td>
            <td className="past-nfts-orders-td">
              <div className="nft-order-status">Checked</div>
            </td>
            <td className="past-nfts-orders-td last-td">
              <div className="nft-order-action-btns">
                <img
                  src={DeleteIcon}
                  alt="delete-icon"
                  className="delete-icon"
                />
              </div>
            </td>
          </tr>
          <tr className="past-nfts-orders-tr">
            <td className="past-nfts-orders-td">
              0x495f947276749Ce646f68AC8c248420045cb7b5e
            </td>
            <td className="past-nfts-orders-td">
              0x5b3256965e7C3cF26E11FCAf296DfC8807C01073
            </td>
            <td className="past-nfts-orders-td">
              <div className="nft-order-status">Checked</div>
            </td>
            <td className="past-nfts-orders-td last-td">
              <div className="nft-order-action-btns">
                <img
                  src={DeleteIcon}
                  alt="delete-icon"
                  className="delete-icon"
                />
              </div>
            </td>
          </tr>
          <tr className="past-nfts-orders-tr">
            <td className="past-nfts-orders-td">
              0x495f947276749Ce646f68AC8c248420045cb7b5e
            </td>
            <td className="past-nfts-orders-td">
              0x5b3256965e7C3cF26E11FCAf296DfC8807C01073
            </td>
            <td className="past-nfts-orders-td">
              <div className="nft-order-status">Checked</div>
            </td>
            <td className="past-nfts-orders-td  last-td">
              <div className="nft-order-action-btns">
                <img
                  src={DeleteIcon}
                  alt="delete-icon"
                  className="delete-icon"
                />
              </div>
            </td>
          </tr>
          <tr className="past-nfts-orders-tr">
            <td className="past-nfts-orders-td">
              0x495f947276749Ce646f68AC8c248420045cb7b5e
            </td>
            <td className="past-nfts-orders-td">
              0x5b3256965e7C3cF26E11FCAf296DfC8807C01073
            </td>
            <td className="past-nfts-orders-td">
              <div className="nft-order-status">Checked</div>
            </td>
            <td className="past-nfts-orders-td last-td">
              <div className="nft-order-action-btns">
                <img
                  src={DeleteIcon}
                  alt="delete-icon"
                  className="delete-icon"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div className="buy-new-nft">
        <form onSubmit={buyNFT} className="buy-nft-form">
          <p className="buy-new-nft-title">Buy New NFT</p>
          <div className="buy-nft-form-input-container">
            <label className="buy-nft-form-input-label">CONTRACT ADDRESS</label>
            <input
              type="text"
              placeholder="NFT Contract Address"
              value={ADDRESS}
              onChange={(e) => setADDRESS(e.target.value)}
              className="buy-nft-form-input"
            />
          </div>
          <div className="buy-nft-form-input-container">
            <label className="buy-nft-form-input-label">
              WALLET PRIVATE KEY
            </label>
            <input
              type="text"
              placeholder="Wallet Pvt Key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="buy-nft-form-input"
            />
          </div>
          <div className="buy-nft-form-input-container">
            <label className="buy-nft-form-input-label">INFURA API</label>
            <input
              type="text"
              placeholder="Infura API Key"
              value={INFURA_API}
              onChange={(e) => setINFURA_API(e.target.value)}
              className="buy-nft-form-input"
            />
          </div>
          <div className="buy-nft-form-input-container">
            <label className="buy-nft-form-input-label">GAS LIMIT</label>
            <input
              type="number"
              placeholder="Wallet Private Key"
              value={GAS_LIMIT}
              onChange={(e) => setGAS_LIMIT(e.target.value)}
              className="buy-nft-form-input"
            />
          </div>
          <input type="submit" value="Buy NFT" className="buy-nft-btn" />
        </form>
      </div>
    </div>
  );
};

export default BuyNFTsTab;
