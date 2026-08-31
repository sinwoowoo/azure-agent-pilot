import { GuideStep, ArchitecturePattern } from '../types';

export const ARCHITECTURE_PATTERNS: ArchitecturePattern[] = [
  {
    id: 'single-agent',
    name: '단일 에이전트 + Tool Calling (Single Agent)',
    description: '가장 기본적인 패턴으로, 하나의 에이전트가 주어인 태스크를 분석하고 필요한 도구(함수, API, DB)를 자율 호출하여 최종 답변을 생성합니다.',
    useCase: '코드 검색, 단위 테스트 생성, 문서 요약, 단일 도메인 FAQ 봇',
    diagramType: 'single',
    flow: [
      { step: 1, role: 'User', action: '프롬프트 입력 (예: 버그 수정 및 테스트 작성)', output: 'User Prompt' },
      { step: 2, role: 'Agent Engine', action: '의도 파악 및 도구 실행 계획 수립', output: 'Function Call Request' },
      { step: 3, role: 'Tool Execution', action: 'Git diff 분석 및 파일 검색 도구 실행', output: 'Tool Execution Output' },
      { step: 4, role: 'Agent Engine', action: '도구 결과를 종합하여 패치 코드 생성', output: 'Final Solution' }
    ]
  },
  {
    id: 'sequential-pipeline',
    name: '순차 파이프라인 (Sequential Multi-Agent)',
    description: '작업을 선형 단계로 분리하여 앞 단계 에이전트의 출력을 다음 에이전트의 입력으로 전달하는 체계입니다.',
    useCase: '요구사항 분석 -> 아키텍처 설계 -> 코드 구현 -> 보안 감사 -> PR 생성',
    diagramType: 'sequential',
    flow: [
      { step: 1, role: 'Planner Agent', action: '기능 명세서를 바탕으로 상세 구현 티켓 분할', output: 'Implementation Spec' },
      { step: 2, role: 'Coder Agent', action: '기능 명세에 맞춰 TypeScript / C# 코드 작성', output: 'Source Code' },
      { step: 3, role: 'Reviewer Agent', action: '정적 분석 및 보안 취약점 검토', output: 'Audit Report & Feedback' },
      { step: 4, role: 'DevOps Agent', action: '통과 시 Git 커밋 및 PR 생성', output: 'Merged Pull Request' }
    ]
  },
  {
    id: 'hierarchical-router',
    name: '계층형 오케스트레이터 (Router / Hierarchical)',
    description: '중앙 라우터(Orchestrator)가 사용자 질문을 분석하여 전문 도메인 에이전트(DB 전문, API 전문, 보안 전문)에게 작업을 위임하고 취합합니다.',
    useCase: '엔터프라이즈 전사 AI 비서, 복합 마이크로서비스 리팩토링 시스템',
    diagramType: 'hierarchical',
    flow: [
      { step: 1, role: 'User', action: '복합 질의 (예: 결제 시스템 성능 개선 및 쿼리 최적화)', output: 'Complex Request' },
      { step: 2, role: 'Router Agent', action: '태스크 분류: [DB 파트] + [API 파트]', output: 'Subtask Dispatch' },
      { step: 3, role: 'DB Agent', action: '인덱스 분석 및 슬로우 쿼리 튜닝 플랜 수립', output: 'SQL Tuning Spec' },
      { step: 4, role: 'API Agent', action: '비동기 캐싱 레이어(Redis) 코드 구현', output: 'Cache Middleware Code' },
      { step: 5, role: 'Router Agent', action: '두 전문 에이전트의 결과를 통합 검증하여 응답', output: 'Consolidated Optimization Guide' }
    ]
  },
  {
    id: 'sandbox-execution',
    name: '격리 샌드박스 안전 실행 (Secure Sandboxed Agent)',
    description: '에이전트가 생성한 셸 스크립트나 코드를 호스트 OS와 격리된 로컬/클라우드 컨테이너 샌드박스 내부에서 안전하게 컴파일 및 테스트합니다.',
    useCase: '자동화된 테스트 러너, 데이터 분석 스크립트 실행, 서드파티 패키지 설치 검증',
    diagramType: 'sandbox',
    flow: [
      { step: 1, role: 'Agent', action: '테스트 스크립트 및 벤치마크 코드 작성', output: 'Executable Code' },
      { step: 2, role: 'Sandbox Runner', action: '격리된 Docker/Wasm 샌드박스 컨테이너 기동', output: 'Isolated Env Boot' },
      { step: 3, role: 'Sandbox Runtime', action: '네트워크 화이트리스트 & 읽기전용 루트 제약 하에 실행', output: 'stdout / stderr Log' },
      { step: 4, role: 'Agent / Host', action: '실행 결과 및 반환값만 수신하여 안전하게 후속 처리', output: 'Validated Safe Result' }
    ]
  }
];

