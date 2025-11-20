import { TrendingUp, Lightbulb, DollarSign, Map, AlertTriangle, BarChart3, Rocket } from 'lucide-react';
import { RoadmapStep } from '../types';

export const ROADMAP_STEPS: RoadmapStep[] = [
  { icon: TrendingUp, label: 'Market Research', key: 'research' },
  { icon: Lightbulb, label: 'Executive Summary', key: 'executive' },
  { icon: DollarSign, label: 'Revenue Model', key: 'revenue' },
  { icon: Map, label: 'Implementation', key: 'implementation' },
  { icon: Rocket, label: 'Scaling Strategy', key: 'scaling' },
  { icon: BarChart3, label: 'Financials', key: 'financial' },
  { icon: AlertTriangle, label: 'Risk Assessment', key: 'risks' }
];

export const CHART_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];
