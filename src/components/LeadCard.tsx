import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Phone, MessageCircle, Clock, Mail, ChevronRight, Flame, Zap } from "lucide-react";
import type { Lead } from "@/lib/mockData";

const statusColors: Record<string, string> = {
  hot: "bg-hot/15 text-hot border-hot/30",
  warm: "bg-warm/15 text-warm border-warm/30",
  cold: "bg-cold/15 text-cold border-cold/30",
};

const actionIcons: Record<string, React.ElementType> = {
  call: Phone,
  whatsapp: MessageCircle,
  wait: Clock,
  email: Mail,
};

export default function LeadCard({
  lead,
  index,
  onToggle,
}: {
  lead: Lead;
  index: number;
  onToggle: (id: string) => void;
}) {
  const ActionIcon = actionIcons[lead.nextAction] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`group relative rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-glow-primary ${
        lead.completed ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(lead.id)}
          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
            lead.completed
              ? "bg-primary border-primary"
              : "border-muted-foreground/40 hover:border-primary"
          }`}
        >
          {lead.completed && <Check className="w-3 h-3 text-primary-foreground" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <Link to={`/lead/${lead.id}`} className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-foreground truncate">{lead.name}</span>
              <span className="text-xs text-muted-foreground truncate hidden sm:inline">{lead.company}</span>
            </Link>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[lead.status]}`}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </span>
              <Link to={`/lead/${lead.id}`} className="text-muted-foreground hover:text-foreground">
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span>{lead.source}</span>
            <span>•</span>
            <span>{lead.lastInteraction}</span>
            <span>•</span>
            <span className="font-mono text-foreground/80">₹{lead.dealValue.toLocaleString()}</span>
          </div>

          {/* AI Reason */}
          <div className="flex items-center gap-1.5 text-xs text-primary mb-2">
            <Flame className="w-3 h-3" />
            <span>{lead.aiReason}</span>
          </div>

          {/* Next Best Action */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
              <ActionIcon className="w-3 h-3" />
              <span>{lead.nextActionLabel}</span>
            </div>
          </div>

          {/* Health Bar */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${lead.healthScore}%` }}
                transition={{ delay: index * 0.04 + 0.2, duration: 0.6 }}
                className={`h-full rounded-full ${
                  lead.healthScore > 70 ? "bg-primary" : lead.healthScore > 40 ? "bg-warm" : "bg-destructive"
                }`}
              />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">{lead.healthScore}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
