import { useEffect } from "react";
import { ethers } from "ethers";
import { TfiMenu, TfiWallet } from "react-icons/tfi";
import "../../App.css";
import logo from "../../../src/assets/images/logo.png";
import Login from "../../components/Login";
import { useSelector, useDispatch } from "react-redux";
import {
  getAccountAddress,
  getBalanceAmount,
} from "../../redux/accountSlice/accountSlice";

function Header() {
  const account = useSelector((state) => state.account?.accountAddress);
  const currentBalance = useSelector((state) => state.account?.balanceAmount);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      async function onChangeAccount() {
        window.ethereum.on(
          "accountsChanged",
          function handleAccountsChanged(accounts) {
            if (!account) {
              dispatch(getAccountAddress(accounts[0]));
            }
          }
        );
      }
      onChangeAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      //get balance
      async function getBalance(account) {
        let balance = await provider.getBalance(account);

        balance = ethers.utils.formatEther(balance);
        dispatch(getBalanceAmount(balance));
      }
      getBalance(account);
    } catch (error) {
      console.log("inheader ", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleLogout = () => {
    dispatch(getAccountAddress(""));
    dispatch(getBalanceAmount(0));
  };

  return (
    <header className="header-wrapper">
      <div className="header-inner">
        <div className="header-left">
          <TfiMenu className="header-menu" />
          <img className="header-logo" src={logo} alt="logo" />
        </div>
        <div className="header-actions">
          {currentBalance !== 0 && (
            <p className="current-balance">
              <TfiWallet className="wallet-icon" /> {currentBalance}
            </p>
          )}
          {account ? (
            // <p className="account-address">
            //   {`${account.substring(0, 4)}...${account.slice(-4)}`}
            // </p>
            <button className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <>
              <Login />
              <button className="register-btn">Register</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
