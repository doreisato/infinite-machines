"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jeollamxgbmlhvzdgoqt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implb2xsYW14Z2JtbGh2emRnb3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NzE5OTYsImV4cCI6MjA4ODM0Nzk5Nn0.vWHEwzboBGaR8nCzAQ7s7Pif6xEIPoa-vfKvv_FnKGc"
);

interface AgentInfo {
  kanji: string;
  name: string;
  role: string;
  model: string;
  fullName: string;
  theme: string;
  tools: string;
  subagents: string;
  created: string;
}

interface PingData {
  agent_id: string;
  status: string;
  current_task: string;
  last_ping: string;
}

const agentMeta: Record<string, AgentInfo> = {
  lim: { kanji: "臨", name: "LIM", role: "Architect", model: "claude-opus-4-6", fullName: "LIM (臨 presence)", theme: "Fleet orchestration & system design", tools: "All", subagents: "All agents", created: "2026-02-20" },
  kou: { kanji: "光", name: "KOU", role: "Growth Lead", model: "gemini-3.1-pro", fullName: "KOU (光 light)", theme: "Marketing, content, distribution", tools: "All", subagents: "NAO, TAI, YUI", created: "2026-03-05" },
  zen: { kanji: "禅", name: "ZEN", role: "Eng Lead", model: "gemini-3.1-pro", fullName: "ZEN (禅 clarity)", theme: "Code architecture, review, delegation", tools: "All", subagents: "SHO, RIN, JIN", created: "2026-03-05" },
  sho: { kanji: "翔", name: "SHO", role: "DevOps", model: "gemini-3.1-pro", fullName: "SHO (翔 soar)", theme: "Deploy, infrastructure, CI/CD", tools: "All", subagents: "None", created: "2026-03-04" },
  nao: { kanji: "直", name: "NAO", role: "Content", model: "gemini-3.1-pro", fullName: "NAO (直 direct)", theme: "Copy & content", tools: "All", subagents: "None", created: "2026-03-04" },
  tai: { kanji: "泰", name: "TAI", role: "Research", model: "gemini-3.1-pro", fullName: "TAI (泰 great)", theme: "Web intelligence & deep research", tools: "All", subagents: "None", created: "2026-03-04" },
  yui: { kanji: "結", name: "YUI", role: "UX", model: "gemini-3.1-pro", fullName: "YUI (結 connect)", theme: "Performance coach & UX", tools: "All", subagents: "None", created: "2026-03-04" },
  jin: { kanji: "刃", name: "JIN", role: "Finance", model: "gemini-3.1-pro", fullName: "JIN (刃 blade)", theme: "Trading & finance", tools: "All", subagents: "None", created: "2026-03-04" },
  rin: { kanji: "凛", name: "RIN", role: "QA", model: "gemini-3.1-pro", fullName: "RIN (凛 disciplined)", theme: "Browser automation & QA", tools: "All (no spawn)", subagents: "None", created: "2026-03-04" },
};

// Tree structure: LIM → KOU/ZEN → their reports
const tree = {
  leader: "lim",
  leads: [
    { id: "kou", reports: ["nao", "tai", "yui"] },
    { id: "zen", reports: ["sho", "rin", "jin"] },
  ],
};

function getStatus(lastPing: string | null): "active" | "idle" | "offline" {
  if (!lastPing) return "offline";
  const diff = Date.now() - new Date(lastPing).getTime();
  if (diff < 2 * 60 * 1000) return "active";
  if (diff < 20 * 60 * 1000) return "idle";
  return "offline";
}

