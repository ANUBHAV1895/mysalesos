export type LeadStatus = "hot" | "warm" | "cold";
export type ActionType = "call" | "whatsapp" | "wait" | "email";

export interface Lead {
  id: string;
  name: string;
  company: string;
  source: string;
  status: LeadStatus;
  healthScore: number;
  lastInteraction: string;
  aiReason: string;
  nextAction: ActionType;
  nextActionLabel: string;
  dealValue: number;
  completed: boolean;
  stage: string;
  objections: string[];
  sentiment: "positive" | "neutral" | "negative";
  interactions: Interaction[];
}

export interface Interaction {
  type: "call" | "whatsapp" | "email" | "meeting" | "note";
  date: string;
  summary: string;
}

export interface DailyGoal {
  label: string;
  current: number;
  target: number;
  icon: string;
}

export const leads: Lead[] = [
  {
    id: "1", name: "Priya Sharma", company: "TechVista Solutions", source: "Website",
    status: "hot", healthScore: 92, lastInteraction: "2 hours ago",
    aiReason: "Visited pricing page twice today", nextAction: "call", nextActionLabel: "Call now — high intent detected",
    dealValue: 48000, completed: false, stage: "Negotiation",
    objections: ["Budget approval pending", "Comparing with competitor"],
    sentiment: "positive",
    interactions: [
      { type: "call", date: "Today, 10:30 AM", summary: "Discussed enterprise pricing. Interested in annual plan." },
      { type: "whatsapp", date: "Yesterday, 4:15 PM", summary: "Shared case study PDF. She forwarded to CTO." },
      { type: "meeting", date: "3 days ago", summary: "Demo call — asked detailed questions about API integrations." },
    ]
  },
  {
    id: "2", name: "Rahul Mehta", company: "GrowthBox Inc", source: "Instagram",
    status: "hot", healthScore: 87, lastInteraction: "4 hours ago",
    aiReason: "Trial expires tomorrow", nextAction: "call", nextActionLabel: "Urgent: Trial expiring — close today",
    dealValue: 32000, completed: false, stage: "Trial",
    objections: ["Needs team onboarding support"],
    sentiment: "positive",
    interactions: [
      { type: "email", date: "Today, 9:00 AM", summary: "Sent trial extension offer with 15% discount." },
      { type: "call", date: "Yesterday, 2:30 PM", summary: "Positive call. Team is using product daily." },
    ]
  },
  {
    id: "3", name: "Anita Desai", company: "CloudNine Analytics", source: "Referral",
    status: "warm", healthScore: 68, lastInteraction: "1 day ago",
    aiReason: "No follow-up for 3 days", nextAction: "whatsapp", nextActionLabel: "Send follow-up message",
    dealValue: 25000, completed: false, stage: "Proposal Sent",
    objections: ["Implementation timeline concerns"],
    sentiment: "neutral",
    interactions: [
      { type: "whatsapp", date: "3 days ago", summary: "Acknowledged proposal. Said she'll review this week." },
      { type: "meeting", date: "1 week ago", summary: "Presented proposal deck. Positive reception." },
    ]
  },
  {
    id: "4", name: "Vikram Patel", company: "FinEdge Capital", source: "LinkedIn",
    status: "warm", healthScore: 61, lastInteraction: "2 days ago",
    aiReason: "Opened proposal email 4 times", nextAction: "call", nextActionLabel: "Follow up on proposal — high engagement",
    dealValue: 65000, completed: false, stage: "Proposal Sent",
    objections: ["Legal review in progress"],
    sentiment: "neutral",
    interactions: [
      { type: "email", date: "2 days ago", summary: "Sent revised proposal with custom SLA terms." },
      { type: "call", date: "4 days ago", summary: "Discussed compliance requirements." },
    ]
  },
  {
    id: "5", name: "Sneha Kulkarni", company: "EduSpark", source: "Website",
    status: "warm", healthScore: 55, lastInteraction: "3 days ago",
    aiReason: "Stage stagnant for 5 days", nextAction: "whatsapp", nextActionLabel: "Re-engage with value proposition",
    dealValue: 18000, completed: true, stage: "Discovery",
    objections: ["Not sure about ROI"],
    sentiment: "neutral",
    interactions: [
      { type: "whatsapp", date: "3 days ago", summary: "Sent ROI calculator link." },
    ]
  },
  {
    id: "6", name: "Arjun Nair", company: "LogiPrime", source: "Manual",
    status: "cold", healthScore: 35, lastInteraction: "5 days ago",
    aiReason: "Re-engagement window — cold leads convert 40% for you", nextAction: "whatsapp", nextActionLabel: "Try re-engagement message",
    dealValue: 22000, completed: false, stage: "Initial Contact",
    objections: ["Budget constraints Q1"],
    sentiment: "negative",
    interactions: [
      { type: "call", date: "5 days ago", summary: "Couldn't connect. Left voicemail." },
    ]
  },
  {
    id: "7", name: "Meera Joshi", company: "DesignHive", source: "Instagram",
    status: "hot", healthScore: 90, lastInteraction: "1 hour ago",
    aiReason: "Requested contract draft", nextAction: "email", nextActionLabel: "Send contract — ready to close",
    dealValue: 42000, completed: false, stage: "Closing",
    objections: [],
    sentiment: "positive",
    interactions: [
      { type: "call", date: "1 hour ago", summary: "Final negotiation done. Agreed on pricing." },
      { type: "meeting", date: "2 days ago", summary: "Leadership buy-in confirmed." },
    ]
  },
  {
    id: "8", name: "Karthik Iyer", company: "DataPulse", source: "Website",
    status: "warm", healthScore: 58, lastInteraction: "2 days ago",
    aiReason: "Competitor mentioned in last call", nextAction: "call", nextActionLabel: "Address competitor concerns",
    dealValue: 35000, completed: false, stage: "Evaluation",
    objections: ["Evaluating 2 other vendors"],
    sentiment: "neutral",
    interactions: [
      { type: "call", date: "2 days ago", summary: "Mentioned competitor has lower pricing. Needs differentiation." },
    ]
  },
];

