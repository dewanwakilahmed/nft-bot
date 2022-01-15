import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import BuyNFTsTab from "./BuyNFTsTab";
import MyNFTsTab from "./MyNFTsTab";
import WalletsTab from "./WalletsTab";
import SettingsTab from "./SettingsTab";

import "../css/dashboard.css";

import NFTLogo from "../assets/logos/non-fungible-token.png";
import BuyNFTsIcon from "../assets/icons/buy-nfts-icon.svg";
import MyNFTsIcon from "../assets/icons/my-nfts-icon.svg";
import WalletsIcon from "../assets/icons/wallets-icon.svg";
import SettingsIcon from "../assets/icons/settings-icon.svg";

import UserProfilePicture from "../assets/images/user-profile-picture.jpg";

const Dashboard = () => {
  const location = useLocation();

  const [tabTitle, setTabTitle] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setTabTitle("Buy NFTs");
    } else if (location.pathname === "/my-nfts") {
      setTabTitle("My NFTs");
    } else if (location.pathname === "/wallets") {
      setTabTitle("Wallets");
    } else if (location.pathname === "/settings") {
      setTabTitle("Settings");
    }
  }, [location.pathname]);

  return (
    <div className="dashboard">
      <div className="dashboard-side-nav">
        <div className="dashboard-side-nav-header">
          <img src={NFTLogo} alt="nft-logo" className="app-logo" />
        </div>
        <div className="dashboard-side-nav-body">
          <ul className="app-nav">
            <Link to="/">
              <li className="app-nav-item">
                <img
                  src={BuyNFTsIcon}
                  alt="buy-nfts-icon"
                  className="app-nav-item-icon"
                />
                <span className="app-nav-item-title">Buy NFTs</span>
              </li>
            </Link>
            <Link to="/my-nfts">
              <li className="app-nav-item">
                <img
                  src={MyNFTsIcon}
                  alt="buy-nfts-icon"
                  className="app-nav-item-icon"
                />
                <span className="app-nav-item-title">My NFTs</span>
              </li>
            </Link>
            <Link to="/wallets">
              <li className="app-nav-item">
                <img
                  src={WalletsIcon}
                  alt="buy-nfts-icon"
                  className="app-nav-item-icon"
                />
                <span className="app-nav-item-title">Wallets</span>
              </li>
            </Link>
            <Link to="/settings">
              <li className="app-nav-item">
                <img
                  src={SettingsIcon}
                  alt="buy-nfts-icon"
                  className="app-nav-item-icon"
                />
                <span className="app-nav-item-title">Settings</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-main-header">
          <div className="tab-title">{tabTitle}</div>
          <div className="user-profile">
            <img
              src={UserProfilePicture}
              alt="user-profile"
              className="user-profile-picture"
            />
          </div>
        </div>
        <div className="dashboard-main-body">
          <Routes>
            <Route path="/" element={<BuyNFTsTab />} />
            <Route path="/my-nfts" element={<MyNFTsTab />} />
            <Route path="/wallets" element={<WalletsTab />} />
            <Route path="/settings" element={<SettingsTab />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
