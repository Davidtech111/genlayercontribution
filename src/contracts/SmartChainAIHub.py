# v0.2.16
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *

import json


class SmartChainAIHub(gl.Contract):

    agents_json: str
    subscriptions_json: str
    revenue_json: str
    scores_json: str
    user_points_json: str

    def __init__(self) -> None:
        self.agents_json        = json.dumps({})
        self.subscriptions_json = json.dumps({})
        self.revenue_json       = json.dumps({})
        self.scores_json        = json.dumps({})
        self.user_points_json   = json.dumps({})

    def _load(self, field: str) -> dict:
        return json.loads(getattr(self, field))

    def _save(self, field: str, data: dict) -> None:
        setattr(self, field, json.dumps(data))

    def _award_points(self, address: str, points: int) -> None:
        pts = self._load("user_points_json")
        pts[address] = pts.get(address, 0) + points
        self._save("user_points_json", pts)

    @gl.public.write
    def register_agent(self, agent_id: str, name: str, agent_type: str, price_usd: int, model: str, chain: str) -> None:
        agents = self._load("agents_json")
        assert agent_id not in agents, "Agent ID already exists"
        assert len(name) > 0, "Name cannot be empty"
        owner = str(contract_runner.from_address)
        agents[agent_id] = {"name": name, "type": agent_type, "price_usd": price_usd, "model": model, "chain": chain, "owner": owner, "active": True, "calls": 0, "subscribers": 0}
        self._save("agents_json", agents)
        self._award_points(owner, 100)

    @gl.public.write
    def deactivate_agent(self, agent_id: str) -> None:
        agents = self._load("agents_json")
        assert agent_id in agents, "Agent not found"
        assert agents[agent_id]["owner"] == str(contract_runner.from_address), "Not the agent owner"
        agents[agent_id]["active"] = False
        self._save("agents_json", agents)

    @gl.public.view
    def get_agent(self, agent_id: str) -> str:
        agents = self._load("agents_json")
        assert agent_id in agents, "Agent not found"
        return json.dumps(agents[agent_id])

    @gl.public.view
    def get_all_agents(self) -> str:
        agents = self._load("agents_json")
        active = [{"id": k, **v} for k, v in agents.items() if not k.startswith("__") and v.get("active", True)]
        return json.dumps(active)

    @gl.public.write
    def subscribe(self, agent_id: str) -> None:
        agents = self._load("agents_json")
        assert agent_id in agents, "Agent not found"
        assert agents[agent_id]["active"], "Agent is not active"
        subscriber = str(contract_runner.from_address)
        owner = agents[agent_id]["owner"]
        assert subscriber != owner, "Cannot subscribe to your own agent"
        subs = self._load("subscriptions_json")
        agent_subs = subs.get(agent_id, [])
        assert subscriber not in agent_subs, "Already subscribed"
        agent_subs.append(subscriber)
        subs[agent_id] = agent_subs
        self._save("subscriptions_json", subs)
        agents[agent_id]["subscribers"] = len(agent_subs)
        self._save("agents_json", agents)
        price = agents[agent_id].get("price_usd", 0)
        if price > 0:
            rev = self._load("revenue_json")
            rev[owner] = rev.get(owner, 0) + price
            self._save("revenue_json", rev)
        self._award_points(subscriber, 10)

    @gl.public.write
    def record_call(self, agent_id: str) -> None:
        agents = self._load("agents_json")
        assert agent_id in agents, "Agent not found"
        agents[agent_id]["calls"] = agents[agent_id].get("calls", 0) + 1
        self._save("agents_json", agents)
        scores = self._load("scores_json")
        scores[agent_id] = scores.get(agent_id, 0) + 1
        self._save("scores_json", scores)

    @gl.public.view
    def get_revenue(self, owner_address: str) -> int:
        rev = self._load("revenue_json")
        return rev.get(owner_address, 0)

    @gl.public.view
    def get_subscriptions(self, agent_id: str) -> str:
        subs = self._load("subscriptions_json")
        return json.dumps(subs.get(agent_id, []))

    @gl.public.write
    def update_score(self, agent_id: str, delta: int) -> None:
        agents = self._load("agents_json")
        assert agent_id in agents, "Agent not found"
        assert agents[agent_id]["owner"] == str(contract_runner.from_address), "Not the agent owner"
        scores = self._load("scores_json")
        scores[agent_id] = scores.get(agent_id, 0) + delta
        self._save("scores_json", scores)

    @gl.public.view
    def get_leaderboard(self) -> str:
        agents = self._load("agents_json")
        scores = self._load("scores_json")
        entries = []
        for agent_id, score in scores.items():
            if agent_id in agents:
                entry = {"agent_id": agent_id, "score": score}
                entry.update(agents[agent_id])
                entries.append(entry)
        entries.sort(key=lambda x: x["score"], reverse=True)
        return json.dumps(entries[:20])

    @gl.public.view
    def get_score(self, agent_id: str) -> int:
        scores = self._load("scores_json")
        return scores.get(agent_id, 0)

    @gl.public.write
    def get_market_signal(self, asset: str) -> None:
        url = f"https://api.coingecko.com/api/v3/simple/price?ids={asset}&vs_currencies=usd&include_24hr_change=true"
        def fetch_and_analyze():
            web_data = gl.get_webpage(url, mode="text")
            return gl.exec_prompt(f"You are a crypto analyst. Price data: {web_data}\n\nGive a one-sentence signal for {asset}. Start with BULLISH, BEARISH, or NEUTRAL. Include current price and 24h change. Max 25 words.")
        signal = gl.eq_principle_prompt_comparative(fetch_and_analyze, "The trading direction (BULLISH/BEARISH/NEUTRAL) must match.")
        data = self._load("agents_json")
        data[f"__signal_{asset}"] = signal
        self._save("agents_json", data)

    @gl.public.write
    def detect_risk(self, wallet_address: str) -> None:
        def analyze():
            return gl.exec_prompt(f"You are a blockchain security analyst.\nAssess wallet risk: {wallet_address}\n\nReply ONLY with valid JSON:\n{{\"risk_level\": \"LOW\", \"reason\": \"normal activity\", \"score\": 10}}\n\nrisk_level must be LOW, MEDIUM, or HIGH.")
        risk_result = gl.eq_principle_prompt_comparative(analyze, "The risk_level (LOW/MEDIUM/HIGH) must match.")
        data = self._load("agents_json")
        data[f"__risk_{wallet_address}"] = risk_result
        self._save("agents_json", data)

    @gl.public.view
    def get_signal(self, asset: str) -> str:
        data = self._load("agents_json")
        return data.get(f"__signal_{asset}", "No signal yet. Call get_market_signal first.")

    @gl.public.view
    def get_risk(self, wallet_address: str) -> str:
        data = self._load("agents_json")
        return data.get(f"__risk_{wallet_address}", "No assessment yet. Call detect_risk first.")

    @gl.public.view
    def get_points(self, address: str) -> int:
        pts = self._load("user_points_json")
        return pts.get(address, 0)

    @gl.public.view
    def get_top_users(self) -> str:
        pts = self._load("user_points_json")
        entries = [{"address": k, "points": v} for k, v in pts.items()]
        entries.sort(key=lambda x: x["points"], reverse=True)
        return json.dumps(entries[:10])

    @gl.public.view
    def get_stats(self) -> str:
        agents = self._load("agents_json")
        subs   = self._load("subscriptions_json")
        scores = self._load("scores_json")
        pts    = self._load("user_points_json")
        active = [v for k, v in agents.items() if not k.startswith("__") and isinstance(v, dict) and v.get("active")]
        total_calls = sum(v.get("calls", 0) for k, v in agents.items() if not k.startswith("__") and isinstance(v, dict))
        return json.dumps({"total_agents": len(active), "total_users": len(pts), "total_subs": sum(len(v) for v in subs.values()), "total_calls": total_calls, "agents_on_lb": len(scores)})