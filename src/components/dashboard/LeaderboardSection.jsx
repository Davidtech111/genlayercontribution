import React from 'react'

const LB = [
  { rank:1, name:'Sigma Scalper X',  creator:'0xDev',     type:'HFT Trading', roi:'+142%', perf:95, subs:1240 },
  { rank:2, name:'Alpha Trader Pro', creator:'You',        type:'Trading',     roi:'+87%',  perf:80, subs:890  },
  { rank:3, name:'Risk Guardian',    creator:'You',        type:'Security',    roi:'N/A',   perf:72, subs:640  },
  { rank:4, name:'ArbiBot Supreme',  creator:'DecentLabs', type:'Arbitrage',  roi:'+65%',  perf:68, subs:512  },
  { rank:5, name:'Yield Optimizer',  creator:'YieldFarm',  type:'DeFi',       roi:'+48%',  perf:55, subs:401  },
  { rank:6, name:'NFT Sniper AI',    creator:'0xWha',      type:'NFT',        roi:'+33%',  perf:44, subs:290  },
  { rank:7, name:'News Sentinel',    creator:'You',        type:'Research',   roi:'N/A',   perf:40, subs:201  },
]

const MEDALS = ['🥇','🥈','🥉']

export default function LeaderboardSection() {
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div className="section-title">Global Leaderboard</div>
        <div className="section-sub">Top performing AI agents this week</div>
      </div>

      <div style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid var(--border)' }}>
              {['#','Agent','Creator','Type','ROI','Performance','Subs'].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'10px 14px', fontSize:11, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {LB.map(row => (
              <tr key={row.rank} style={{ borderBottom:'1px solid var(--border)', transition:'background .15s', cursor:'pointer' }}
                onMouseEnter={e=>e.currentTarget.style.background='var(--bg3)'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}
              >
                <td style={{ padding:'12px 14px', fontSize:18, fontWeight:800, color: row.rank===1?'#f5c518':row.rank===2?'#9ca3d4':row.rank===3?'#cd7f32':'var(--text3)' }}>
                  {row.rank <= 3 ? MEDALS[row.rank-1] : row.rank}
                </td>
                <td style={{ padding:'12px 14px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:30, height:30, borderRadius:8, background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>
                      {row.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight:600, fontSize:13 }}>{row.name}</span>
                    {row.creator==='You' && <span style={{ fontSize:10, color:'var(--accent)', background:'rgba(108,99,255,.15)', padding:'2px 6px', borderRadius:4 }}>YOU</span>}
                  </div>
                </td>
                <td style={{ padding:'12px 14px', fontSize:12, color:'var(--text2)' }}>{row.creator}</td>
                <td style={{ padding:'12px 14px' }}><span className="tag">{row.type}</span></td>
                <td style={{ padding:'12px 14px', fontWeight:700, color: row.roi.includes('-') ? 'var(--danger)' : row.roi==='N/A' ? 'var(--text2)' : 'var(--accent4)' }}>{row.roi}</td>
                <td style={{ padding:'12px 14px', minWidth:100 }}>
                  <div style={{ height:6, borderRadius:3, background:'var(--bg3)', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${row.perf}%`, background:'linear-gradient(90deg,var(--accent),var(--accent2))', borderRadius:3 }} />
                  </div>
                  <div style={{ fontSize:10, color:'var(--text3)', marginTop:3 }}>{row.perf}/100</div>
                </td>
                <td style={{ padding:'12px 14px', fontWeight:700 }}>{row.subs.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
