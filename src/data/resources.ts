import { ResourceItem } from '../types';

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'agent-framework-overview',
    category: 'framework',
    title: 'Microsoft Agent Framework 개요',
    url: 'https://learn.microsoft.com/en-us/agent-framework/overview/?WT.mc_id=AZ-MVP-5000671',
    summary: '엔터프라이즈급 AI 에이전트를 구축, 오케스트레이션, 배포하기 위한 통합 프레임워크입니다. Semantic Kernel과 AutoGen의 핵심 강점을 융합하여 단일 및 멀티 에이전트 워크플로를 표준화합니다.',
    keyPoints: [
      '에이전트 수명 주기(Lifecycle), 상태 관리(State Management), 세션 격리 표준화',
      '도구(Tools/Function Calling), 구조화된 출력, 메모리 저장소와의 일관된 연결',
      'Azure OpenAI, Foundry, GitHub Copilot 등 다중 LLM 백엔드 교체 지원'
    ],
    practicalTips: '기존 Semantic Kernel 플러그인 또는 AutoGen 대화 패턴을 단일 표준 API 인터페이스로 통합 개발할 때 시작점으로 활용합니다.',
    badge: 'Framework Core'
  },
  {
    id: 'agent-framework-get-started',
    category: 'framework',
    title: 'Microsoft Agent Framework 시작하기',
    url: 'https://learn.microsoft.com/en-us/agent-framework/get-started/?WT.mc_id=AZ-MVP-5000671',
    summary: 'C#, Python, TypeScript 환경에서 Agent Framework SDK를 설치하고 첫 번째 AI 에이전트를 빌드하고 실행하는 공식 퀵스타트 가이드입니다.',
    keyPoints: [
      'SDK 패키지 설치 (`@microsoft/agents-bot` / `azure-ai-agents` / C# NuGet)',
      '클라이언트 인증(Azure KeyCredential / DefaultAzureCredential) 구성',
      '에이전트 인스턴스 생성 및 메시지 스트리밍 루프 구현'
    ],
    practicalTips: '로컬 환경에서는 .env 파일 기반 KeyCredential로 시작하고, 프로덕션 배포 시에는 Managed Identity(DefaultAzureCredential)로 전환하세요.',
    badge: 'Quickstart'
  },
  {
    id: 'agent-framework-providers',
    category: 'provider',
    title: '에이전트 공급자 (Providers) & GitHub Copilot Provider',
    url: 'https://learn.microsoft.com/en-us/agent-framework/agents/providers/?WT.mc_id=AZ-MVP-5000671',
    summary: '에이전트가 어떤 모델 백엔드와 상호작용할지 결정하는 추상화 계층입니다. Azure OpenAI뿐만 아니라 GitHub Copilot을 공급자로 지정하여 엔터프라이즈 라이선스 토큰을 활용할 수 있습니다.',
    keyPoints: [
      'GitHub Copilot Provider: Copilot 비즈니스/엔터프라이즈 계정 기반 LLM 호출 라우팅',
      'Azure OpenAI Provider: 전용 엔터프라이즈 SLA 및 프라이빗 네트워킹 지원',
      'Ollama/Local Model Provider: 로컬 개발 및 오프라인 테스트용 모델 연결'
    ],
    practicalTips: 'GitHub Copilot 구독이 있는 팀의 경우 Copilot Provider를 통해 별도의 API 종량제 과금 없이 개발 에이전트를 프로토타이핑할 수 있습니다.',
    badge: 'Providers & Copilot'
  },
  {
    id: 'agent-framework-workflows',
    category: 'framework',
    title: 'Microsoft 에이전트 프레임워크 워크플로 (Workflows)',
    url: 'https://learn.microsoft.com/en-us/agent-framework/workflows/?WT.mc_id=AZ-MVP-5000671',
    summary: '복잡한 비즈니스 로직을 처리하기 위해 여러 에이전트를 연결하는 멀티 에이전트 오케스트레이션 엔진입니다. 순차(Sequential), 계층(Hierarchical), 핸드오프(Handoff) 패턴을 지원합니다.',
    keyPoints: [
      'Sequential Pattern: A 에이전트 출력 -> B 에이전트 입력 파이프라인 (예: 기획 -> 코드 -> 리뷰)',
      'Router / Orchestrator Pattern: 중앙 디스패처가 사용자 질문 의도에 따라 전문 에이전트 선택',
      'Handoff Pattern: 대화 중 맥락에 따라 권한과 제어권을 다른 서브 에이전트로 명시적 이양'
    ],
    practicalTips: '단일 에이전트에게 20개 이상의 툴을 부여하는 대신, 도메인별 3~5개 툴을 가진 전담 에이전트들로 쪼개고 라우터 워크플로로 묶는 것이 환각을 줄입니다.',
    badge: 'Multi-Agent'
  },
  {
    id: 'foundry-models-overview',
    category: 'model',
    title: 'Microsoft Foundry 모델 개요 (BYOK & BYOM)',
    url: 'https://learn.microsoft.com/en-us/azure/foundry/concepts/foundry-models-overview/?WT.mc_id=AZ-MVP-5000671',
    summary: 'Azure AI Foundry 카탈로그에서 제공되는 1,800개 이상의 파운데이션 모델(GPT-4o, Claude 3.5, Llama 3.3, DeepSeek, Mistral, Cohere 등)을 자체 API 키(BYOK) 또는 자체 호스팅(BYOM)으로 사용하는 체계입니다.',
    keyPoints: [
      'MaaS (Model as a Service): 서버 관리 없이 토큰 단위 종량제로 오픈소스/상용 모델 사용',
      'BYOK (Bring Your Own Key): 공급사(Anthropic/Cohere 등) 직계약 키를 Foundry 콘솔에 바인딩',
      'BYOM (Bring Your Own Model): 커스텀 파인튜닝 가중치를 Azure 인프라에 배포하여 에이전트에 연결'
    ],
    practicalTips: '추론 비용 절감을 위해 단순 라우팅/분류는 Phi-4나 Llama-3.3-8B(Foundry MaaS)를 쓰고, 복잡한 코드 작성에는 GPT-4o나 Claude-3.5-Sonnet을 하이브리드 배치하세요.',
    badge: 'AI Foundry Models'
  },
  {
    id: 'aifoundry-modelinference-api',
    category: 'model',
    title: 'Azure AI 모델 추론 REST API (Model Inference)',
    url: 'https://learn.microsoft.com/en-us/rest/api/aifoundry/modelinference/?WT.mc_id=AZ-MVP-5000671',
    summary: '모든 Foundry 모델을 단일한 표준 규격(`/chat/completions`, `/embeddings`)으로 호출할 수 있는 통합 엔드포인트 REST API 규격입니다.',
    keyPoints: [
      'OpenAI 호환 포맷 표준 지원으로 코드 수정 없이 모델명 파라미터만 변경 가능',
      '스트리밍(Server-Sent Events), 툴 콜링(Tool Calling), JSON Schema 출력 완벽 지원',
      'Azure Content Safety 및 엔터프라이즈 모니터링 가드레일이 기본 내장'
    ],
    practicalTips: '모든 언어(Go, Rust, Java 등)에서 표준 HTTP 라이브러리로 쉽게 연동 가능하며, URL과 Model Header만으로 타깃 모델을 즉시 전환할 수 있습니다.',
    badge: 'Standard REST API'
  },
  {
    id: 'copilot-sdk-repo',
    category: 'copilot_sdk',
    title: 'GitHub Copilot SDK 저장소 (github/copilot-sdk)',
    url: 'https://github.com/github/copilot-sdk',
    summary: 'GitHub Copilot 생태계 위에서 동작하는 커스텀 확장(Extensions), 에이전트, 스킬을 제작하기 위한 공식 오픈소스 SDK 저장소입니다.',
    keyPoints: [
      'Node.js / TypeScript 및 Python 공식 지원 SDK',
      'GitHub Marketplace 배포 가능한 Copilot Chat 에이전트 빌드 템플릿',
      'Copilot Agent Protocol (CAP) 명세 구현'
    ],
    practicalTips: 'SDK 내 `createCopilotAgent()` 유틸리티를 사용하면 GitHub 서명 검증(HMAC signature)과 세션 수명 주기를 자동으로 처리할 수 있습니다.',
    badge: 'GitHub SDK'
  },
  {
    id: 'copilot-sdk-getting-started',
    category: 'copilot_sdk',
    title: 'Copilot SDK 시작 가이드',
    url: 'https://docs.github.com/en/copilot/how-tos/copilot-sdk/getting-started',
    summary: 'Copilot Extension을 GitHub App으로 등록하고 로컬 서버를 프록시 터널링(ngrok / Codespaces)하여 개발 및 디버깅하는 절차 가이드입니다.',
    keyPoints: [
      'GitHub App 생성 및 Copilot Chat 권한(`copilot_editor_context`) 활성화',
      '엔드포인트 URL 등록 및 웹훅 시크릿(Webhook Secret) 연동',
      'VS Code 및 github.com 채팅창에서 `@my-agent` 멘션 테스트'
    ],
    practicalTips: '개발 단계에서는 GitHub Codespaces의 포트 포워딩 기능을 활용하면 별도의 외부 도메인 없이 즉시 HTTPS 콜백 URL을 확보할 수 있습니다.',
    badge: 'Getting Started'
  },
  {
    id: 'copilot-sdk-docs-hub',
    category: 'copilot_sdk',
    title: 'Copilot SDK 공식 문서 허브',
    url: 'https://docs.github.com/en/copilot/how-tos/copilot-sdk',
    summary: 'Copilot SDK의 모든 아키텍처, 레퍼런스, 슬래시 커맨드(Slash Commands), 확인 다이얼로그(Confirmation UX), 컨텍스트 주입 가이드가 집약된 허브입니다.',
    keyPoints: [
      '슬래시 명령어(`/deploy`, `/review`, `/db-query`) 정의 방법',
      '위험 명령 실행 전 사용자 승인(Confirmation Request) 인터랙션 설계',
      '에디터 파일 선택 영역(Selection), 커밋 히스토리 컨텍스트 파싱 API'
    ],
    practicalTips: '파일 수정이나 DB 갱신과 같은 파괴적 동작은 반드시 SDK의 `confirmAction` API를 통해 사용자 명시적 클릭 후 실행되도록 작성하세요.',
    badge: 'Docs Hub'
  },
  {
    id: 'copilot-sdk-ga-changelog',
    category: 'copilot_sdk',
    title: 'Copilot SDK 정식 출시 (GA 변경 로그)',
    url: 'https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/',
    summary: 'GitHub Copilot SDK의 정식 버전(GA) 발표 내역으로, 엔터프라이즈급 SLA, 멀티 테넌트 안정성, 향상된 디버깅 도구가 탑재되었습니다.',
    keyPoints: [
      '프로덕션급 99.9% 가용성 보장 및 엔터프라이즈 테넌트 지원',
      '컨텍스트 윈도우 확장 및 토큰 압축 최적화 엔진 탑재',
      'Copilot Agent Arena 및 확장 마켓플레이스 승인 프로세스 오픈'
    ],
    practicalTips: '베타 버전의 실험적 API들이 안정화되었으므로 패키지 버전을 최신 1.0.0+ 메이저 릴리스로 업그레이드해야 합니다.',
    badge: 'GA Release'
  },
  {
    id: 'copilot-sandboxes-concept',
    category: 'sandbox',
    title: 'GitHub Copilot 클라우드 및 로컬 샌드박스 개념',
    url: 'https://docs.github.com/en/copilot/concepts/about-cloud-and-local-sandboxes',
    summary: 'AI 에이전트가 코드를 실행하고 테스트할 때 호스트 시스템을 파괴하거나 중요 데이터를 유출하지 못하도록 안전하게 격리하는 샌드박스 아키텍처입니다.',
    keyPoints: [
      'Local Sandbox: 개발자 PC의 Docker/컨테이너 환경에서 파일시스템 및 네트워크를 격리',
      'Cloud Sandbox: GitHub 관리형 보안 가상 머신(Ephemeral VM)에서 일회성 코드 실행',
      '보안 공격(Prompt Injection, 임의 코드 실행)으로부터 개발 환경 완전 보호'
    ],
    practicalTips: '로컬 테스트에서는 로컬 샌드박스로 속도를 높이고, CI/CD 파이프라인이나 자동 PR 에이전트에는 클라우드 샌드박스를 적용하세요.',
    badge: 'Security & Isolation'
  },
  {
    id: 'copilot-sandboxes-public-preview',
    category: 'sandbox',
    title: '클라우드 & 로컬 샌드박스 공개 미리 보기',
    url: 'https://github.blog/changelog/2026-06-02-cloud-and-local-sandboxes-for-github-copilot-now-in-public-preview/',
    summary: '모든 Copilot Enterprise 및 Pro 사용자가 샌드박스 기능을 켜고 자동 코드 실행 환경을 안전하게 제어할 수 있는 프리뷰 릴리스 공지입니다.',
    keyPoints: [
      'VS Code 및 CLI에서 원클릭 샌드박스 활성화',
      '컨테이너 리소스(CPU, 메모리, 타임아웃) 제한 프리셋 제공',
      '감사 로그(Audit Trail)를 통한 에이전트 실행 명령어 전체 추적'
    ],
    practicalTips: '조직 관리자는 Organization 정책 설정에서 샌드박스 필수 적용(Enforce Sandbox)을 활성화할 수 있습니다.',
    badge: 'Sandbox Preview'
  },
  {
    id: 'copilot-local-sandbox-config',
    category: 'sandbox',
    title: '로컬 샌드박스 설정 구성 가이드',
    url: 'https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings',
    summary: '`.github/copilot-sandbox.json` 파일을 통해 프로젝트별 마운트 경로, 허용 네트워크 도메인, 읽기/쓰기 권한을 세밀하게 제어하는 기술 문서입니다.',
    keyPoints: [
      '`readOnlyRootFilesystem`: 컨테이너 루트 파일시스템 불변 설정',
      '`allowedOutboundDomains`: 허용된 외부 API 및 패키지 저장소만 접속 허용',
      '`workspaceMount`: 작업 대상 소스코드 폴더만 지정 마운트'
    ],
    practicalTips: '`allowedOutboundDomains`에 `npm.org`, `pypi.org`, `azure.com` 등 필요한 화이트리스트만 명시하여 데이터 유출(exfiltration)을 원천 차단하세요.',
    badge: 'Configuration'
  },
  {
    id: 'awesome-copilot-best-practices',
    category: 'practices',
    title: 'Copilot 모범 사례 (awesome-copilot)',
    url: 'https://github.com/github/awesome-copilot',
    summary: 'GitHub 및 글로벌 커뮤니티가 검증한 Copilot 에이전트 패턴, 프롬프트 라이브러리, 워크플로 자동화 레시피 모음집입니다.',
    keyPoints: [
      '에이전트 역할 정의(System Prompt) 모범 사례 템플릿',
      '컨텍스트 엔지니어링: `.github/copilot-instructions.md` 작성 팁',
      'CI/CD 파이프라인과 Copilot Agent 연동 자동화 스크립트'
    ],
    practicalTips: '프로젝트 루트에 `.github/copilot-instructions.md`를 배치하고 코딩 컨벤션, 사용 금지 라이브러리, 아키텍처 규칙을 선언해두면 모든 에이전트가 이를 자동 준수합니다.',
    badge: 'Best Practices'
  }
];
