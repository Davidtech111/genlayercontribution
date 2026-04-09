# ⚡ SmartChain AI Hub

**A decentralized AI agent marketplace built on GenLayer.**

Create, deploy, and monetize AI agents that interact with blockchain data and real-world APIs.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd smartchain-ai-hub
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
```

---

## 🗂️ Project Structure

```
smartchain-ai-hub/
├── index.html                         # Entry HTML
├── vite.config.js                     # Vite config
├── package.json                       # Dependencies
└── src/
    ├── main.jsx                       # React entry point
    ├── App.jsx                        # Root app + context
    ├── styles/
    │   └── global.css                 # Dark Web3 theme
    ├── pages/
    │   ├── LandingPage.jsx            # Hero + features
    │   ├── DashboardPage.jsx          # Main dashboard
    │   └── DemoPage.jsx               # Interactive demos
    ├── components/
    │   ├── Navbar.jsx                 # Top navigation
    │   ├── Toast.jsx                  # Notifications
    │   └── dashboard/
    │       ├── OverviewSection.jsx    # Portfolio overview
    │       ├── AgentsSection.jsx      # My AI agents
    │       ├── AnalyticsSection.jsx   # ML predictions + sim trading
    │       ├── BuilderSection.jsx     # No-code agent builder
    │       ├── MarketplaceSection.jsx # Agent marketplace
    │       ├── LeaderboardSection.jsx # Global rankings
    │       ├── GamificationSection.jsx# Rewards + badges
    │       └── VoiceSection.jsx       # Voice AI control
    ├── contracts/
    │   └── SmartChainAIHub.py         # GenLayer Intelligent Contract
    └── utils/
        └── blockchain.js              # Web3 utility functions
```

---

## 🧠 Deploying the GenLayer Intelligent Contract

### Step 1 — Open GenLayer Studio
Go to [https://studio.genlayer.com](https://studio.genlayer.com)

### Step 2 — Create a new contract
- Click **"New Contract"**
- Paste the contents of `src/contracts/SmartChainAIHub.py`

### Step 3 — Deploy
- Click **"Deploy"**
- Copy the deployed contract address

### Step 4 — Connect to frontend
In `src/utils/blockchain.js`, update the contract address:

```js
const CONTRACT_ADDRESS = 'your_deployed_address_here'
```

Then uncomment and use the GenLayer SDK calls.

---

## 🔑 Environment Variables (optional)

Create a `.env` file in the root:

```env
VITE_OPENAI_API_KEY=your_key_here
VITE_CONTRACT_ADDRESS=your_genlayer_contract_address
VITE_COINGECKO_API_KEY=your_key_here
```

---

## ✨ Features

| Feature | Description |
|---|---|
| AI Agent Builder | No-code builder with 6 templates |
| Blockchain Integration | Wallet connect, live balances, tx tracking |
| Smart Contracts | GenLayer Intelligent Contract integration |
| Marketplace | Buy/sell AI agents with subscriptions |
| Leaderboard | Global rankings by performance |
| Gamification | XP, badges, weekly challenges |
| Voice AI | Voice command interface |
| Analytics | ML price predictions + auto trade sim |
| Risk Detection | AI-powered fraud/scam alerts |

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Vanilla CSS (dark Web3 theme)
- **Blockchain**: GenLayer Intelligent Contracts (Python)
- **AI**: GPT-4o via OpenAI API
- **Wallet**: EIP-1193 (MetaMask / WalletConnect)
- **Data**: CoinGecko + Chainlink Oracles

---

## 📦 Adding Real AI Calls

To connect real GPT-4o calls, update `src/utils/blockchain.js`:

```js
export async function callAI(prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
    }),
  })
  const data = await res.json()
  return data.choices[0].message.content
}
```

---

Built for **GenLayerPortal** — SmartChain AI Hub 2025
