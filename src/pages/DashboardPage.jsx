import React, { useContext } from 'react'
import { AppContext } from '../App.jsx'
import OverviewSection    from '../components/dashboard/OverviewSection.jsx'
import AgentsSection      from '../components/dashboard/AgentsSection.jsx'
import AnalyticsSection   from '../components/dashboard/AnalyticsSection.jsx'
import BuilderSection     from '../components/dashboard/BuilderSection.jsx'
import MarketplaceSection from '../components/dashboard/MarketplaceSection.jsx'
import LeaderboardSection from '../components/dashboard/LeaderboardSection.jsx'
import GamificationSection from '../components/dashboard/GamificationSection.jsx'
import VoiceSection       from '../components/dashboard/VoiceSection.jsx'

const SIDEBAR_ITEMS = [
  { section:'overview',     icon:'📊', label:'Overview',    group:'Overview' },
  { section:'agents',       icon:'🤖', label:'My Agents',   group:null },
  { section:'analytics',    icon:'📈', label:'Analytics',   group:null },
  { section:'builder',      icon:'⚙️', label:'Agent Builder', group:'Create' },
  { section:'market',       icon:'🛒', label:'Marketplace', group:null },
  { section:'leaderboard',  icon:'🏆', label:'Leaderboard', group:'Community' },
  { section:'gamification', icon:'🎮', label:'Rewards',     group:null },
  { section:'voice',        icon:'🎙️', label:'Voice AI',    group:null },
]

const SECTION_MAP = {
  overview:     OverviewSection,
  agents:       AgentsSection,
  analytics:    AnalyticsSection,
  builder:      BuilderSection,
  market:       MarketplaceSection,
  leaderboard:  LeaderboardSection,
  gamification: GamificationSection,
  voice:        VoiceSection,
}

export default function DashboardPage() {
  const { dashSection, setDashSection } = useContext(AppContext)
  const ActiveSection = SECTION_MAP[dashSection] || OverviewSection
  let lastGroup = null

  return (
    <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', minHeight:'calc(100vh - 56px)' }}>

      {/* Sidebar */}
      <div style={{ background:'var(--bg2)', borderRight:'1px solid var(--border)', padding:'16px 10px', overflowY:'auto' }}>
        {SIDEBAR_ITEMS.map(item => {
          const showGroup = item.group && item.group !== lastGroup
          if (item.group) lastGroup = item.group
          return (
            <React.Fragment key={item.section}>
              {showGroup && (
                <div style={{ fontSize:10, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'.8px', margin:'18px 0 6px 8px' }}>
                  {item.group}
                </div>
              )}
              <div
                onClick={() => setDashSection(item.section)}
                style={{
                  display:'flex', alignItems:'center', gap:9,
                  padding:'8px 10px', borderRadius:8, cursor:'pointer',
                  background: dashSection===item.section ? 'var(--bg4)' : 'transparent',
                  color: dashSection===item.section ? 'var(--accent)' : 'var(--text2)',
                  fontWeight: dashSection===item.section ? 600 : 400,
                  fontSize:13, marginBottom:2, transition:'all .15s',
                }}
              >
                <span style={{ fontSize:14 }}>{item.icon}</span>
                {item.label}
              </div>
            </React.Fragment>
          )
        })}
      </div>

      {/* Main content */}
      <div style={{ padding:24, overflowY:'auto', animation:'fadeIn .3s ease' }}>
        <ActiveSection />
      </div>
    </div>
  )
}
