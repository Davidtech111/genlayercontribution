import React from 'react'

const BADGES = [
  { icon:'🚀', name:'First Deploy',  desc:'Deployed first agent',  earned:true  },
  { icon:'💰', name:'Revenue Pro',   desc:'Earned $1,000+',        earned:true  },
  { icon:'🔥', name:'Hot Streak',    desc:'7-day active streak',   earned:true  },
  { icon:'🏆', name:'Top 10',        desc:'Leaderboard rank',      earned:true  },
  { icon:'🌐', name:'Multi-chain',   desc:'3+ chains used',        earned:true  },
  { icon:'🎯', name:'Sniper',        desc:'100% accuracy trade',   earned:false },
  { icon:'💎', name:'Diamond',       desc:'$10k+ revenue',         earned:false },
  { icon:'🧠', name:'AI Wizard',     desc:'10 agents created',     earned:false },
]

const CHALLENGES = [
  { icon:'⚡', name:'Speed Trader',    desc:'Execute 100 simulated trades this week',     reward:'+500 XP',      progress:60 },
  { icon:'🔬', name:'Research Guru',   desc:'Summarize 50 news articles via AI agent',   reward:'+300 XP',      progress:82 },
  { icon:'🤝', name:'Community Build', desc:'Get 10 new subscribers to your agents',     reward:'+400 XP + Badge', progress:30 },
  { icon:'🛡️', name:'Risk Warden',    desc:'Detect and flag 5 suspicious wallets',       reward:'+250 XP',      progress:100 },
]

export default function GamificationSection() {
  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div className="section-title">Rewards & Achievements</div>
        <div className="section-sub">Your progress on SmartChain AI Hub</div>
      </div>

      {/* Profile card */}
      <div className="card" style={{ marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <div style={{ width:56, height:56, borderRadius:14, background:'linear-gradient(135deg,var(--accent),var(--accent2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>
            👤
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:16 }}>CryptoBuilder_0x4a</div>
            <div style={{ fontSize:12, color:'var(--accent)', margin:'3px 0' }}>Level 12 — Chain Architect</div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
              <div style={{ flex:1, height:8, borderRadius:4, background:'var(--bg3)', overflow:'hidden' }}>
                <div style={{ height:'100%', width:'68%', background:'linear-gradient(90deg,var(--accent),var(--accent2))', borderRadius:4 }} />
              </div>
              <span style={{ fontSize:11, color:'var(--text2)', whiteSpace:'nowrap' }}>6,800 / 10,000 XP</span>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:26, fontWeight:800, color:'var(--accent)' }}>2,340</div>
            <div style={{ fontSize:11, color:'var(--text2)' }}>Total Points</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div style={{ fontWeight:700, fontSize:15, marginBottom:12 }}>Badges</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:10, marginBottom:24 }}>
        {BADGES.map(b => (
          <div key={b.name} style={{
            background:'var(--card)', borderRadius:12, padding:'16px 10px', textAlign:'center', cursor:'pointer',
            border: b.earned ? '1px solid rgba(108,99,255,.4)' : '1px solid var(--border)',
            background: b.earned ? 'rgba(108,99,255,.08)' : 'var(--card)',
            opacity: b.earned ? 1 : .45,
            transition:'all .2s',
          }}>
            <div style={{ fontSize:28, marginBottom:7 }}>{b.icon}</div>
            <div style={{ fontSize:11, fontWeight:700, marginBottom:3 }}>{b.name}</div>
            <div style={{ fontSize:10, color:'var(--text3)' }}>{b.desc}</div>
          </div>
        ))}
      </div>

      {/* Challenges */}
      <div style={{ fontWeight:700, fontSize:15, marginBottom:12 }}>Weekly Challenges</div>
      {CHALLENGES.map(c => (
        <div key={c.name} style={{ display:'flex', alignItems:'center', gap:14, padding:14, background:'var(--card)', border:'1px solid var(--border)', borderRadius:12, marginBottom:10 }}>
          <div style={{ width:40, height:40, borderRadius:10, background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
            {c.icon}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:600, fontSize:13, marginBottom:3 }}>
              {c.name}
              {c.progress===100 && <span style={{ marginLeft:8, fontSize:10, background:'rgba(0,255,136,.15)', color:'var(--accent4)', padding:'2px 7px', borderRadius:4, fontWeight:700 }}>DONE ✓</span>}
            </div>
            <div style={{ fontSize:11, color:'var(--text2)', marginBottom:8 }}>{c.desc}</div>
            <div style={{ height:5, borderRadius:3, background:'var(--bg3)', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${c.progress}%`, background: c.progress===100 ? 'var(--accent4)' : 'linear-gradient(90deg,var(--accent),var(--accent2))', borderRadius:3, transition:'width .5s' }} />
            </div>
            <div style={{ fontSize:10, color:'var(--text3)', marginTop:3 }}>{c.progress}% complete</div>
          </div>
          <div style={{ fontWeight:700, fontSize:12, color:'var(--accent)', textAlign:'right', minWidth:90 }}>{c.reward}</div>
        </div>
      ))}
    </div>
  )
}