export const dailyGoals: DailyGoal[] = [
  { label: "Follow-ups", current: 8, target: 12, icon: "📞" },
  { label: "Calls completed", current: 5, target: 10, icon: "🎯" },
  { label: "Leads progressed", current: 3, target: 5, icon: "📈" },
  { label: "WhatsApp sent", current: 6, target: 8, icon: "💬" },
];

export const weeklyStats = {
  conversionRate: 28,
  conversionTrend: +4,
  followUpConsistency: 92,
  followUpTrend: +8,
  avgResponseTime: "2.4h",
  responseTrend: -15,
  leadsProgressed: 18,
  progressTrend: +12,
  totalCalls: 47,
  totalWhatsApp: 34,
  totalEmails: 21,
  pipelineValue: 287000,
  closedThisWeek: 85000,
  lostOpportunities: [
    { name: "Rohan Das", value: 15000, reason: "No follow-up for 7 days" },
    { name: "Kavitha R.", value: 8000, reason: "Competitor closed first" },
    { name: "Suresh P.", value: 12000, reason: "Trial expired without contact" },
  ],
};

export const aiInsights = [
  { text: "You convert 34% higher when following up within 24h", type: "success" as const },
  { text: "Best call pickup rate: 4–6 PM", type: "info" as const },
  { text: "Cold lead re-engagement works 40% of the time for you", type: "info" as const },
  { text: "Your WhatsApp response rate is 3x higher than email", type: "success" as const },
];

export const earnings = {
  projected: 28500,
  base: 15000,
  consistencyBonus: 5500,
  slaBonus: 3000,
  performanceBonus: 5000,
  nextTierGap: 2000,
  nextTierName: "Gold Performer",
  upliftMessage: "12 timely follow-ups yesterday → +₹800 projected uplift",
  lossMessage: "3 missed follow-ups → ₹1,800 lost potential",
};