function timeAgo(ts: string | null): string {
  if (!ts) return "Never";
  const s = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function AgentNode({
  id,
  ping,
  isLeader,
  isLead,
  onClick,
}: {
  id: string;
  ping?: PingData;
  isLeader?: boolean;
  isLead?: boolean;
  onClick: () => void;
}) {
  const a = agentMeta[id];
  const status = getStatus(ping?.last_ping || null);

  const glowClass =
    status === "active"
      ? isLeader
        ? "border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]"
        : "border-emerald-500/30 shadow-[0_0_20px_rgba(34,197,94,0.08)]"
      : status === "idle"
        ? "border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
        : "border-neutral-800 opacity-50";

  const dotClass =
    status === "active"
      ? isLeader
        ? "bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.5)] animate-pulse"
        : "bg-emerald-400 shadow-[0_0_6px_rgba(34,197,94,0.5)] animate-pulse"
      : status === "idle"
        ? "bg-amber-500"
        : "bg-neutral-700";

  return (
    <button
      onClick={onClick}
      className={`
        bg-neutral-900/80 border rounded-xl transition-all duration-500 cursor-pointer
        hover:-translate-y-0.5 text-center group
        ${glowClass}
        ${isLeader ? "px-8 py-6 min-w-[200px]" : isLead ? "px-5 py-4" : "px-4 py-3"}
      `}
    >
      <div className={`font-light mb-1 ${isLeader ? "text-5xl" : isLead ? "text-3xl" : "text-2xl"}`}>
        {a.kanji}
      </div>
      <div className={`font-semibold text-white ${isLeader ? "text-base" : "text-sm"}`}>
        {a.name}
      </div>
      <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1.5">
        {a.role}
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotClass}`} />
        <span className="text-[10px] text-neutral-500">
          {status === "active" ? timeAgo(ping?.last_ping || null) : status}
        </span>
      </div>
    </button>
  );
}

export default function FleetDashboard() {
  const [pings, setPings] = useState<Record<string, PingData>>({});
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    // Initial fetch
    supabase
      .from("agent_pings")
      .select("*")
      .then(({ data }) => {
        if (data) {
          const map: Record<string, PingData> = {};
          data.forEach((d: PingData) => (map[d.agent_id] = d));
          setPings(map);
        }
      });

    // Realtime subscription
    const channel = supabase
      .channel("fleet")
      .on(
        "postgres_changes" as any,
        { event: "*", schema: "public", table: "agent_pings" },
        (payload: any) => {
          const row = payload.new as PingData;
          if (row?.agent_id) {
            setPings((prev) => ({ ...prev, [row.agent_id]: row }));
          }
        }
      )
      .subscribe();

    // Refresh time-ago every 30s
    const interval = setInterval(() => setPings((p) => ({ ...p })), 30000);

    return () => {
      channel.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const sel = selected ? agentMeta[selected] : null;
  const selPing = selected ? pings[selected] : null;
  const selStatus = selPing ? getStatus(selPing.last_ping) : "offline";

  return (
    <div className="relative">
      {/* Fleet Tree */}
      <div className="flex flex-col items-center gap-6 mb-6">
        {/* Tier 1: Leader */}
        <AgentNode
          id={tree.leader}
          ping={pings[tree.leader]}
          isLeader
          onClick={() => setSelected(selected === tree.leader ? null : tree.leader)}
        />

        {/* Connector */}
        <div className="w-px h-6 bg-gradient-to-b from-neutral-700 to-neutral-900" />

        {/* Tier 2: Team Leads */}
        <div className="flex gap-16 items-start">
          {tree.leads.map((lead) => (
            <div key={lead.id} className="flex flex-col items-center gap-4">
              <AgentNode
                id={lead.id}
                ping={pings[lead.id]}
                isLead
                onClick={() => setSelected(selected === lead.id ? null : lead.id)}
              />
              {/* Connector to reports */}
              <div className="w-px h-4 bg-gradient-to-b from-neutral-700 to-neutral-900" />
              <div
                className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent"
                style={{ width: `${lead.reports.length * 110}px` }}
              />

              {/* Tier 3: Reports */}
              <div className="flex gap-3">
                {lead.reports.map((r) => (
                  <AgentNode
                    key={r}
                    id={r}
                    ping={pings[r]}
                    onClick={() => setSelected(selected === r ? null : r)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel (inline, not side panel) */}
      <div
        className={`
          max-w-[520px] mx-auto overflow-hidden transition-all duration-300
          ${sel ? "max-h-[400px] opacity-100 mb-8" : "max-h-0 opacity-0"}
        `}
      >
        {sel && (
          <div className="border border-neutral-800 rounded-lg p-5">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-light">{sel.kanji}</span>
              <div>
                <div className="text-sm font-semibold text-white">{sel.fullName}</div>
                <div className="text-xs text-neutral-500">{sel.theme}</div>
              </div>
              <div className="ml-auto">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    selStatus === "active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : selStatus === "idle"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-neutral-800 text-neutral-500"
                  }`}
                >
                  {selStatus}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div>
                <span className="text-neutral-600">Model</span>
                <span className="block text-neutral-300">{sel.model}</span>
              </div>
              <div>
                <span className="text-neutral-600">Last Active</span>
                <span className="block text-neutral-300">
                  {timeAgo(selPing?.last_ping || null)}
                </span>
              </div>
              <div>
                <span className="text-neutral-600">Tools</span>
                <span className="block text-neutral-300">{sel.tools}</span>
              </div>
              <div>
                <span className="text-neutral-600">Subagents</span>
                <span className="block text-neutral-300">{sel.subagents}</span>
              </div>
              <div>
                <span className="text-neutral-600">Created</span>
                <span className="block text-neutral-300">{sel.created}</span>
              </div>
              <div>
                <span className="text-neutral-600">Current Task</span>
                <span className="block text-neutral-300">
                  {selPing?.current_task || "None"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
