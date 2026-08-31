export interface ResourceItem {
  id: string;
  category: 'framework' | 'provider' | 'model' | 'copilot_sdk' | 'sandbox' | 'practices';
  title: string;
  url: string;
  summary: string;
  keyPoints: string[];
  practicalTips: string;
  badge?: string;
}

export type CodeLanguage = 'python' | 'csharp' | 'typescript' | 'json';

export interface CodeSnippet {
  language: CodeLanguage;
  code: string;
  description: string;
  filename?: string;
}

export interface GuideStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  keyConcepts: string[];
  snippets: Record<CodeLanguage, CodeSnippet>;
  checklist: string[];
  troubleshooting?: { problem: string; solution: string }[];
}

export interface ArchitecturePattern {
  id: string;
  name: string;
  description: string;
  useCase: string;
  flow: { step: number; role: string; action: string; output: string }[];
  diagramType: 'single' | 'sequential' | 'hierarchical' | 'sandbox';
}

export interface SandboxConfig {
  version: string;
  runtime: 'docker' | 'podman' | 'native';
  containerImage: string;
  timeoutSeconds: number;
  memoryLimitMb: number;
  cpuCores: number;
  network: {
    enabled: boolean;
    allowedDomains: string[];
  };
  filesystem: {
    readOnlyRoot: boolean;
    allowedReadPaths: string[];
    allowedWritePaths: string[];
  };
  environmentVariables: { key: string; value: string; isSecret: boolean }[];
}

export interface ArchitectureNode {
  id: string;
  name: string;
  category: 'ide_copilot' | 'protocol' | 'agent_framework' | 'sandbox' | 'automation_devops' | 'models';
  description: string;
  role: string;
  technologies: string[];
  inputs: string[];
  outputs: string[];
  codeExample?: {
    language: CodeLanguage | 'yaml';
    filename: string;
    code: string;
  };
  securityHighlights?: string[];
}

export interface AutomationScenario {
  id: string;
  title: string;
  tag: string;
  badgeColor: string;
  summary: string;
  trigger: string;
  benefit: string;
  steps: {
    order: number;
    phase: string;
    actor: string;
    description: string;
    details: string;
    artifact: string;
    status: 'completed' | 'active' | 'pending';
  }[];
  codeSnippet: {
    language: CodeLanguage | 'yaml';
    filename: string;
    description?: string;
    code: string;
  };
}
