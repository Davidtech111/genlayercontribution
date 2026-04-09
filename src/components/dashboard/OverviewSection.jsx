import React from 'react'

const METRICS = [
  { label:'Portfolio Value',  value:'$48,234', change:'↑ +12.4% today',  color:'var(--accent2)', up:true },
  { label:'Active Agents',    value:'7',        change:'↑ 2 deployed today', color:'var(--accent)', up:true },
  { label:'Revenue Earned',   value:'$1,847',   change:'↑ +$234 this week', color:'var(--accent4)', up:true },
  { label:'Risk Score',       value:'Low',       change:'3 alerts monitored', color:'var(--warn)', up:null },
]

function BarChart({ vals, color, labels }) {
  const max = Math.max(...vals)
  return (
    <div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:6, height:90 }}>
        {vals.map((v,i) => (
          <div key={i} style={{
            flex:1, borderRadius:'3px 3px 0 0', minWidth:0, cursor:'pointer',
            height: `${(v/max*100)}%`,
            background:`linear-gradient(180deg,${color},rgba(108,99,255,.2))`,
            transition:'opacity .2s',
          }} title={v} />
        ))}
      </div>
      {labels && (
        <div style={{ display:'flex', gap:6, marginTop:6 }}>
          {labels.map((l,i) => (
            <div key={i} style={{ flex:1, textAlign:'center', fontSize:10, color:'var(--text3)' }}>{l}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function OverviewSection() {
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <div className="section-title">Portfolio Overview</div>
          <div className="section-sub">Real-time blockchain & AI performance</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--text2)' }}>
          <div className="dot-live" /> Live
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:14, marginBottom:24 }}>
        {METRICS.map(m => (
          <div key={m.label} className="metric-card">
            <div className="metric-label">{m.label}</div>
            <div className="metric-value" style={{ color:m.color }}>{m.value}</div>
            <div className="metric-change" style={{ color: m.up===true?'var(--accent4)':m.up===false?'var(--danger)':'var(--text2)' }}>
              {m.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div className="card" style={{ marginBottom:20 }}>
        <div style={{ fontSize:14, fontWeight:600, color:'var(--text2)', marginBottom:16 }}>Portfolio Performance (7 days)</div>
        <BarChart vals={[55,72,48,90,65,88,95]} color="var(--accent)" labels={['Mon','Tue','Wed','Thu','Fri','Sat','Sun']} />
      </div>

      {/* Sub charts */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div className="card">
          <div style={{ fontSize:14, fontWeight:600, color:'var(--text2)', marginBottom:12 }}>Gas Usage Today</div>
          <BarChart vals={[30,55,20,70,45,80,60]} color="var(--accent2)" />
        </div>
        <div className="card">
          <div style={{ fontSize:14, fontWeight:600, color:'var(--text2)', marginBottom:12 }}>Agent Calls (24h)</div>
          <BarChart vals={[40,65,80,55,90,70,95]} color="var(--accent3)" />
        </div>
      </div>

      {/* Recent tx */}
      <div className="card" style={{ marginTop:20 }}>
        <div style={{ fontSize:14, fontWeight:600, marginBottom:14 }}>Recent Transactions</div>
        {[
          { hash:'0xfe91...a23d', type:'BUY ETH',    amount:'+0.05 ETH', val:'$170.63', time:'2 min ago',  status:'success' },
          { hash:'0xab12...c44f', type:'STAKE GEN',   amount:'+120 GEN',  val:'$48.00',  time:'14 min ago', status:'success' },
          { hash:'0x9f2a...b11e', type:'SELL NFT',    amount:'-1 BAYC',   val:'$8,200',  time:'1 hr ago',   status:'success' },
          { hash:'0xd3e4...f99a', type:'SEND USDC',   amount:'-500 USDC', val:'$500.00', time:'3 hr ago',   status:'pending' },
        ].map((tx,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>
              {tx.type.startsWith('BUY')||tx.type.startsWith('STAKE') ? '↓' : '↑'}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600 }}>{tx.type}</div>
              <div style={{ fontSize:11, color:'var(--text3)' }}>{tx.hash}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontWeight:700, color: tx.amount.startsWith('+') ? 'var(--accent4)' : 'var(--danger)' }}>{tx.amount}</div>
              <div style={{ fontSize:11, color:'var(--text3)' }}>{tx.val}</div>
            </div>
            <div style={{ textAlign:'right', minWidth:70 }}>
              <div className={`badge-pill badge-${tx.status==='success'?'active':'idle'}`}>{tx.status}</div>
              <div style={{ fontSize:10, color:'var(--text3)', marginTop:3 }}>{tx.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
