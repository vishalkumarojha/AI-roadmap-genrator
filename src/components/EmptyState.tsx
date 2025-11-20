import { Lightbulb, TrendingUp, BarChart3, Map, MessageSquare } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
      <Lightbulb className="w-24 h-24 text-gray-300 mx-auto mb-6" />
      <h3 className="text-3xl font-bold text-gray-700 mb-3">Ready to Build Your Business?</h3>
      <p className="text-gray-500 text-lg mb-6">Get a comprehensive roadmap with:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        <div className="bg-blue-50 p-4 rounded-lg">
          <TrendingUp className="text-blue-600 mb-2" size={24} />
          <p className="text-sm font-semibold text-gray-700">Market Research</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <BarChart3 className="text-green-600 mb-2" size={24} />
          <p className="text-sm font-semibold text-gray-700">Financial Models</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <Map className="text-purple-600 mb-2" size={24} />
          <p className="text-sm font-semibold text-gray-700">Implementation</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <MessageSquare className="text-orange-600 mb-2" size={24} />
          <p className="text-sm font-semibold text-gray-700">Refinement</p>
        </div>
      </div>
    </div>
  );
}
