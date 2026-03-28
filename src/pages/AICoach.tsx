import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Brain, Trophy, AlertTriangle, Lightbulb, ArrowUpRight, BarChart3 } from "lucide-react";
import { weeklyStats } from "@/lib/mockData";

function StatCard({ label, value, trend, suffix }: { label: string; value: string | number; trend: number; suffix?: string }) {
  const isPositive = trend >= 0;
  return (
    <div className="rounded-xl border border-border/40 bg-card p-4 shadow-card">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold font-mono text-foreground glow-number">{value}{suffix}</span>
        <span className={`text-xs font-medium flex items-center gap-0.5 mb-1 ${isPositive ? "text-success" : "text-destructive"}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? "+" : ""}{trend}%
        </span>
      </div>
    </div>
  );
}

export default function AICoachPage() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">AI Coach</h1>
          <span className="text-[10px] font-mono text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">WEEKLY REFLECTION</span>
        </div>
        <p className="text-sm text-muted-foreground">Your performance insights and coaching tips for this week.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <StatCard label="Conversion Rate" value={weeklyStats.conversionRate} trend={weeklyStats.conversionTrend} suffix="%" />
        <StatCard label="Follow-up Consistency" value={weeklyStats.followUpConsistency} trend={weeklyStats.followUpTrend} suffix="%" />
        <StatCard label="Avg Response Time" value={weeklyStats.avgResponseTime} trend={weeklyStats.responseTrend} />
        <StatCard label="Leads Progressed" value={weeklyStats.leadsProgressed} trend={weeklyStats.progressTrend} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Activity Summary */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/40 bg-card p-5 shadow-card"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Weekly Activity
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Calls", value: weeklyStats.totalCalls, color: "text-primary glow-number" },
                { label: "WhatsApp Sent", value: weeklyStats.totalWhatsApp, color: "text-success glow-success" },
                { label: "Emails Sent", value: weeklyStats.totalEmails, color: "text-accent glow-accent" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-lg bg-muted/30 border border-border/30">
                  <p className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center">
                <p className="text-lg font-bold font-mono text-primary glow-number">₹{weeklyStats.pipelineValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Pipeline Value</p>
              </div>
              <div className="p-3 rounded-lg bg-success/10 border border-success/20 text-center">
                <p className="text-lg font-bold font-mono text-success glow-success">₹{weeklyStats.closedThisWeek.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Closed This Week</p>
              </div>
            </div>
          </motion.div>

          {/* Behaviour Insights */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-xl border border-border/40 bg-card p-5 shadow-card"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              Behaviour Insights
            </h3>
            <div className="space-y-3">
              {[
                { text: "You close 30% more deals with <24h follow-ups", icon: TrendingUp, color: "text-success bg-success/10 border-success/20" },
                { text: "Call pickup rate is highest between 4–6 PM", icon: ArrowUpRight, color: "text-primary bg-primary/10 border-primary/20" },
                { text: "Your WhatsApp response rate: 78% (team avg: 52%)", icon: TrendingUp, color: "text-success bg-success/10 border-success/20" },
                { text: "You progress leads 2x faster when you call within 2h of a website visit", icon: ArrowUpRight, color: "text-primary bg-primary/10 border-primary/20" },
              ].map((insight, i) => (
                <div key={i} className={`flex items-start gap-2.5 p-3 rounded-lg border ${insight.color}`}>
                  <insight.icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <p className="text-xs leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lost Opportunities */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl border border-destructive/20 bg-destructive/5 p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Lost Opportunities
            </h3>
            <div className="space-y-3">
              {weeklyStats.lostOpportunities.map((opp, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/40">
                  <div>
                    <p className="text-sm font-medium text-foreground">{opp.name}</p>
                    <p className="text-xs text-muted-foreground">{opp.reason}</p>
                  </div>
                  <span className="text-sm font-mono font-semibold text-destructive">-₹{opp.value.toLocaleString()}</span>
                </div>
              ))}
              <p className="text-xs text-destructive font-medium text-center">
                Total missed: ₹{weeklyStats.lostOpportunities.reduce((a, b) => a + b.value, 0).toLocaleString()}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Earnings Projection */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl border border-border/40 bg-card p-5 shadow-card"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" />
              Earnings Projection
            </h3>
            <div className="text-center mb-4">
              <p className="text-xs text-muted-foreground mb-1">At current pace</p>
              <p className="text-3xl font-bold font-mono text-foreground glow-number">₹25,000</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-center mb-3">
              <p className="text-xs text-primary">Improve follow-ups →</p>
              <p className="text-xl font-bold font-mono text-primary glow-number mt-1">₹32,000</p>
              <p className="text-[10px] text-primary/70">potential this month</p>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full rounded-full bg-gradient-primary"
              />
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-1">78% of monthly target</p>
          </motion.div>

          {/* Coaching Tips */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="rounded-xl border border-accent/20 bg-accent/5 p-5"
          >
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              Coaching Tips
            </h3>
            <div className="space-y-3">
              {[
                "Block 4–6 PM for outbound calls — your pickup rate is 2x higher",
                "Send follow-ups within 2 hours of a website visit for 3x conversion",
                "Use WhatsApp over email for warm leads — your response rate is 78% vs 31%",
                "Re-engage cold leads on Tuesdays — your best re-activation day",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-accent">
                  <span className="font-bold mt-px">→</span>
                  <p className="leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Features */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="rounded-xl border border-border/40 bg-card p-5 shadow-card"
          >
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              🤖 AI-Powered Features
            </h3>
            <div className="space-y-2">
              {[
                "Lead prioritization engine",
                "Next best action recommendations",
                "WhatsApp message generation",
                "Interaction summarization",
                "Auto-status suggestions",
                "Behaviour pattern detection",
                "Earnings forecasting",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
