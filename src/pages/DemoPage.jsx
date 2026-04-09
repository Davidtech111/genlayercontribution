import React, { useState, useRef, useContext } from 'react'
import { AppContext } from '../App.jsx'

const DEMO_LINES = [
  { text:'> Initializing SmartChain AI Agent v2.1...', color:null },
  { text:'> Connecting to GenLayer RPC endpoint...', color:null },
  { text:'> Fetching ETH/USD price: $3,412.55', color:null },
  { text:'> Fetching BTC/USD price: $67,234.10', color:null },
  { text:'> Analyzing market conditions with ML model...', color:null },
  { text:'> ETH momentum: BULLISH (78% confidence)', color:'var(--accent4)' },
  { text:'> Checking portfolio allocation: ETH at 24% (target 30%)', color:null },
  { text:'> Decision: BUY 0.05 ETH at $3,412.55', color:'var(--accent2)' },
  { text:'> Estimating gas: 21,000 units (~$7.17)', color:null },
  { text:'> Signing transaction via Intelligent Contract...', color:null },
  { text:'> TX Hash: 0xfe91a23d4b11...c99f', color:null },
  { text:'> Confirmed in block #18,942,310 ✓', color:'var(--accent4)' },
  { text:'> Trade executed: +0.05 ETH | P&L: +$23.40', color:'var(--accent4)' },
  { text:'> Agent entering monitoring mode... next run in 15min', color:'var(--text2)' },
]

const CONTRACT_OUTPUTS = {
  'getBalance()':        '> Calling getBalance() on 0x4a2b...GenLayer\n> Block: #18,942,322\n> Result: 12.4031 ETH ($42,341.57)\n> Gas used: 21,000\n> Status: SUCCESS ✓',
  'transfer(to,amount)': '> Calling transfer(0x9f2a...b44c, 0.5 ETH)\n> Estimating gas: 21,000 units\n> Signing with agent keypair...\n> TX Hash: 0xfe91...a23d\n> Confirmed in 12 seconds ✓',
  'stake(amount)':       '> Calling stake(10.0 ETH)\n> Checking allowance...\n> Approval confirmed\n> Staking to validator pool 0x7c1b...\n> APY: 5.2% | Lock period: 30 days\n> Stake confirmed ✓',
  'queryAI(prompt)':     '> Calling Intelligent Contract queryAI()\n> Prompt: "What is the optimal gas price?"\n> Sending to GenLayer validator nodes...\n> Consensus reached across 5 validators\n> Response: "Optimal: 23 gwei (fast: 45 gwei)"\n> Status: SUCCESS ✓',
}

