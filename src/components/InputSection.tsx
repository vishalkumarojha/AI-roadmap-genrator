import { Zap, TrendingUp, Rocket, Download, History } from 'lucide-react';
import { ResearchMode } from '../types';

interface InputSectionProps {
  businessIdea: string;
  setBusinessIdea: (value: string) => void;
  researchMode: ResearchMode;
  setResearchMode: (mode: ResearchMode) => void;
  loading: boolean;
  onGenerate: () => void;
  onDownload?: () => void;
  onShowHistory?: () => void;
  hasRoadmap: boolean;
  hasHistory: boolean;
}

export default function InputSection({
  businessIdea,
  setBusinessIdea,
  researchMode,
  setResearchMode,
  loading,
  onGenerate,
  onDownload,
  onShowHistory,
  hasRoadmap,
  hasHistory
}: InputSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase">
        Describe Your Business Idea
      </label>
      <textarea
        value={businessIdea}
        onChange={(e) => setBusinessIdea(e.target.value)}
        placeholder="Example: A hyperlocal grocery delivery platform for tier-2 cities in India..."
        className="w-full h-36 px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900"
        disabled={loading}
      />

      <div className="mt-6 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border-2 border-indigo-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <strong className="text-lg">Research Mode</strong>
            <p className="text-sm text-gray-600 mt-1">Choose depth</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setResearchMode('fast')}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                researchMode === 'fast' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <Zap size={18} />
              Fast
            </button>
            <button
              onClick={() => setResearchMode('deep')}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                researchMode === 'deep' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <TrendingUp size={18} />
              Deep
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600 bg-white/50 p-3 rounded">
          {researchMode === 'fast' ? 'Quick AI analysis' : 'Web search for real-time data'}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={onGenerate}
          disabled={loading || !businessIdea.trim()}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin mr-2 h-6 w-6 border-4 border-white border-t-transparent rounded-full"></div>
              Generating...
            </>
          ) : (
            <>
              <Rocket className="mr-2" size={24} />
              Generate Roadmap
            </>
          )}
        </button>
        {hasRoadmap && onDownload && (
          <button
            onClick={onDownload}
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 flex items-center"
          >
            <Download className="mr-2" size={20} />
            Download
          </button>
        )}
        {hasHistory && onShowHistory && (
          <button
            onClick={onShowHistory}
            className="bg-gray-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-700 flex items-center"
          >
            <History className="mr-2" size={20} />
            History
          </button>
        )}
      </div>
    </div>
  );
}
