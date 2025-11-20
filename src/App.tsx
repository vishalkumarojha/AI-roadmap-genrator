import { ROADMAP_STEPS } from './constants/steps';
import { useRoadmapGenerator } from './hooks/useRoadmapGenerator';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ProgressIndicator from './components/ProgressIndicator';
import RoadmapSection from './components/RoadmapSection';
import ChatPanel from './components/ChatPanel';
import HistoryModal from './components/HistoryModal';
import EmptyState from './components/EmptyState';

function App() {
  const {
    businessIdea,
    setBusinessIdea,
    loading,
    currentStep,
    roadmap,
    roadmapHistory,
    showHistory,
    setShowHistory,
    chatMessages,
    userMessage,
    setUserMessage,
    chatLoading,
    researchMode,
    setResearchMode,
    chatResponse,
    generateRoadmap,
    handleChat,
    applyChatResponse,
    rejectChatResponse,
    downloadRoadmap,
    restoreFromHistory
  } = useRoadmapGenerator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        <Header />

        <InputSection
          businessIdea={businessIdea}
          setBusinessIdea={setBusinessIdea}
          researchMode={researchMode}
          setResearchMode={setResearchMode}
          loading={loading}
          onGenerate={generateRoadmap}
          onDownload={downloadRoadmap}
          onShowHistory={() => setShowHistory(true)}
          hasRoadmap={!!roadmap}
          hasHistory={roadmapHistory.length > 0}
        />

        <HistoryModal
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          history={roadmapHistory}
          onRestore={restoreFromHistory}
        />

        {loading && (
          <ProgressIndicator
            steps={ROADMAP_STEPS}
            currentStep={currentStep}
            roadmap={roadmap}
          />
        )}

        {roadmap && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RoadmapSection steps={ROADMAP_STEPS} roadmap={roadmap} />
            </div>

            <div className="lg:col-span-1">
              <ChatPanel
                chatMessages={chatMessages}
                userMessage={userMessage}
                setUserMessage={setUserMessage}
                chatLoading={chatLoading}
                chatResponse={chatResponse}
                onSendMessage={handleChat}
                onApplyResponse={applyChatResponse}
                onRejectResponse={rejectChatResponse}
              />
            </div>
          </div>
        )}

        {!loading && !roadmap && <EmptyState />}
      </div>
    </div>
  );
}

export default App;
