import { motion } from "framer-motion";
import { Brain, TrendingUp, Zap } from "lucide-react";
import { aiInsights } from "@/lib/mockData";

const iconMap: Record<string, React.ElementType> = {
  success: TrendingUp,
  info: Zap,
};

const colorMap: Record<string, string> = {
  success: "text-success bg-success/10 border-success/20",
  info: "text-primary bg-primary/10 border-primary/20",
};

export default function AIInsightsPanel() {
  return (
    <div className="rounded-xl border border-border/40 bg-card p-5 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
        <span className="text-[10px] font-mono text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">SMART</span>
      </div>

      <div className="space-y-2.5">
        {aiInsights.map((insight, i) => {
          const Icon = iconMap[insight.type] || Zap;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className={`flex items-start gap-2.5 p-3 rounded-lg border ${colorMap[insight.type]}`}
            >
              <Icon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <p className="text-xs leading-relaxed">{insight.text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
