import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'

export default function Navbar() {
  const { page, navigate, walletConnected, walletAddress, connectWallet } = useContext(AppContext)

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(8,9,15,0.94)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', height: 56,
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }} onClick={() => navigate('landing')}>
        <div style={{
          width:30, height:30, borderRadius:8,
          background: 'linear-gradient(135deg,#6c63ff,#00d4ff)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:15,
        }}>⚡</div>
        <span style={{ fontWeight:700, fontSize:15 }}>SmartChain AI Hub</span>
        <span style={{ fontSize:10, padding:'2px 7px', borderRadius:4, background:'rgba(108,99,255,.2)', color:'#6c63ff', fontWeight:700 }}>GENLAYER</span>
      </div>

      {/* Nav links */}
      <div style={{ display:'flex', gap:4 }}>
        {[['landing','Home'],['dashboard','Dashboard'],['demo','Demo']].map(([p,label]) => (
          <button key={p} onClick={() => navigate(p)}
            style={{
              padding:'6px 14px', borderRadius:8, border:'none', cursor:'pointer',
              background: page===p ? 'var(--bg3)' : 'transparent',
              color: page===p ? 'var(--text)' : 'var(--text2)',
              fontSize:13, fontFamily:'inherit', fontWeight: page===p ? 600 : 400,
              transition:'all .2s',
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display:'flex', gap:10, alignItems:'center' }}>
        <div onClick={connectWallet} style={{
          display:'flex', alignItems:'center', gap:6,
          padding:'6px 12px', borderRadius:8,
          background:'var(--bg3)', border:'1px solid var(--border2)',
          fontSize:12, color: walletConnected ? 'var(--accent4)' : 'var(--text2)',
          cursor:'pointer',
        }}>
          <div style={{
            width:6, height:6, borderRadius:'50%',
            background: walletConnected ? 'var(--accent4)' : 'var(--text3)',
            animation: walletConnected ? 'pulse 2s infinite' : 'none',
          }} />
          {walletConnected ? walletAddress : 'Connect Wallet'}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('dashboard','builder')}>
          + Create Agent
        </button>
      </div>
    </nav>
  )
}
