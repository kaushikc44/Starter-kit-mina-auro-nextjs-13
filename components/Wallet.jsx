"use client"
import { useState, useEffect } from "react";
import WalletExist from "./WalletExist";
import { getAccountBalance } from "./getBalance";
import { useBalance } from "@/context/balance.context";

export default function Wallet({ children }) {
  const initialState = { accounts: [] };
  const [textUsed, settextUsed] = useState("Connect Auro");
  const [wallet, setWallet] = useState(initialState);
  const [networkLive, setNetworkLive] = useState(); // Changed variable name to setNetworkLive
  const [accountBalance, setAccountBalance] = useState();
  const [injectedProvider, setInjectedProvider] = useState(false);
  const [isAuro, setIsAuro] = useState(false);
  const {  updateBalance } = useBalance();

  useEffect(() => {
    // Check for window.mina when the component mounts
    if (typeof window.mina !== "undefined") {
      setInjectedProvider(true);
      console.log(window.mina);
    }

    // Define the event handler function
    function handleChainChanged() {
      setNetworkLive(window.mina.requestNetwork());
    }

    return () => {
      if (injectedProvider) {
        window.mina.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, [injectedProvider]);

  // To display all the accounts
  const updateWallet = async (accounts) => {
    setWallet({ accounts });
    console.log(wallet);
  };

  const handleConnect = async () => {
    let accounts = await window.mina.request({
      method: "mina_requestAccounts",
    });

    let isNetwork = await window.mina.request({ method: "mina_requestNetwork" });
    console.log("The network is:", isNetwork);

    const network = await window.mina.requestNetwork();
    console.log("Accounts", accounts);

    updateWallet(accounts);
    settextUsed("Connected");
    setNetworkLive(network); // Changed to setNetworkLive
    const value = await getAccountBalance(accounts);
    console.log("Balance",typeof(parseInt(value.account.balance.total)));
    setAccountBalance(parseInt(value.account.balance.total))
    updateBalance(parseInt(value.account.balance.total))
    console.log(networkLive);
  };



  useEffect(() => {
    // Update isAuro based on injectedProvider
    setIsAuro(injectedProvider);
  }, [injectedProvider]);

  return (
    <>
      
          
            <div className="flex flex-row items-center justify-evenly border-b-2">
                 <button className="btn btn-outline btn-success" onClick={handleConnect}>{textUsed}</button>
                {textUsed === "Connected" && isAuro   && <div className="badge badge-primary badge-outline">{networkLive.name}</div>}
                {textUsed === "Connected" && isAuro   && wallet.accounts.length > 0  && <div className="badge badge-primary badge-outline">{wallet.accounts[0]}</div>}
                {textUsed === "Connected" && isAuro   && wallet.accounts.length > 0  && <div className="badge badge-primary badge-outline">{accountBalance} MINA</div>}
            </div>
            {children}
      </>
  );
}
