import React, { useState } from 'react';
import { PRACTICAL_STEPS } from '../data/guides';
import { CodeLanguage, GuideStep } from '../types';
import { Check, Copy, Terminal, CheckCircle2, ChevronRight, AlertCircle, FileCode, CheckSquare, Square } from 'lucide-react';

interface ImplementationGuideTabProps {
  searchQuery: string;
}

export const ImplementationGuideTab: React.FC<ImplementationGuideTabProps> = ({ searchQuery }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>('python');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const languageOptions: { id: CodeLanguage; label: string; iconLabel: string }[] = [
    { id: 'python', label: 'Python', iconLabel: 'PY' },
    { id: 'typescript', label: 'TypeScript / Node', iconLabel: 'TS' },
    { id: 'csharp', label: 'C# / .NET', iconLabel: 'C#' },
    { id: 'json', label: 'JSON / REST API', iconLabel: 'REST' }
  ];

  const filteredSteps = PRACTICAL_STEPS.filter((step) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      step.title.toLowerCase().includes(query) ||
      step.description.toLowerCase().includes(query) ||
      step.keyConcepts.some((k) => k.toLowerCase().includes(query))
    );
  });

  const activeStep = filteredSteps[activeStepIndex] || filteredSteps[0] || PRACTICAL_STEPS[0];

  const handleCopyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeKey(key);
    setTimeout(() => setCopiedCodeKey(null), 2000);
  };

  const toggleChecklist = (stepId: string, idx: number) => {
    const key = `${stepId}-${idx}`;
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const currentSnippet = activeStep.snippets[selectedLanguage] || activeStep.snippets.python;

  return (
    <div className="space-y-6">
      {/* Top Guide Overview Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Microsoft Agent Framework & Copilot SDK 실무 개발 가이드</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              실무 환경 에이전트 개발 7단계 파이프라인
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              초기 프로젝트 설정부터 Tool Calling, Foundry BYOK 모델 연동, Copilot SDK 확장, 멀티 에이전트 오케스트레이션, 샌드박스 보안 격리까지 실제 상용 개발 단계별 가이드를 제공합니다.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <span className="text-[11px] font-medium text-slate-400 px-2">개발 언어:</span>
            {languageOptions.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedLanguage === lang.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] font-mono font-bold">{lang.iconLabel}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Stepper Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Step Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-400 px-1 mb-2">
            단계별 가이드 ({filteredSteps.length}단계)
          </div>
          {filteredSteps.map((step, idx) => {
            const isSelected = activeStep.id === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-blue-500 shadow-md ring-1 ring-blue-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {step.stepNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-xs font-bold leading-snug truncate ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {step.subtitle}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition ${
                    isSelected ? 'text-blue-400 translate-x-0.5' : 'text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: Step Detail & Code Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Step Header Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white font-bold text-xs px-2.5 py-1 rounded-md">
                  STEP {activeStep.stepNumber}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {activeStep.title}
                </h3>
              </div>
              <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                {activeStep.subtitle}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeStep.description}
            </p>

            {/* Key Concepts Grid */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>핵심 구현 개념</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeStep.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Verification Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>구현 체크리스트 (클릭하여 체크)</span>
              </div>
              <div className="space-y-1.5">
                {activeStep.checklist.map((item, idx) => {
                  const checkKey = `${activeStep.id}-${idx}`;
                  const isChecked = !!completedSteps[checkKey];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleChecklist(activeStep.id, idx)}
                      className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg text-xs transition ${
                        isChecked
                          ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-800/40 line-through'
                          : 'bg-slate-950/40 text-slate-300 hover:bg-slate-950/80 border border-slate-800/60'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      )}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-semibold text-slate-200">
                  {currentSnippet.filename || `${activeStep.id}.${selectedLanguage}`}
                </span>
                <span className="text-[10px] text-slate-500 uppercase px-1.5 py-0.5 bg-slate-800 rounded">
                  {currentSnippet.language}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode(currentSnippet.code, `${activeStep.id}-${selectedLanguage}`)}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-700 transition"
                  title="코드 복사"
                >
                  {copiedCodeKey === `${activeStep.id}-${selectedLanguage}` ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>코드 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-slate-200 bg-slate-950/90">
              <pre>
                <code>{currentSnippet.code}</code>
              </pre>
            </div>

            <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{currentSnippet.description}</span>
              <span className="text-slate-500">Language: {selectedLanguage.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
