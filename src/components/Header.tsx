import { Cpu, Layers, BookOpen, Terminal, ShieldCheck, Sparkles, CheckCircle2, Copy, Check } from 'lucide-react';
import React, { useState } from 'react';

interface HeaderProps {
  activeTab: 'summary' | 'guide' | 'architecture' | 'sandbox' | 'simulator' | 'practices';
  setActiveTab: (tab: 'summary' | 'guide' | 'architecture' | 'sandbox' | 'simulator' | 'practices') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const navItems = [
    { id: 'summary', label: '자원 핵심 요약', icon: BookOpen, badge: '12개 공식 링크' },
    { id: 'guide', label: '실무 개발 적용 가이드', icon: Terminal, badge: '7단계 가이드' },
    { id: 'architecture', label: '아키텍처 & 워크플로', icon: Layers, badge: '멀티 에이전트' },
    { id: 'sandbox', label: '샌드박스 설정 빌더', icon: ShieldCheck, badge: '보안 격리' },
    { id: 'simulator', label: '에이전트 시뮬레이터', icon: Cpu, badge: '인터랙티브' },
    { id: 'practices', label: '모범 사례 & 체크리스트', icon: Sparkles, badge: 'Awesome Copilot' }
  ] as const;

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 text-white backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  Microsoft Agent Framework & Copilot SDK
                </h1>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs px-2 py-0.5 rounded-full font-medium">
                  GA & Preview Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Azure AI Foundry · Multi-Agent Workflows · Model Inference API · Sandboxing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="키워드 검색 (예: sandbox, python, foundry)..."
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition"
              title="링크 복사"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? '복사됨' : '공유'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
