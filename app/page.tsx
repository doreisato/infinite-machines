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
    id: "microadventure-roulette",
    name: "MicroAdventure Roulette",
    description:
      "Pick your time, energy, and vibe, then spin 3 instant mini-adventures to boost joy right now.",
    url: "https://calm-minute-production.up.railway.app",
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
    id: "benefits-deadline-radar",
    name: "Benefits Deadline Radar",
    description:
      "Track SNAP, Medicaid, WIC, and unemployment renewal deadlines before your coverage lapses.",
    url: "https://benefits-deadline-radar-production.up.railway.app",
    status: "live",
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
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <nav className="fixed top-0 right-0 p-6 z-50">
        <a
          href="/about"
          className="text-xs text-neutral-500 hover:text-white transition-colors duration-150 uppercase tracking-widest"
        >
          About
        </a>
      </nav>

      <div className="flex-1 flex flex-col items-center px-6 pt-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight mb-4">
            Infinite Machines
          </h1>
          <p className="text-neutral-500 text-lg md:text-xl tracking-wide">
            Systems that ship what matters
          </p>
        </div>

        <div className="w-full max-w-[900px] mb-20">
          <h2 className="text-[10px] text-neutral-600 uppercase tracking-[4px] text-center mb-8">
            Fleet Status
          </h2>
          <FleetDashboard />
        </div>

        <div className="w-px h-12 bg-gradient-to-b from-neutral-800 to-transparent mb-12" />

        <section className="w-full max-w-[820px] mb-20" aria-labelledby="projects-heading">
          <h2
            id="projects-heading"
            className="text-[10px] text-neutral-600 uppercase tracking-[4px] text-center mb-8"
          >
            Projects
          </h2>

          <div className="space-y-3">
            {projects.map((project) => (
              <article key={project.id} className={`${ds.card} rounded-lg`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-white uppercase tracking-[0.12em]">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                    {project.status}
                  </span>
                </div>
                <div className="mt-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ds.buttonGhost} inline-block`}
                  >
                    Open Project
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

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
