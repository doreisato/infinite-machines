"use client";

import { useState } from "react";
import FleetDashboard from "./components/FleetDashboard";

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
    status: "planned",
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
      {/* Navigation */}
      <nav className="fixed top-0 right-0 p-6 z-50">
        <a
          href="/about"
          className="text-xs text-neutral-500 hover:text-white transition-colors duration-150 uppercase tracking-widest"
        >
          About
        </a>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight mb-4">
            Infinite Machines
          </h1>
          <p className="text-neutral-500 text-lg md:text-xl tracking-wide">
            Systems that ship what matters
          </p>
        </div>

        {/* Fleet Dashboard */}
        <div className="w-full max-w-[900px] mb-20">
          <h2 className="text-[10px] text-neutral-600 uppercase tracking-[4px] text-center mb-8">
            Fleet Status
          </h2>
          <FleetDashboard />
        </div>

        {/* Divider */}
        <div className="w-px h-12 bg-gradient-to-b from-neutral-800 to-transparent mb-12" />

        {/* Projects Section */}
        <div className="w-full max-w-[720px] mb-20">
          <h2 className="text-[10px] text-neutral-600 uppercase tracking-[4px] text-center mb-8">
            Projects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() =>
                  setActiveProject(
                    activeProject === project.id ? null : project.id
                  )
                }
                className={`
                  aspect-square rounded-[12px] border transition-all duration-200 cursor-pointer
                  flex items-center justify-center p-4 relative group bg-[#111113]
                  hover:-translate-y-[2px]
                  ${
                    activeProject === project.id
                      ? "border-indigo-500/35 shadow-[0_0_20px_rgba(99,102,241,0.18)]"
                      : "border-[#222] hover:border-[#3a3a3d] hover:shadow-[0_0_16px_rgba(255,255,255,0.06)]"
                  }
                `}
              >
                <span
                  className={`
                  text-[11px] font-medium tracking-[0.16em] uppercase transition-colors duration-200 text-center
                  ${
                    activeProject === project.id
                      ? "text-white"
                      : "text-neutral-500 group-hover:text-neutral-300"
                  }
                `}
                >
                  {project.name}
                </span>

                {project.status === "live" && (
                  <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                )}
              </button>
            ))}

            {[...Array(Math.max(0, 5 - projects.length))].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="aspect-square rounded-[12px] border border-[#1a1a1a] bg-[#0f0f10] flex items-center justify-center"
              >
                <span className="text-neutral-800 text-xs">—</span>
              </div>
            ))}
          </div>

          {/* Project Detail Panel */}
          <div
            className={`
              w-full mt-6 overflow-hidden transition-all duration-300
              ${active ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            {active && (
              <div className="border border-[#222] rounded-[12px] p-6 bg-[#111113] shadow-[0_0_20px_rgba(255,255,255,0.04)]">
                <div className="flex items-start justify-between mb-3 gap-4">
                  <div>
                    <h2 className="text-sm font-semibold text-white tracking-wide">
                      {active.name}
                    </h2>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-[0.16em]">
                      {active.status}
                    </span>
                  </div>
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-4 py-2 rounded-[8px] text-xs font-medium hover:bg-neutral-200 transition-colors duration-150"
                  >
                    Open
                  </a>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {active.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-neutral-700">
        Built by{" "}
        <a
          href="https://infinitemachines.ai"
          className="text-neutral-500 hover:text-white transition-colors duration-150"
        >
          Infinite Machines
        </a>
      </footer>
    </main>
  );
}
