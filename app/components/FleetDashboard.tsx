"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jeollamxgbmlhvzdgoqt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implb2xsYW14Z2JtbGh2emRnb3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NzE5OTYsImV4cCI6MjA4ODM0Nzk5Nn0.vWHEwzboBGaR8nCzAQ7s7Pif6xEIPoa-vfKvv_FnKGc"
);

type Ping = { agent_id: string; status: string; current_task: string; last_ping: string };

const agents = {
  lim: { kanji: "臨", name: "LIM", role: "Architect", model: "claude-opus-4-6", fullName: "LIM (臨 presence)", theme: "Fleet orchestration & system design", tools: "All", subagents: "All agents", created: "2026-02-20" },
  sho: { kanji: "翔", name: "SHO", role: "DevOps", model: "gemini-3.1-pro", fullName: "SHO (翔 soar)", theme: "Deploy, infrastructure, CI/CD", tools: "All", subagents: "None", created: "2026-03-04" },
  nao: { kanji: "直", name: "NAO", role: "Content", model: "gemini-3.1-pro", fullName: "NAO (直 direct)", theme: "Copy & content", tools: "All", subagents: "None", created: "2026-03-04" },
  tai: { kanji: "泰", name: "TAI", role: "Research", model: "gemini-3.1-pro", fullName: "TAI (泰 great)", theme: "Web intelligence & deep research", tools: "All", subagents: "None", created: "2026-03-04" },
  yui: { kanji: "結", name: "YUI", role: "UX", model: "gemini-3.1-pro", fullName: "YUI (結 connect)", theme: "Performance coach & UX", tools: "All", subagents: "None", created: "2026-03-04" },
  jin: { kanji: "刃", name: "JIN", role: "Finance", model: "gemini-3.1-pro", fullName: "JIN (刃 blade)", theme: "Trading & finance", tools: "All", subagents: "None", created: "2026-03-04" },
  kou: { kanji: "光", name: "KOU", role: "Growth", model: "gemini-3.1-pro", fullName: "KOU (光 light)", theme: "Marketing, content, distribution", tools: "All", subagents: "NAO, TAI, YUI", created: "2026-03-05" },
  zen: { kanji: "禅", name: "ZEN", role: "Strategy", model: "gemini-3.1-pro", fullName: "ZEN (禅 clarity)", theme: "Code architecture, review, delegation", tools: "All", subagents: "SHO, RIN, JIN", created: "2026-03-05" },
  rin: { kanji: "凛", name: "RIN", role: "QA", model: "gemini-3.1-pro", fullName: "RIN (凛 disciplined)", theme: "Browser automation & QA", tools: "All (no spawn)", subagents: "None", created: "2026-03-04" },
} as const;

function getStatus(lastPing?: string) {
  if (!lastPing) return "offline";
  const diff = Date.now() - new Date(lastPing).getTime();
  if (diff < 2 * 60 * 1000) return "active";
  if (diff < 20 * 60 * 1000) return "idle";
  return "offline";
}