export const PRACTICAL_STEPS: GuideStep[] = [
  {
    id: 'step-1-environment-setup',
    stepNumber: 1,
    title: '프로젝트 초기화 및 종속성 구성',
    subtitle: 'Microsoft Agent Framework SDK 및 필수 환경 변수 셋업',
    description: 'Microsoft Agent Framework 개발을 시작하기 위해 사용하는 주력 언어(Python, C#, TypeScript)에 맞는 패키지를 설치하고 Azure AI Foundry 또는 GitHub Copilot 인증 정보를 설정합니다.',
    keyConcepts: [
      '패키지 매니저를 통한 공식 Agent Framework SDK 설치',
      '.env 환경 변수 파일에 Azure AI Foundry Endpoint 및 API Key 선언',
      '프로덕션 환경을 위한 Azure DefaultAzureCredential (Managed Identity) 준비'
    ],
    checklist: [
      '언어별 패키지 설치 완료 (azure-ai-agents / @microsoft/agents-bot / NuGet)',
      'Azure Portal 또는 AI Foundry 콘솔에서 Model Endpoint & API Key 획득',
      '.gitignore에 .env 추가하여 시크릿 유출 방지'
    ],
    snippets: {
      python: {
        language: 'python',
        filename: 'requirements.txt & .env',
        description: 'Python 환경에서 필요한 패키지 목록 및 환경변수 설정',
        code: `# 1. 패키지 설치
# pip install azure-ai-agents azure-identity python-dotenv openai

# 2. .env 파일 설정
AZURE_AI_FOUNDRY_ENDPOINT="https://<your-hub-name>.services.ai.azure.com"
AZURE_AI_FOUNDRY_API_KEY="your_foundry_api_key_here"
AZURE_OPENAI_DEPLOYMENT="gpt-4o"
GITHUB_COPILOT_TOKEN="ghp_xxxxxxxxxxxx" # Copilot Provider 사용 시`
      },
      csharp: {
        language: 'csharp',
        filename: 'Project.csproj & appsettings.json',
        description: '.NET C# 프로젝트 패키지 참조 및 구성',
        code: `<!-- 1. NuGet 패키지 추가 (.csproj) -->
<ItemGroup>
  <PackageReference Include="Microsoft.Agents.Core" Version="1.0.0" />
  <PackageReference Include="Azure.AI.Inference" Version="1.0.0-beta.2" />
  <PackageReference Include="Azure.Identity" Version="1.12.0" />
</ItemGroup>

/* 2. appsettings.json */
{
  "AzureAIFoundry": {
    "Endpoint": "https://<your-hub-name>.services.ai.azure.com",
    "ApiKey": "your_foundry_api_key_here",
    "ModelDeploymentName": "gpt-4o"
  }
}`
      },
      typescript: {
        language: 'typescript',
        filename: 'package.json & .env',
        description: 'Node.js / TypeScript 환경 의존성 및 환경 변수',
        code: `// 1. npm 패키지 설치
// npm install @microsoft/agents-bot @azure/ai-inference @azure/identity dotenv

// 2. .env 파일 설정
AZURE_AI_FOUNDRY_ENDPOINT="https://<your-hub-name>.services.ai.azure.com"
AZURE_AI_FOUNDRY_API_KEY="your_foundry_api_key_here"
AZURE_OPENAI_DEPLOYMENT="gpt-4o"
PORT=3000`
      },
      json: {
        language: 'json',
        filename: 'config.json',
        description: '공통 에이전트 설정 메타데이터 포맷',
        code: `{
  "agentFrameworkVersion": "1.0.0",
  "defaultProvider": "azure_ai_foundry",
  "models": {
    "primary": "gpt-4o",
    "fastRouting": "phi-4",
    "codeReview": "claude-3-5-sonnet"
  },
  "enableSandbox": true,
  "sandboxMode": "local"
}`
      }
    }
  },
  {
    id: 'step-2-single-agent-tools',
    stepNumber: 2,
    title: '단일 에이전트 생성 및 도구(Tool Calling) 바인딩',
    subtitle: '에이전트 인스턴스 초기화, 시스템 프롬프트 정의 및 커스텀 함수 연결',
    description: '지침(Instructions), 사용할 모델, 그리고 에이전트가 외부 시스템과 통신할 수 있는 Tool/Function을 선언하여 기본 에이전트를 구축합니다.',
    keyConcepts: [
      'System Instruction을 통한 에이전트의 역할(Persona) 및 제약조건 명시',
      '함수 시그니처와 JSON Schema를 바탕으로 자동 Tool Calling 매핑',
      '에이전트의 사고(Reasoning) 및 함수 실행 결과 처리 루프'
    ],
    checklist: [
      '에이전트 이름과 구체적인 지침(Instructions) 작성',
      '도구 함수에 파라미터 타입 및 설명(Docstring/Description) 명확히 기재',
      '도구 실행 에러 발생 시 에이전트가 graceful하게 회복하도록 예외 처리'
    ],
    snippets: {
      python: {
        language: 'python',
        filename: 'agent_with_tools.py',
        description: 'Python 기반 단일 에이전트 및 계산기/DB 검색 도구 바인딩',
        code: `import os
from dotenv import load_dotenv
from azure.ai.agents import AgentClient
from azure.core.credentials import AzureKeyCredential

load_dotenv()

# 1. 도구(Tool) 함수 정의
def query_database(sql: str) -> str:
    """실제 DB에서 데이터를 안전하게 조회합니다."""
    # 실제 환경에서는 파라미터화된 쿼리 실행
    return f"쿼리 성공: [{sql}] -> 42건 반환"

def get_server_status(region: str) -> str:
    """지정된 리전의 서버 상태를 확인합니다."""
    return f"{region} 리전 상태: 정상 (CPU 34%, Memory 52%)"

# 2. 에이전트 클라이언트 초기화
client = AgentClient(
    endpoint=os.getenv("AZURE_AI_FOUNDRY_ENDPOINT"),
    credential=AzureKeyCredential(os.getenv("AZURE_AI_FOUNDRY_API_KEY"))
)

# 3. 에이전트 정의 및 생성
agent = client.create_agent(
    model=os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4o"),
    name="DevOps-Monitoring-Agent",
    instructions="""당신은 인프라 모니터링 및 진단 전담 에이전트입니다.
    사용자의 요청을 분석하여 필요할 때만 도구를 호출하고, 결과를 알기 쉽게 요약하세요.""",
    tools=[query_database, get_server_status]
)

print(f"에이전트 생성 완료: ID={agent.id}, Name={agent.name}")`
      },
      csharp: {
        language: 'csharp',
        filename: 'AgentWithTools.cs',
        description: 'C# .NET 환경에서 에이전트 및 커스텀 플러그인 도구 등록',
        code: `using System;
using System.ComponentModel;
using System.Threading.Tasks;
using Microsoft.Agents.Core;
using Azure.AI.Inference;
using Azure;

public class MonitoringTools
{
    [Description("지정된 리전의 서버 상태 및 CPU/메모리 사용률을 조회합니다.")]
    public static string GetServerStatus(
        [Description("조회할 AWS/Azure 리전명 (예: korea-central)")] string region)
    {
        return $"[{region}] 서버 상태 정상 (CPU: 28%, Memory: 45%)";
    }
}

public class Program
{
    public static async Task Main(string[] args)
    {
        var endpoint = new Uri(Environment.GetEnvironmentVariable("AZURE_AI_FOUNDRY_ENDPOINT")!);
        var credential = new AzureKeyCredential(Environment.GetEnvironmentVariable("AZURE_AI_FOUNDRY_API_KEY")!);

        // 에이전트 빌더 구성
        var agent = new AgentBuilder()
            .WithEndpoint(endpoint)
            .WithCredential(credential)
            .WithModel("gpt-4o")
            .WithName("Infrastructure-Assistant")
            .WithInstructions("인프라 점검 및 문제 해결 전문 에이전트입니다.")
            .WithTool<MonitoringTools>()
            .Build();

        var response = await agent.RunAsync("korea-central 리전 서버 상태 확인해줘");
        Console.WriteLine(response.Content);
    }
}`
      },
      typescript: {
        language: 'typescript',
        filename: 'agentWithTools.ts',
        description: 'TypeScript에서 Agent 및 함수 도구 스키마 바인딩',
        code: `import { AgentClient } from '@microsoft/agents-bot';
import * as dotenv from 'dotenv';
dotenv.config();

// 1. 도구 선언 및 핸들러
const serverStatusTool = {
  name: 'getServerStatus',
  description: '지정된 클라우드 리전의 인프라 상태를 조회합니다.',
  parameters: {
    type: 'object',
    properties: {
      region: { type: 'string', description: '조회할 리전 (예: asia-northeast3)' }
    },
    required: ['region']
  },
  handler: async ({ region }: { region: string }) => {
    return { status: 'healthy', cpuUsage: '31%', activeNodes: 8, region };
  }
};

// 2. 에이전트 클라이언트 생성
const client = new AgentClient({
  endpoint: process.env.AZURE_AI_FOUNDRY_ENDPOINT!,
  apiKey: process.env.AZURE_AI_FOUNDRY_API_KEY!
});

async function main() {
  const agent = await client.createAgent({
    name: 'DevOps-Agent',
    model: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o',
    instructions: '클라우드 인프라 상태를 점검하고 리포트를 생성하는 전문가입니다.',
    tools: [serverStatusTool]
  });

  console.log('에이전트가 성공적으로 초기화되었습니다:', agent.id);
}
main();`
      },
      json: {
        language: 'json',
        filename: 'tools-schema.json',
        description: '표준 OpenAI/Foundry 호환 도구 정의 스키마',
        code: `{
  "type": "function",
  "function": {
    "name": "getServerStatus",
    "description": "클라우드 리전의 인프라 상태 및 헬스체크를 조회합니다.",
    "parameters": {
      "type": "object",
      "properties": {
        "region": {
          "type": "string",
          "description": "리전 식별자 (예: korea-central, eastus)"
        }
      },
      "required": ["region"]
    }
  }
}`
      }
    }
  },
  {
    id: 'step-3-foundry-models-byok',
    stepNumber: 3,
    title: 'Azure AI Foundry 모델 (BYOK/BYOM) & REST API 연동',
    subtitle: '1,800+ 파운데이션 모델을 통합 Model Inference 엔드포인트로 연결',
    description: 'Azure AI Foundry의 Model Inference REST API를 통해 GPT-4o, Llama 3.3, Claude 3.5, Phi-4 등 다양한 모델을 동일한 API 규격으로 에이전트에 자유롭게 바인딩합니다.',
    keyConcepts: [
      'Bring Your Own Key(BYOK)를 통한 파트너 모델(Anthropic, Meta, Mistral 등) 통합',
      '표준 `/models/chat/completions` REST API 규격을 통한 멀티 모델 스위칭',
      '추론 비용 및 지연시간 최적화를 위한 태스크별 모델 라우팅'
    ],
    checklist: [
      'Azure AI Foundry 카탈로그에서 대상 모델(Llama/Mistral/GPT) 배포(Deployment) 생성',
      'Target Model Endpoint 및 API Key 확보',
      '표준 Chat Completion 포맷으로 스트리밍 및 Tool Calling 검증'
    ],
    snippets: {
      python: {
        language: 'python',
        filename: 'foundry_inference.py',
        description: 'Azure AI Model Inference SDK를 통한 다중 모델 호출',
        code: `import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

# Azure AI Foundry Model Inference Client
client = ChatCompletionsClient(
    endpoint=os.getenv("AZURE_AI_FOUNDRY_ENDPOINT"),
    credential=AzureKeyCredential(os.getenv("AZURE_AI_FOUNDRY_API_KEY"))
)

# 모델 배포명 (Llama-3.3-70B, Phi-4, GPT-4o 등 동일한 코드로 호출 가능)
model_name = "Meta-Llama-3.3-70B-Instruct"

response = client.complete(
    messages=[
        SystemMessage(content="당신은 고성능 아키텍처 설계 전문 어시스턴트입니다."),
        UserMessage(content="마이크로서비스 간 이벤트 기반 통신 시 Kafka vs Event Grid 비교해줘.")
    ],
    model=model_name,
    temperature=0.7,
    max_tokens=1000
)

print(f"[{model_name} 응답]:")
print(response.choices[0].message.content)`
      },
      csharp: {
        language: 'csharp',
        filename: 'FoundryInference.cs',
        description: 'C# Azure.AI.Inference 클라이언트를 이용한 통합 모델 추론',
        code: `using System;
using System.Threading.Tasks;
using Azure;
using Azure.AI.Inference;

class Program
{
    static async Task Main(string[] args)
    {
        var endpoint = new Uri(Environment.GetEnvironmentVariable("AZURE_AI_FOUNDRY_ENDPOINT")!);
        var credential = new AzureKeyCredential(Environment.GetEnvironmentVariable("AZURE_AI_FOUNDRY_API_KEY")!);

        var client = new ChatCompletionsClient(endpoint, credential);

        var requestOptions = new ChatCompletionsOptions()
        {
            Model = "Phi-4", // Foundry 카탈로그의 어떤 모델이든 이름만 지정
            Messages =
            {
                new ChatRequestSystemMessage("보안 코드 분석 전문가입니다."),
                new ChatRequestUserMessage("SQL Injection 방지를 위한 C# Dapper 모범 패턴 예제 알려줘.")
            },
            Temperature = 0.3f
        };

        Response<ChatCompletions> response = await client.CompleteAsync(requestOptions);
        Console.WriteLine(response.Value.Choices[0].Message.Content);
    }
}`
      },
      typescript: {
        language: 'typescript',
        filename: 'foundryInference.ts',
        description: 'TypeScript에서 Model Inference REST API 직접 연동',
        code: `import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import * as dotenv from 'dotenv';
dotenv.config();

const client = ModelClient(
  process.env.AZURE_AI_FOUNDRY_ENDPOINT!,
  new AzureKeyCredential(process.env.AZURE_AI_FOUNDRY_API_KEY!)
);

async function callFoundryModel() {
  const response = await client.path('/chat/completions').post({
    body: {
      model: 'Mistral-large-2407', // Foundry에 배포된 모델명
      messages: [
        { role: 'system', content: 'TypeScript 클린코드 리팩토링 전문가입니다.' },
        { role: 'user', content: '중첩된 콜백 함수를 async/await와 Result 패턴으로 변환하는 가이드 작성해줘.' }
      ],
      temperature: 0.5
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}
callFoundryModel();`
      },
      json: {
        language: 'json',
        filename: 'rest_request.json',
        description: 'Azure AI Model Inference REST API HTTP 요청 페이로드',
        code: `POST https://<your-foundry-hub>.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview
Content-Type: application/json
api-key: your_api_key_here

{
  "model": "gpt-4o",
  "messages": [
    { "role": "system", "content": "You are a helpful software architecture assistant." },
    { "role": "user", "content": "Explain CQRS pattern with a sequence flow." }
  ],
  "temperature": 0.7,
  "stream": false
}`
      }
    }
  },
  {
    id: 'step-4-copilot-sdk-extension',
    stepNumber: 4,
    title: 'GitHub Copilot SDK & Copilot Provider 연동',
    subtitle: 'VS Code 및 GitHub.com 채팅창에서 동작하는 커스텀 Copilot Agent 확장 빌드',
    description: '정식 출시(GA)된 GitHub Copilot SDK를 활용하여 커스텀 에이전트(`@my-dev-agent`)를 구축하고, IDE 에디터 컨텍스트 및 슬래시 커맨드를 처리합니다.',
    keyConcepts: [
      'Copilot Agent Protocol (CAP) 이벤트 핸들링 및 스트리밍 응답',
      '에디터 파일 선택 영역(Editor Selection), 활성 파일 경로 컨텍스트 수신',
      '슬래시 명령어(`/review`, `/refactor`, `/generate-tests`) 구현'
    ],
    checklist: [
      'GitHub App 생성 및 Copilot Chat 권한 등록',
      '`@github/copilot-sdk` 설치 및 Express 기반 웹 서버에 마운트',
      '위험 명령어 실행 전 Confirmation 다이얼로그 호출 로직 추가'
    ],
    snippets: {
      typescript: {
        language: 'typescript',
        filename: 'copilotAgentServer.ts',
        description: 'TypeScript 기반 GitHub Copilot SDK GA 에이전트 서버',
        code: `import express from 'express';
import { createCopilotAgent } from '@github/copilot-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// 1. Copilot 에이전트 생성
const agent = createCopilotAgent({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!,
  secret: process.env.GITHUB_WEBHOOK_SECRET!
});

// 2. 슬래시 커맨드 및 메시지 핸들러 등록
agent.onMessage(async (context) => {
  const { prompt, editorContext, stream } = context;

  if (prompt.startsWith('/review')) {
    stream.write('🔍 **코드 정적 분석 및 보안 리뷰를 시작합니다...**\\n\\n');
    
    // 에디터에서 선택된 코드 영역 접근
    const selectedCode = editorContext?.selection?.text;
    if (!selectedCode) {
      stream.write('⚠️ 에디터에서 리뷰할 코드 블록을 먼저 선택해주세요.');
      return;
    }

    // 에이전트 분석 로직 수행
    stream.write(\`리뷰 대상 파일: \` + (editorContext.activeFile?.path || 'Untitled') + '\\n');
    stream.write('✅ 1. 메모리 누수 가능성 없음\\n✅ 2. 예외 처리 적절함\\n');
  } else {
    stream.write(\`안녕하세요! [@\${context.agentName}] 에이전트입니다. '/review' 명령어를 사용해보세요.\`);
  }
});

// 3. GitHub Webhook 엔드포인트 마운트
app.post('/api/copilot-agent', agent.getHandler());

app.listen(3000, () => {
  console.log('GitHub Copilot Agent Server running on port 3000');
});`
      },
      python: {
        language: 'python',
        filename: 'copilot_agent.py',
        description: 'Python 기반 Copilot Extension 웹훅 핸들러',
        code: `from fastapi import FastAPI, Request
import hmac, hashlib, os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

SECRET = os.getenv("GITHUB_WEBHOOK_SECRET", "").encode()

@app.post("/api/copilot-agent")
async def copilot_handler(request: Request):
    body = await request.body()
    signature = request.headers.get("X-Hub-Signature-256", "")
    
    # 서명 검증
    expected = "sha256=" + hmac.new(SECRET, body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature):
        return {"error": "Invalid signature"}, 401
        
    data = await request.json()
    user_prompt = data.get("messages", [{}])[-1].get("content", "")
    
    return {
        "choices": [{
            "message": {
                "role": "assistant",
                "content": f"Copilot Agent가 요청을 처리했습니다: {user_prompt}"
            }
        }]
    }`
      },
      csharp: {
        language: 'csharp',
        filename: 'CopilotAgentController.cs',
        description: 'ASP.NET Core에서 Copilot Extension Webhook 컨트롤러 구현',
        code: `using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

[ApiController]
[Route("api/copilot-agent")]
public class CopilotAgentController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> HandleCopilotRequest([FromBody] JsonElement payload)
    {
        // 1. 요청 파싱 및 슬래시 커맨드 분기
        string prompt = payload.GetProperty("messages")[0].GetProperty("content").GetString() ?? "";

        var response = new
        {
            choices = new[]
            {
                new {
                    message = new {
                        role = "assistant",
                        content = $"[.NET Copilot Agent] 수신된 프롬프트: {prompt}\\n성공적으로 에이전트 파이프라인이 실행되었습니다."
                    }
                }
            }
        };

        return Ok(response);
    }
}`
      },
      json: {
        language: 'json',
        filename: 'copilot-agent-manifest.json',
        description: 'GitHub Copilot Agent 설정 및 스킬 선언 매니페스트',
        code: `{
  "name": "enterprise-code-assistant",
  "description": "사내 아키텍처 및 보안 표준을 준수하는 Copilot 확장 에이전트",
  "slashCommands": [
    { "name": "/review", "description": "선택한 코드의 보안 및 성능 리뷰" },
    { "name": "/gen-tests", "description": "단위 테스트 코드 자동 생성" },
    { "name": "/explain", "description": "아키텍처 관점에서 코드베이스 설명" }
  ],
  "permissions": ["editor_context", "repository_contents:read"]
}`
      }
    }
  },
  {
    id: 'step-5-multi-agent-workflows',
    stepNumber: 5,
    title: '멀티 에이전트 워크플로 (Multi-Agent Workflows)',
    subtitle: '순차(Sequential), 계층(Hierarchical), 핸드오프(Handoff) 오케스트레이션',
    description: '단일 에이전트의 한계를 넘어, 특화된 역할을 가진 복수의 에이전트들이 협력하고 제어권을 넘겨받으며 복잡한 소프트웨어 엔지니어링 문제를 해결합니다.',
    keyConcepts: [
      'Workflow State Management: 에이전트 간 공유 컨텍스트 및 히스토리 전달',
      'Handoff Protocol: 조건 충족 시 다음 에이전트로 명시적 제어권 이양',
      'Human-in-the-Loop: 결정적인 단계에서 사람의 승인을 대기하는 인터럽트 기능'
    ],
    checklist: [
      '에이전트별 단일 책임(SRP) 원칙에 따른 명확한 역할 정의',
      '무한 루프 방지를 위한 최대 턴(Max Rounds / Timeout) 제약 설정',
      '에이전트 간 주고받는 데이터의 Typed Schema 규격 정의'
    ],
    snippets: {
      python: {
        language: 'python',
        filename: 'multi_agent_workflow.py',
        description: '기획자 -> 개발자 -> 검수자 3단계 순차 워크플로 파이프라인',
        code: `import asyncio
from typing import TypedDict

class PipelineState(TypedDict):
    feature_req: str
    architecture_spec: str
    source_code: str
    review_status: str

# 1. 각 단계별 전문 에이전트 모의 정의
async def architect_agent(state: PipelineState) -> PipelineState:
    print("📋 [Architect Agent] 요구사항 분석 및 구조 설계 중...")
    await asyncio.sleep(1)
    state["architecture_spec"] = f"설계 명세서: {state['feature_req']} -> REST API + Redis Cache 레이어"
    return state

async def coder_agent(state: PipelineState) -> PipelineState:
    print("💻 [Coder Agent] 명세 기반 코드 작성 중...")
    await asyncio.sleep(1)
    state["source_code"] = "class CacheService { get(key) { return redis.get(key); } }"
    return state

async def reviewer_agent(state: PipelineState) -> PipelineState:
    print("🔍 [Reviewer Agent] 코드 품질 및 보안 감사 중...")
    await asyncio.sleep(1)
    state["review_status"] = "PASSED: 보안 검사 100% 통과, 테스트 커버리지 92%"
    return state

# 2. 파이프라인 실행
async def run_pipeline():
    state: PipelineState = {
        "feature_req": "사용자 세션 캐싱 모듈 구현",
        "architecture_spec": "",
        "source_code": "",
        "review_status": ""
    }
    
    state = await architect_agent(state)
    state = await coder_agent(state)
    state = await reviewer_agent(state)
    
    print("\\n=== 최종 워크플로 결과 ===")
    print(f"명세: {state['architecture_spec']}")
    print(f"코드: {state['source_code']}")
    print(f"리뷰: {state['review_status']}")

asyncio.run(run_pipeline())`
      },
      typescript: {
        language: 'typescript',
        filename: 'multiAgentOrchestrator.ts',
        description: 'TypeScript 기반 Handoff 오케스트레이터 패턴',
        code: `interface WorkflowContext {
  task: string;
  currentAgent: 'Planner' | 'Coder' | 'Tester';
  artifacts: { [key: string]: string };
  isCompleted: boolean;
}

class MultiAgentWorkflow {
  private context: WorkflowContext;

  constructor(initialTask: string) {
    this.context = {
      task: initialTask,
      currentAgent: 'Planner',
      artifacts: {},
      isCompleted: false
    };
  }

  async step(): Promise<WorkflowContext> {
    switch (this.context.currentAgent) {
      case 'Planner':
        console.log('[Planner] 태스크 분할 및 작업 계획 생성');
        this.context.artifacts.plan = 'Step 1: DB 스키마 정의, Step 2: API 엔드포인트 작성';
        this.context.currentAgent = 'Coder'; // Handoff to Coder
        break;

      case 'Coder':
        console.log('[Coder] 계획에 따라 소스코드 생성');
        this.context.artifacts.code = 'export const getUser = async (id: string) => db.users.find(id);';
        this.context.currentAgent = 'Tester'; // Handoff to Tester
        break;

      case 'Tester':
        console.log('[Tester] 단위 테스트 실행 및 검증 완료');
        this.context.artifacts.testResult = 'All 12 unit tests passed.';
        this.context.isCompleted = true;
        break;
    }
    return this.context;
  }

  async runAll() {
    while (!this.context.isCompleted) {
      await this.step();
    }
    console.log('🎉 워크플로 완료:', this.context.artifacts);
  }
}

const flow = new MultiAgentWorkflow('회원 조회 API 개발');
flow.runAll();`
      },
      csharp: {
        language: 'csharp',
        filename: 'MultiAgentPipeline.cs',
        description: 'C# .NET Task 기반의 멀티 에이전트 순차 처리 엔진',
        code: `using System;
using System.Threading.Tasks;

public class WorkflowState
{
    public string TaskInput { get; set; } = string.Empty;
    public string SpecOutput { get; set; } = string.Empty;
    public string CodeOutput { get; set; } = string.Empty;
    public bool IsApproved { get; set; }
}

public class MultiAgentRunner
{
    public static async Task<WorkflowState> ExecuteAsync(string userPrompt)
    {
        var state = new WorkflowState { TaskInput = userPrompt };

        // 1. Planner Agent
        Console.WriteLine("[Agent 1: Planner] 요구사항 기획 중...");
        await Task.Delay(500);
        state.SpecOutput = $"기획서: {userPrompt}에 대한 데이터 모델링 및 DTO 설계";

        // 2. Developer Agent
        Console.WriteLine("[Agent 2: Developer] C# 코드 생성 중...");
        await Task.Delay(500);
        state.CodeOutput = "public record UserDto(string Id, string Name);";

        // 3. Reviewer Agent
        Console.WriteLine("[Agent 3: Reviewer] 정적 검사 진행...");
        await Task.Delay(500);
        state.IsApproved = true;

        return state;
    }
}`
      },
      json: {
        language: 'json',
        filename: 'workflow-definition.json',
        description: '멀티 에이전트 단계별 상태 전환 선언 파일',
        code: `{
  "workflowName": "automated-code-generation-and-review",
  "maxRounds": 5,
  "agents": [
    { "name": "PlannerAgent", "role": "requirements_breakdown", "next": "DeveloperAgent" },
    { "name": "DeveloperAgent", "role": "code_writing", "next": "SecurityAuditorAgent" },
    { "name": "SecurityAuditorAgent", "role": "compliance_check", "onPass": "COMPLETE", "onFail": "DeveloperAgent" }
  ]
}`
      }
    }
  },
  {
    id: 'step-6-sandbox-isolation',
    stepNumber: 6,
    title: '클라우드 및 로컬 샌드박스 (Sandbox) 보안 격리 설정',
    subtitle: '에이전트가 실행하는 임의 코드 및 셸 스크립트의 안전한 격리 환경 구축',
    description: 'GitHub Copilot의 로컬/클라우드 샌드박스를 적용하여 파일시스템 변조 방지, 허용된 아웃바운드 도메인만 통신할 수 있는 화이트리스트 정책을 수립합니다.',
    keyConcepts: [
      'Local Sandbox: 개발자 머신의 로컬 Docker 컨테이너 환경에서 명령 실행',
      'Cloud Sandbox: GitHub 관리형 보안 VM에서 임시 컨테이너 격리 실행',
      '`.github/copilot-sandbox.json`을 통한 엄격한 읽기/쓰기 및 네트워크 정책 강제'
    ],
    checklist: [
      '루트 파일시스템 읽기 전용(`readOnlyRootFilesystem: true`) 설정',
      '필요한 외부 도메인(`registry.npmjs.org`, `pypi.org`, `azure.com`)만 화이트리스트 등록',
      '메모리 및 CPU 사용량 상한(Quota) 지정하여 DoS 방지'
    ],
    snippets: {
      json: {
        language: 'json',
        filename: '.github/copilot-sandbox.json',
        description: '로컬 및 클라우드 샌드박스 보안 정책 공식 설정 파일',
        code: `{
  "$schema": "https://json.schemastore.org/github-copilot-sandbox.json",
  "version": "1.0",
  "runtime": "docker",
  "container": {
    "image": "mcr.microsoft.com/devcontainers/universal:latest",
    "cpuLimit": 2.0,
    "memoryLimit": "4GiB",
    "timeoutSeconds": 300
  },
  "filesystem": {
    "readOnlyRoot": true,
    "mounts": [
      {
        "source": "\${workspaceRoot}",
        "target": "/workspace",
        "readOnly": false
      },
      {
        "source": "\${workspaceRoot}/.env",
        "target": "/workspace/.env",
        "readOnly": true
      }
    ]
  },
  "network": {
    "enabled": true,
    "allowedOutboundDomains": [
      "github.com",
      "api.github.com",
      "registry.npmjs.org",
      "pypi.org",
      "services.ai.azure.com",
      "login.microsoftonline.com"
    ]
  }
}`
      },
      python: {
        language: 'python',
        filename: 'sandbox_runner.py',
        description: 'Python에서 Docker SDK를 이용한 안전한 임시 샌드박스 실행기',
        code: `import docker
import os

client = docker.from_env()

def execute_in_sandbox(python_code: str) -> str:
    """에이전트가 작성한 코드를 메모리/네트워크 제한된 컨테이너에서 실행합니다."""
    try:
        container = client.containers.run(
            image="python:3.11-slim",
            command=["python", "-c", python_code],
            mem_limit="256m",
            cpu_quota=50000, # 50% CPU
            network_disabled=True, # 네트워크 완전 차단
            read_only=True, # 파일시스템 읽기 전용
            remove=True,
            stdout=True,
            stderr=True
        )
        return container.decode("utf-8")
    except docker.errors.ContainerError as e:
        return f"실행 에러: {e.stderr.decode('utf-8')}"
    except Exception as e:
        return f"샌드박스 실패: {str(e)}"`
      },
      typescript: {
        language: 'typescript',
        filename: 'sandboxExecution.ts',
        description: 'TypeScript에서 샌드박스 격리 프로세스 실행 래퍼',
        code: `import { spawn } from 'child_process';

export function runSandboxedCommand(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    // Docker 기반 격리 컨테이너 내부에서 실행
    const runner = spawn('docker', [
      'run',
      '--rm',
      '--net=none',               // 네트워크 격리
      '--memory=512m',            // 메모리 상한 512MB
      '--read-only',              // 읽기 전용 파일시스템
      '-v', process.cwd() + ':/work:ro',
      'node:20-alpine',
      command,
      ...args
    ]);

    let output = '';
    runner.stdout.on('data', (data) => { output += data.toString(); });
    runner.stderr.on('data', (data) => { output += data.toString(); });

    runner.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(\`Exit with code \${code}: \${output}\`));
    });
  });
}`
      },
      csharp: {
        language: 'csharp',
        filename: 'SandboxProcessRunner.cs',
        description: 'C# .NET에서 Docker CLI 기반 샌드박스 래퍼',
        code: `using System.Diagnostics;
using System.Threading.Tasks;

public class SandboxProcessRunner
{
    public static async Task<string> RunInIsolatedDockerAsync(string scriptContent)
    {
        var psi = new ProcessStartInfo
        {
            FileName = "docker",
            Arguments = "run --rm --network none --memory 512m alpine sh -c \\"" + scriptContent.Replace("\"", "\\\"") + "\\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        using var process = Process.Start(psi)!;
        string output = await process.StandardOutput.ReadToEndAsync();
        string error = await process.StandardError.ReadToEndAsync();
        await process.WaitForExitAsync();

        return process.ExitCode == 0 ? output : $"Error: {error}";
    }
}`
      }
    }
  },
  {
    id: 'step-7-awesome-copilot-practices',
    stepNumber: 7,
    title: '모범 사례 (Awesome Copilot) & 프롬프트 가드레일',
    subtitle: '컨텍스트 엔지니어링, 에이전트 인스트럭션 및 보안 감사 체크리스트',
    description: '커뮤니티와 엔지니어링 팀이 축적한 Awesome Copilot 가이드라인을 바탕으로 에이전트의 환각(Hallucination)을 줄이고 일관된 품질을 달성합니다.',
    keyConcepts: [
      '`.github/copilot-instructions.md`를 통한 프로젝트 전역 컨텍스트 고정',
      'Few-Shot 예제와 Negative Prompting을 통한 규칙 준수율 극대화',
      'OpenTelemetry 및 Azure Application Insights를 통한 에이전트 호출 모니터링'
    ],
    checklist: [
      '`.github/copilot-instructions.md`에 기술 스택, 코딩 스타일, 금지 패턴 문서화',
      '에이전트 프롬프트에 구체적인 입출력 예시(Input/Output Example) 최소 2개 포함',
      '민감 정보(API Key, 개인 식별 정보) 필터링 인터셉터 구축'
    ],
    snippets: {
      json: {
        language: 'json',
        filename: '.github/copilot-instructions.md',
        description: '프로젝트 루트에 배치하는 공식 Copilot 지침 마크다운 예시',
        code: `# Project Coding Standards & Copilot Instructions

## 1. Core Architecture
- Framework: React 18+ with TypeScript (Strict Mode)
- Styling: Tailwind CSS utilities only (No custom CSS files or inline styles)
- State Management: React useState / Context API (Avoid unneeded Redux)

## 2. Security & Guardrails
- NEVER output raw secrets or hardcoded API keys.
- Always use parameterized queries for database operations.
- All external HTTP calls must have a 5-second timeout and retry logic.

## 3. Agent Execution Rules
- Always validate inputs using Zod schemas before processing.
- When generating unit tests, achieve at least 85% branch coverage.`
      },
      python: {
        language: 'python',
        filename: 'telemetry_middleware.py',
        description: 'OpenTelemetry 기반 에이전트 토큰 사용량 및 지연시간 추적',
        code: `import time
from functools import wraps

def track_agent_call(agent_name: str):
    """에이전트 실행 시간 및 성공 여부를 모니터링하는 데코레이터"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start_time = time.time()
            print(f"📡 [Telemetry] {agent_name} 실행 시작")
            try:
                result = await func(*args, **kwargs)
                duration = time.time() - start_time
                print(f"✅ [Telemetry] {agent_name} 완료 (소요시간: {duration:.2f}s)")
                return result
            except Exception as e:
                duration = time.time() - start_time
                print(f"❌ [Telemetry] {agent_name} 에러 발생 ({duration:.2f}s): {str(e)}")
                raise e
        return wrapper
    return decorator`
      },
      typescript: {
        language: 'typescript',
        filename: 'agentTelemetry.ts',
        description: 'TypeScript OpenTelemetry 계측 및 로깅 인터셉터',
        code: `export async function measureAgentExecution<T>(
  agentName: string,
  operation: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();
  console.log(\`[Metric] Starting execution for: \${agentName}\`);
  try {
    const result = await operation();
    const duration = (performance.now() - startTime).toFixed(2);
    console.log(\`[Metric] \${agentName} succeeded in \${duration}ms\`);
    return result;
  } catch (error) {
    const duration = (performance.now() - startTime).toFixed(2);
    console.error(\`[Metric] \${agentName} failed after \${duration}ms:\`, error);
    throw error;
  }
}`
      },
      csharp: {
        language: 'csharp',
        filename: 'AgentLoggerMiddleware.cs',
        description: 'C# .NET ILogger 기반 에이전트 로깅 미들웨어',
        code: `using Microsoft.Extensions.Logging;
using System.Diagnostics;

public class AgentTelemetryService
{
    private readonly ILogger<AgentTelemetryService> _logger;

    public AgentTelemetryService(ILogger<AgentTelemetryService> logger)
    {
        _logger = logger;
    }

    public async Task<T> TrackAsync<T>(string agentName, Func<Task<T>> action)
    {
        var sw = Stopwatch.StartNew();
        _logger.LogInformation("Agent {AgentName} started.", agentName);
        try
        {
            var result = await action();
            sw.Stop();
            _logger.LogInformation("Agent {AgentName} completed in {Elapsed}ms", agentName, sw.ElapsedMilliseconds);
            return result;
        }
        catch (Exception ex)
        {
            sw.Stop();
            _logger.LogError(ex, "Agent {AgentName} failed after {Elapsed}ms", agentName, sw.ElapsedMilliseconds);
            throw;
        }
    }
}`
      }
    }
  }
];
