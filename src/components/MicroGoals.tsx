import { motion } from "framer-motion";
import type { DailyGoal } from "@/lib/mockData";

export default function MicroGoals({ goals, streak }: { goals: DailyGoal[]; streak: number }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">🎯 Daily Goals</h3>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-semibold">
          🔥 {streak}-day streak
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal, i) => {
          const pct = Math.min((goal.current / goal.target) * 100, 100);
          const isComplete = goal.current >= goal.target;
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-foreground">
                  {goal.icon} {goal.label}
                </span>
                <span className={`text-sm font-mono font-semibold ${isComplete ? "text-primary" : "text-foreground"}`}>
                  {goal.current}/{goal.target}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`h-full rounded-full ${isComplete ? "bg-gradient-primary" : "bg-primary/60"}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
        <p className="text-xs text-primary font-medium">
          ✅ Follow-up consistency: 92% this week — Top 10% performer!
        </p>
      </div>
    </div>
  );
}
