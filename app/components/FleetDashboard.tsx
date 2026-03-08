"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jeollamxgbmlhvzdgoqt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implb2xsYW14Z2JtbGh2emRnb3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NzE5OTYsImV4cCI6MjA4ODM0Nzk5Nn0.vWHEwzboBGaR8nCzAQ7s7Pif6xEIPoa-vfKvv_FnKGc"
);

type Ping = { agent_id: string; status: string; current_task: string; last_ping: string };
type AgentEvent = { id: number; agent_id: string; event_type: string; description: string; session_key: string; created_at: string };

const agents = {
  lim: { kanji: "臨", name: "LIM", role: "Architect", model: "claude-opus-4-6", fullName: "LIM (臨 presence)", theme: "Fleet orchestration & system design", tools: "All + orchestration", subagents: "All agents", created: "2026-02-20" },
  kou: { kanji: "光", name: "KOU", role: "Growth Lead", model: "gemini-3.1-pro", fullName: "KOU (光 light)", theme: "Marketing, content, distribution", tools: "growth research, messaging", subagents: "NAO, TAI, YUI", created: "2026-03-05" },
  zen: { kanji: "禅", name: "ZEN", role: "Eng Lead", model: "gemini-3.1-pro", fullName: "ZEN (禅 clarity)", theme: "Code architecture, review, delegation", tools: "planning, review, delegation", subagents: "SHO, RIN, JIN", created: "2026-03-05" },
  nao: { kanji: "直", name: "NAO", role: "Content", model: "gemini-3.1-pro", fullName: "NAO (直 direct)", theme: "Copy & content", tools: "Web, docs, messaging", subagents: "None", created: "2026-03-04" },
  tai: { kanji: "泰", name: "TAI", role: "Research", model: "gemini-3.1-pro", fullName: "TAI (泰 great)", theme: "Web intelligence & deep research", tools: "web_search, fetch, analysis", subagents: "None", created: "2026-03-04" },
  yui: { kanji: "結", name: "YUI", role: "UX", model: "gemini-3.1-pro", fullName: "YUI (結 connect)", theme: "Performance coach & UX", tools: "browser, UX review", subagents: "None", created: "2026-03-04" },
  sho: { kanji: "翔", name: "SHO", role: "DevOps", model: "gemini-3.1-pro", fullName: "SHO (翔 soar)", theme: "Deploy, infrastructure, CI/CD", tools: "Browser, exec, git, Railway", subagents: "None", created: "2026-03-04" },
  rin: { kanji: "凛", name: "RIN", role: "QA", model: "gemini-3.1-pro", fullName: "RIN (凛 disciplined)", theme: "Browser automation & QA", tools: "All (no spawn)", subagents: "None", created: "2026-03-04" },
  jin: { kanji: "刃", name: "JIN", role: "Finance", model: "gemini-3.1-pro", fullName: "JIN (刃 blade)", theme: "Trading & finance", tools: "analysis, sheets, web", subagents: "None", created: "2026-03-04" },
} as const;

type AgentId = keyof typeof agents;

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

function friendlyTask(raw?: string) {
  if (!raw) return "";
  if (raw.includes("telegram:direct")) return "Handling Telegram conversation";
  if (raw.startsWith("agent:")) return "Running agent session";
  if (raw.length > 52) return `${raw.slice(0, 49)}...`;
  return raw;
}

function friendlyEventDesc(raw?: string) {
  if (!raw) return "—";
  if (raw.includes("telegram:direct")) return "Agent active in Telegram DM";
  return raw.replaceAll("agent:", "").replaceAll(":main", "");
}

