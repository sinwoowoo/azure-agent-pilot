import React, { useState } from 'react';
import { 
  ARCHITECTURE_LAYERS, 
  COPILOT_AGENT_NODES, 
  AUTOMATION_SCENARIOS 
} from '../data/copilotArchitectureData';
import { ArchitectureNode, AutomationScenario } from '../types';
import { 
  Layers, 
  Cpu, 
  Terminal, 
  ShieldCheck, 
  GitPullRequest, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Code, 
  ExternalLink, 
  Play, 
  RotateCcw, 
  Info, 
  Zap, 
  Bot, 
  Lock, 
  Database, 
  FileCode, 
  GitBranch, 
  CheckSquare, 
  ChevronRight,
  Workflow
} from 'lucide-react';

export const CopilotAgentArchitectureMap: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('copilot-chat-ide');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('scenario-issue-to-pr');
  const [scenarioStep, setScenarioStep] = useState<number>(0);
  const [isScenarioPlaying, setIsScenarioPlaying] = useState<boolean>(false);
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'architecture' | 'scenarios'>('architecture');

  const selectedNode = COPILOT_AGENT_NODES.find(n => n.id === selectedNodeId) || COPILOT_AGENT_NODES[0];
  const activeScenario = AUTOMATION_SCENARIOS.find(s => s.id === activeScenarioId) || AUTOMATION_SCENARIOS[0];

  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeKey(key);
    setTimeout(() => setCopiedCodeKey(null), 2000);
  };

  const handleScenarioAutoPlay = () => {
    setIsScenarioPlaying(true);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= activeScenario.steps.length) {
        clearInterval(interval);
        setIsScenarioPlaying(false);
      } else {
        setScenarioStep(current);
      }
    }, 1500);
  };

  const filteredNodes = selectedCategoryFilter === 'all'
    ? COPILOT_AGENT_NODES
    : COPILOT_AGENT_NODES.filter(n => n.category === selectedCategoryFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ide_copilot': return Terminal;
      case 'protocol': return Zap;
      case 'agent_framework': return Bot;
      case 'sandbox': return ShieldCheck;
      case 'automation_devops': return GitPullRequest;
      case 'models': return Sparkles;
      default: return Cpu;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-400/30 text-blue-300">
                <Workflow className="w-3.5 h-3.5" />
                <span>통합 시스템 아키텍처 & 실무 자동화</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Microsoft Agent Framework + GitHub Copilot SDK GA
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Agent Framework & GitHub Copilot 통합 아키텍처
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              개발자 IDE(Copilot Chat/SDK)부터 멀티 에이전트 오케스트레이션 코어, 격리 샌드박스 보안 실행, 그리고 GitHub Actions 기반의 완전 자동화 CI/CD DevOps 파이프라인까지의 전 과정을 시각화하고 심층 예시를 제공합니다.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 shrink-0 self-start lg:self-center">
            <button
              onClick={() => setActiveViewMode('architecture')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeViewMode === 'architecture'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>시스템 아키텍처 맵</span>
            </button>
            <button
              onClick={() => setActiveViewMode('scenarios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeViewMode === 'scenarios'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitPullRequest className="w-4 h-4" />
              <span>개발 & 자동화 실무 사례 (4개)</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: Full System Architecture Map & Blueprint */}
      {activeViewMode === 'architecture' && (
        <div className="space-y-6">
          {/* Layer Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0">계층 필터:</span>
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedCategoryFilter === 'all'
                  ? 'bg-slate-700 text-white border border-slate-600'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              전체 계층 보기
            </button>
            {ARCHITECTURE_LAYERS.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedCategoryFilter(layer.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedCategoryFilter === layer.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                <span>{layer.name.split('.')[1] || layer.name}</span>
              </button>
            ))}
          </div>

          {/* Master Visual Architecture Blueprint Diagram Container */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* Visual Stream Watermark & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-blue-400" />
                  <span>End-to-End 시스템 아키텍처 다이어그램</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  각 노드를 클릭하면 해당 컴포넌트의 상세 역할, 입출력 명세, 보안 격리 정책 및 실제 구현 코드를 확인할 수 있습니다.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>실시간 데이터 스트림 흐름 (Left to Right)</span>
              </div>
            </div>

            {/* Visual Architecture Flow Grid (6 Pillars) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
              {filteredNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const IconComponent = getCategoryIcon(node.category);

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`cursor-pointer group relative rounded-xl border p-5 transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-blue-950/70 to-slate-900 border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-900/30 scale-[1.02]'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700 hover:shadow-md'
                    }`}
                  >
                    {/* Top Tag & Status */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700/80">
                          {node.category.replace('_', ' ')}
                        </span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-blue-400'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors mb-1.5 flex items-center gap-1.5">
                        <span>{node.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                        {node.role}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-3 pt-3 border-t border-slate-800/80">
                      <div className="flex flex-wrap gap-1.5">
                        {node.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-400 border border-slate-800/80 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 pt-1">
                        <span className="text-blue-400 group-hover:underline flex items-center gap-1">
                          <span>상세 명세 및 코드 보기</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {node.inputs.length} In / {node.outputs.length} Out
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Architecture Node Detailed Inspector Panel */}
            <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{selectedNode.name}</h3>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30 uppercase font-mono">
                        {selectedNode.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{selectedNode.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">핵심 기술 스택:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.technologies.map((t, idx) => (
                      <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description & In/Out Spec Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-blue-400" />
                      <span>컴포넌트 개요 및 동작 원리</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                      {selectedNode.description}
                    </p>
                  </div>

                  {/* Input / Output Spec */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>수신 입력 데이터 (Inputs)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {selectedNode.inputs.map((inp, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{inp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>출력 및 생성 산출물 (Outputs)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {selectedNode.outputs.map((out, idx) => (
                          <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Security Highlights */}
                  {selectedNode.securityHighlights && (
                    <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>보안 격리 및 거버넌스 제어 정책 (Security Controls)</span>
                      </div>
                      <ul className="space-y-1">
                        {selectedNode.securityHighlights.map((sec, idx) => (
                          <li key={idx} className="text-xs text-amber-200/90 flex items-start gap-1.5">
                            <span className="text-amber-400">•</span>
                            <span>{sec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Code Snippet Box */}
                {selectedNode.codeExample && (
                  <div className="space-y-2 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-blue-400" />
                        <span>{selectedNode.codeExample.filename}</span>
                      </span>
                      <button
                        onClick={() => handleCopyCode(selectedNode.codeExample!.code, selectedNode.id)}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded border border-slate-700 transition flex items-center gap-1"
                      >
                        {copiedCodeKey === selectedNode.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">복사됨</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>코드 복사</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-300 max-h-[360px] overflow-y-auto">
                      <pre>
                        <code>{selectedNode.codeExample.code}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Real-World Development & Automation Scenarios */}
      {activeViewMode === 'scenarios' && (
        <div className="space-y-6">
          {/* Scenario Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {AUTOMATION_SCENARIOS.map((scenario) => {
              const isSelected = activeScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setActiveScenarioId(scenario.id);
                    setScenarioStep(0);
                    setIsScenarioPlaying(false);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-900/30 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                      : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${scenario.badgeColor}`}>
                      {scenario.tag.split(' ')[0]}
                    </span>
                    <GitPullRequest className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 leading-snug">{scenario.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {scenario.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Scenario Interactive Workflow Studio */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Scenario Header Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${activeScenario.badgeColor}`}>
                    {activeScenario.tag}
                  </span>
                  <h3 className="text-lg font-extrabold text-white">{activeScenario.title}</h3>
                </div>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  {activeScenario.summary}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <span className="text-slate-400">
                    <strong className="text-blue-400">트리거:</strong> {activeScenario.trigger}
                  </span>
                  <span className="text-slate-400">
                    <strong className="text-emerald-400">도입 효과:</strong> {activeScenario.benefit}
                  </span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleScenarioAutoPlay}
                  disabled={isScenarioPlaying}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs px-3.5 py-2 rounded-lg font-bold shadow-md shadow-blue-600/30 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isScenarioPlaying ? '시뮬레이션 중...' : '자동 시뮬레이션'}</span>
                </button>
                <button
                  onClick={() => setScenarioStep((prev) => (prev + 1) % activeScenario.steps.length)}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg border border-slate-700 transition"
                >
                  <span>다음 단계</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setScenarioStep(0);
                    setIsScenarioPlaying(false);
                  }}
                  className="text-xs text-slate-400 hover:text-white px-2 py-2 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Step-by-Step Flow Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {activeScenario.steps.map((step, idx) => {
                const isCurrent = scenarioStep === idx;
                const isPassed = scenarioStep > idx;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setScenarioStep(idx);
                      setIsScenarioPlaying(false);
                    }}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-blue-950/70 border-blue-500 ring-2 ring-blue-500/40 shadow-lg scale-[1.02]'
                        : isPassed
                        ? 'bg-slate-900/90 border-emerald-500/50 hover:bg-slate-800'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900 opacity-70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                            isCurrent
                              ? 'bg-blue-600 text-white animate-pulse'
                              : isPassed
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {step.order}
                        </span>
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                            Active
                          </span>
                        ) : null}
                      </div>

                      <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">{step.phase}</h4>
                      <div className="text-[11px] text-blue-300 font-mono mb-2">{step.actor}</div>
                      <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed mb-3">
                        {step.description}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400">
                      <span className="text-slate-400 block text-[9px] uppercase tracking-wider">산출물</span>
                      <span className="truncate block text-slate-200">{step.artifact}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Phase Spotlight & Code Implementation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-900 p-5 rounded-xl border border-slate-800">
              {/* Left Column: Active Step Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                  <Cpu className="w-4 h-4" />
                  <span>단계 {scenarioStep + 1} 상세 실행 내역: {activeScenario.steps[scenarioStep].phase}</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div>
                    <span className="text-slate-400 text-xs block mb-0.5">수행 주체 (Actor):</span>
                    <span className="text-xs font-bold text-white font-mono bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">
                      {activeScenario.steps[scenarioStep].actor}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-xs block mb-0.5">실행 상세 (Execution Details):</span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {activeScenario.steps[scenarioStep].details}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 text-xs block mb-0.5">최종 생성 산출물 (Artifact):</span>
                    <span className="text-xs font-bold text-emerald-300 font-mono">
                      ✓ {activeScenario.steps[scenarioStep].artifact}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-950/30 border border-blue-500/20 p-3 rounded-lg text-xs text-slate-300 flex items-start gap-2">
                  <Zap className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    이 시나리오는 <strong>GitHub Copilot SDK</strong>의 이벤트 스트리머와 <strong>Microsoft Agent Framework</strong>의 분산 상태 머신을 연결하여 100% 비동기 논블로킹으로 처리됩니다.
                  </span>
                </div>
              </div>

              {/* Right Column: Code Implementation Example */}
              <div className="space-y-2 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-blue-400" />
                    <span>{activeScenario.codeSnippet.filename}</span>
                  </span>
                  <button
                    onClick={() => handleCopyCode(activeScenario.codeSnippet.code, activeScenario.id)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 transition flex items-center gap-1"
                  >
                    {copiedCodeKey === activeScenario.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">복사 완료</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>전체 코드 복사</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-300 max-h-[300px] overflow-y-auto">
                  <pre>
                    <code>{activeScenario.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
