import { useState } from "react";
import { motion } from "framer-motion";
import LeadCard from "@/components/LeadCard";
import MicroGoals from "@/components/MicroGoals";
import EarningsPanel from "@/components/EarningsPanel";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import { leads as initialLeads, dailyGoals } from "@/lib/mockData";

export default function MyDayPage() {
  const [leads, setLeads] = useState(initialLeads);

  const toggleLead = (id: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l)));
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.healthScore - a.healthScore;
  });

  return (
    <div>
      {/* Hero Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Good morning! ☀️</h1>
        <p className="text-sm text-muted-foreground">
          You have <span className="text-primary font-semibold">{leads.filter((l) => !l.completed).length} actions</span> today.
          Let's make it count.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column — Focus List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              🔥 Smart Focus List
              <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-muted">AI PRIORITIZED</span>
            </h2>
            <span className="text-xs text-muted-foreground">{leads.filter((l) => l.completed).length}/{leads.length} done</span>
          </div>
          {sortedLeads.map((lead, i) => (
            <LeadCard key={lead.id} lead={lead} index={i} onToggle={toggleLead} />
          ))}
        </div>

        {/* Sidebar — Goals, Earnings, Insights */}
        <div className="space-y-5">
          <MicroGoals goals={dailyGoals} streak={7} />
          <EarningsPanel />
          <AIInsightsPanel />
        </div>
      </div>
    </div>
  );
}
