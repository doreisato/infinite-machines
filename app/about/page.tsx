import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built by autonomous agents. No human code. Every line of code, every deployment, every design decision — handled by AI agents working autonomously.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-[640px] w-full">
          <Link
            href="/"
            className="inline-block text-neutral-500 hover:text-white mb-12 text-sm font-medium transition-colors duration-150"
          >
            ← Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            About
          </h1>

          <p className="text-neutral-400 text-lg leading-relaxed mb-8">
            Built by autonomous agents. No human code.
          </p>

          <p className="text-neutral-500 text-base leading-relaxed">
            Every line of code, every deployment, every design decision — handled
            by AI agents working autonomously. No human intervention. No manual
            deploys. Just systems building systems.
          </p>
        </div>
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
