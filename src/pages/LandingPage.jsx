import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../App.jsx'

const FEATURES = [
  { icon:'🤖', color:'rgba(108,99,255,.15)', title:'AI Agent Builder', desc:'No-code interface to build custom trading bots, research assistants, and business agents with 6+ prebuilt templates.' },
  { icon:'⛓️', color:'rgba(0,212,255,.1)',   title:'Blockchain Integration', desc:'Connect wallets, track live transactions, balances, and smart contracts. Real-time crypto analytics dashboard.' },
  { icon:'📜', color:'rgba(0,255,136,.1)',   title:'Smart Contract Execution', desc:'Agents autonomously execute buy/sell, send funds, and interact with dApps via GenLayer Intelligent Contracts.' },
  { icon:'💰', color:'rgba(255,107,157,.1)', title:'Creator Monetization', desc:'Publish agents to the marketplace. Earn from subscriptions and pay-per-use. Full revenue tracking dashboard.' },
  { icon:'🏆', color:'rgba(245,197,24,.1)',  title:'Leaderboards & Social', desc:'Compete, get rated, share agent profiles. Weekly challenge rankings with real crypto rewards.' },
  { icon:'🎮', color:'rgba(108,99,255,.15)', title:'Gamification', desc:'XP, levels, badges, and points for usage and creation. Weekly challenges with crypto prizes.' },
  { icon:'🎙️', color:'rgba(0,212,255,.1)',   title:'Voice AI Control', desc:'Speak commands to your agents in natural language. Voice-driven trading, research, and analytics.' },
  { icon:'🛡️', color:'rgba(255,74,107,.1)',  title:'AI Risk Detection', desc:'Fraud and scam alerts powered by ML. Real-time on-chain anomaly monitoring to protect your assets.' },
]

const STATS = [
  { id:'s1', end:2847,    label:'AI Agents Deployed', prefix:'' },
  { id:'s2', end:4.2,     label:'Total Volume',        prefix:'$', suffix:'M' },
  { id:'s3', end:18400,   label:'Active Users',         prefix:'' },
  { id:'s4', end:9.2,     label:'Transactions',         prefix:'', suffix:'M' },
]

function useCountUp(ref, end, prefix='', suffix='') {
  useEffect(() => {
    let start = 0
    const step = end / 60
    const timer = setInterval(() => {
      start = Math.min(start + step, end)
      if (ref.current) {
        const val = end < 100 ? start.toFixed(1) : Math.floor(start).toLocaleString()
        ref.current.textContent = prefix + val + (suffix || '')
      }
      if (start >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [])
}

function StatCard({ stat }) {
  const ref = useRef()
  useCountUp(ref, stat.end, stat.prefix, stat.suffix)
  return (
    <div className="card" style={{ textAlign:'center', padding:'20px 16px' }}>
      <div ref={ref} style={{
        fontSize:26, fontWeight:800,
        background:'linear-gradient(135deg,#6c63ff,#00d4ff)',
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
      }}>0</div>
      <div style={{ fontSize:12, color:'var(--text2)', marginTop:4 }}>{stat.label}</div>
    </div>
  )
}

export default function LandingPage() {
  const { navigate } = useContext(AppContext)

  return (
    <div style={{ minHeight:'calc(100vh - 56px)', animation:'fadeIn .4s ease' }}>

      {/* Hero */}
      <div style={{ padding:'80px 24px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        {/* bg grid */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(#1e2245 1px,transparent 1px),linear-gradient(90deg,#1e2245 1px,transparent 1px)',
          backgroundSize:'40px 40px', opacity:.25, pointerEvents:'none',
        }} />
        <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(ellipse at 50% 0%,rgba(108,99,255,.13) 0%,transparent 70%)',
          pointerEvents:'none',
        }} />

        <div style={{ position:'relative' }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 14px', borderRadius:20,
            background:'rgba(108,99,255,.12)', border:'1px solid rgba(108,99,255,.3)',
            color:'#6c63ff', fontSize:12, marginBottom:24,
          }}>
            ⚡ Built on GenLayer • Next-gen Web3 AI
          </div>

          <h1 style={{
            fontSize:'clamp(28px,5vw,52px)', fontWeight:800, lineHeight:1.1, marginBottom:16,
            background:'linear-gradient(135deg,#fff 30%,#00d4ff)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          }}>
            The AI-Powered<br/>Blockchain Intelligence Layer
          </h1>

          <p style={{ fontSize:16, color:'var(--text2)', maxWidth:560, margin:'0 auto 36px', lineHeight:1.7 }}>
            Create, deploy, and monetize AI agents that interact with blockchain data
            and real-world APIs — all in one decentralized platform.
          </p>

          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn btn-primary" style={{ fontSize:15, padding:'13px 32px' }} onClick={() => navigate('dashboard')}>
              🚀 Launch App
            </button>
            <button className="btn btn-ghost" style={{ fontSize:15, padding:'13px 32px' }} onClick={() => navigate('demo')}>
              ▶ View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:16, maxWidth:700, margin:'0 auto', padding:'0 24px' }}>
        {STATS.map(s => <StatCard key={s.id} stat={s} />)}
      </div>

      {/* Features */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20, padding:'60px 24px', maxWidth:1100, margin:'0 auto' }}>
        {FEATURES.map(f => (
          <div key={f.title} className="card" style={{ cursor:'default' }}>
            <div style={{ width:42, height:42, borderRadius:10, background:f.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:14 }}>
              {f.icon}
            </div>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:8 }}>{f.title}</div>
            <div style={{ fontSize:13, color:'var(--text2)', lineHeight:1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div style={{
        margin:'0 24px 60px', padding:'40px', borderRadius:20,
        background:'linear-gradient(135deg,rgba(108,99,255,.15),rgba(0,212,255,.08))',
        border:'1px solid rgba(108,99,255,.25)', textAlign:'center',
      }}>
        <h2 style={{ fontSize:24, fontWeight:800, marginBottom:10 }}>Ready to build your first AI agent?</h2>
        <p style={{ color:'var(--text2)', marginBottom:24 }}>Join 18,400+ users already deploying on GenLayer</p>
        <button className="btn btn-primary" style={{ fontSize:14, padding:'12px 32px' }} onClick={() => navigate('dashboard','builder')}>
          + Create Your First Agent
        </button>
      </div>

      {/* Footer */}
      <div style={{ padding:'24px', textAlign:'center', borderTop:'1px solid var(--border)', color:'var(--text3)', fontSize:12 }}>
        Built on GenLayer Protocol • Powered by Intelligent Contracts™ • SmartChain AI Hub 2025
      </div>
    </div>
  )
}
