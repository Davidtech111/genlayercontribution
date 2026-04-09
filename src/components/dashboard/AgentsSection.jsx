import React, { useContext } from 'react'
import { AppContext } from '../../App.jsx'

const AGENTS = [
  { name:'Alpha Trader Pro',   type:'Crypto Trader',  icon:'🤖', bg:'rgba(108,99,255,.15)', status:'active', roi:'+24.5%', calls:1240, subs:89  },
  { name:'NFT Whale Watcher',  type:'NFT Analyzer',   icon:'🖼️', bg:'rgba(0,212,255,.1)',   status:'active', roi:'+18.2%', calls:567,  subs:44  },
  { name:'News Sentinel',      type:'News Summarizer', icon:'📰', bg:'rgba(255,107,157,.1)', status:'active', roi:'N/A',    calls:3201, subs:201 },
  { name:'DeFi Yield Hunter',  type:'DeFi Monitor',   icon:'💎', bg:'rgba(0,255,136,.1)',   status:'idle',   roi:'+9.1%',  calls:88,   subs:12  },
  { name:'Risk Guardian',      type:'Risk Detection', icon:'🛡️', bg:'rgba(255,74,107,.1)',  status:'active', roi:'N/A',    calls:6400, subs:310 },
  { name:'Market Prophet',     type:'Predictive AI',  icon:'🔮', bg:'rgba(245,197,24,.1)',  status:'error',  roi:'+2.1%',  calls:23,   subs:5   },
]

export default function AgentsSection() {
  const { setDashSection, showToast } = useContext(AppContext)

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <div className="section-title">My AI Agents</div>
          <div className="section-sub">{AGENTS.length} agents deployed</div>
        </div>
        <button className="btn btn-primary" onClick={() => setDashSection('builder')}>+ New Agent</button>
      </div>

      <div className="grid-auto">
        {AGENTS.map(a => (
          <div key={a.name} className="card" style={{ cursor:'pointer' }} onClick={() => showToast(`Viewing ${a.name}`)}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:a.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                {a.icon}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14 }}>{a.name}</div>
                <div style={{ fontSize:11, color:'var(--text2)' }}>{a.type}</div>
              </div>
              <div className={`badge-pill badge-${a.status}`}>
                {a.status==='active' ? '● Active' : a.status==='idle' ? '○ Idle' : '⚠ Error'}
              </div>
            </div>
            <div style={{ display:'flex', gap:16, paddingTop:12, borderTop:'1px solid var(--border)' }}>
              {[['ROI', a.roi],['Calls', a.calls.toLocaleString()],['Subs', a.subs]].map(([k,v]) => (
                <div key={k} style={{ fontSize:11, color:'var(--text2)' }}>
                  <div style={{ fontWeight:700, fontSize:14, color:'var(--text)', marginBottom:1 }}>{v}</div>
                  {k}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:8, marginTop:12 }}>
              <button className="btn btn-ghost" style={{ flex:1, fontSize:12, padding:'6px' }} onClick={e=>{e.stopPropagation();showToast(`Editing ${a.name}`)}}>Edit</button>
              <button className="btn" style={{ flex:1, fontSize:12, padding:'6px', background:'rgba(108,99,255,.15)', color:'var(--accent)', border:'1px solid rgba(108,99,255,.25)' }}
                onClick={e=>{e.stopPropagation();showToast(`Published ${a.name} to marketplace`)}}>Publish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