function AgentNode({ id, selected, onSelect, pings, large = false }: { id: AgentId; selected: AgentId | null; onSelect: (id: AgentId) => void; pings: Record<string, Ping>; large?: boolean }) {
  const st = getStatus(pings[id]?.last_ping);
  const isLeader = id === "lim";

  const borderColor = st === "active"
    ? (isLeader || large ? "rgba(99,102,241,.7)" : "rgba(34,197,94,.62)")
    : st === "idle"
      ? "rgba(245,158,11,.6)"
      : "#313a4f";

  const boxShadow = st === "active"
    ? (isLeader || large
      ? "0 0 34px rgba(99,102,241,.34), 0 0 0 1px rgba(99,102,241,.3) inset"
      : "0 0 26px rgba(34,197,94,.22), 0 0 0 1px rgba(34,197,94,.24) inset")
    : st === "idle"
      ? "0 0 22px rgba(245,158,11,.18), 0 0 0 1px rgba(245,158,11,.24) inset"
      : "0 10px 26px rgba(0,0,0,.38), 0 0 0 1px rgba(102,123,170,.14) inset";

  return (
    <button
      className={`node ${isLeader ? "leader-node" : ""} ${large ? "lead-node" : ""} ${st}`}
      onClick={() => onSelect(id)}
      style={{
        background: "#171e2b",
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        boxShadow,
        padding: isLeader ? "24px 32px" : "20px 16px",
        minHeight: 148,
      }}
    >
      <div className={`kanji ${isLeader ? "" : "small"}`}>{agents[id].kanji}</div>
      <div className="name">{agents[id].name}</div>
      <div className="role">{agents[id].role}</div>
      <div><span className="status-dot" /> <span className="status-text">{st === "active" ? timeAgo(pings[id]?.last_ping) : st}</span></div>
      <div className="task">{friendlyTask(pings[id]?.current_task)}</div>
    </button>
  );
}

