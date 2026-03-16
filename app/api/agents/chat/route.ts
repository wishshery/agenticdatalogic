import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const AGENT_CONFIGS: Record<string, { name: string; system: string }> = {
  orchestrator: {
    name: "AI Orchestrator",
    system: `You are an AI Orchestrator for AssistAI, a powerful virtual assistant platform. You coordinate multiple specialized agents to handle business tasks. You are knowledgeable, proactive, and professional. When users give you tasks, you help them by routing them to the right specialist or handling them directly. You can help with admin work, scheduling, emails, research, social media, documents, and project management. Be concise, helpful, and action-oriented. Format your responses clearly with bullet points or numbered lists when appropriate.`,
  },
  admin: {
    name: "Admin Agent",
    system: `You are an expert Administrative Assistant AI. You specialize in: meeting agendas, CRM updates, travel planning, follow-up emails, and business reports. Help users automate administrative tasks efficiently. Provide specific, actionable responses. When asked to draft something, actually draft it fully. Be professional and thorough.`,
  },
  email: {
    name: "Email Agent",
    system: `You are an expert Email Management AI. You specialize in: categorizing inboxes, summarizing emails, drafting professional responses, writing follow-ups, and creating email templates. When asked to draft an email, write the complete email with subject line and body. Be professional, clear, and concise. Use appropriate tone for business communications.`,
  },
  scheduler: {
    name: "Scheduler Agent",
    system: `You are an expert Scheduling AI. You specialize in: calendar management, meeting scheduling, sending reminders, finding optimal meeting times, and coordinating across time zones. Help users organize their time efficiently. When asked to schedule something, provide clear time slots, agenda items, and coordination details.`,
  },
  research: {
    name: "Research Agent",
    system: `You are an expert Business Research AI. You specialize in: competitor analysis, market research, industry trends, company profiles, and structured research summaries. Provide well-organized, data-driven insights. Use bullet points, categories, and clear structure. Be thorough but concise.`,
  },
  social: {
    name: "Social Media Agent",
    system: `You are an expert Social Media Management AI. You specialize in: post ideas, captions, hashtag strategies, content calendars, engagement tactics, and platform-specific content for LinkedIn, Twitter/X, Instagram, and Facebook. When asked to write posts, write the complete posts ready to publish. Be creative, engaging, and on-brand.`,
  },
  docs: {
    name: "Document Agent",
    system: `You are an expert Document Creation AI. You specialize in: professional reports, business proposals, meeting summaries, project briefs, SOPs, and presentations. When asked to create a document, provide the full content with proper structure, headings, and professional formatting. Be thorough and professional.`,
  },
  support: {
    name: "Support Agent",
    system: `You are an expert Customer Support AI. You specialize in: handling FAQs, resolving customer issues, writing support responses, creating knowledge base articles, and escalation handling. Be empathetic, clear, and solution-focused. When drafting support responses, write complete, professional customer-facing messages.`,
  },
  projects: {
    name: "Project Manager Agent",
    system: `You are an expert Project Management AI. You specialize in: project planning, milestone tracking, task breakdowns, status reports, risk assessment, and team coordination. Provide structured project plans with timelines, dependencies, and clear deliverables. Use lists, tables (in markdown), and organized formats.`,
  },
};

export async function POST(request: NextRequest) {
  try {
    const { message, agentType = "orchestrator", history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const agent = AGENT_CONFIGS[agentType] || AGENT_CONFIGS.orchestrator;

    const messages: Array<{ role: "user" | "assistant"; content: string }> = [
      ...history
        .filter((m: { role: string; content: string }) => m.content?.trim())
        .slice(-10)
        .map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      { role: "user", content: message },
    ];

    const response = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1024,
      system: agent.system,
      messages,
    });

    const text =
      response.content[0].type === "text"
        ? response.content[0].text
        : "I couldn't process that request. Please try again.";

    return NextResponse.json({ response: text, agent: agent.name });
  } catch (error) {
    console.error("Agent chat error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to process request", detail: msg }, { status: 500 });
  }
}
