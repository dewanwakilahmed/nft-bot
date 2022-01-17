import { useState } from "react";
import "../css/walletsTab.css";
import DeleteIcon from "../assets/icons/delete-icon.svg";

var bip39 = require("bip39");
const HDWallet = require("ethereum-hdwallet");

const WalletsTab = () => {
  const [pubAddr, setPubAddr] = useState("Please click Generate below");
  const [pvtKey, setPvtKey] = useState("Please click Generate below");
  const [mnemonic, setMnemonic] = useState("Please click Generate below");

  const generateWallet = () => {
    let wallets = [];
    let index = 0;
    while (index++ < 1) {
      var mnemonic = bip39.generateMnemonic();
      const hdwallet = HDWallet.fromMnemonic(mnemonic);
      var publicAddress = `0x${hdwallet
        .derive(`m/44'/60'/0'/0/0`)
        .getAddress()
        .toString("hex")}`;
      var privateKey = `0x${hdwallet
        .derive(`m/44'/60'/0'/0/0`)
        .getPrivateKey()
        .toString("hex")}`;

      setPubAddr(`${publicAddress}`); // "0xabc123...", used for batch transactions
      // pvtKeyFor
      setPvtKey(`${privateKey}`);
      setMnemonic(mnemonic);
      var publicAddressQRString = `ethereum:${publicAddress}`; // ethereum:0xabc123...
      wallets.push({
        index,
        mnemonic,
        privateKey,
        publicAddress,
        publicAddressQRString,
      });
    }
  };

  return (
    <div className="buy-nfts-tab">
      <div className="past-nfts-orders">
        <p className="past-nfts-orders-title">My Wallets</p>
        <table className="past-nfts-orders-table">
          <tr className="past-nfts-orders-tr-th">
            <th className="past-nfts-orders-th">Name</th>
            <th className="past-nfts-orders-th">Public Address</th>
            <th className="past-nfts-orders-th">Private Key</th>
            <th className="past-nfts-orders-th">Mnemonic</th>
            <th className="past-nfts-orders-th">Actions</th>
          </tr>
          <tr className="past-nfts-orders-tr">
            <td className="past-nfts-orders-td">Random Name</td>
            <td className="past-nfts-orders-td">
              0x495f947276749Ce646f68AC8c248420045cb7b5e
            </td>
            <td className="past-nfts-orders-td">
              0x5b3256965e7C3cF26E11FCAf296DfC8807C01073
            </td>
            <td className="past-nfts-orders-td">Random Words</td>
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
        </table>
      </div>
      <div className="buy-new-nft">
        <form onSubmit="" className="buy-nft-form">
          <p className="buy-new-nft-title">Generate ETH Wallet</p>
          <div className="buy-nft-form-input-container">
            <label className="buy-nft-form-input-label">PUBLIC ADDRESS</label>
            <p
              type="text"
              placeholder="NFT Contract Address"
              value=""
              onChange=""
              className="buy-nft-form-input"
            >
              {pubAddr}
            </p>
          </div>
          <div className="buy-nft-form-input-container">
            <label className="buy-nft-form-input-label">PRIVATE KEY</label>
            <p
              type="text"
              placeholder="Wallet Pvt Key"
              value=""
              onChange=""
              className="buy-nft-form-input"
            >
              {pvtKey}
            </p>
          </div>
          <div className="buy-nft-form-input-container">
            <label className="buy-nft-form-input-label">MNEMONIC</label>
            <p
              type="text"
              placeholder="Infura API Key"
              value=""
              onChange=""
              className="buy-nft-form-input"
            >
              {mnemonic}
            </p>
          </div>
          <div className="buy-nft-form-input-container">
            <label className="buy-nft-form-input-label">NAME</label>
            <input
              type="text"
              placeholder="Please enter a Wallet name here to save"
              value=""
              onChange=""
              className="buy-nft-form-input"
            />
          </div>
          <div className="wallet-generator-actions">
            <button className="buy-nft-btn" onClick={generateWallet}>
              Generate
            </button>
            <button className="save-wallet-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletsTab;
