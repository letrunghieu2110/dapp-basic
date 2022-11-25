import { useDispatch } from "react-redux";
import { ethers } from "ethers";
import "../../App.css";
import {
  getAccountAddress,
  getBalanceAmount,
} from "../../redux/accountSlice/accountSlice";

function Login() {
  const dispatch = useDispatch();

  const handleConnectMetamask = async () => {
    if (!window.ethereum?.request) {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    dispatch(getAccountAddress(accounts[0]));

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // get balance
    async function getBalance(accounts) {
      let balance = await provider.getBalance(accounts);

      balance = ethers.utils.formatEther(balance);
      dispatch(getBalanceAmount(balance));
    }
    getBalance(accounts[0]);
  };

  return (
    <button className="login-btn" onClick={handleConnectMetamask}>
      Login
    </button>
  );
}

export default Login;
