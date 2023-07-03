"use client"
import {useState} from "react";
import WalletExist from "./WalletExist";

export default function Wallet({children}){
    const initialState = { accounts: [] }               /* New */
    const [textUsed,settextUsed] = useState("Connect Auro")
    const [wallet, setWallet] = useState(initialState)  /* New */
    const [networkLive,setnetworkLive] = useState()
    let injectedProvider =  false
    if (typeof window.mina !== 'undefined') {
    injectedProvider = true
    console.log(window.mina)
    }
    const isAuro = injectedProvider ? window.mina : false
    
    
    //To display all the accounts
    const updateWallet = async (accounts) => {     /* New */
    setWallet({ accounts })
    console.log(wallet)                          /* New */
    }     
    const handleConnect = async  () => {
       
        let accounts = await window.mina.request({
            method:"mina_requestAccounts"
        })
        const network = await window.mina.requestNetwork();
        console.log(accounts)
        updateWallet(accounts)
        settextUsed("Connected")
        setnetworkLive(network)
        console.log(networkLive)
        
        
    }

    return (
        <>
            <WalletExist  />
            <div className="flex flex-row items-center justify-evenly">
                { isAuro && <button className="btn btn-outline btn-success" onClick={handleConnect}>{textUsed}</button>}
                {textUsed === "Connected" && isAuro   && <div className="badge badge-primary badge-outline">{networkLive}</div>}
                {textUsed === "Connected" && isAuro   && wallet.accounts.length > 0  && <div className="badge badge-primary badge-outline">{wallet.accounts[0]}</div>}
            </div>
            {children}
        </>
    )
}