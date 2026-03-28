import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Trophy } from "lucide-react";
import { earnings } from "@/lib/mockData";

export default function EarningsPanel() {
  const tierProgress = ((earnings.projected) / (earnings.projected + earnings.nextTierGap)) * 100;

  return (
    <div className="rounded-xl border border-border/40 bg-card p-5 shadow-card">
      <h3 className="text-sm font-semibold text-foreground mb-4">💰 Earnings</h3>

      {/* Projected Total */}
      <div className="text-center mb-4">
        <p className="text-3xl font-bold text-gradient-primary font-mono glow-number">₹{earnings.projected.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground mt-1">Projected this month</p>
      </div>

      {/* Next Tier */}
      <div className="mb-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">{earnings.nextTierName}</span>
          </div>
          <span className="text-xs font-mono text-accent glow-accent">₹{earnings.nextTierGap.toLocaleString()} away</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${tierProgress}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full rounded-full bg-gradient-accent"
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2 mb-4">
        {[
          { label: "Base commission", value: earnings.base },
          { label: "Consistency bonus", value: earnings.consistencyBonus },
          { label: "SLA bonus", value: earnings.slaBonus },
          { label: "Performance bonus", value: earnings.performanceBonus },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-mono text-foreground">₹{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="space-y-2">
        <div className="flex items-start gap-2 p-2 rounded-lg bg-success/10 border border-success/20">
          <TrendingUp className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
          <p className="text-xs text-success">{earnings.upliftMessage}</p>
        </div>
        <div className="flex items-start gap-2 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
          <TrendingDown className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
          <p className="text-xs text-destructive">{earnings.lossMessage}</p>
        </div>
      </div>
    </div>
  );
}
