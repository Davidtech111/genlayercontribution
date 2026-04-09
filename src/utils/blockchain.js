// src/utils/blockchain.js
// GenLayer + Ethereum blockchain utility functions

// ─────────────────────────────────────────────────────────────────
// STEP 1: Paste your deployed contract address here after deploying
// on GenLayer Studio. You find it in the left panel after Deploy.
//
export const CONTRACT_ADDRESS = '0xb5C4A0Fb062D2bD0206df13bf4e1a72BF556e24F'
//
// Example:
// export const CONTRACT_ADDRESS = '0x4a2b9f31c8e1d3a7b5f2e9c4d6a8b1e3f5c7d9a2'
// ─────────────────────────────────────────────────────────────────

const GENLAYER_RPC = 'https://studio.genlayer.com/api'

// ─── GenLayer Contract Calls ──────────────────────────────────────

/**
 * Call a READ (view) method — free, no gas, no wallet needed.
 */
export async function readContract(method, params = []) {
  try {
    const res = await fetch(GENLAYER_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params: [{ to: CONTRACT_ADDRESS, data: encodeCall(method, params) }, 'latest'],
      }),
    })
    const json = await res.json()
    return json.result ?? null
  } catch (err) {
    console.error(`[GenLayer] readContract(${method}) failed:`, err)
    return null
  }
}

/**
 * Call a WRITE method — requires MetaMask wallet, costs gas.
 * Returns transaction hash.
 */
export async function writeContract(method, params = []) {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('No wallet detected. Please install MetaMask.')
  }
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  const txHash = await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
      from: accounts[0],
      to: CONTRACT_ADDRESS,
      data: encodeCall(method, params),
      gas: '0x100000',
    }],
  })
  return txHash
}

/** Encode a method call as hex for GenLayer RPC */
function encodeCall(method, params) {
  const payload = JSON.stringify({ method, params })
  return '0x' + Array.from(new TextEncoder().encode(payload))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}

// ─── Named Contract Helpers ───────────────────────────────────────
// Use these directly in your React components.

/** Register a new AI agent on-chain */
export async function registerAgent(agentId, name, type, priceUsd, model, chain) {
  return writeContract('register_agent', [agentId, name, type, priceUsd, model, chain])
}

/** Get all active agents */
export async function getAllAgents() {
  const raw = await readContract('get_all_agents', [])
  try { return JSON.parse(raw || '[]') } catch { return [] }
}

/** Get leaderboard (top 20 by score) */
export async function getLeaderboard() {
  const raw = await readContract('get_leaderboard', [])
  try { return JSON.parse(raw || '[]') } catch { return [] }
}

/** Subscribe to an agent */
export async function subscribeToAgent(agentId) {
  return writeContract('subscribe', [agentId])
}

/** Get platform-wide stats */
export async function getPlatformStats() {
  const raw = await readContract('get_stats', [])
  try { return JSON.parse(raw || '{}') } catch { return {} }
}

/** Trigger AI market signal for an asset (e.g. 'ethereum', 'bitcoin') */
export async function triggerMarketSignal(asset) {
  return writeContract('get_market_signal', [asset])
}

/** Read the last stored market signal for an asset */
export async function readMarketSignal(asset) {
  return readContract('get_signal', [asset])
}

/** Get XP points for a wallet address */
export async function getUserPoints(address) {
  return readContract('get_points', [address])
}

/** Get top 10 users by XP */
export async function getTopUsers() {
  const raw = await readContract('get_top_users', [])
  try { return JSON.parse(raw || '[]') } catch { return [] }
}

/** Record an agent API call (increments call counter + score) */
export async function recordAgentCall(agentId) {
  return writeContract('record_call', [agentId])
}

/** Run AI wallet risk detection */
export async function detectWalletRisk(walletAddress) {
  return writeContract('detect_risk', [walletAddress])
}

/** Read stored risk result for a wallet */
export async function readWalletRisk(walletAddress) {
  return readContract('get_risk', [walletAddress])
}

// ─── Wallet Helpers ───────────────────────────────────────────────

/** Connect MetaMask and return the address */
export async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('No Web3 wallet detected. Please install MetaMask.')
  }
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
  if (!accounts || accounts.length === 0) throw new Error('No accounts found')
  return accounts[0]
}

/** Get connected wallet address (if already connected) */
export async function getWalletAddress() {
  if (typeof window.ethereum === 'undefined') return null
  const accounts = await window.ethereum.request({ method: 'eth_accounts' })
  return accounts[0] || null
}

/** Get ETH balance for an address */
export async function getBalance(address) {
  if (typeof window.ethereum === 'undefined') return '0'
  const hex = await window.ethereum.request({
    method: 'eth_getBalance',
    params: [address, 'latest'],
  })
  return (parseInt(hex, 16) / 1e18).toFixed(4)
}

// ─── Price Feed ───────────────────────────────────────────────────

/** Fetch live crypto prices from CoinGecko */
export async function fetchPrices(coins = ['ethereum', 'bitcoin']) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_24hr_change=true`
    )
    return await res.json()
  } catch {
    return {
      ethereum: { usd: 3412, usd_24h_change: 2.4 },
      bitcoin:  { usd: 67200, usd_24h_change: -1.2 },
    }
  }
}

// ─── Formatting Helpers ───────────────────────────────────────────

export function truncateAddress(address, chars = 4) {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function formatUSD(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export function formatCompact(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000)     return (num / 1_000).toFixed(1) + 'K'
  return String(num)
}

export function generateAgentId() {
  return 'agent_' + Math.random().toString(36).slice(2, 10)
}
