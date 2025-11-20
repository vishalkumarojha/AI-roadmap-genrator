import { useState, useEffect } from 'react';
import { RoadmapData, RoadmapSnapshot, ChatMessage, ChatResponse, ResearchMode } from '../types';
import { ROADMAP_STEPS } from '../constants/steps';
import { callClaudeAPI } from '../services/api';
import { getPrompt } from '../utils/prompts';

export const useRoadmapGenerator = () => {
  const [businessIdea, setBusinessIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [roadmapHistory, setRoadmapHistory] = useState<RoadmapSnapshot[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [researchMode, setResearchMode] = useState<ResearchMode>('deep');
  const [chatResponse, setChatResponse] = useState<ChatResponse | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('researchMode');
    if (saved) setResearchMode(saved as ResearchMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('researchMode', researchMode);
  }, [researchMode]);

  const saveToHistory = (currentRoadmap: RoadmapData) => {
    if (!currentRoadmap) return;
    const snapshot: RoadmapSnapshot = {
      timestamp: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(currentRoadmap)),
      idea: businessIdea
    };
    setRoadmapHistory(prev => [snapshot, ...prev].slice(0, 10));
  };

  const restoreFromHistory = (snapshot: RoadmapSnapshot) => {
    setRoadmap(snapshot.data);
    setShowHistory(false);
  };

  const generateRoadmap = async () => {
    if (!businessIdea.trim()) return;

    setLoading(true);
    setRoadmap(null);
    setChatMessages([]);
    setChatResponse(null);

    const generatedRoadmap: RoadmapData = {};

    try {
      for (let i = 0; i < ROADMAP_STEPS.length; i++) {
        const step = ROADMAP_STEPS[i];
        setCurrentStep(step.label);

        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        const prompt = getPrompt(step.key, businessIdea);
        const useWebSearch = step.key === 'research' && researchMode === 'deep';
        const result = await callClaudeAPI(prompt, useWebSearch);

        generatedRoadmap[step.key] = result;
        setRoadmap({ ...generatedRoadmap });
      }

      saveToHistory(generatedRoadmap);
    } catch (error) {
      console.error("Generation error:", error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again in a moment.`);
    } finally {
      setLoading(false);
      setCurrentStep('');
    }
  };

  const handleChat = async () => {
    if (!userMessage.trim() || !roadmap) return;

    const newMessage: ChatMessage = { role: 'user', content: userMessage };
    setChatMessages(prev => [...prev, newMessage]);
    setUserMessage('');
    setChatLoading(true);
    setChatResponse(null);

    try {
      const lower = userMessage.toLowerCase();
      const targetStep = ROADMAP_STEPS.find(s => lower.includes(s.key))?.key || 'executive';

      const context = `Improve this section for: "${businessIdea}"

Current content: ${roadmap[targetStep]?.html?.substring(0, 800)}

User request: ${userMessage}

Provide improved version with bullet points, tables, and realistic INR numbers.`;

      const result = await callClaudeAPI(context, false);

      setChatResponse({
        step: targetStep,
        content: result,
        originalContent: roadmap[targetStep]
      });

      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: `Created improved ${targetStep} section. Review and apply or keep original.`
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error occurred. Please try again.'
      }]);
    } finally {
      setChatLoading(false);
    }
  };

  const applyChatResponse = () => {
    if (!chatResponse || !roadmap) return;

    saveToHistory(roadmap);

    const updatedRoadmap = { ...roadmap };
    updatedRoadmap[chatResponse.step] = chatResponse.content;
    setRoadmap(updatedRoadmap);
    setChatResponse(null);

    setChatMessages(prev => [...prev, {
      role: 'assistant',
      content: `Applied changes to ${chatResponse.step}. Previous saved to history.`
    }]);
  };

  const rejectChatResponse = () => {
    setChatResponse(null);
    setChatMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Kept original. Ask for different changes if needed.'
    }]);
  };

  const downloadRoadmap = () => {
    if (!roadmap) return;

    const stripHtml = (html: string) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    };

    let content = `BUSINESS ROADMAP\nIdea: ${businessIdea}\nMode: ${researchMode}\nDate: ${new Date().toLocaleDateString('en-IN')}\n\n`;

    ROADMAP_STEPS.forEach(step => {
      if (roadmap[step.key]) {
        content += `\n${'='.repeat(80)}\n${step.label.toUpperCase()}\n${'='.repeat(80)}\n`;
        content += stripHtml(roadmap[step.key].html) + '\n';
      }
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadmap-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
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
  };
};
