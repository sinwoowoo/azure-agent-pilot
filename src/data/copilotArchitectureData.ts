import { ArchitectureNode, AutomationScenario } from '../types';

export const ARCHITECTURE_LAYERS = [
  {
    id: 'ide_copilot',
    name: '1. 개발자 IDE & Copilot 인터페이스',
    subtitle: 'VS Code, JetBrains, Copilot Chat, Slash Commands & Extensions',
    badge: 'Client & IDE Layer',
    color: 'from-blue-600/20 to-cyan-600/20 border-blue-500/40 text-blue-300'
  },
  {
    id: 'protocol',
    name: '2. Copilot SDK & 통신 프로토콜',
    subtitle: 'GitHub Copilot SDK, MCP (Model Context Protocol), JSON-RPC',
    badge: 'Protocol Gateway',
    color: 'from-indigo-600/20 to-violet-600/20 border-indigo-500/40 text-indigo-300'
  },
  {
    id: 'agent_framework',
    name: '3. Microsoft Agent Framework 오케스트레이션 코어',
    subtitle: 'Multi-Agent Mesh: Planner, Coder, Reviewer, State Manager',
    badge: 'Agent Orchestrator',
    color: 'from-emerald-600/20 to-teal-600/20 border-emerald-500/40 text-emerald-300'
  },
  {
    id: 'sandbox',
    name: '4. 격리 샌드박스 & 안전 실행 환경',
    subtitle: 'Docker, Podman, gVisor, File/Network Policy Enforcer',
    badge: 'Execution Sandbox',
    color: 'from-amber-600/20 to-orange-600/20 border-amber-500/40 text-amber-300'
  },
  {
    id: 'automation_devops',
    name: '5. GitHub 자동화 & CI/CD DevOps 파이프라인',
    subtitle: 'GitHub Actions, Issue-to-PR Engine, Auto-Review Bot',
    badge: 'DevOps Automation',
    color: 'from-purple-600/20 to-pink-600/20 border-purple-500/40 text-purple-300'
  },
  {
    id: 'models',
    name: '6. 파운데이션 모델 & 인퍼런스 프로바이더',
    subtitle: 'GitHub Models, Azure AI Foundry, GPT-4o, Claude 3.5 Sonnet, o3-mini',
    badge: 'Foundation Models',
    color: 'from-rose-600/20 to-orange-600/20 border-rose-500/40 text-rose-300'
  }
];

