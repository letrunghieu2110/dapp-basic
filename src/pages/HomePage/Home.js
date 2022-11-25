import { useState } from "react";
import {
  MdWavingHand,
  MdOutlineFileCopy,
  MdSwapHorizontalCircle,
  MdOutlineLogout,
} from "react-icons/md";
import { FcSimCardChip } from "react-icons/fc";
import { FaEyeSlash } from "react-icons/fa";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import "../../App.css";
import { useSelector } from "react-redux";

function HomePage() {
  const [formSend, setFormSend] = useState(false);
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState(0);

  const currentAccount = useSelector((state) => state.account?.accountAddress);
  const balance = useSelector((state) => state.account?.balanceAmount);

  const handleCopyAddress = (accountAddress) => {
    // navigator.clipboard.writeText(accountAddress);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const transaction = {
      address: address,
      balance: number,
    };
    console.log(transaction);
  };

  return (
    <div className="home-wrapper">
      <div className="home-me">
        {currentAccount && (
          <>
            <MdWavingHand className="hand-icon" />
            <h3 className="current-account">
              {`
              Hello! 
              ${currentAccount.substring(0, 4)}...${currentAccount.slice(-4)}
              `}
            </h3>
            <MdOutlineFileCopy
              className="copy-icon"
              onClick={() => handleCopyAddress(currentAccount)}
            />
          </>
        )}
      </div>
      <div className="home-balance">
        {currentAccount && (
          <>
            <div className="balance-content">
              <FcSimCardChip className="chip-icon" />
              <span className="balance-title">TOTAL BALANCE</span>
              <FaEyeSlash className="close-eye-icon" />
            </div>
            <div className="balance-amount">
              {balance !== 0 && <p>{balance} ₿</p>}
            </div>
            <div className="balance-actions">
              <div className="balance-action" onClick={() => setFormSend(true)}>
                <BsArrowUpCircleFill className="action-icon" />
                <p className="action-title">Send</p>
              </div>
              <div className="balance-action">
                <BsArrowDownCircleFill className="action-icon" />
                <p className="action-title">Receive</p>
              </div>
              <div className="balance-action">
                <MdSwapHorizontalCircle className="action-icon" />
                <p className="action-title">GSwap</p>
              </div>
              <div className="balance-action">
                <MdOutlineLogout className="action-icon" />
                <p className="action-title">Logout</p>
              </div>
            </div>
          </>
        )}
      </div>
      {formSend && (
        <form className="form-send" onSubmit={handleSend}>
          <div className="form-title">SEND</div>
          <div className="form-container">
            <label>Receive Wallet</label>
            <input
              type="text"
              placeholder="Receive Wallet"
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Amount</label>
            <input
              type="text"
              placeholder="0"
              onChange={(e) => setNumber(e.target.value)}
            />
            <div className="form-actions">
              <button className="send-btn" type="submit">
                Send
              </button>
              <button className="cancel-btn" onClick={() => setFormSend(false)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default HomePage;
