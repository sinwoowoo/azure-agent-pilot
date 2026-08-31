import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Download, Plus, Trash2, Globe, HardDrive, Cpu, Terminal } from 'lucide-react';

export const SandboxConfigBuilder: React.FC = () => {
  const [runtime, setRuntime] = useState<'docker' | 'podman'>('docker');
  const [containerImage, setContainerImage] = useState<string>('mcr.microsoft.com/devcontainers/universal:latest');
  const [cpuLimit, setCpuLimit] = useState<number>(2.0);
  const [memoryLimit, setMemoryLimit] = useState<string>('4GiB');
  const [timeoutSeconds, setTimeoutSeconds] = useState<number>(300);
  const [readOnlyRoot, setReadOnlyRoot] = useState<boolean>(true);
  const [networkEnabled, setNetworkEnabled] = useState<boolean>(true);
  
  const [allowedDomains, setAllowedDomains] = useState<string[]>([
    'github.com',
    'api.github.com',
    'registry.npmjs.org',
    'pypi.org',
    'services.ai.azure.com',
    'login.microsoftonline.com'
  ]);
  const [newDomain, setNewDomain] = useState<string>('');

  const [copied, setCopied] = useState<boolean>(false);

  const containerPresets = [
    { label: 'Universal (모든 언어 통합)', image: 'mcr.microsoft.com/devcontainers/universal:latest' },
    { label: 'Node.js 20 Alpine (초경량)', image: 'node:20-alpine' },
    { label: 'Python 3.11 Slim (AI/ML)', image: 'python:3.11-slim' },
    { label: '.NET 8.0 SDK (C# 엔터프라이즈)', image: 'mcr.microsoft.com/dotnet/sdk:8.0' },
    { label: 'Rust Bookworm (고성능)', image: 'rust:latest' }
  ];

  const generatedJson = {
    $schema: 'https://json.schemastore.org/github-copilot-sandbox.json',
    version: '1.0',
    runtime: runtime,
    container: {
      image: containerImage,
      cpuLimit: cpuLimit,
      memoryLimit: memoryLimit,
      timeoutSeconds: timeoutSeconds
    },
    filesystem: {
      readOnlyRoot: readOnlyRoot,
      mounts: [
        {
          source: '${workspaceRoot}',
          target: '/workspace',
          readOnly: false
        },
        {
          source: '${workspaceRoot}/.env',
          target: '/workspace/.env',
          readOnly: true
        }
      ]
    },
    network: {
      enabled: networkEnabled,
      allowedOutboundDomains: networkEnabled ? allowedDomains : []
    }
  };

  const jsonString = JSON.stringify(generatedJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'copilot-sandbox.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddDomain = () => {
    if (newDomain.trim() && !allowedDomains.includes(newDomain.trim())) {
      setAllowedDomains([...allowedDomains, newDomain.trim()]);
      setNewDomain('');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setAllowedDomains(allowedDomains.filter((d) => d !== domain));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md mb-2 w-fit">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>보안 격리 설정 도구 (Sandbox Config Builder)</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          GitHub Copilot 로컬 및 클라우드 샌드박스 설정 생성기
        </h2>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl">
          에이전트가 코드를 실행하고 테스트할 때 호스트 머신 및 중요 파일(API Key, SSH Key)을 보호하기 위한 <code className="text-emerald-300 font-mono">.github/copilot-sandbox.json</code> 설정 파일을 GUI로 즉시 생성합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left GUI Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Runtime & Container Image */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>1. 런타임 및 베이스 컨테이너</span>
            </h3>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">컨테이너 런타임</label>
              <div className="grid grid-cols-2 gap-2">
                {(['docker', 'podman'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRuntime(r)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border capitalize transition ${
                      runtime === r
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">베이스 이미지 프리셋</label>
              <select
                value={containerImage}
                onChange={(e) => setContainerImage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {containerPresets.map((preset, idx) => (
                  <option key={idx} value={preset.image}>
                    {preset.label} ({preset.image})
                  </option>
                ))}
              </select>
            </div>

            {/* Quotas */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">CPU 제한</label>
                <select
                  value={cpuLimit}
                  onChange={(e) => setCpuLimit(parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
                >
                  <option value={1.0}>1.0 Core</option>
                  <option value={2.0}>2.0 Cores</option>
                  <option value={4.0}>4.0 Cores</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">메모리 제한</label>
                <select
                  value={memoryLimit}
                  onChange={(e) => setMemoryLimit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
                >
                  <option value="1GiB">1 GiB</option>
                  <option value="2GiB">2 GiB</option>
                  <option value="4GiB">4 GiB</option>
                  <option value="8GiB">8 GiB</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">타임아웃 (초)</label>
                <input
                  type="number"
                  value={timeoutSeconds}
                  onChange={(e) => setTimeoutSeconds(parseInt(e.target.value) || 60)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-xs text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Filesystem & Security */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>2. 파일시스템 격리 정책</span>
            </h3>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white">Root 파일시스템 읽기 전용 (추천)</div>
                <div className="text-[11px] text-slate-400">
                  컨테이너 OS 파일 변조 및 악성 바이너리 설치 방지
                </div>
              </div>
              <input
                type="checkbox"
                checked={readOnlyRoot}
                onChange={(e) => setReadOnlyRoot(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700"
              />
            </div>
          </div>

          {/* Network Whitelist */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                <span>3. 아웃바운드 네트워크 화이트리스트</span>
              </h3>
              <label className="text-xs text-slate-400 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={networkEnabled}
                  onChange={(e) => setNetworkEnabled(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-blue-600 bg-slate-800 border-slate-700"
                />
                <span>네트워크 허용</span>
              </label>
            </div>

            {networkEnabled ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    placeholder="도메인 추가 (예: api.openai.com)"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddDomain()}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                  />
                  <button
                    onClick={handleAddDomain}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>추가</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-950/60 rounded-lg border border-slate-800">
                  {allowedDomains.map((domain) => (
                    <span
                      key={domain}
                      className="inline-flex items-center gap-1 bg-slate-800 text-slate-200 text-xs px-2.5 py-1 rounded-md border border-slate-700"
                    >
                      <span>{domain}</span>
                      <button
                        onClick={() => handleRemoveDomain(domain)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-red-950/20 border border-red-900/30 rounded-lg text-xs text-red-300">
                ⚠️ 네트워크가 비활성화되었습니다. 에이전트가 외부 인터넷에 접근할 수 없습니다. (완전 오프라인 격리)
              </div>
            )}
          </div>
        </div>

        {/* Right JSON Preview & Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
            <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  .github/copilot-sandbox.json
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '복사 완료' : 'JSON 복사'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-xs px-2.5 py-1.5 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>다운로드</span>
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-x-auto text-xs font-mono text-emerald-300/90 leading-relaxed bg-slate-950">
              <pre>
                <code>{jsonString}</code>
              </pre>
            </div>

            <div className="p-3 bg-slate-900/50 border-t border-slate-800 text-[11px] text-slate-400">
              💡 프로젝트 루트 경로의 <code className="text-blue-300">.github/copilot-sandbox.json</code> 파일로 저장하면 VS Code 및 GitHub Copilot CLI에서 자동으로 이 보안 격리 정책을 인식합니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
