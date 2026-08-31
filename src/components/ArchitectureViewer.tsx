import React, { useState } from 'react';
import { ARCHITECTURE_PATTERNS } from '../data/guides';
import { CopilotAgentArchitectureMap } from './CopilotAgentArchitectureMap';
import { Layers, ArrowRight, Play, CheckCircle2, Shield, Bot, Database, Code, Terminal, Cpu, Workflow, Sparkles } from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'copilot-arch' | 'patterns'>('copilot-arch');
  const [selectedPatternId, setSelectedPatternId] = useState<string>('sequential-pipeline');
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectedPattern =
    ARCHITECTURE_PATTERNS.find((p) => p.id === selectedPatternId) || ARCHITECTURE_PATTERNS[0];

  const handleNextStep = () => {
    setSimulationStep((prev) => (prev + 1) % selectedPattern.flow.length);
  };

  const handleReset = () => {
    setSimulationStep(0);
    setIsPlaying(false);
  };

  const handleAutoPlay = () => {
    setIsPlaying(true);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= selectedPattern.flow.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setSimulationStep(current);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Architecture Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('copilot-arch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'copilot-arch'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>Copilot & Agent Framework 통합 아키텍처 & 자동화</span>
            <span className="text-[10px] bg-blue-700/80 px-1.5 py-0.5 rounded font-mono">
              NEW
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('patterns')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'patterns'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>멀티 에이전트 기본 오케스트레이션 패턴</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
              4 Patterns
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-400 px-2 hidden sm:block">
          {activeSubTab === 'copilot-arch' 
            ? 'IDE ➔ Agent Core ➔ Sandbox ➔ DevOps 6계층 구조'
            : '단일, 순차, 계층형, 샌드박스 상태 전이 시뮬레이션'}
        </div>
      </div>

      {/* Main Content Render */}
      {activeSubTab === 'copilot-arch' ? (
        <CopilotAgentArchitectureMap />
      ) : (
        <div className="space-y-6">
          {/* Top Banner for Classic Patterns */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md mb-2 w-fit">
              <Layers className="w-3.5 h-3.5" />
              <span>에이전트 아키텍처 & 워크플로 시각화</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              멀티 에이전트 오케스트레이션 및 샌드박스 패턴
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Microsoft Agent Framework의 주요 오케스트레이션 패턴을 시각적으로 확인하고, 단계별 메시지 전달 및 상태 전이(State Transition) 흐름을 시뮬레이션할 수 있습니다.
            </p>
          </div>

          {/* Pattern Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ARCHITECTURE_PATTERNS.map((pattern) => {
              const isSelected = selectedPattern.id === pattern.id;
              return (
                <button
                  key={pattern.id}
                  onClick={() => {
                    setSelectedPatternId(pattern.id);
                    setSimulationStep(0);
                    setIsPlaying(false);
                  }}
                  className={`p-4 rounded-xl border text-left transition ${
                    isSelected
                      ? 'bg-blue-900/30 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                      : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {pattern.diagramType}
                    </span>
                    <Layers className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1">{pattern.name}</h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {pattern.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Workflow Visualizer Container */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{selectedPattern.name}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  <span className="font-semibold text-blue-400">적용 사례:</span> {selectedPattern.useCase}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAutoPlay}
                  disabled={isPlaying}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg font-medium shadow transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPlaying ? '실행 중...' : '자동 재생'}</span>
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  <span>다음 단계</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1.5 transition"
                >
                  초기화
                </button>
              </div>
            </div>

            {/* Step-by-Step Interactive Flow Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {selectedPattern.flow.map((item, idx) => {
                const isCurrent = simulationStep === idx;
                const isPassed = simulationStep > idx;

                return (
                  <div
                    key={idx}
                    className={`relative rounded-xl border p-4 transition-all duration-300 ${
                      isCurrent
                        ? 'bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/30 scale-102 shadow-lg shadow-blue-900/20'
                        : isPassed
                        ? 'bg-slate-900/90 border-emerald-500/50'
                        : 'bg-slate-900/40 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                            isCurrent
                              ? 'bg-blue-600 text-white animate-pulse'
                              : isPassed
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {item.step}
                        </span>
                        <span className="text-xs font-bold text-slate-200">{item.role}</span>
                      </div>
                      {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>

                    <div className="text-xs text-slate-300 font-medium mb-3 min-h-[36px]">
                      {item.action}
                    </div>

                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[11px] font-mono text-blue-300">
                      <span className="text-slate-500 block text-[9px] uppercase tracking-wider mb-0.5">
                        산출물 (Artifact)
                      </span>
                      {item.output}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Interactive Flow Details Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>현재 활성 상태: 단계 {simulationStep + 1} - {selectedPattern.flow[simulationStep].role}</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                    Active Node
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {selectedPattern.flow[simulationStep].action} 후속 처리를 위해{' '}
                  <strong className="text-blue-300 font-mono">
                    {selectedPattern.flow[simulationStep].output}
                  </strong>
                  (을)를 워크플로 공유 컨텍스트(State Storage)에 기록합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
