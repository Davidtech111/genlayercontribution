import React, { useState } from 'react'

const ALERTS = [
  { type:'danger', icon:'🚨', text:'Suspicious wallet 0x9f2a...4b11 flagged — possible rug pull on Uniswap V3 pool', time:'2 min ago' },
  { type:'warn',   icon:'⚠️', text:'Unusual gas spike (+340%) on Ethereum — possible MEV attack or network congestion', time:'8 min ago' },
  { type:'info',   icon:'ℹ️', text:'NFT floor price alert: BAYC dropped 12% in last hour. Agent is monitoring.', time:'15 min ago' },
]

const BORDER_COLORS = { danger:'var(--danger)', warn:'var(--warn)', info:'var(--accent2)' }

function MiniChart({ vals, up }) {
  const max = Math.max(...vals)
  const color = up ? 'var(--accent4)' : 'var(--danger)'
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:60, marginTop:12 }}>
      {vals.map((v,i) => (
        <div key={i} style={{ flex:1, borderRadius:'2px 2px 0 0', background:color, height:`${(v/max*100)}%`, minHeight:3 }} />
      ))}
    </div>
  )
}

export default function AnalyticsSection() {
  const [simBalance, setSimBalance] = useState(10000)
  const [simLog, setSimLog] = useState([])

  function trade(type) {
    const change = (Math.random()*400+50) * (type==='buy' ? 1 : -1)
    setSimBalance(b => {
      const newBal = b + change
      const time = new Date().toLocaleTimeString()
      setSimLog(l => [`[${time}] SIM ${type.toUpperCase()} ETH — P&L: ${change>=0?'+':''}$${change.toFixed(2)} | Bal: $${newBal.toFixed(2)}`, ...l.slice(0,9)])
      return newBal
    })
  }

  function reset() {
    setSimBalance(10000)
    setSimLog([])
  }

  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div className="section-title">Analytics & AI Insights</div>
        <div className="section-sub">Predictive ML analysis + real-time risk alerts</div>
      </div>

      {/* Price predictions */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        <div className="card">
          <div style={{ fontWeight:700, marginBottom:2 }}>ETH Prediction (24h)</div>
          <div style={{ fontSize:11, color:'var(--text2)' }}>ML confidence: 78%</div>
          <MiniChart vals={[40,45,42,50,48,55,60,65]} up={true} />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontSize:13 }}>
            <span style={{ color:'var(--text2)' }}>Now: $3,412</span>
            <span style={{ color:'var(--accent4)', fontWeight:700 }}>Predicted: $3,580 ↑</span>
          </div>
        </div>
        <div className="card">
          <div style={{ fontWeight:700, marginBottom:2 }}>BTC Prediction (24h)</div>
          <div style={{ fontSize:11, color:'var(--text2)' }}>ML confidence: 65%</div>
          <MiniChart vals={[70,65,68,60,55,58,52,50]} up={false} />
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:8, fontSize:13 }}>
            <span style={{ color:'var(--text2)' }}>Now: $67,200</span>
            <span style={{ color:'var(--danger)', fontWeight:700 }}>Predicted: $65,800 ↓</span>
          </div>
        </div>
      </div>

      {/* Risk alerts */}
      <div className="card" style={{ marginBottom:20 }}>
        <div style={{ fontWeight:700, fontSize:14, marginBottom:14, display:'flex', alignItems:'center', gap:8 }}>
          <div className="dot-live" /> AI Risk Detection — Live Alerts
        </div>
        {ALERTS.map((a,i) => (
          <div key={i} style={{
            display:'flex', alignItems:'flex-start', gap:12, padding:12,
            background:'var(--bg3)', borderRadius:10, marginBottom:8,
            borderLeft:`3px solid ${BORDER_COLORS[a.type]}`,
          }}>
            <span style={{ fontSize:16 }}>{a.icon}</span>
            <div>
              <div style={{ fontSize:13, lineHeight:1.5 }}>{a.text}</div>
              <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulation */}
      <div className="card">
        <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>🎮 Auto Trading Simulation</div>
        <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:180 }}>
            <div style={{ fontSize:12, color:'var(--text2)', marginBottom:4 }}>Simulated Balance</div>
            <div style={{ fontSize:26, fontWeight:800, color: simBalance>=10000 ? 'var(--accent4)' : 'var(--danger)' }}>
              ${simBalance.toFixed(2)}
            </div>
            <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>
              {simBalance>=10000 ? `+$${(simBalance-10000).toFixed(2)} profit` : `-$${(10000-simBalance).toFixed(2)} loss`}
            </div>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <button className="btn btn-success" onClick={() => trade('buy')}>Sim Buy ETH</button>
            <button className="btn btn-danger" onClick={() => trade('sell')}>Sim Sell ETH</button>
            <button className="btn btn-ghost" onClick={reset}>Reset</button>
          </div>
        </div>
        {simLog.length > 0 && (
          <div style={{
            marginTop:14, maxHeight:120, overflowY:'auto',
            fontFamily:'var(--mono)', fontSize:11, color:'var(--text2)', lineHeight:1.9,
            background:'#04050a', borderRadius:8, padding:12, border:'1px solid var(--border)',
          }}>
            {simLog.map((l,i) => <div key={i}>{l}</div>)}
          </div>
        )}
      </div>
    </div>
  )
}