export const COPILOT_AGENT_NODES: ArchitectureNode[] = [
  {
    id: 'copilot-chat-ide',
    name: 'GitHub Copilot Chat & Editor',
    category: 'ide_copilot',
    role: '개발자와 대화형으로 소통하며 레포지토리 컨텍스트를 주입하고 에이전트 명령을 발행하는 프론트엔드 인터페이스',
    description: 'VS Code 및 JetBrains 내에서 `@agent /slash-command`를 통해 복잡한 멀티 에이전트 작업을 시작합니다. 현재 열려 있는 활성 파일, 터미널 출력, 커서 위치, Git diff를 캡처하여 컨텍스트로 전달합니다.',
    technologies: ['VS Code Extension API', 'Language Server Protocol (LSP)', 'Copilot Chat Participant'],
    inputs: ['개발자 프롬프트', '선택된 코드 영역', '열린 파일 버퍼', '터미널 에러 로그'],
    outputs: ['Agent Intent Request', 'Context Payload', 'Editor Code Inline Replacement'],
    codeExample: {
      language: 'typescript',
      filename: 'vscode-extension.ts',
      code: `// VS Code Copilot Chat Participant 정의
import * as vscode from 'vscode';

export function registerCopilotAgent(context: vscode.ExtensionContext) {
  const agent = vscode.chat.createChatParticipant('dev-assistant.agent', async (request, context, response, token) => {
    response.markdown('⚡ **Microsoft Agent Framework**에 작업을 위임 중입니다...\\n');
    
    // 현재 활성 에디터의 소스 코드와 커서 위치 캡처
    const activeDoc = vscode.window.activeTextEditor?.document.getText();
    
    const payload = {
      command: request.command, // e.g., 'scaffold', 'fix', 'test'
      prompt: request.prompt,
      workspaceContext: {
        activeFile: vscode.window.activeTextEditor?.document.fileName,
        content: activeDoc
      }
    };
    
    // Copilot SDK 백엔드 에이전트 호출
    const agentStream = await callAgentFrameworkBackend(payload);
    for await (const chunk of agentStream) {
      response.markdown(chunk);
    }
  });
}`
    },
    securityHighlights: [
      '개발자의 명시적인 승인 없이 로컬 파일 시스템 직접 쓰기 방지 (Diff 프리뷰 제공)',
      '개인정보/시크릿 유출 방지를 위한 로컬 클라이언트 단 토큰 필터링'
    ]
  },
  {
    id: 'copilot-sdk-protocol',
    name: 'GitHub Copilot SDK & MCP Protocol',
    category: 'protocol',
    role: 'Copilot Chat 환경과 백엔드 Agent Framework 간 양방향 스트리밍 및 툴 프로토콜 중계',
    description: '공식 `@github/copilot-sdk`를 활용하여 표준화된 JSON-RPC 및 Model Context Protocol (MCP) 기반으로 에이전트 스킬, 툴 정의, 이벤트 스트림을 처리합니다.',
    technologies: ['@github/copilot-sdk', 'Model Context Protocol (MCP)', 'Server-Sent Events (SSE)'],
    inputs: ['Chat Participant Request', 'Tool Definitions (JSON Schema)', 'Skill Manifest'],
    outputs: ['SSE Chunk Stream', 'Tool Call Dispatches', 'Feedback Telemetry'],
    codeExample: {
      language: 'typescript',
      filename: 'copilot-agent-service.ts',
      code: `import { CopilotAgentServer } from '@github/copilot-sdk';
import { runMultiAgentWorkflow } from './agentOrchestrator';

const server = new CopilotAgentServer({
  name: 'Enterprise Dev Agent',
  version: '1.0.0'
});

// 커스텀 스킬 & 슬래시 명령어 등록
server.registerSkill({
  id: 'auto-fix-pipeline',
  description: '샌드박스에서 테스트 검증 후 안전하게 코드를 자동 수정합니다.',
  parameters: {
    targetFiles: { type: 'array', items: { type: 'string' } },
    requirement: { type: 'string' }
  },
  handler: async (args, context) => {
    return await runMultiAgentWorkflow({
      task: args.requirement,
      files: args.targetFiles,
      user: context.user
    });
  }
});`
    },
    securityHighlights: [
      'GitHub OAuth 토큰 기반의 세분화된 저장소(Repo) 권한 검증',
      'Rate Limit 방어 및 사용자 요청 페이로드 무결성 서명'
    ]
  },
  {
    id: 'agent-orchestrator',
    name: 'Agent Framework Multi-Agent Core',
    category: 'agent_framework',
    role: '작업 분할(Planning), 전문 에이전트(Coder/Reviewer/Tester) 라우팅, 상태 머신 관리',
    description: 'Microsoft Agent Framework의 핵심 오케스트레이션 레이어입니다. 단일 프롬프트를 수신하면 Planner Agent가 실행 계획을 세우고, Coder Agent가 소스를 생성하며, Reviewer Agent가 정적 검증을 거쳐 합의(Consensus)에 도달합니다.',
    technologies: ['Microsoft.Agents.Core / azure-ai-agents', 'State Machine Orchestrator', 'Shared Memory Session Store'],
    inputs: ['Task Goal', 'Repo AST & Dependency Graph', 'Policy Rules'],
    outputs: ['Subtask Queue', 'Synthesized Code Patches', 'Consolidated Execution Plan'],
    codeExample: {
      language: 'python',
      filename: 'orchestration_graph.py',
      code: `from azure.ai.agents import AgentFramework, SequentialWorkflow
from agents import PlannerAgent, CoderAgent, SandboxRunnerAgent, ReviewerAgent

# 멀티 에이전트 협업 파이프라인 그래프 구성
workflow = SequentialWorkflow(name="DevAndAutomationPipeline")

# 1. 태스크 분석 및 작업 계획 수립
planner = PlannerAgent(model="gpt-4o", instructions="사용자 요구사항을 단위 태스크로 분해")
# 2. 코드 및 테스트 스크립트 작성
coder = CoderAgent(model="claude-3-5-sonnet", instructions="클린 코드 및 단위 테스트 작성")
# 3. 샌드박스 컨테이너에서 빌드/테스트 실행
sandbox_runner = SandboxRunnerAgent(timeout=300, memory="4GiB")
# 4. 보안 감사 및 최종 PR 패치 생성
reviewer = ReviewerAgent(model="gpt-4o", instructions="보안 취약점 및 린트 검사")

workflow.add_nodes([planner, coder, sandbox_runner, reviewer])
workflow.connect(planner, coder).connect(coder, sandbox_runner).connect(sandbox_runner, reviewer)`
    },
    securityHighlights: [
      '에이전트 간 무한 루프 방지 (Max Turn Count & Execution Budget 제한)',
      '에이전트별 최소 권한(Least Privilege) 역할 분리'
    ]
  },
  {
    id: 'sandbox-execution-runtime',
    name: 'Secure Isolation Sandbox',
    category: 'sandbox',
    role: '에이전트가 작성한 코드 및 셸 스크립트를 격리된 환경에서 컴파일/테스트/실행',
    description: '에이전트가 만든 소스 코드가 호스트 환경을 손상시키지 못하도록 Docker/Podman 기반의 임시 컨테이너에서 빌드(`npm test`, `dotnet build`, `pytest`)를 수행하고 표준 출력 로그와 종료 코드를 반환합니다.',
    technologies: ['Docker Engine / Podman', 'gVisor Kernel Sandbox', 'Linux cgroups v2 & seccomp'],
    inputs: ['Generated Code Archive', 'Test Suites', 'Execution Command (e.g. npm test)'],
    outputs: ['stdout / stderr Logs', 'Process Exit Code', 'Memory/CPU Usage Metrics'],
    codeExample: {
      language: 'json',
      filename: 'sandbox-security-policy.json',
      code: `{
  "sandboxPolicy": {
    "runtime": "podman",
    "image": "mcr.microsoft.com/devcontainers/universal:latest",
    "resourceLimits": {
      "cpu": 2.0,
      "memory": "4GiB",
      "pids": 256,
      "timeoutSeconds": 180
    },
    "security": {
      "readOnlyRoot": true,
      "noNewPrivileges": true,
      "dropCapabilities": ["ALL"],
      "allowedOutboundHosts": [
        "registry.npmjs.org",
        "api.github.com"
      ]
    }
  }
}`
    },
    securityHighlights: [
      '호스트 파일 시스템 마운트 차단 (오직 /workspace 임시 디렉터리만 쓰기 허용)',
      '외부 임의 IP 접속 차단 및 허용된 패키지 레지스트리만 화이트리스트 허용'
    ]
  },
  {
    id: 'github-actions-automation',
    name: 'GitHub Actions & CI/CD Automation',
    category: 'automation_devops',
    role: 'GitHub Issue, Pull Request, Commit Push 이벤트에 반응하여 에이전트를 자동 구동',
    description: '개발자가 수동으로 실행하지 않아도 저장소에 버그 Issue가 생성되거나 PR이 요청되면 GitHub Actions 워크플로가 백그라운드에서 Agent Framework를 트리거하여 자율 버그 수정 및 코드 리뷰를 수행합니다.',
    technologies: ['GitHub Actions Runner', 'GitHub REST / GraphQL API', 'GitHub App Authentication'],
    inputs: ['Webhook Events (issues.opened, pull_request.synchronize)', 'Repository Secrets'],
    outputs: ['Automated PR Creation', 'Line-by-Line Review Comments', 'CI Check Run Status'],
    codeExample: {
      language: 'yaml',
      filename: '.github/workflows/agent-auto-fix.yml',
      code: `name: Autonomous Agent Issue Resolver

on:
  issues:
    types: [labeled] # 'ai-fix' 라벨이 붙으면 자동 실행

jobs:
  agent-fix:
    if: contains(github.event.issue.labels.*.name, 'ai-fix')
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Agent Framework Runtime
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Run Multi-Agent Issue Solver
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          AZURE_AI_FOUNDRY_ENDPOINT: \${{ secrets.AZURE_AI_FOUNDRY_ENDPOINT }}
          AZURE_AI_FOUNDRY_API_KEY: \${{ secrets.AZURE_AI_FOUNDRY_API_KEY }}
        run: |
          python -m agent_framework.cli run-issue-solver \\
            --issue-id "\${{ github.event.issue.number }}" \\
            --issue-body "\${{ github.event.issue.body }}" \\
            --auto-create-pr`
    },
    securityHighlights: [
      'GitHub App Token 단기 유효기간(Ephemeral Token) 사용',
      'PR 자동 병합(Auto-Merge) 전 필수 인간 승인자(CODEOWNERS) 확인 단계 강제'
    ]
  },
  {
    id: 'foundation-models',
    name: 'Foundation Models & Inference APIs',
    category: 'models',
    role: '추론, 코드 생성, AST 분석, 다국어 번역 및 임베딩을 제공하는 지능형 백엔드 엔진',
    description: 'Azure AI Foundry 및 GitHub Models 엔드포인트를 통해 최상위 모델(GPT-4o, Claude 3.5 Sonnet, OpenAI o3-mini)을 표준화된 인터페이스로 호출합니다. 모델 폴백(Fallback) 및 부하 분산(Load Balancing)을 지원합니다.',
    technologies: ['Azure AI Model Inference API', 'GitHub Models API', 'Azure Key Vault'],
    inputs: ['System Prompts', 'Structured Tool Schemas', 'Multi-Modal Artifacts'],
    outputs: ['JSON Structured Output', 'Streaming Code Token', 'Tool Call Arguments'],
    codeExample: {
      language: 'typescript',
      filename: 'model-inference-client.ts',
      code: `import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

const client = ModelClient(
  'https://models.inference.ai.azure.com',
  new AzureKeyCredential(process.env.GITHUB_TOKEN!)
);

export async function generateCodePatch(prompt: string, context: string) {
  const response = await client.path('/chat/completions').post({
    body: {
      messages: [
        { role: 'system', content: '당신은 엔터프라이즈급 TypeScript 개발자입니다.' },
        { role: 'user', content: \`\${context}\\n\\n요구사항: \${prompt}\` }
      ],
      model: 'gpt-4o',
      temperature: 0.1,
      response_format: { type: 'json_object' }
    }
  });

  if (isUnexpected(response)) {
    throw new Error(\`Model call failed: \${response.body.error.message}\`);
  }
  return JSON.parse(response.body.choices[0].message.content);
}`
    },
    securityHighlights: [
      '엔터프라이즈 프라이빗 링크(Private Endpoint) 및 VNet 격리 통신',
      'Microsoft 책임감 있는 AI(Responsible AI) 콘텐츠 필터링 자동 적용'
    ]
  }
];