function timeAgo(ts?: string) {
  if (!ts) return "Never";
  const s = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function FleetDashboard() {
  const [pings, setPings] = useState<Record<string, Ping>>({});
  const [selected, setSelected] = useState<keyof typeof agents | null>(null);

  useEffect(() => {
    supabase.from("agent_pings").select("*").then(({ data }) => {
      const map: Record<string, Ping> = {};
      (data || []).forEach((d: any) => (map[d.agent_id] = d));
      setPings(map);
    });

    const ch = supabase
      .channel("fleet")
      .on("postgres_changes" as any, { event: "*", schema: "public", table: "agent_pings" }, (payload: any) => {
        const row = payload.new as Ping;
        if (!row?.agent_id) return;
        setPings((prev) => ({ ...prev, [row.agent_id]: row }));
      })
      .subscribe();

    const t = setInterval(() => setPings((p) => ({ ...p })), 30000);
    return () => {
      ch.unsubscribe();
      clearInterval(t);
    };
  }, []);

  const fleetIds: (keyof typeof agents)[] = ["sho", "nao", "tai", "yui", "jin", "kou", "zen", "rin"];
  const s = selected ? agents[selected] : null;
  const sp = selected ? pings[selected] : null;
  const sStatus = getStatus(sp?.last_ping);

  return (
    <>
      <div className="fleet-wrap">
        <div className="tree">
          <div className="leader">
            <button className={`node leader-node ${getStatus(pings.lim?.last_ping)}`} onClick={() => setSelected("lim")}>
              <div className="kanji">臨</div>
              <div className="name">LIM</div>
              <div className="role">Architect</div>
              <div><span className="status-dot" /> <span className="status-text">{getStatus(pings.lim?.last_ping) === "active" ? timeAgo(pings.lim?.last_ping) : getStatus(pings.lim?.last_ping)}</span></div>
              <div className="task">{pings.lim?.current_task || ""}</div>
            </button>
          </div>

          <div className="connector" />
          <div className="branch-line" />

          <div className="fleet-grid">
            {fleetIds.map((id) => {
              const st = getStatus(pings[id]?.last_ping);
              return (
                <button key={id} className={`node ${st}`} onClick={() => setSelected(id)}>
                  <div className="kanji small">{agents[id].kanji}</div>
                  <div className="name">{agents[id].name}</div>
                  <div className="role">{agents[id].role}</div>
                  <div><span className="status-dot" /> <span className="status-text">{st === "active" ? timeAgo(pings[id]?.last_ping) : st}</span></div>
                  <div className="task">{pings[id]?.current_task || ""}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`overlay ${selected ? "open" : ""}`} onClick={() => setSelected(null)} />
      <aside className={`detail-panel ${selected ? "open" : ""}`}>
        <button className="close" onClick={() => setSelected(null)}>×</button>
        {s && (
          <>
            <div className="d-kanji">{s.kanji}</div>
            <div className="d-name">{s.name}</div>
            <div className="d-role">{s.role}</div>
            <div className="detail-section">
              <h3>Status</h3>
              <div className="detail-row"><span className="label">State</span><span className={`value ${sStatus}-val`}>{sStatus}</span></div>
              <div className="detail-row"><span className="label">Last Active</span><span className="value">{timeAgo(sp?.last_ping)}</span></div>
              <div className="detail-row"><span className="label">Current Task</span><span className="value">{sp?.current_task || "None"}</span></div>
            </div>
            <div className="detail-section">
              <h3>Configuration</h3>
              <div className="detail-row"><span className="label">Model</span><span className="value">{s.model}</span></div>
              <div className="detail-row"><span className="label">Tools</span><span className="value">{s.tools}</span></div>
              <div className="detail-row"><span className="label">Subagents</span><span className="value">{s.subagents}</span></div>
            </div>
            <div className="detail-section">
              <h3>Identity</h3>
              <div className="detail-row"><span className="label">Full Name</span><span className="value">{s.fullName}</span></div>
              <div className="detail-row"><span className="label">Theme</span><span className="value">{s.theme}</span></div>
              <div className="detail-row"><span className="label">Created</span><span className="value">{s.created}</span></div>
            </div>
          </>
        )}
      </aside>

      <style jsx>{`
        .fleet-wrap { width: 100%; max-width: 900px; margin: 0 auto; }
        .tree { display: flex; flex-direction: column; align-items: center; gap: 40px; width: 100%; }
        .leader { display: flex; justify-content: center; }
        .connector { width: 2px; height: 30px; background: linear-gradient(to bottom, #333, #1a1a1a); }
        .branch-line { width: 80%; max-width: 750px; height: 2px; background: linear-gradient(to right, transparent 0%, #333 10%, #333 90%, transparent 100%); }
        .fleet-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; width: 100%; max-width: 800px; }
        .node { background: #111113; border: 1px solid #222; border-radius: 12px; padding: 20px 16px; text-align: center; position: relative; transition: all .5s ease; cursor: pointer; min-height: 148px; }
        .node:hover { transform: translateY(-2px); }
        .leader-node { padding: 24px 32px; min-width: 220px; }
        .node.active { border-color: rgba(34,197,94,.25); box-shadow: 0 0 20px rgba(34,197,94,.12); }
        .leader-node.active { border-color: rgba(99,102,241,.35); box-shadow: 0 0 30px rgba(99,102,241,.2); }
        .node.idle { border-color: rgba(245,158,11,.25); box-shadow: 0 0 16px rgba(245,158,11,.09); }
        .node.offline { opacity: .5; border-color: #1a1a1a; }
        .kanji { font-size: 48px; font-weight: 300; margin-bottom: 6px; }
        .kanji.small { font-size: 32px; }
        .name { color: #fff; font-weight: 600; font-size: 15px; }
        .role { color: #666; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
        .status-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 6px; background: #333; }
        .active .status-dot { background: #22c55e; box-shadow: 0 0 6px rgba(34,197,94,.55); }
        .leader-node.active .status-dot { background: #818cf8; box-shadow: 0 0 6px rgba(129,140,248,.55); }
        .idle .status-dot { background: #f59e0b; }
        .status-text { font-size: 11px; color: #555; }
        .task { margin-top: 8px; font-size: 11px; color: #666; line-height: 1.35; max-height: 30px; overflow: hidden; }
        .overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.55); z-index:90; }
        .overlay.open { display:block; }
        .detail-panel { display:none; position:fixed; top:0; right:0; width:360px; max-width:92vw; height:100vh; background:#111113; border-left:1px solid #222; padding:32px 22px; z-index:100; overflow:auto; }
        .detail-panel.open { display:block; }
        .close { position:absolute; top:14px; right:16px; background:none; border:none; color:#666; font-size:24px; cursor:pointer; }
        .close:hover { color:#fff; }
        .d-kanji { font-size:64px; text-align:center; margin-bottom:8px; }
        .d-name { color:#fff; text-align:center; font-size:22px; font-weight:700; }
        .d-role { color:#888; text-align:center; margin-bottom:22px; font-size:13px; }
        .detail-section { margin-bottom:18px; }
        .detail-section h3 { color:#444; font-size:10px; letter-spacing:2px; text-transform:uppercase; margin-bottom:8px; }
        .detail-row { display:flex; justify-content:space-between; gap:8px; border-bottom:1px solid #1a1a1a; padding:6px 0; }
        .label { color:#666; font-size:12px; }
        .value { color:#ccc; font-size:12px; text-align:right; max-width:200px; overflow:hidden; text-overflow:ellipsis; }
        .value.active-val { color:#22c55e; }
        .value.idle-val { color:#f59e0b; }
        .value.offline-val { color:#666; }
        @media (max-width: 780px) { .fleet-grid { grid-template-columns: repeat(2,1fr); } }
      `}</style>
    </>
  );
}
