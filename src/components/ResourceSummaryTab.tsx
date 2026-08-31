import React, { useState } from 'react';
import { ResourceItem } from '../types';
import { ExternalLink, CheckCircle, Tag, Lightbulb, Compass, Filter, ArrowUpRight, Copy, Check } from 'lucide-react';

interface ResourceSummaryTabProps {
  resources: ResourceItem[];
  searchQuery: string;
}

export const ResourceSummaryTab: React.FC<ResourceSummaryTabProps> = ({ resources, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '전체 보기' },
    { id: 'framework', label: '에이전트 프레임워크' },
    { id: 'provider', label: '공급자 & Copilot' },
    { id: 'model', label: 'Foundry & 추론 API' },
    { id: 'copilot_sdk', label: 'GitHub Copilot SDK' },
    { id: 'sandbox', label: '클라우드/로컬 샌드박스' },
    { id: 'practices', label: '모범 사례 (Awesome)' }
  ];

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.keyPoints.some((kp) => kp.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Executive Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-800/40 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Microsoft Agent Framework & Copilot 생태계 총정리</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              제공된 핵심 공식 문서 및 리소스 12종 통합 요약
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Microsoft Agent Framework를 중심으로 Azure AI Foundry 모델(1,800+ 개 BYOK/BYOM), 
              정식 출시(GA)된 GitHub Copilot SDK, 안전한 격리 실행을 보장하는 로컬/클라우드 샌드박스(Sandbox)까지 
              엔터프라이즈 AI 에이전트 개발에 필요한 모든 요소를 체계화했습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
            <div>
              <div className="text-lg font-bold text-blue-400">12개</div>
              <div className="text-[11px] text-slate-400">공식 리소스</div>
            </div>
            <div>
              <div className="text-lg font-bold text-indigo-400">3개 언어</div>
              <div className="text-[11px] text-slate-400">Python · C# · TS</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-lg font-bold text-emerald-400">GA & Preview</div>
              <div className="text-[11px] text-slate-400">최신 기술 스택</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredResources.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition flex flex-col justify-between shadow-sm group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-800 text-blue-300 border border-slate-700">
                    {item.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-slate-500" />
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleCopyLink(item.url, item.id)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800"
                    title="URL 복사"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-blue-400 hover:text-blue-300 rounded-md hover:bg-slate-800 inline-flex items-center"
                    title="원문 보기"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition">
                {item.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>

              {/* Key Technical Bullet Points */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold text-slate-400">핵심 기술 요약:</div>
                <ul className="space-y-1">
                  {item.keyPoints.map((kp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Tip Callout */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 mt-3 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-amber-300 mr-1">실무 적용 팁:</span>
                  {item.practicalTips}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[240px] text-[11px] text-slate-500 font-mono">
                {item.url.replace(/^https?:\/\//, '')}
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 hover:underline"
              >
                <span>공식 문서 열기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-slate-900/50 rounded-xl border border-slate-800">
          <p className="text-sm text-slate-400">검색 조건에 맞는 리소스가 없습니다.</p>
        </div>
      )}
    </div>
  );
};
