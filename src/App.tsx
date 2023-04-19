import { useEffect, useState } from 'react'
import './App.css'

function App() {
  

  const [isConnected, setConnectedStatus] = useState(false)
  const [status, setStatus] = useState('')
  const [walletAddress, setWallet] = useState('')

  const connectWalletPressed = async () => {
      if(isConnected) return alert(
        "Conta já conectada! " +
        String(walletAddress).substring(0, 5) +
        "..." +
        String(walletAddress).substring(38)
      )
      
      const walletResponse = await connectWallet()
      setConnectedStatus(walletResponse.connectedStatus)
      setStatus(walletResponse.status)
      setWallet(walletResponse.address)
      
  }

  const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const address = await window.ethereum.enable() 
            const obj = {
                connectedStatus:true,
                status:"Conectado",
                address: address
            }
            return obj;
        } catch (error) {
            return {
                connectedStatus: false,
                status: "Erro durante a conexão com a conta"
            }
        }
    } else {
        return {
            connectedStatus: false,
            status: "Instale a Metamask no seu browser: https://metamask.io/download.html"
        }
    }
  }
  return (
    <div className="App">
      <button onClick={connectWalletPressed}>Conectar com o Metamask</button>
    </div>
  )
}

export default App
