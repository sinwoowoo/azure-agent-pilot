import React, { useState } from 'react';
import { Play, RotateCcw, Bot, Shield, CheckCircle, Terminal, Cpu, ArrowRight, Activity } from 'lucide-react';

interface SimulationStepLog {
  agent: string;
  role: string;
  action: string;
  details: string;
  status: 'pending' | 'running' | 'completed';
  timestamp: string;
}

export const InteractiveAgentSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<SimulationStepLog[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);

  const scenarios = [
    {
      title: '보안 취약점 감사 및 자동 패치 워크플로',
      description: '정적 분석 에이전트가 코드를 스캔하고, Coder 에이전트가 패치 코드를 작성한 뒤 샌드박스에서 컴파일 및 테스트를 검증합니다.',
      model: 'GPT-4o / Claude 3.5 Sonnet',
      steps: [
        {
          agent: 'SecOps-Scanner',
          role: 'Security Audit Agent',
          action: 'AST 구문 분석 및 SQL Injection 취약점 탐지',
          details: '위험도 높음 (CWE-89): UserRepository.cs 42번 라인에서 문자열 보간 쿼리 발견'
        },
        {
          agent: 'CodeGen-Refactor',
          role: 'Developer Agent',
          action: 'Dapper 파라미터화 쿼리 및 DTO 객체 바인딩 코드로 패치 생성',
          details: 'var sql = "SELECT * FROM Users WHERE Email = @Email"; await db.QueryAsync(sql, new { Email });'
        },
        {
          agent: 'Sandbox-Runner',
          role: 'Isolated Sandbox Runner',
          action: 'Docker 격리 컨테이너에서 단위 테스트 및 회귀 테스트 빌드',
          details: '컨테이너 ID: dck_7f9a2 · CPU 1.2 core 사용 · 8개 테스트 케이스 100% 통과 (0.42s)'
        },
        {
          agent: 'GitHub-PR-Agent',
          role: 'DevOps Agent',
          action: '자동 Pull Request 생성 및 승인 요청',
          details: 'PR #142 생성 완료: "fix(auth): secure SQL query parameterization in UserRepository"'
        }
      ]
    },
    {
      title: 'REST API 생성 및 클라이언트 SDK 자동 빌드',
      description: 'OpenAPI 스펙을 분석하여 Controller를 만들고, TypeScript 클라이언트 타입 및 Mock 서버를 샌드박스에서 즉시 검증합니다.',
      model: 'Azure AI Foundry Phi-4 + GPT-4o',
      steps: [
        {
          agent: 'Spec-Parser',
          role: 'Architect Agent',
          action: 'OpenAPI 3.1 YAML 스펙 구문 분석 및 데이터 엔터티 모델링',
          details: '엔드포인트 3개 추출: GET /api/v1/orders, POST /api/v1/orders, GET /api/v1/orders/{id}'
        },
        {
          agent: 'Backend-Coder',
          role: 'Backend Developer Agent',
          action: 'Express / TypeScript 기반 API 핸들러 및 Zod 스키마 검증기 생성',
          details: '입력 유효성 검증 Zod Schema 및 비동기 에러 핸들러 미들웨어 자동 생성 완료'
        },
        {
          agent: 'Sandbox-Tester',
          role: 'Test Sandbox Agent',
          action: '로컬 격리 샌드박스에서 Vitest 엔드투엔드 API 통합 테스트 수행',
          details: 'HTTP Status 200/400/404 시나리오 12건 모두 성공 (Memory Limit 512MB 제한 준수)'
        },
        {
          agent: 'Doc-Generator',
          role: 'Documentation Agent',
          action: 'Swagger UI 문서 및 클라이언트용 TypeScript Definition 패키징',
          details: 'dist/types.d.ts 및 swagger.json 빌드 완료'
        }
      ]
    }
  ];

  const handleRunSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setCurrentStepIndex(0);

    const activeScenario = scenarios[selectedScenario];
    let step = 0;

    const runNext = () => {
      if (step < activeScenario.steps.length) {
        const item = activeScenario.steps[step];
        const now = new Date().toLocaleTimeString('ko-KR');

        setLogs((prev) => [
          ...prev,
          {
            ...item,
            status: 'completed',
            timestamp: now
          }
        ]);
        setCurrentStepIndex(step);
        step++;
        setTimeout(runNext, 1100);
      } else {
        setIsRunning(false);
      }
    };

    runNext();
  };

  const handleReset = () => {
    setIsRunning(false);
    setLogs([]);
    setCurrentStepIndex(-1);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md mb-2 w-fit">
          <Activity className="w-3.5 h-3.5" />
          <span>대화형 에이전트 실행 시뮬레이터</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          실제 멀티 에이전트 파이프라인 실시간 실행 시뮬레이션
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          에이전트 간 역할 분담(Agent Roles), Tool Calling, 샌드박스 격리 검증, 산출물 전달(Handoff) 과정을 시각적 실시간 로그 스트림으로 직접 체험해보세요.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((sc, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedScenario(idx);
              handleReset();
            }}
            disabled={isRunning}
            className={`p-4 rounded-xl border text-left transition ${
              selectedScenario === idx
                ? 'bg-blue-900/30 border-blue-500 ring-1 ring-blue-500/40 shadow-md'
                : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-blue-400">시나리오 #{idx + 1}</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                {sc.model}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">{sc.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{sc.description}</p>
          </button>
        ))}
      </div>

      {/* Simulator Execution Control Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs text-slate-200">
            <span className="font-semibold">선택된 파이프라인:</span>{' '}
            <span className="text-blue-300">{scenarios[selectedScenario].title}</span> (총 4개 에이전트 노드)
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs px-4 py-2 rounded-lg font-medium shadow-md transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? '에이전트 실행 중...' : '시뮬레이션 시작'}</span>
          </button>
          <button
            onClick={handleReset}
            disabled={isRunning}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded-lg border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>
        </div>
      </div>

      {/* Real-time Execution Feed */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              Agent Orchestration Event Stream
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {logs.length} / {scenarios[selectedScenario].steps.length} Steps Completed
          </span>
        </div>

        <div className="p-4 space-y-3 min-h-[260px] bg-slate-950 font-mono text-xs">
          {logs.length === 0 && !isRunning && (
            <div className="text-center py-12 text-slate-500">
              <Bot className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
              <p>상단의 [시뮬레이션 시작] 버튼을 눌러 에이전트 간 오케스트레이션을 확인하세요.</p>
            </div>
          )}

          {logs.map((log, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5 transition-all animate-fadeIn space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-blue-600/30 text-blue-300 border border-blue-500/40 px-2 py-0.5 rounded font-bold">
                    @{log.agent}
                  </span>
                  <span className="text-[11px] text-slate-400">({log.role})</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{log.timestamp}</span>
                </div>
              </div>

              <div className="text-slate-200 font-medium pl-1">{log.action}</div>

              <div className="bg-slate-950 p-2 rounded border border-slate-800/80 text-[11px] text-slate-300">
                <span className="text-slate-500 mr-2">&gt;</span>
                {log.details}
              </div>
            </div>
          ))}

          {isRunning && (
            <div className="flex items-center gap-2 p-3 bg-blue-950/20 border border-blue-800/30 rounded-lg text-xs text-blue-300 animate-pulse">
              <Cpu className="w-4 h-4 text-blue-400 animate-spin" />
              <span>다음 에이전트로 컨텍스트 Handoff 및 추론 중...</span>
            </div>
          )}

          {!isRunning && logs.length === scenarios[selectedScenario].steps.length && (
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>🎉 모든 에이전트 단계가 샌드박스 보안 검증과 함께 성공적으로 완료되었습니다!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
