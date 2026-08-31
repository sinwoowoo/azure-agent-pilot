import React, { useState } from 'react';
import { Sparkles, Check, Copy, ShieldAlert, Zap, FileText, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export const BestPracticesTab: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sampleCopilotInstructions = `# Copilot Agent Project Instructions

## 1. Persona & Tone
- Act as an enterprise senior software engineer and cloud architect.
- Be concise, direct, and provide complete, copy-pasteable TypeScript/C#/Python snippets.

## 2. Technology Stack & Constraints
- Runtime: Node.js 20+ / .NET 8 / Python 3.11
- Avoid deprecated APIs; strictly prefer latest Microsoft Agent Framework patterns.
- Always implement exhaustive error handling and typed return signatures.

## 3. Security & Safety Rules (Zero-Trust)
- NEVER hardcode credentials, connection strings, or private keys.
- All database queries MUST use parameterized inputs to prevent SQL Injection.
- Sanitize and validate all untrusted inputs using Zod or FluentValidation.
- Any shell execution must be routed through the sandboxed container runtime.

## 4. Testing & Code Quality Requirements
- Every new function must include corresponding unit tests covering edge cases.
- Maintain at least 85% branch coverage.`;

  const practiceCards = [
    {
      title: '1. 컨텍스트 엔지니어링 (.github/copilot-instructions.md)',
      badge: 'Context Rule',
      description: 'Copilot과 에이전트가 레포지토리 전역에서 항상 지켜야 할 아키텍처 규칙, 코딩 컨벤션, 사용 금지 라이브러리를 단일 마크다운 파일에 명시합니다.',
      rules: [
        '레포지토리 루트에 `.github/copilot-instructions.md` 생성',
        '프로젝트 기술 스택 버전, 린터 규칙, 네이밍 컨벤션 명시',
        '금지된 레거시 라이브러리(예: axios 대신 fetch, moment 대신 date-fns) 선언'
      ]
    },
    {
      title: '2. 도구 설계 및 환각 방지 (Single Responsibility Tools)',
      badge: 'Tool Design',
      description: '에이전트에게 20개 이상의 방대한 툴을 한 번에 주면 도구 선택 혼란과 환각이 급증합니다. 도메인별 소형 에이전트로 쪼개세요.',
      rules: [
        '에이전트 1개당 3~5개의 직관적인 도구만 할당',
        '함수 설명(Description)에 인자 제약 조건과 실패 시 반환 규격을 명확히 기재',
        '파괴적인 작업(DB DELETE, 클라우드 배포)은 반드시 사람의 승인(Confirm) 다이얼로그 강제'
      ]
    },
    {
      title: '3. 샌드박스 및 보안 격리 (Zero Trust Sandbox)',
      badge: 'Security',
      description: '에이전트가 임의 코드를 생성하여 로컬에서 실행할 때 반드시 격리된 샌드박스 컨테이너에서 구동하도록 설정합니다.',
      rules: [
        '`.github/copilot-sandbox.json`에서 `readOnlyRoot: true` 적용',
        '네트워크 아웃바운드는 신뢰할 수 있는 레지스트리(npm, pypi, azure)만 화이트리스트',
        '메모리 상한(예: 512MB) 및 CPU 제한을 걸어 무한 루프 DoS 공격 방지'
      ]
    },
    {
      title: '4. 모니터링 & OpenTelemetry 계측',
      badge: 'Observability',
      description: '프로덕션 환경에서 에이전트의 토큰 사용량, 지연 시간, 호출 실패율을 실시간 대시보드로 관측 가능하게 구성합니다.',
      rules: [
        'Azure Application Insights 또는 OpenTelemetry 기반 Span 추적',
        '프롬프트 인젝션 탐지 및 Azure AI Content Safety 가드레일 활성화',
        '에이전트 호출 비용 및 토큰 소모량 사용자별 Quota 제어'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md mb-2 w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Awesome Copilot & Enterprise Production Best Practices</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          실무 적용 모범 사례 및 엔터프라이즈 체크리스트
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          GitHub 커뮤니티와 Microsoft 엔지니어링 팀이 검증한 프로덕션 수준 에이전트 개발 및 보안 운영 지침입니다.
        </p>
      </div>

      {/* Best Practice 4-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {practiceCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-amber-300 border border-slate-700 px-2 py-0.5 rounded">
                {card.badge}
              </span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>

            <h3 className="text-sm font-bold text-white">{card.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{card.description}</p>

            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              {card.rules.map((rule, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Copilot Instructions Template Code Block */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              .github/copilot-instructions.md (추천 템플릿)
            </span>
          </div>
          <button
            onClick={() => handleCopy(sampleCopilotInstructions, 'instructions')}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
          >
            {copiedSection === 'instructions' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">복사 완료</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>템플릿 복사</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed bg-slate-950">
          <pre>
            <code>{sampleCopilotInstructions}</code>
          </pre>
        </div>

        <div className="p-3 bg-slate-900/40 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>이 파일을 프로젝트에 추가하면 VS Code 및 Copilot Chat 에이전트가 해당 규칙을 최우선으로 따릅니다.</span>
          <a
            href="https://github.com/github/awesome-copilot"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 font-medium"
          >
            <span>Awesome Copilot 저장소</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
