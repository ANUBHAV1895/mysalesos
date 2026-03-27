import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Trophy, ArrowUpRight } from "lucide-react";
import { earnings } from "@/lib/mockData";

export default function EarningsPanel() {
  const tierProgress = ((earnings.projected) / (earnings.projected + earnings.nextTierGap)) * 100;

  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">💰 Earnings</h3>

      {/* Projected Total */}
      <div className="text-center mb-4">
        <p className="text-3xl font-bold text-gradient-primary font-mono">₹{earnings.projected.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground mt-1">Projected this month</p>
      </div>

      {/* Next Tier */}
      <div className="mb-4 p-3 rounded-lg bg-accent/5 border border-accent/15">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">{earnings.nextTierName}</span>
          </div>
          <span className="text-xs font-mono text-accent">₹{earnings.nextTierGap.toLocaleString()} away</span>
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
        <div className="flex items-start gap-2 p-2 rounded-lg bg-primary/5">
          <TrendingUp className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-primary">{earnings.upliftMessage}</p>
        </div>
        <div className="flex items-start gap-2 p-2 rounded-lg bg-destructive/5">
          <TrendingDown className="w-3.5 h-3.5 text-destructive mt-0.5 flex-shrink-0" />
          <p className="text-xs text-destructive">{earnings.lossMessage}</p>
        </div>
      </div>
    </div>
  );
}
