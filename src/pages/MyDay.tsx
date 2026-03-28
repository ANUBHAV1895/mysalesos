import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutList, Columns3, Calendar, Sparkles, TrendingUp, Zap } from "lucide-react";
import LeadCard from "@/components/LeadCard";
import MicroGoals from "@/components/MicroGoals";
import EarningsPanel from "@/components/EarningsPanel";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import KanbanBoard from "@/components/KanbanBoard";
import ScrumBoard from "@/components/ScrumBoard";
import { leads as initialLeads, dailyGoals } from "@/lib/mockData";
import type { LeadStatus } from "@/lib/mockData";

type ViewMode = "list" | "kanban" | "scrum";

const viewOptions: { key: ViewMode; label: string; icon: React.ElementType }[] = [
  { key: "list", label: "Focus List", icon: LayoutList },
  { key: "kanban", label: "Pipeline", icon: Columns3 },
  { key: "scrum", label: "Tasks", icon: Calendar },
];

export default function MyDayPage() {
  const [leads, setLeads] = useState(initialLeads);
  const [view, setView] = useState<ViewMode>("list");

  const toggleLead = (id: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, completed: !l.completed } : l)));
  };

  const changeStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return b.healthScore - a.healthScore;
  });

  // Pipeline stats
  const totalPipeline = leads.reduce((s, l) => s + l.dealValue, 0);
  const hotLeads = leads.filter((l) => l.status === "hot").length;
  const activeLeads = leads.filter((l) => !l.completed).length;

  return (
    <div>
      {/* Hero Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-1">Good morning! ☀️</h1>
        <p className="text-sm text-muted-foreground">
          You have <span className="text-primary font-semibold">{activeLeads} actions</span> today.
          Let's make it count.
        </p>
      </motion.div>

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <div className="rounded-xl border border-border/40 bg-card/80 p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
            <TrendingUp className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-lg font-bold font-mono text-foreground glow-number">₹{totalPipeline.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground">Pipeline Value</p>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/80 p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-hot/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-hot" />
          </div>
          <div>
            <p className="text-lg font-bold font-mono text-foreground">{hotLeads}</p>
            <p className="text-[10px] text-muted-foreground">Hot Leads</p>
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-card/80 p-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-success/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-lg font-bold font-mono text-foreground">28%</p>
            <p className="text-[10px] text-muted-foreground">Conversion</p>
          </div>
        </div>
      </motion.div>

      {/* View Toggle */}
      <div className="flex items-center gap-1 mb-5 p-1 rounded-xl bg-card/60 border border-border/40 w-fit">
        {viewOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setView(opt.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
              view === opt.key
                ? "bg-gradient-primary text-primary-foreground shadow-glow-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <opt.icon className="w-3.5 h-3.5" />
            {opt.label}
          </button>
        ))}
      </div>

      {/* View Content */}
      {view === "kanban" ? (
        <KanbanBoard />
      ) : view === "scrum" ? (
        <ScrumBoard />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column — Focus List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                🔥 Smart Focus List
                <span className="text-[10px] font-mono text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">AI PRIORITIZED</span>
              </h2>
              <span className="text-xs text-muted-foreground">{leads.filter((l) => l.completed).length}/{leads.length} done</span>
            </div>
            {sortedLeads.map((lead, i) => (
              <LeadCard key={lead.id} lead={lead} index={i} onToggle={toggleLead} onStatusChange={changeStatus} />
            ))}
          </div>

          {/* Sidebar — Goals, Earnings, Insights */}
          <div className="space-y-5">
            <MicroGoals goals={dailyGoals} streak={7} />
            <EarningsPanel />
            <AIInsightsPanel />
          </div>
        </div>
      )}
    </div>
  );
}
