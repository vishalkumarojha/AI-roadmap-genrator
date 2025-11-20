# AI Business Roadmap Generator

An intelligent business planning tool that generates comprehensive roadmaps for Indian market business ideas using AI.

## Features

- **Market Research**: Detailed analysis of market size, competition, and trends
- **Executive Summary**: Business overview and opportunity assessment
- **Revenue Model**: Pricing strategy and financial projections
- **Implementation Plan**: 18-month phased execution roadmap
- **Scaling Strategy**: Growth tactics and expansion plans
- **Financial Projections**: 3-year financial forecasts
- **Risk Assessment**: Comprehensive risk analysis and mitigation strategies
- **Interactive Chat**: Refine any section with AI assistance
- **Version History**: Track and restore previous versions
- **Export**: Download roadmaps as text files

## Tech Stack

- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons
- Recharts for data visualization
- Anthropic Claude API for AI generation

## Setup

1. Install dependencies:
```bash
npm install --include=dev
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Anthropic API key to `.env`:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

4. Start development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── InputSection.tsx
│   ├── ProgressIndicator.tsx
│   ├── RoadmapSection.tsx
│   ├── ChatPanel.tsx
│   ├── HistoryModal.tsx
│   └── EmptyState.tsx
├── hooks/              # Custom React hooks
│   └── useRoadmapGenerator.ts
├── services/           # API services
│   └── api.ts
├── utils/              # Utility functions
│   ├── contentProcessor.ts
│   └── prompts.ts
├── constants/          # App constants
│   └── steps.ts
├── types/              # TypeScript types
│   └── index.ts
└── App.tsx             # Main app component
```

## Usage

1. Enter your business idea in the textarea
2. Choose research mode (Fast or Deep)
3. Click "Generate Roadmap"
4. Review the generated sections
5. Use the chat panel to refine specific sections
6. Download your roadmap or save versions for later

## Research Modes

- **Fast**: Quick AI-based analysis
- **Deep**: Enhanced with real-time web search for current market data

## License

MIT
