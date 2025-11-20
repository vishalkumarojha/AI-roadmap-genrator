import { useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { ChatMessage, ChatResponse } from '../types';

interface ChatPanelProps {
  chatMessages: ChatMessage[];
  userMessage: string;
  setUserMessage: (value: string) => void;
  chatLoading: boolean;
  chatResponse: ChatResponse | null;
  onSendMessage: () => void;
  onApplyResponse: () => void;
  onRejectResponse: () => void;
}

export default function ChatPanel({
  chatMessages,
  userMessage,
  setUserMessage,
  chatLoading,
  chatResponse,
  onSendMessage,
  onApplyResponse,
  onRejectResponse
}: ChatPanelProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border sticky top-6 flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-t-2xl">
        <div className="flex items-center">
          <MessageSquare className="text-white mr-3" size={28} />
          <h3 className="text-xl font-bold text-white">Refine Roadmap</h3>
        </div>
        <p className="text-purple-100 text-sm mt-2">Ask for modifications</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatResponse && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-3">
              <strong className="text-yellow-900">New Version Ready</strong>
              <div className="flex gap-2">
                <button
                  onClick={onApplyResponse}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Apply
                </button>
                <button
                  onClick={onRejectResponse}
                  className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  Keep Original
                </button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: chatResponse.content.html }}
              />
            </div>
          </div>
        )}

        {chatMessages.length === 0 && !chatResponse && (
          <div className="text-center text-gray-400 mt-8">
            <MessageSquare className="mx-auto mb-3 opacity-30" size={48} />
            <p className="text-sm">Ask to modify sections</p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setUserMessage("research: add more competitor details")}
                className="block w-full text-left text-xs bg-gray-50 hover:bg-gray-100 p-3 rounded-lg"
              >
                "Add competitor details"
              </button>
              <button
                onClick={() => setUserMessage("revenue: break down CAC by channel")}
                className="block w-full text-left text-xs bg-gray-50 hover:bg-gray-100 p-3 rounded-lg"
              >
                "CAC breakdown"
              </button>
            </div>
          </div>
        )}

        {chatMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3 ${
              msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="text-sm">{msg.content}</div>
            </div>
          </div>
        ))}

        {chatLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-5 py-3">
              <div className="animate-spin text-indigo-600 h-5 w-5 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Ask for changes..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            disabled={chatLoading}
          />
          <button
            onClick={onSendMessage}
            disabled={chatLoading || !userMessage.trim()}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:bg-gray-300"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
