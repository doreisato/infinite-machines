"use client";

import { useState } from "react";

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
      "30-second calculator that shows you government programs you qualify for. SNAP, WIC, Medicaid, and more. Free, private, instant.",
    url: "https://benefits-navigator-production.up.railway.app",
    status: "live",
  },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const active = projects.find((p) => p.id === activeProject);

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight mb-4">
            Infinite Machines
          </h1>
          <p className="text-neutral-500 text-lg md:text-xl tracking-wide">
            Systems that build for those who need it most
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-[720px] w-full">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() =>
                setActiveProject(activeProject === project.id ? null : project.id)
              }
              className={`
                aspect-square rounded-lg border transition-all duration-300 cursor-pointer
                flex items-center justify-center p-4 relative group
                ${
                  activeProject === project.id
                    ? "border-neutral-500 bg-neutral-900"
                    : "border-neutral-800 bg-transparent hover:border-neutral-600 hover:bg-neutral-900/50"
                }
              `}
            >
              <span
                className={`
                text-xs font-medium tracking-wide uppercase transition-colors duration-300
                ${activeProject === project.id ? "text-white" : "text-neutral-600 group-hover:text-neutral-400"}
              `}
              >
                {project.name}
              </span>

              {project.status === "live" && (
                <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          ))}

          {/* Empty tiles for future projects */}
          {[...Array(Math.max(0, 5 - projects.length))].map((_, i) => (
            <div
              key={`empty-${i}`}
              className="aspect-square rounded-lg border border-neutral-900 bg-transparent flex items-center justify-center"
            >
              <span className="text-neutral-800 text-xs">—</span>
            </div>
          ))}
        </div>

        {/* Project Detail Panel */}
        <div
          className={`
            max-w-[720px] w-full mt-6 overflow-hidden transition-all duration-300
            ${active ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          {active && (
            <div className="border border-neutral-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-sm font-medium text-white">{active.name}</h2>
                  <span className="text-xs text-emerald-500 uppercase tracking-widest">
                    {active.status}
                  </span>
                </div>
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-4 py-2 rounded text-xs font-medium hover:bg-neutral-200 transition-colors duration-150"
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
