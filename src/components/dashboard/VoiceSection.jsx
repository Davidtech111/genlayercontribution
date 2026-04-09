import React, { useState } from 'react'

const VOICE_RESPONSES = {
  'Check my ETH balance':       'Your current ETH balance is 3.64 ETH (~$12,400 USD). You have 2 pending transactions and your wallet is on Ethereum Mainnet.',
  'Show portfolio performance':  'Your portfolio is up 12.4% today, outperforming the market by 3.2%. Total value: $48,234. Best performer: Alpha Trader Pro at +24.5% ROI.',
  'Buy 0.1 ETH at market':       'Market analysis: ETH at $3,412 with 74% confidence score for upward movement. Preparing transaction for 0.1 ETH. Gas estimate: $7.20. Awaiting confirmation.',
  'Alert if BTC drops 5%':       'Alert configured! You will be notified if BTC drops 5% from current $67,234. Threshold set at $63,872. Monitoring active across 3 exchanges.',
}

const QUICK_CMDS = Object.keys(VOICE_RESPONSES)

export default function VoiceSection() {
  const [listening, setListening] = useState(false)
  const [status, setStatus] = useState('Click the microphone to start')
  const [output, setOutput] = useState('Voice output will appear here...')
  const [history, setHistory] = useState([
    'Check my ETH balance → $12,400 (3.64 ETH)',
    'Show trading performance → +24.5% this month',
    'Set alert for BTC < $60k → Alert configured',
  ])

  function toggleVoice() {
    setListening(l => {
      if (!l) {
        setStatus('Listening... speak your command')
        setTimeout(() => { setListening(false); setStatus('Click the microphone to start') }, 3000)
        return true
      }
      setStatus('Click the microphone to start')
      return false
    })
  }

  function runCmd(cmd) {
    setStatus(`Processing: "${cmd}"...`)
    setOutput('Processing...')
    setTimeout(() => {
      const resp = VOICE_RESPONSES[cmd] || 'Command processed successfully.'
      setOutput(resp)
      setStatus('Command executed ✓')
      setHistory(h => [`${cmd} → Done`, ...h.slice(0,9)])
    }, 800)
  }

  return (
    <div>
      <div style={{ marginBottom:20 }}>
        <div className="section-title">Voice AI Control</div>
        <div className="section-sub">Speak to your agents in natural language</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, maxWidth:800 }}>
        {/* Voice panel */}
        <div className="card" style={{ textAlign:'center' }}>
          <div
            onClick={toggleVoice}
            style={{
              width:80, height:80, borderRadius:'50%', margin:'0 auto 20px',
              background: listening ? 'rgba(108,99,255,.3)' : 'rgba(108,99,255,.15)',
              border: `2px solid ${listening ? 'var(--accent)' : 'rgba(108,99,255,.3)'}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:32, cursor:'pointer', transition:'all .2s',
              animation: listening ? 'glow 1.5s infinite' : 'none',
            }}
          >
            🎙️
          </div>
          <div style={{ fontSize:14, color:'var(--text2)', marginBottom:16 }}>{status}</div>
          <div style={{
            background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:10,
            padding:14, minHeight:60, fontSize:13, textAlign:'left', lineHeight:1.6,
            color: output.includes('Processing') ? 'var(--text3)' : 'var(--text)',
          }}>
            {output}
          </div>
          <div style={{ marginTop:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--text3)', marginBottom:8, textAlign:'left' }}>QUICK COMMANDS</div>
            {QUICK_CMDS.map(cmd => (
              <div key={cmd} onClick={() => runCmd(cmd)} style={{
                padding:'8px 12px', borderRadius:8, background:'var(--bg3)',
                border:'1px solid var(--border)', color:'var(--text2)', fontSize:12,
                cursor:'pointer', textAlign:'left', marginBottom:6, transition:'all .2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(108,99,255,.1)';e.currentTarget.style.borderColor='rgba(108,99,255,.3)';e.currentTarget.style.color='var(--text)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='var(--bg3)';e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text2)'}}
              >
                💬 {cmd}
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        <div className="card">
          <div style={{ fontWeight:700, fontSize:14, marginBottom:14 }}>📋 Recent Voice Commands</div>
          {history.map((h,i) => (
            <div key={i} style={{ fontSize:12, color:'var(--text2)', lineHeight:2, borderBottom:'1px solid var(--border)', padding:'4px 0' }}>
              💬 {h}
            </div>
          ))}
          <div style={{ marginTop:20 }} className="card" style={{ background:'var(--bg3)', border:'1px solid var(--border)', padding:16, borderRadius:10, marginTop:16 }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Supported Commands</div>
            {['Check balance / portfolio','Buy / sell tokens','Set price alerts','Deploy / pause agents','Show analytics / charts','Search marketplace'].map(c => (
              <div key={c} style={{ fontSize:12, color:'var(--text2)', padding:'4px 0', display:'flex', gap:8 }}>
                <span style={{ color:'var(--accent4)' }}>✓</span> {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
