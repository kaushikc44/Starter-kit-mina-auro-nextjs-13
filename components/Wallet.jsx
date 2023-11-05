"use client"
import { useState, useEffect } from "react";
import WalletExist from "./WalletExist";

export default function Wallet({ children }) {
  const initialState = { accounts: [] };
  const [textUsed, settextUsed] = useState("Connect Auro");
  const [wallet, setWallet] = useState(initialState);
  const [networkLive, setnetworkLive] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [injectedProvider, setInjectedProvider] = useState(false); // Use state for injectedProvider
  const [isAuro, setIsAuro] = useState(false); // Use state for isAuro
  const [isNetwork, setIsNetwork] = useState(null); // Use state for isNetwork

  useEffect(() => {
    // Check for window.mina when the component mounts
    if (typeof window.mina !== 'undefined') {
      setInjectedProvider(true);
      console.log(window.mina);
    }

    // Define the event handler function
    function handleChainChanged() {
      setnetworkLive(window.mina.requestNetwork());
    }

    // Add the event listener when the component mounts
    if (injectedProvider) {
      window.mina.on('chainChanged', handleChainChanged);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (injectedProvider) {
        window.mina.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [injectedProvider]); // Depend on injectedProvider

  const updateWallet = async (accounts) => {
    setWallet({ accounts });
    console.log(wallet);
  };

  const getAccountBalance = async (accounts) => {
    const apiUrl = `https://api.minaexplorer.com/accounts/${accounts}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.log("Error");
    }
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
    getAccountBalance(accounts);
    settextUsed("Connected");
    setIsNetwork(network);
    console.log(networkLive);
  };

  useEffect(() => {
    // Update isAuro based on injectedProvider
    setIsAuro(injectedProvider);
  }, [injectedProvider]); // Depend on injectedProvider

  return (
    <>
      <WalletExist />
      <div className="flex flex-row items-center justify-evenly">
        {isAuro && (
          <button className="btn btn-outline btn-success" onClick={handleConnect}>
            {textUsed}
          </button>
        )}
        {textUsed === "Connected" && isAuro && (
          <div className="badge badge-primary badge-outline">{networkLive}</div>
        )}
        {textUsed === "Connected" && isAuro && wallet.accounts.length > 0 && (
          <div className="badge badge-primary badge-outline">{wallet.accounts[0]}</div>
        )}
      </div>
      {children}
    </>
  );
}