export const AUTOMATION_SCENARIOS: AutomationScenario[] = [
  {
    id: 'scenario-issue-to-pr',
    title: 'GitHub 이슈 기반 자동 버그 수정 & Pull Request 생성',
    tag: 'DevOps & Bug Fixing Automation',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    summary: 'GitHub Issue에 버그 보고서가 등록되면 Agent Framework가 버그를 재현하는 테스트를 먼저 작성하고, 소스 코드를 패치한 뒤, 격리 샌드박스에서 테스트 통과를 검증하고 자동으로 PR을 생성합니다.',
    trigger: 'GitHub Issue에 "bug" 또는 "ai-fix" 라벨이 부착될 때 GitHub Actions 웹훅 트리거',
    benefit: '사소한 버그 및 리그레션 수정 시간을 평균 3시간에서 2분으로 단축, 100% 테스트 검증 보장',
    steps: [
      {
        order: 1,
        phase: '이슈 분석 & 컨텍스트 수집',
        actor: 'GitHub Actions & Planner Agent',
        description: '이슈 본문의 스택 트레이스 및 설명 파싱, 관련 소스 파일 검색',
        details: 'Issue #142 "JWT 토큰 만료 시 500 에러 대신 401 Unauthorized 반환 필요" 내용을 읽고 auth.middleware.ts 파일과 관련 테스트 파일을 AST 기반으로 검색합니다.',
        artifact: 'Task Plan & File Dependency Graph',
        status: 'completed'
      },
      {
        order: 2,
        phase: '버그 재현 테스트 작성 (TDD)',
        actor: 'Coder Agent',
        description: '버그 상황을 입증하는 실패하는 단위 테스트(Failing Test)를 선제 생성',
        details: 'auth.middleware.test.ts에 "should return 401 when token has expired" 테스트 케이스를 추가하여 버그가 실제로 재현되는지 확인합니다.',
        artifact: 'Reproducing Test Suite',
        status: 'completed'
      },
      {
        order: 3,
        phase: '소스 코드 패치 구현',
        actor: 'Coder Agent',
        description: '예외 처리 로직 추가 및 타입 안전성 보장 코드 작성',
        details: 'TokenExpiredError 발생 시 500 Internal Server Error 대신 HTTP 401 상태 코드와 표준 에러 응답 객체를 반환하도록 수정합니다.',
        artifact: 'Patched Source Code',
        status: 'completed'
      },
      {
        order: 4,
        phase: '샌드박스 테스트 검증',
        actor: 'Sandbox Runner Agent',
        description: '격리된 Docker 컨테이너에서 npm test 실행 및 회귀 테스트 통과 확인',
        details: '읽기 전용 루트와 제한된 메모리(2GB) 하에서 테스트 스위트를 기동. 기존 테스트 48개 + 신규 버그 재현 테스트 1개 모두 PASS 확인 (Exit Code: 0).',
        artifact: 'Sandbox Test Execution Report (100% Pass)',
        status: 'completed'
      },
      {
        order: 5,
        phase: 'Pull Request 자동 생성 및 리뷰어 지정',
        actor: 'DevOps Agent',
        description: 'Git 브랜치 푸시 및 상세한 변경 내역과 테스트 결과가 포함된 PR 생성',
        details: 'fix/issue-142-jwt-expired 브랜치 생성 후 커밋, "Fixes #142: Return 401 on expired JWT token" 제목의 PR을 열고 코드오너에게 리뷰 요청을 발송합니다.',
        artifact: 'GitHub Pull Request #143',
        status: 'completed'
      }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'issue-solver-agent.ts',
      code: `import { AgentFramework } from '@microsoft/agent-framework';
import { Octokit } from '@octokit/rest';
import { runInSandbox } from './sandboxService';

export async function handleIssueAutoFix(issueNumber: number, issueBody: string) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  
  // 1. Planner가 이슈 분석 및 수정 대상 식별
  const plan = await plannerAgent.analyzeIssue({ issueBody });
  
  // 2. Coder가 실패하는 재현 테스트 및 패치 코드 작성
  const patchResult = await coderAgent.generateFix({
    targetFiles: plan.files,
    issueDescription: issueBody
  });
  
  // 3. 보안 샌드박스에서 빌드 및 테스트 실행
  const testRun = await runInSandbox({
    files: patchResult.updatedFiles,
    command: 'npm test'
  });
  
  if (testRun.exitCode !== 0) {
    throw new Error(\`Sandbox test verification failed: \${testRun.logs}\`);
  }
  
  // 4. Git 브랜치 생성 및 자동 PR 오픈
  const branchName = \`agent-fix/issue-\${issueNumber}\`;
  await gitService.createBranchAndCommit(branchName, patchResult.updatedFiles);
  
  const pr = await octokit.pulls.create({
    owner: 'enterprise-org',
    repo: 'core-service',
    title: \`[AI-Agent] Fix for Issue #\${issueNumber}\`,
    head: branchName,
    base: 'main',
    body: \`## 🤖 자동 생성된 버그 수정 PR\\n\\n### 변경 요약\\n\${patchResult.summary}\\n\\n### 샌드박스 테스트 결과\\n\`\`\`\\n\${testRun.logs}\\n\`\`\`\\n\\nCloses #\${issueNumber}\`
  });
  
  return pr.data.html_url;
}`
    }
  },
  {
    id: 'scenario-ide-scaffold',
    title: 'Copilot Chat 기반 대화형 기능 개발 및 로컬 컴파일 자동화',
    tag: 'IDE Real-Time Dev Automation',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    summary: '개발자가 VS Code Copilot Chat에서 커스텀 슬래시 명령어(/scaffold-api)를 입력하면 Copilot SDK가 레포지토리 컨텍스트를 분석하고, Agent Framework가 다중 파일(모델, 컨트롤러, DTO, 단위 테스트)을 생성하여 로컬 샌드박스에서 컴파일 검증 후 에디터에 안전하게 인라인 적용합니다.',
    trigger: 'VS Code Copilot Chat에서 `@copilot /scaffold-api 결제 환불 엔드포인트` 입력',
    benefit: '보일러플레이트 코드 작성 및 테스트 셋업 시간을 90% 단축하며, 컴파일 에러 없는 완전한 코드 블록 제공',
    steps: [
      {
        order: 1,
        phase: '개발자 의도 파악 및 도메인 분석',
        actor: 'VS Code Copilot Chat & Copilot SDK',
        description: '사용자 명령어를 파싱하고 프로젝트 내 기존 아키텍처 패턴(Clean Architecture/MVC) 감지',
        details: '현재 프로젝트가 NestJS 기반 TypeScript인지, .NET Web API인지 프로젝트 설정을 감지하고 필요한 파일 구조(Controller, Service, DTO, Entity) 템플릿을 식별합니다.',
        artifact: 'Domain Schema Blueprint',
        status: 'completed'
      },
      {
        order: 2,
        phase: '다중 컴포넌트 동시 생성 (Multi-File Generation)',
        actor: 'Coder Agent',
        description: 'Controller, Service, Repository, DTO 및 Jest 단위 테스트 파일을 한 번에 생성',
        details: 'RefundRequestDto, RefundResponseDto, PaymentRefundService, PaymentRefundController 및 Mock DB를 사용한 단위 테스트 코드를 생성합니다.',
        artifact: '5 Generated Source Files',
        status: 'completed'
      },
      {
        order: 3,
        phase: '로컬 격리 샌드박스 컴파일 검증',
        actor: 'Sandbox Runner Agent',
        description: 'TypeScript 컴파일러(tsc --noEmit) 및 단위 테스트 러너를 실행하여 타입 에러 사전 차단',
        details: '호스트 파일 시스템을 건드리지 않고 메모리 볼륨 내에서 tsc를 돌려 타입 불일치, 빠진 import, 문법 오류를 사전 검사합니다.',
        artifact: 'TypeScript Zero-Error Log',
        status: 'completed'
      },
      {
        order: 4,
        phase: 'VS Code 에디터 인라인 Diff 삽입',
        actor: 'Copilot Extension API',
        description: '개발자가 눈으로 직접 확인할 수 있는 Side-by-Side Diff 뷰로 코드를 제안',
        details: '개발자가 [Accept Changes] 버튼을 누르면 프로젝트 파일 트리에 실제 파일이 생성되고 활성 에디터에 포커싱됩니다.',
        artifact: 'Applied Code in Editor',
        status: 'completed'
      }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'copilot-scaffold-skill.ts',
      code: `import { CopilotSkill, ChatResponseStream } from '@github/copilot-sdk';
import { runAgentFrameworkPipeline } from './frameworkEngine';

export const scaffoldApiSkill: CopilotSkill = {
  name: 'scaffold-api',
  description: '새로운 API 엔드포인트 세트(컨트롤러, 서비스, DTO, 테스트)를 자동 생성하고 검증합니다.',
  async execute(request, stream: ChatResponseStream) {
    stream.write('🔍 **프로젝트 구조 및 아키텍처 패턴 분석 중...**\\n');
    
    const context = await getWorkspaceContext();
    stream.write(\`✅ 아키텍처: **\${context.framework}** 감지됨\\n\`);
    
    stream.write('⚙️ **멀티 에이전트 코딩 및 샌드박스 빌드 수행 중...**\\n');
    const result = await runAgentFrameworkPipeline({
      task: request.prompt,
      projectType: context.framework,
      existingPatterns: context.patterns
    });
    
    stream.write('🧪 **샌드박스 검증 완료 (TypeScript 에러 0건)**\\n');
    stream.write('### 생성된 파일 목록:\\n');
    result.files.forEach(f => stream.write(\`- \`\${f.path}\` (\${f.lines} lines)\\n\`));
    
    // VS Code Diff 뷰로 파일 생성 적용 제안
    stream.insertWorkspaceFiles(result.files);
  }
};`
    }
  },
  {
    id: 'scenario-security-review',
    title: '지능형 CI/CD 보안 취약점 감사 & 자동 수정 제안 (Security & Code Review Bot)',
    tag: 'Automated CI/CD Security Audit',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    summary: 'Pull Request가 생성되면 GitHub Actions 파이프라인에서 Agent Framework Reviewer Agent가 동작하여 코드 변경사항(diff)을 분석하고, SAST 보안 룰을 기반으로 SQL Injection, XSS, Secret 노출을 탐지하여 즉시 머지 가능한 수정 커밋을 PR 코멘트로 자동 제안합니다.',
    trigger: 'Pull Request 생성 또는 신규 커밋 푸시 시 (pull_request.opened, synchronize)',
    benefit: '보안 취약점의 프로덕션 배포 유출 99% 사전 차단 및 개발자의 수동 코드 리뷰 피로도 대폭 경감',
    steps: [
      {
        order: 1,
        phase: 'PR Diff 분석 및 변경 범위 파싱',
        actor: 'GitHub Actions Runner',
        description: 'PR에서 수정된 파일 목록과 추가/삭제된 코드 라인을 추출',
        details: 'Git diff를 통해 수정된 6개 파일의 230개 라인을 파싱하고 영향받는 모듈 의존성을 계산합니다.',
        artifact: 'Git Unified Diff Stream',
        status: 'completed'
      },
      {
        order: 2,
        phase: '정적 분석(SAST) 및 AI 보안 취약점 심층 탐지',
        actor: 'Reviewer Agent',
        description: 'OWASP Top 10 취약점 및 사내 코딩 컨벤션 위반 사항 정밀 점검',
        details: 'users.repository.ts 42번째 라인에서 문자열 연결 방식의 동적 SQL 쿼리가 작성되어 SQL Injection 취약점이 존재함을 탐지합니다.',
        artifact: 'Vulnerability Audit Report (Severity: High)',
        status: 'completed'
      },
      {
        order: 3,
        phase: '안전한 파라미터화 쿼리로 자동 패치 생성',
        actor: 'Coder Agent & Sandbox Runner',
        description: '취약한 코드를 파라미터화된 쿼리(Prepared Statement)로 대체하고 샌드박스에서 단위 테스트 통과 확인',
        details: 'TypeORM/Prisma 바인딩 파라미터 코드로 리팩토링 후 샌드박스에서 데이터베이스 쿼리 모의 테스트를 수행하여 기능 호환성을 입증합니다.',
        artifact: 'Verified Security Patch Diff',
        status: 'completed'
      },
      {
        order: 4,
        phase: 'GitHub PR 라인별 인라인 Suggestion 코멘트 게시',
        actor: 'Reviewer Bot',
        description: 'PR의 해당 코드 라인에 [Apply Suggestion] 원클릭 반영 버튼이 포함된 마크다운 코멘트 작성',
        details: '취약점의 원인 설명, 공격 시나리오 예시, 수정된 코드 스니펫을 인라인 코멘트로 작성하여 PR 작성자가 클릭 한 번으로 커밋할 수 있도록 제공합니다.',
        artifact: 'GitHub Review Comment with One-Click Patch',
        status: 'completed'
      }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'security-review-agent.ts',
      code: `import { ReviewerAgent } from '@microsoft/agent-framework';
import { GitHubPullRequestReviewer } from './githubClient';

export async function auditPullRequest(prNumber: number) {
  const pr = await GitHubPullRequestReviewer.getPrDetails(prNumber);
  
  // 1. Reviewer Agent가 diff 분석 및 보안 스캔 실행
  const securityReport = await ReviewerAgent.auditDiff({
    diff: pr.diff,
    rules: ['OWASP-TOP-10', 'CWE-89-SQLI', 'CWE-79-XSS', 'NO-HARDCODED-SECRETS']
  });
  
  for (const finding of securityReport.findings) {
    // 2. 취약점 발견 시 안전한 패치 코드 자동 생성
    const fix = await ReviewerAgent.generateSuggestedFix({
      file: finding.file,
      lineNumber: finding.lineNumber,
      vulnerability: finding.description
    });
    
    // 3. GitHub PR 인라인 리뷰 코멘트 작성
    await GitHubPullRequestReviewer.postInlineComment({
      prNumber,
      commitId: pr.headCommitId,
      path: finding.file,
      line: finding.lineNumber,
      body: \`### 🛡️ [Security Agent Alert] \${finding.title}\\n\\n**취약점 위험도:** 🔴 \${finding.severity}\\n**설명:** \${finding.description}\\n\\n\`\`\`suggestion\\n\${fix.patchedCode}\\n\`\`\`\\n\\n💡 *위의 [Apply suggestion] 버튼을 눌러 즉시 안전한 코드로 커밋할 수 있습니다.*\`,
      event: 'REQUEST_CHANGES'
    });
  }
}`
    }
  },
  {
    id: 'scenario-legacy-modernization',
    title: '대규모 레거시 코드 현대화 및 테스트 자동 생성 (Batch Modernization)',
    tag: 'Legacy Refactoring & Test Automation',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    summary: '구형 JavaScript(ES5) 또는 .NET Framework 4.8 코드를 최신 TypeScript / .NET 9 및 비동기 패턴으로 일괄 현대화하고, 누락되었던 단위 테스트를 자율 생성하여 샌드박스에서 회귀 검증을 마친 후 브랜치를 분기합니다.',
    trigger: '주간 스케줄러(Cron) 또는 수동 마이그레이션 워크플로 실행',
    benefit: '수작업 리팩토링 시 발생하는 인적 실수 방지, 테스트 커버리지 0%에서 85% 이상으로 자동 증대',
    steps: [
      {
        order: 1,
        phase: '레거시 모듈 순회 및 AST 분석',
        actor: 'Planner Agent',
        description: '프로젝트 내 비동기 콜백 패턴, 오래된 라이브러리 참조, any 타입 사용처 목록화',
        details: '콜백 지옥(Callback Hell) 패턴이 적용된 legacy-api-client.js 파일의 AST를 분석하여 모듈 간 종속성을 맵핑합니다.',
        artifact: 'Legacy Dependency Map',
        status: 'completed'
      },
      {
        order: 2,
        phase: '비동기 async/await 및 TypeScript 엄격 모드 리팩토링',
        actor: 'Coder Agent',
        description: '콜백 기반 코드를 Promise 및 async/await로 변환하고 엄격한 인터페이스 타입 정의',
        details: '모든 함수에 명시적 매개변수 및 반환값 타입을 선언하고 최신 ES2024 문법으로 변환합니다.',
        artifact: 'Modernized TypeScript Code',
        status: 'completed'
      },
      {
        order: 3,
        phase: '경계 조건 포함 단위 테스트 자동 생성',
        actor: 'Coder Agent',
        description: '정상 케이스, 네트워크 타임아웃, 예외 발생 상황을 모킹(Mocking)한 테스트 스위트 작성',
        details: 'Jest/Vitest 기반으로 12개의 종합 테스트 케이스를 생성하여 코드 커버리지 90% 이상을 확보합니다.',
        artifact: 'Vitest Unit Test Suite',
        status: 'completed'
      },
      {
        order: 4,
        phase: '샌드박스 병렬 테스트 & 벤치마크 검증',
        actor: 'Sandbox Runner Agent',
        description: '기존 동작과 리팩토링 후 동작의 입출력 일관성을 샌드박스에서 대조 검증',
        details: '샌드박스에서 구버전과 신버전에 동일한 입력 데이터를 전달하고 반환값의 동등성(Parity)을 100% 검증합니다.',
        artifact: 'Equivalence Test Report (100% Match)',
        status: 'completed'
      }
    ],
    codeSnippet: {
      language: 'typescript',
      filename: 'legacy-modernization-pipeline.ts',
      code: `import { ModernizationEngine } from '@microsoft/agent-framework';
import { runSandboxTestSuite } from './sandboxRunner';

export async function modernizeLegacyRepository(repoPath: string) {
  const legacyFiles = await scanForLegacyPatterns(repoPath, ['*.js', '*.cjs']);
  
  for (const file of legacyFiles) {
    console.log(\`Modernizing file: \${file.path}...\`);
    
    // 1. AST 분석 및 TypeScript 변환
    const modernized = await ModernizationEngine.transformToTypeScript({
      source: file.content,
      targetVersion: 'ES2024',
      strictNullChecks: true
    });
    
    // 2. 단위 테스트 자동 생성
    const testSuite = await ModernizationEngine.generateComprehensiveTests({
      sourceCode: modernized.code,
      framework: 'vitest'
    });
    
    // 3. 샌드박스에서 기존 동작과 새로운 코드의 동등성(Parity) 검증
    const verification = await runSandboxTestSuite({
      implementation: modernized.code,
      tests: testSuite.code
    });
    
    if (verification.passed) {
      await saveModernizedFiles(file.path.replace('.js', '.ts'), modernized.code, testSuite.code);
    }
  }
}`
    }
  }
];
