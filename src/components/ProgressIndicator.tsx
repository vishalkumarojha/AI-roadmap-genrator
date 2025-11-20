import { RoadmapStep, RoadmapData } from '../types';

interface ProgressIndicatorProps {
  steps: RoadmapStep[];
  currentStep: string;
  roadmap: RoadmapData | null;
}

export default function ProgressIndicator({ steps, currentStep, roadmap }: ProgressIndicatorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="animate-spin text-indigo-600 mr-3 h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
          <span className="text-2xl font-bold">{currentStep}</span>
        </div>
        <p className="text-center text-gray-600">Analyzing...</p>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.label;
          const isComplete = roadmap && roadmap[step.key];

          return (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                isComplete ? 'bg-green-500 text-white' :
                  isActive ? 'bg-indigo-600 text-white animate-pulse' :
                    'bg-gray-200 text-gray-400'
              }`}>
                <Icon size={28} />
              </div>
              <span className={`text-xs text-center font-semibold ${
                isActive ? 'text-indigo-600' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