export default function DemoPage() {
  const { navigate } = useContext(AppContext)
  const [lines, setLines] = useState([])
  const [running, setRunning] = useState(false)
  const [contractFn, setContractFn] = useState('getBalance()')
  const [contractOut, setContractOut] = useState('// Select a function and click Execute')
  const termRef = useRef()

  function runAgent() {
    if (running) return
    setRunning(true)
    setLines([])
    let i = 0
    const timer = setInterval(() => {
      if (i >= DEMO_LINES.length) { setRunning(false); clearInterval(timer); return }
      setLines(l => [...l, DEMO_LINES[i]])
      i++
      if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
    }, 220)
  }

  function callContract() {
    setContractOut('> Executing...')
    setTimeout(() => setContractOut(CONTRACT_OUTPUTS[contractFn] || '// Unknown function'), 600)
  }

  return (
    <div style={{ maxWidth:900, margin:'0 auto', padding:'40px 24px', animation:'fadeIn .4s ease' }}>
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:40 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 14px', borderRadius:20, background:'rgba(0,212,255,.1)', border:'1px solid rgba(0,212,255,.25)', color:'var(--accent2)', fontSize:12, marginBottom:16 }}>
          🎬 Live Interactive Demo
        </div>
        <h1 style={{ fontSize:32, fontWeight:800, marginBottom:8, background:'linear-gradient(135deg,#fff 30%,#00d4ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          See SmartChain AI Hub in Action
        </h1>
        <p style={{ color:'var(--text2)', fontSize:15 }}>Interactive demos of all core features</p>
      </div>

      <div style={{ display:'grid', gap:20 }}>

        {/* Demo 1 — Agent Terminal */}
        <div className="card">
          <div style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>🤖 Demo 1: AI Agent Execution</div>
          <div style={{ fontSize:13, color:'var(--text2)', marginBottom:16 }}>
            Watch a crypto trading agent analyze the market and execute a trade on GenLayer in real-time.
          </div>
          <div ref={termRef} style={{
            background:'#04050a', border:'1px solid var(--border)', borderRadius:8,
            padding:16, fontFamily:'var(--mono)', fontSize:12, minHeight:160, maxHeight:260,
            overflowY:'auto', lineHeight:1.9,
          }}>
            {lines.length === 0 && <span style={{ color:'var(--text3)' }}>// Click "Run Agent" to start the demo</span>}
            {lines.map((l,i) => (
              <div key={i} style={{ color: l.color || 'var(--accent4)' }}>{l.text}</div>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, marginTop:12 }}>
            <button className="btn btn-primary" onClick={runAgent} disabled={running}>
              {running ? '⏳ Running...' : '▶ Run Agent'}
            </button>
            <button className="btn btn-ghost" onClick={() => setLines([])}>Clear</button>
          </div>
        </div>

        {/* Demo 2 — Smart Contract */}
        <div className="card">
          <div style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>📜 Demo 2: GenLayer Smart Contract</div>
          <div style={{ fontSize:13, color:'var(--text2)', marginBottom:16 }}>
            Simulate an agent calling functions on a GenLayer Intelligent Contract.
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
            <div>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text2)', marginBottom:6 }}>Contract Address</label>
              <input className="input" defaultValue="0x4a2b...GenLayer" readOnly style={{ color:'var(--text2)' }} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--text2)', marginBottom:6 }}>Function</label>
              <select className="select" value={contractFn} onChange={e => setContractFn(e.target.value)}>
                {Object.keys(CONTRACT_OUTPUTS).map(fn => <option key={fn}>{fn}</option>)}
              </select>
            </div>
          </div>
          <div style={{
            background:'#04050a', border:'1px solid var(--border)', borderRadius:8,
            padding:14, fontFamily:'var(--mono)', fontSize:12, minHeight:100,
            color:'var(--accent2)', lineHeight:1.9, whiteSpace:'pre-line',
          }}>
            {contractOut}
          </div>
          <button className="btn" onClick={callContract} style={{ marginTop:12, background:'rgba(0,212,255,.15)', color:'var(--accent2)', border:'1px solid rgba(0,212,255,.25)', fontWeight:700 }}>
            Execute Contract Call
          </button>
        </div>

        {/* Demo 3 — How It Works */}
        <div className="card">
          <div style={{ fontWeight:700, fontSize:16, marginBottom:20 }}>🧠 Demo 3: How SmartChain AI Hub Works</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:12 }}>
            {[
              { num:'1️⃣', title:'Build',    desc:'Create an AI agent using the no-code builder or choose a template' },
              { num:'2️⃣', title:'Deploy',   desc:'Deploy to GenLayer blockchain with smart contract rules attached' },
              { num:'3️⃣', title:'Execute',  desc:'Your agent runs autonomously, reading data and making decisions' },
              { num:'4️⃣', title:'Earn',     desc:'Publish to marketplace and earn from subscriptions and usage' },
              { num:'5️⃣', title:'Compete',  desc:'Join leaderboards, earn badges, win weekly challenge rewards' },
            ].map(s => (
              <div key={s.title} style={{ textAlign:'center', padding:'20px 14px', background:'var(--bg3)', borderRadius:12, border:'1px solid var(--border)' }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{s.num}</div>
                <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>{s.title}</div>
                <div style={{ fontSize:11, color:'var(--text2)', lineHeight:1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo 4 — Tech Stack */}
        <div className="card">
          <div style={{ fontWeight:700, fontSize:16, marginBottom:16 }}>⚙️ Demo 4: Tech Stack</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12 }}>
            {[
              { layer:'Frontend',    tech:'React 18 + Vite',                color:'var(--accent2)',  icon:'⚛️' },
              { layer:'Blockchain',  tech:'GenLayer Intelligent Contracts', color:'var(--accent)',   icon:'⛓️' },
              { layer:'AI Engine',   tech:'GPT-4o via OpenAI API',          color:'var(--accent4)',  icon:'🧠' },
              { layer:'Wallet',      tech:'EIP-1193 / MetaMask / WalletConnect', color:'var(--warn)', icon:'🔑' },
              { layer:'Data Feeds',  tech:'CoinGecko + Chainlink Oracles',  color:'var(--accent3)', icon:'📡' },
              { layer:'Storage',     tech:'IPFS + On-chain state',          color:'var(--text2)',   icon:'💾' },
            ].map(t => (
              <div key={t.layer} style={{ display:'flex', alignItems:'center', gap:12, padding:14, background:'var(--bg3)', borderRadius:10, border:'1px solid var(--border)' }}>
                <span style={{ fontSize:22 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize:11, color:'var(--text3)', marginBottom:2 }}>{t.layer}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:t.color }}>{t.tech}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center', padding:'30px 20px', borderRadius:16, background:'linear-gradient(135deg,rgba(108,99,255,.12),rgba(0,212,255,.07))', border:'1px solid rgba(108,99,255,.2)' }}>
          <div style={{ fontSize:22, fontWeight:800, marginBottom:8 }}>Ready to build?</div>
          <div style={{ color:'var(--text2)', marginBottom:20, fontSize:14 }}>Create your first AI agent on GenLayer in under 2 minutes</div>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary" style={{ fontSize:14, padding:'12px 28px' }} onClick={() => navigate('dashboard','builder')}>
              + Create Agent
            </button>
            <button className="btn btn-ghost" style={{ fontSize:14, padding:'12px 28px' }} onClick={() => navigate('dashboard','market')}>
              Browse Marketplace
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
