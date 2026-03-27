import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Phone, MessageCircle, Clock, Mail, ChevronRight, Flame, Zap } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/mockData";

const statusColors: Record<string, string> = {
  hot: "bg-hot/10 text-hot border-hot/30",
  warm: "bg-warm/10 text-warm border-warm/30",
  cold: "bg-cold/10 text-cold border-cold/30",
};

const statusOptions: LeadStatus[] = ["hot", "warm", "cold"];

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
  onStatusChange,
}: {
  lead: Lead;
  index: number;
  onToggle: (id: string) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
}) {
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  const ActionIcon = actionIcons[lead.nextAction] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      className={`group relative rounded-xl border bg-card p-4 shadow-card transition-all hover:shadow-elevated hover:border-primary/30 ${
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
              {/* Status Badge — Clickable */}
              <div className="relative">
                <button
                  onClick={() => setShowStatusPicker(!showStatusPicker)}
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium cursor-pointer transition-all hover:ring-2 hover:ring-primary/20 ${statusColors[lead.status]}`}
                >
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </button>
                {showStatusPicker && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowStatusPicker(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-elevated p-1 min-w-[100px]"
                    >
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            onStatusChange(lead.id, status);
                            setShowStatusPicker(false);
                          }}
                          className={`w-full text-left text-xs px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-2 ${
                            lead.status === status
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${
                            status === "hot" ? "bg-hot" : status === "warm" ? "bg-warm" : "bg-cold"
                          }`} />
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
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
