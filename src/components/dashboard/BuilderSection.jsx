import React, { useState, useContext } from 'react'
import { AppContext } from '../../App.jsx'

const TEMPLATES = [
  { label:'🤖 Crypto Trader',      name:'Crypto Trader',      desc:'Watches price movements and executes trades based on predefined rules using real-time price feeds and technical indicators.' },
  { label:'🖼️ NFT Analyzer',       name:'NFT Analyzer',       desc:'Analyzes NFT collections, tracks floor prices, whale movements, and rarity rankings across OpenSea and Blur.' },
  { label:'📰 News Summarizer',    name:'News Summarizer',    desc:'Aggregates crypto news from 50+ sources, generates concise summaries, and alerts on market-moving events.' },
  { label:'💎 DeFi Monitor',       name:'DeFi Monitor',       desc:'Monitors DeFi protocols for yield opportunities, liquidation risks, and optimal entry/exit points.' },
  { label:'🔬 Research Assistant', name:'Research Assistant', desc:'Performs deep on-chain research on any project: tokenomics, team analysis, wallet tracking.' },
  { label:'⚙️ Custom Agent',       name:'Custom Agent',       desc:'Start from scratch. Define your own logic, data sources, and execution rules.' },
]

export default function BuilderSection() {
  const { showToast, setDashSection } = useContext(AppContext)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [agentName, setAgentName] = useState('')
  const [agentDesc, setAgentDesc] = useState('')
  const [rules, setRules] = useState(['IF ETH price > $3500 → SELL 10%','IF BTC drops > 5% → Send Alert'])
  const [ruleInput, setRuleInput] = useState('')

  function selectTemplate(t) {
    setSelectedTemplate(t.name)
    setAgentName(t.name)
    setAgentDesc(t.desc)
  }

  function addRule() {
    if (!ruleInput.trim()) return
    setRules(r => [...r, ruleInput.trim()])
    setRuleInput('')
  }

  function deploy() {
    if (!agentName.trim()) { showToast('Please enter an agent name'); return }
    showToast(`🚀 ${agentName} deployed on GenLayer!`)
    setTimeout(() => setDashSection('agents'), 1500)
  }

  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div className="section-title">Agent Builder</div>
        <div className="section-sub">No-code AI agent creation</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20 }}>
        <div>
          {/* Templates */}
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>📋 Choose Template</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {TEMPLATES.map(t => (
                <button key={t.name} onClick={() => selectTemplate(t)} style={{
                  padding:'10px 8px', borderRadius:8, cursor:'pointer', textAlign:'center',
                  fontFamily:'inherit', fontSize:12, transition:'all .2s',
                  background: selectedTemplate===t.name ? 'rgba(108,99,255,.15)' : 'var(--bg3)',
                  border: selectedTemplate===t.name ? '1px solid var(--accent)' : '1px solid var(--border)',
                  color: selectedTemplate===t.name ? 'var(--accent)' : 'var(--text2)',
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Config */}
          <div className="card">
            <div style={{ fontWeight:700, fontSize:14, marginBottom:16 }}>⚙️ Agent Configuration</div>
            {[
              { label:'Agent Name', el:<input className="input" value={agentName} onChange={e=>setAgentName(e.target.value)} placeholder="e.g. Alpha Trader Pro" /> },
              { label:'Description', el:<textarea className="textarea" value={agentDesc} onChange={e=>setAgentDesc(e.target.value)} placeholder="Describe what your agent does..." style={{ minHeight:70 }} /> },
              { label:'AI Model', el:(
                <select className="select">
                  <option>GPT-4o (Recommended)</option>
                  <option>Claude 3.5 Sonnet</option>
                  <option>Gemini Pro</option>
                  <option>Custom Fine-tuned</option>
                </select>
              )},
              { label:'Execution Chain', el:(
                <select className="select">
                  <option>GenLayer Testnet</option>
                  <option>Ethereum Mainnet</option>
                  <option>Polygon</option>
                  <option>Base</option>
                  <option>Arbitrum</option>
                </select>
              )},
            ].map(f => (
              <div key={f.label} style={{ marginBottom:14 }}>
                <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text2)', marginBottom:6 }}>{f.label}</label>
                {f.el}
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Rules */}
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>📏 Decision Rules</div>
            {rules.map((r,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', background:'var(--bg3)', borderRadius:8, marginBottom:8, fontSize:12, color:'var(--text2)' }}>
                <span style={{ flex:1 }}>{r}</span>
                <span onClick={() => setRules(rules.filter((_,j)=>j!==i))} style={{ cursor:'pointer', color:'var(--text3)', fontSize:16, lineHeight:1 }}>×</span>
              </div>
            ))}
            <div style={{ display:'flex', gap:8, marginTop:8 }}>
              <input className="input" value={ruleInput} onChange={e=>setRuleInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addRule()} placeholder="Add rule (natural language)..." style={{ flex:1 }} />
              <button className="btn btn-primary" style={{ padding:'9px 14px' }} onClick={addRule}>+</button>
            </div>
          </div>

          {/* Monetization */}
          <div className="card">
            <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>💰 Monetization</div>
            {[
              { label:'Pricing Model', el:(
                <select className="select">
                  <option>Free (Public)</option>
                  <option>Pay per use ($0.01/call)</option>
                  <option>Monthly subscription ($9.99)</option>
                  <option>Revenue share (5%)</option>
                </select>
              )},
              { label:'Max Budget (USD)', el:<input className="input" defaultValue="$500" /> },
              { label:'Execution Interval', el:(
                <select className="select">
                  <option>Every 15 minutes</option>
                  <option>Every hour</option>
                  <option>Every 6 hours</option>
                  <option>On trigger only</option>
                </select>
              )},
            ].map(f => (
              <div key={f.label} style={{ marginBottom:14 }}>
                <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text2)', marginBottom:6 }}>{f.label}</label>
                {f.el}
              </div>
            ))}
            <button onClick={deploy} style={{
              width:'100%', padding:13, borderRadius:10, border:'none', cursor:'pointer',
              background:'linear-gradient(135deg,var(--accent),var(--accent2))',
              color:'#fff', fontFamily:'inherit', fontSize:14, fontWeight:700, marginTop:4,
              transition:'all .2s',
            }}>
              🚀 Deploy Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
