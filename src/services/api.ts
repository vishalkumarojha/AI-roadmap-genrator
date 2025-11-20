import { processContent } from '../utils/contentProcessor';
import { RoadmapContent } from '../types';

const API_URL = "https://api.anthropic.com/v1/messages";
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export const callClaudeAPI = async (
  prompt: string,
  useWebSearch = false,
  retryCount = 0
): Promise<RoadmapContent> => {
  try {
    const requestBody: {
      model: string;
      max_tokens: number;
      messages: Array<{ role: string; content: string | unknown[] }>;
      tools?: Array<{ type: string; name: string }>;
    } = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }]
    };

    if (useWebSearch) {
      requestBody.tools = [{
        type: "web_search_20250305",
        name: "web_search"
      }];
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      if ((response.status === 529 || response.status === 429) && retryCount < 3) {
        const waitTime = (retryCount + 1) * 5000;
        console.log(`Rate limited (${response.status}), waiting ${waitTime}ms before retry ${retryCount + 1}/3...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return callClaudeAPI(prompt, useWebSearch, retryCount + 1);
      }
      throw new Error(`API error ${response.status}: ${response.status === 429 ? 'Rate limit exceeded. Please wait a moment and try again.' : 'Service temporarily unavailable.'}`);
    }

    const data = await response.json();

    if (data.stop_reason === 'tool_use') {
      const textBlocks = data.content.filter((block: { type: string }) => block.type === 'text');
      if (textBlocks.length > 0) {
        const combinedText = textBlocks.map((block: { text: string }) => block.text).join('\n');
        if (combinedText.trim().length > 100) {
          return processContent(combinedText);
        }
      }

      const toolUseBlock = data.content.find((block: { type: string }) => block.type === 'tool_use');
      if (toolUseBlock) {
        const followUpResponse = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY || "",
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4000,
            messages: [
              { role: "user", content: prompt },
              { role: "assistant", content: data.content },
              {
                role: "user",
                content: [{
                  type: "tool_result",
                  tool_use_id: toolUseBlock.id,
                  content: "Search completed. Provide detailed analysis."
                }]
              }
            ],
            tools: requestBody.tools
          })
        });

        if (!followUpResponse.ok) {
          throw new Error(`Follow-up error: ${followUpResponse.status}`);
        }

        const followUpData = await followUpResponse.json();
        const followUpText = followUpData.content
          .filter((block: { type: string }) => block.type === 'text')
          .map((block: { text: string }) => block.text)
          .join('\n');

        if (followUpText.trim().length > 0) {
          return processContent(followUpText);
        }
      }
    }

    const textContent = data.content
      .filter((block: { type: string }) => block.type === 'text')
      .map((block: { text: string }) => block.text)
      .join('\n');

    if (textContent.trim().length === 0) {
      throw new Error("Empty response");
    }

    return processContent(textContent);

  } catch (error) {
    console.error("API error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      html: `<div class="bg-red-50 border-2 border-red-300 rounded-lg p-4">
        <p class="text-red-800 font-semibold mb-2">Error: ${errorMessage}</p>
        <p class="text-gray-600 text-sm">Please try again.</p>
      </div>`,
      data: null
    };
  }
};