export default function FleetDashboard() {
  const [pings, setPings] = useState<Record<string, Ping>>({});
  const [selected, setSelected] = useState<AgentId | null>(null);
  const [events, setEvents] = useState<AgentEvent[]>([]);

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

  useEffect(() => {
    if (!selected) {
      setEvents([]);
      return;
    }
    supabase
      .from("agent_events")
      .select("*")
      .eq("agent_id", selected)
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (data) setEvents(data as AgentEvent[]);
      });

    const evCh = supabase
      .channel(`events-${selected}`)
      .on(
        "postgres_changes" as any,
        { event: "INSERT", schema: "public", table: "agent_events", filter: `agent_id=eq.${selected}` },
        (payload: any) => {
          const row = payload.new as AgentEvent;
          if (row?.id) setEvents((prev) => [row, ...prev].slice(0, 30));
        }
      )
      .subscribe();

    return () => {
      evCh.unsubscribe();
    };
  }, [selected]);

  const s = selected ? agents[selected] : null;
  const sp = selected ? pings[selected] : null;
  const sStatus = getStatus(sp?.last_ping);

  return (
    <>
      <div className="fleet-wrap">
        <div className="tree">
          {/* Level 1 */}
          <div className="leader-row">
            <AgentNode id="lim" selected={selected} onSelect={setSelected} pings={pings} />
          </div>

          <div className="connector v" />

          {/* Level 2 */}
          <div className="lead-row">
            <AgentNode id="kou" selected={selected} onSelect={setSelected} pings={pings} large />
            <AgentNode id="zen" selected={selected} onSelect={setSelected} pings={pings} large />
          </div>

          <div className="connector h" />

          {/* Level 3 */}
          <div className="bottom-wrap">
            <div className="team-col">
              <div className="team-connector" />
              <div className="team-grid">
                <AgentNode id="nao" selected={selected} onSelect={setSelected} pings={pings} />
                <AgentNode id="tai" selected={selected} onSelect={setSelected} pings={pings} />
                <AgentNode id="yui" selected={selected} onSelect={setSelected} pings={pings} />
              </div>
            </div>
            <div className="team-col">
              <div className="team-connector" />
              <div className="team-grid">
                <AgentNode id="sho" selected={selected} onSelect={setSelected} pings={pings} />
                <AgentNode id="rin" selected={selected} onSelect={setSelected} pings={pings} />
                <AgentNode id="jin" selected={selected} onSelect={setSelected} pings={pings} />
              </div>
            </div>
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
            <div className="detail-section">
              <h3>Realtime Stream</h3>
              <div className="event-stream">
                {events.length === 0 ? (
                  <div className="event-empty">No recent events yet.</div>
                ) : (
                  events.map((ev) => (
                    <div key={ev.id} className="event-row">
                      <div className="event-time">{timeAgo(ev.created_at)}</div>
                      <div className="event-type">{ev.event_type.replace("_", " ")}</div>
                      <div className="event-desc">{friendlyEventDesc(ev.description)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </aside>

      <style jsx global>{`
        .fleet-wrap { width: 100%; max-width: 980px; margin: 0 auto; }
        .tree { display:flex; flex-direction:column; align-items:center; gap:40px; }
        .leader-row { display:flex; justify-content:center; width:100%; }
        .lead-row { display:grid; grid-template-columns:repeat(2, minmax(230px, 1fr)); gap:34px; width:100%; max-width:620px; }
        .connector.v { width:2px; height:34px; background:linear-gradient(to bottom,#454b5c,#1f2431); }
        .connector.h { width:82%; max-width:820px; height:2px; background:linear-gradient(to right,transparent,#454b5c 10%,#454b5c 90%,transparent); }
        .bottom-wrap { width:100%; display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .team-col { display:flex; flex-direction:column; align-items:center; gap:14px; }
        .team-connector { width:2px; height:18px; background:linear-gradient(to bottom,#454b5c,#1f2431); }
        .team-grid { width:100%; display:grid; grid-template-columns:repeat(3, minmax(140px, 1fr)); gap:16px; }

        .node { background:#0d0f14; border:1px solid #171a22; border-radius:12px; padding:20px 16px; text-align:center; position:relative; transition:all .3s ease; cursor:pointer; min-height:148px; box-shadow:0 6px 18px rgba(0,0,0,0.35); }
        .node:hover { transform:translateY(-1px); border-color:#232838; }
        .leader-node { padding:24px 32px; min-width:220px; }
        .lead-node { min-height:148px; }
        .node.active { border-color:rgba(34,197,94,.48); box-shadow:0 0 24px rgba(34,197,94,.16), 0 0 0 1px rgba(34,197,94,.2) inset; }
        .leader-node.active { border-color:rgba(99,102,241,.62); box-shadow:0 0 30px rgba(99,102,241,.26), 0 0 0 1px rgba(99,102,241,.26) inset; }
        .lead-node.active { border-color:rgba(99,102,241,.5); box-shadow:0 0 24px rgba(99,102,241,.18), 0 0 0 1px rgba(99,102,241,.2) inset; }
        .node.idle { border-color:rgba(245,158,11,.45); box-shadow:0 0 20px rgba(245,158,11,.13), 0 0 0 1px rgba(245,158,11,.18) inset; }
        .node.offline { opacity:.64; border-color:#141822; box-shadow:0 4px 12px rgba(0,0,0,.25); }
        .kanji { font-size:48px; font-weight:300; margin-bottom:8px; color:#f4f5f8; }
        .kanji.small { font-size:32px; }
        .name { color:#f7f7fa; font-weight:600; font-size:15px; }
        .role { color:#8a93a8; font-size:11px; letter-spacing:1px; text-transform:uppercase; margin-bottom:8px; }
        .status-dot { display:inline-block; width:6px; height:6px; border-radius:50%; margin-right:6px; background:#44506a; }
        .active .status-dot { background:#22c55e; box-shadow:0 0 8px rgba(34,197,94,.68); }
        .leader-node.active .status-dot, .lead-node.active .status-dot { background:#818cf8; box-shadow:0 0 8px rgba(129,140,248,.68); }
        .idle .status-dot { background:#f59e0b; }
        .status-text { font-size:11px; color:#b0b9cf; }
        .task { margin-top:8px; font-size:11px; color:#a2aec7; line-height:1.35; max-height:30px; overflow:hidden; }

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

        .event-stream { border:1px solid #1a1a1a; border-radius:10px; max-height:220px; overflow:auto; background:#0e0e10; }
        .event-empty { color:#666; font-size:12px; padding:10px; }
        .event-row { padding:8px 10px; border-bottom:1px solid #17171a; }
        .event-row:last-child { border-bottom:none; }
        .event-time { font-size:10px; color:#777; margin-bottom:2px; }
        .event-type { font-size:10px; color:#9ca3af; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px; }
        .event-desc { font-size:12px; color:#d1d5db; line-height:1.3; }

        @media (max-width: 980px) {
          .bottom-wrap { grid-template-columns:1fr; }
        }
        @media (max-width: 780px) {
          .lead-row { grid-template-columns:1fr; max-width:280px; }
          .team-grid { grid-template-columns:repeat(2, minmax(120px,1fr)); }
        }
      `}</style>
    </>
  );
}
