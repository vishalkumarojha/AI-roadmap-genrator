import { RoadmapStep, RoadmapData } from '../types';

interface RoadmapSectionProps {
  steps: RoadmapStep[];
  roadmap: RoadmapData;
}

export default function RoadmapSection({ steps, roadmap }: RoadmapSectionProps) {
  return (
    <div className="space-y-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const content = roadmap[step.key];

        if (!content || !content.html) return null;

        return (
          <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden border">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center">
              <Icon className="text-white mr-4" size={32} />
              <h2 className="text-2xl font-bold text-white">{step.label}</h2>
            </div>
            <div className="p-8">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: content.html }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
