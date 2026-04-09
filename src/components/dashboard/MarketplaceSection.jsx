import React, { useState, useContext } from 'react'
import { AppContext } from '../../App.jsx'

const AGENTS = [
  { name:'Sigma Scalper X',    author:'0xDev...a4f2', icon:'⚡', bg:'linear-gradient(135deg,#1a1035,#0d1f3c)', price:'$12/mo',       rating:'4.9', tags:['HFT','ETH','Trading'] },
  { name:'ArbiBot Supreme',    author:'DecentLabs',   icon:'🔄', bg:'linear-gradient(135deg,#0d1a10,#0a1520)', price:'$0.01/call',   rating:'4.7', tags:['Arbitrage','Cross-chain'] },
  { name:'NFT Sniper AI',      author:'0xWha...b921', icon:'🎯', bg:'linear-gradient(135deg,#1a0d35,#2d0d1a)', price:'Free',         rating:'4.5', tags:['NFT','OpenSea','Blur'] },
  { name:'DAO Voter Pro',      author:'GovTech DAO',  icon:'🗳️', bg:'linear-gradient(135deg,#0d1a1a,#1a1a0d)', price:'$5/mo',        rating:'4.8', tags:['DAO','Governance'] },
  { name:'Yield Optimizer',    author:'YieldFarm.eth',icon:'🌱', bg:'linear-gradient(135deg,#0d1a10,#141a0d)', price:'2% rev share', rating:'4.6', tags:['DeFi','Yield','Staking'] },
  { name:'Fraud Detector Pro', author:'SafeChain Labs',icon:'🛡️',bg:'linear-gradient(135deg,#1a100d,#0d1520)', price:'Free (Basic)', rating:'5.0', tags:['Security','Alerts'] },
]

export default function MarketplaceSection() {
  const { showToast } = useContext(AppContext)
  const [search, setSearch] = useState('')

  const filtered = AGENTS.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <div className="section-title">Agent Marketplace</div>
          <div className="section-sub">Discover and subscribe to top AI agents</div>
        </div>
        <input className="input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search agents..." style={{ width:200 }} />
      </div>

      <div className="grid-auto">
        {filtered.map(a => (
          <div key={a.name} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', transition:'all .2s', cursor:'pointer' }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='none'}
          >
            <div style={{ height:72, background:a.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 }}>
              {a.icon}
            </div>
            <div style={{ padding:16 }}>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:3 }}>{a.name}</div>
              <div style={{ fontSize:12, color:'var(--text2)', marginBottom:10 }}>by {a.author}</div>
              <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:12 }}>
                {a.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:'1px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight:700, color:'var(--accent2)', fontSize:14 }}>{a.price}</div>
                  <div style={{ fontSize:11, color:'#f5c518' }}>{'★'.repeat(Math.floor(parseFloat(a.rating)))} {a.rating}</div>
                </div>
                <button className="btn btn-primary" style={{ padding:'6px 14px', fontSize:12 }} onClick={() => showToast(`Subscribed to ${a.name}!`)}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
