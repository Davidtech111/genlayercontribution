import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import DemoPage from './pages/DemoPage.jsx'
import Toast from './components/Toast.jsx'

export const AppContext = React.createContext({})

export default function App() {
  const [page, setPage] = useState('landing')
  const [dashSection, setDashSection] = useState('overview')
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [toast, setToast] = useState(null)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function connectWallet() {
    if (walletConnected) {
      setWalletConnected(false)
      setWalletAddress('')
      showToast('Wallet disconnected')
    } else {
      const addr = '0x4a2b...9f31'
      setWalletConnected(true)
      setWalletAddress(addr)
      showToast('✓ Wallet connected: ' + addr)
    }
  }

  function navigate(p, section) {
    setPage(p)
    if (section) setDashSection(section)
  }

  const ctx = { page, navigate, dashSection, setDashSection, walletConnected, walletAddress, connectWallet, showToast }

  return (
    <AppContext.Provider value={ctx}>
      <Navbar />
      {page === 'landing'   && <LandingPage />}
      {page === 'dashboard' && <DashboardPage />}
      {page === 'demo'      && <DemoPage />}
      {toast && <Toast message={toast} />}
    </AppContext.Provider>
  )
}
