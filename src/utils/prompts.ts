export const getPrompt = (stepKey: string, idea: string): string => {
  const prompts: Record<string, string> = {
    research: `Analyze this Indian market business idea: "${idea}"

Provide detailed market research with:

MARKET SIZE
- Total market in India (INR Crores)
- Growth rate and trends
- Key cities and regions

COMPETITION
- List 5-7 competitors
- Their positioning and funding
- Market gaps

CUSTOMERS
- Target segments with income levels
- Demographics and preferences
- Pain points

REGULATIONS
- Required licenses
- Compliance needs
- Setup costs

TRENDS
- Recent developments
- Opportunities
- Risks

Use bullet points and realistic numbers.`,

    executive: `Create executive summary for Indian market: "${idea}"

OVERVIEW
- Value proposition
- Problem solved
- Target customers
- Differentiation

OPPORTUNITY
- Market size (TAM/SAM/SOM)
- Growth potential
- Target cities

MODEL
- Revenue streams
- Pricing strategy
- Key partnerships

METRICS
Show Year 1, 2, 3 targets for customers, revenue, cities, team.`,

    revenue: `Design revenue model for: "${idea}"

STREAMS
- Primary and secondary revenue
- Pricing in INR
- Rationale

PRICING
Create table with tiers, prices, features, target customers.

ECONOMICS
- AOV, CAC, LTV in INR
- LTV:CAC ratio
- Margins

PROJECTIONS
Monthly targets for 12 months.`,

    implementation: `Create 18-month plan for: "${idea}"

PHASE 1 (M1-3): Foundation
- MVP features
- Team and salaries
- Tech stack
- Budget

PHASE 2 (M4-6): Launch
- Target city
- Customer goals
- Marketing
- Budget

PHASE 3 (M7-12): Growth
- Expansion
- Revenue targets
- Team growth
- Budget

PHASE 4 (M13-18): Scale
- Multi-city
- Profitability
- Funding
- Budget`,

    scaling: `Scaling strategy for: "${idea}"

CHANNELS
- Marketing approach
- Partnerships
- Growth tactics

EXPANSION
- City sequence
- Timeline
- Investment

OPERATIONS
- Team growth
- Tech infrastructure
- Automation

TARGETS
Quarterly goals for customers, revenue, team, cities.`,

    financial: `3-year projections for: "${idea}"

STARTUP COSTS
- Tech, legal, marketing
- Total in INR Lakhs

MONTHLY EXPENSES
Year 1, 2, 3 breakdown

REVENUE
Monthly Year 1, Quarterly Year 2-3

METRICS
- Burn rate
- Runway
- Break-even
- EBITDA

FUNDING
- Seed and Series A
- Use of funds
- Dilution`,

    risks: `Risk assessment for: "${idea}"

For each category, list 3-4 risks with Impact, Probability, Mitigation, Contingency:

MARKET RISKS
Competition, adoption, CAC

FINANCIAL RISKS
Funding, cash flow, burn

OPERATIONAL RISKS
Hiring, tech, supply chain

REGULATORY RISKS
Policy, compliance, privacy

COMPETITIVE RISKS
Incumbents, entrants, consolidation`
  };

  return prompts[stepKey] || prompts.research;
};
