"use client";

import { useState } from "react";
import FleetDashboard from "./components/FleetDashboard";
import { ds } from "@/lib/design-system";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  status: "live" | "building" | "planned";
}

const projects: Project[] = [
  {
    id: "benefits-navigator",
    name: "Benefits Navigator",
    description:
      "Find government benefits you qualify for. Free one-minute pre-screen for SNAP, Medicaid, WIC, and LIHEAP.",
    url: "https://benefits-navigator-production.up.railway.app",
    status: "live",
  },
  {
    id: "wageshield",
    name: "WageShield",
    description:
      "Find out if your paycheck is missing money. Instant overtime and wage calculator for hourly workers.",
    url: "https://roastmysite-production-a490.up.railway.app",
    status: "live",
  },
  {
    id: "fairbill",
    name: "FairBill",
    description:
      "Medicare-benchmarked pricing for medical bills. Get negotiation leverage before collections. CPT code lookup in seconds.",
    url: "https://fairbill-production.up.railway.app",
    status: "live",
  },
  {
    id: "utility-shutoff-lifeline",
    name: "Utility Shutoff Lifeline",
    description:
      "See your utility shutoff deadline, protections, and emergency action links in one screen before disconnection.",
    url: "https://utility-shutoff-lifeline-production.up.railway.app",
    status: "live",
  },
  {
    id: "utility-shutoff-lifeline",
    name: "Utility Shutoff Lifeline",
    description:
      "Know your utility shutoff deadline and protections in one minute. Clear next steps and official help links before disconnection.",
    url: "https://utility-shutoff-lifeline-production.up.railway.app",
    status: "building",
  },
  {
    id: "housingalert",
    name: "HousingAlert",
    description:
      "Email alerts when affordable housing waitlists open in your county. Never miss Section 8 or public housing opportunities.",
    url: "https://housingalert-production.up.railway.app",
    status: "planned",
  },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const active = projects.find((p) => p.id === activeProject);

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <nav className="fixed top-0 right-0 p-6 z-50">
        <a href="/about" className="text-xs text-neutral-500 hover:text-white transition-colors duration-150 uppercase tracking-widest">About</a>
      </nav>

      <div className="flex-1 flex flex-col items-center px-6 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight mb-4">Infinite Machines</h1>
          <p className="text-neutral-500 text-lg md:text-xl tracking-wide">Systems that ship what matters</p>
        </div>

        <div className="w-full max-w-[900px] mb-20">
          <h2 className="text-[10px] text-neutral-600 uppercase tracking-[4px] text-center mb-8">Fleet Status</h2>
          <FleetDashboard />
        </div>

        <div className="w-px h-12 bg-gradient-to-b from-neutral-800 to-transparent mb-12" />

        <div className="w-full max-w-[720px] mb-20">
          <h2 className="text-[10px] text-neutral-600 uppercase tracking-[4px] text-center mb-8">Projects</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                className={`${ds.tile} cursor-pointer flex items-center justify-center p-4 relative group ${activeProject === project.id ? "border-neutral-500 bg-neutral-900" : ""}`}
              >
                <span className={`text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-200 text-center ${activeProject === project.id ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"}`}>
                  {project.name}
                </span>
                {project.status === "live" && <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-white" />}
              </button>
            ))}
          </div>

          {active && (
            <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <div className={`w-full max-w-xl ${ds.modal}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-sm font-medium text-white">{active.name}</h2>
                    <span className="text-[11px] text-neutral-500 uppercase tracking-[0.18em]">{active.status}</span>
                  </div>
                  <button onClick={() => setActiveProject(null)} className="text-xs text-neutral-400 hover:text-white border border-neutral-700 rounded-xl px-3 py-2">Close</button>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-5">{active.description}</p>
                <a href={active.url} target="_blank" rel="noopener noreferrer" className={ds.buttonPrimary}>Open Project</a>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="py-8 text-center text-xs text-neutral-700">
        Built by <a href="https://infinite-machines-production.up.railway.app" className="text-neutral-500 hover:text-white transition-colors duration-150">Infinite Machines</a>
      </footer>
    </main>
  );
}
