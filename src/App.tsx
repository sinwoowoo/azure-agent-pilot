import React, { useState } from 'react';
import { Header } from './components/Header';
import { ResourceSummaryTab } from './components/ResourceSummaryTab';
import { ImplementationGuideTab } from './components/ImplementationGuideTab';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { SandboxConfigBuilder } from './components/SandboxConfigBuilder';
import { InteractiveAgentSimulator } from './components/InteractiveAgentSimulator';
import { BestPracticesTab } from './components/BestPracticesTab';
import { RESOURCES_DATA } from './data/resources';
import { BookOpen, Terminal, Layers, ShieldCheck, Cpu, Sparkles, ExternalLink, Github, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'summary' | 'guide' | 'architecture' | 'sandbox' | 'simulator' | 'practices'>('summary');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      <div>
        {/* Top Sticky Header & Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Context Banner */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Microsoft Agent Framework & GitHub Copilot SDK GA 실무 적용 지원 시스템</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button
                onClick={() => setActiveTab('guide')}
                className="hover:text-blue-300 transition flex items-center gap-1"
              >
                <span>7단계 실무 코드 가이드</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('sandbox')}
                className="hover:text-emerald-300 transition flex items-center gap-1"
              >
                <span>샌드박스 JSON 빌더</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Tab View */}
          {activeTab === 'summary' && (
            <ResourceSummaryTab resources={RESOURCES_DATA} searchQuery={searchQuery} />
          )}

          {activeTab === 'guide' && (
            <ImplementationGuideTab searchQuery={searchQuery} />
          )}

          {activeTab === 'architecture' && (
            <ArchitectureViewer />
          )}

          {activeTab === 'sandbox' && (
            <SandboxConfigBuilder />
          )}

          {activeTab === 'simulator' && (
            <InteractiveAgentSimulator />
          )}

          {activeTab === 'practices' && (
            <BestPracticesTab />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
              MS
            </div>
            <span>Microsoft Agent Framework & Copilot SDK Developer Hub · 2026</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <a
              href="https://learn.microsoft.com/en-us/agent-framework/overview/?WT.mc_id=AZ-MVP-5000671"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition inline-flex items-center gap-1"
            >
              <span>Microsoft Learn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/github/copilot-sdk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition inline-flex items-center gap-1"
            >
              <span>GitHub Copilot SDK</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/github/awesome-copilot"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition inline-flex items-center gap-1"
            >
              <span>Awesome Copilot</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
