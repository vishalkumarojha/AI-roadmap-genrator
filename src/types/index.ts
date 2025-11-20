export interface RoadmapStep {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  key: string;
}

export interface RoadmapContent {
  html: string;
  data: null;
}

export interface RoadmapData {
  [key: string]: RoadmapContent;
}

export interface RoadmapSnapshot {
  timestamp: string;
  data: RoadmapData;
  idea: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  step: string;
  content: RoadmapContent;
  originalContent: RoadmapContent;
}

export type ResearchMode = 'fast' | 'deep';
