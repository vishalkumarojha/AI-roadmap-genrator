import { Rocket } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Rocket className="w-14 h-14 text-indigo-600 mr-3" />
        <h1 className="text-5xl font-bold text-gray-900">AI Business Roadmap Generator</h1>
      </div>
      <p className="text-gray-600 text-lg">Data-Driven Planning for Indian Market</p>
    </div>
  );
}
