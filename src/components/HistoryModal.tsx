import { X, History } from 'lucide-react';
import { RoadmapSnapshot } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: RoadmapSnapshot[];
  onRestore: (snapshot: RoadmapSnapshot) => void;
}

export default function HistoryModal({ isOpen, onClose, history, onRestore }: HistoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <History className="mr-3" size={28} />
            Version History
          </h3>
          <button onClick={onClose} className="text-white p-2">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {history.map((snapshot, idx) => (
            <div key={idx} className="border-b py-4 hover:bg-gray-50 px-4 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Version {history.length - idx}</p>
                  <p className="text-sm text-gray-600">{new Date(snapshot.timestamp).toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{snapshot.idea.substring(0, 60)}...</p>
                </div>
                <button
                  onClick={() => onRestore(snapshot)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-semibold"
                >
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
