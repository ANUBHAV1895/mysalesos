import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, StickyNote, GripVertical, Sparkles, ChevronRight } from "lucide-react";
import { leads as initialLeads, pipelineStages } from "@/lib/mockData";
import type { Lead, PipelineStage, LeadStatus } from "@/lib/mockData";
import { toast } from "sonner";

const statusDot: Record<LeadStatus, string> = {
  hot: "bg-hot",
  warm: "bg-warm",
  cold: "bg-cold",
};

function KanbanLeadCard({ lead, onDragStart }: { lead: Lead; onDragStart: (e: React.DragEvent, lead: Lead) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, lead)}
      className="group rounded-xl border border-border/60 bg-card p-3.5 shadow-card cursor-grab active:cursor-grabbing hover:shadow-elevated hover:border-primary/30 transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Link to={`/lead/${lead.id}`} className="font-semibold text-sm text-foreground truncate hover:text-primary transition-colors">
            {lead.name}
          </Link>
        </div>
        <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${statusDot[lead.status]}`} />
      </div>

      <p className="text-xs text-muted-foreground mb-2 truncate">{lead.company}</p>

      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-mono font-bold text-foreground glow-number">₹{lead.dealValue.toLocaleString()}</span>
        <span className="text-[10px] font-mono text-muted-foreground">{lead.lastInteraction}</span>
      </div>

      {/* AI Score bar */}
      <div className="flex items-center gap-2 mb-2.5">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              lead.healthScore > 70 ? "bg-gradient-primary" : lead.healthScore > 40 ? "bg-warm" : "bg-destructive"
            }`}
            style={{ width: `${lead.healthScore}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">{lead.healthScore}%</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-primary">
          <Sparkles className="w-3 h-3" />
          <span className="truncate max-w-[120px]">{lead.aiReason}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded-md hover:bg-muted transition-colors" title="Call">
            <Phone className="w-3 h-3 text-muted-foreground hover:text-primary" />
          </button>
          <button className="p-1 rounded-md hover:bg-muted transition-colors" title="WhatsApp">
            <MessageCircle className="w-3 h-3 text-muted-foreground hover:text-success" />
          </button>
          <button className="p-1 rounded-md hover:bg-muted transition-colors" title="Note">
            <StickyNote className="w-3 h-3 text-muted-foreground hover:text-accent" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground">{lead.source}</span>
        <span className="text-[10px] text-muted-foreground">{lead.agent || "Unassigned"}</span>
      </div>
    </motion.div>
  );
}

export default function KanbanBoard() {
  const [leads, setLeads] = useState(initialLeads);
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null);
  const draggedLead = useRef<Lead | null>(null);

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    draggedLead.current = lead;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverStage(stage);
  };

  const handleDragLeave = () => {
    setDragOverStage(null);
  };

  const handleDrop = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    setDragOverStage(null);
    if (!draggedLead.current) return;

    const lead = draggedLead.current;
    if (lead.stage === stage) return;

    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== lead.id) return l;
        const newStatus: LeadStatus = stage === "hot_leads" || stage === "negotiation" ? "hot" : stage === "won" ? "hot" : stage === "lost" ? "cold" : l.status;
        return { ...l, stage, status: newStatus };
      })
    );

    if (stage === "won") {
      toast.success("🎉 Deal Won!", { description: `${lead.name} — ₹${lead.dealValue.toLocaleString()}` });
    } else {
      toast.success(`Moved ${lead.name} to ${pipelineStages.find((s) => s.key === stage)?.label}`);
    }
    draggedLead.current = null;
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
      {pipelineStages.map((stage) => {
        const stageLeads = leads.filter((l) => l.stage === stage.key);
        const totalValue = stageLeads.reduce((sum, l) => sum + l.dealValue, 0);
        const isOver = dragOverStage === stage.key;

        return (
          <div
            key={stage.key}
            className={`flex-shrink-0 w-[260px] rounded-xl border transition-all ${
              isOver ? "border-primary/50 shadow-glow-primary bg-primary/5" : "border-border/40 bg-gradient-kanban"
            }`}
            onDragOver={(e) => handleDragOver(e, stage.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage.key)}
          >
            {/* Column Header */}
            <div className="p-3 border-b border-border/30">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-xs font-semibold uppercase tracking-wider ${stage.color}`}>{stage.label}</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground">{stageLeads.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-foreground glow-number">₹{totalValue.toLocaleString()}</span>
                <div className={`h-1 w-12 rounded-full overflow-hidden bg-muted`}>
                  <div
                    className={`h-full rounded-full ${
                      stage.key === "won" ? "bg-gradient-success" : stage.key === "lost" ? "bg-destructive" : "bg-gradient-primary"
                    }`}
                    style={{ width: `${Math.min((stageLeads.length / Math.max(leads.length, 1)) * 100 * 3, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="p-2 space-y-2 min-h-[200px] max-h-[60vh] overflow-y-auto">
              <AnimatePresence>
                {stageLeads.map((lead) => (
                  <KanbanLeadCard key={lead.id} lead={lead} onDragStart={handleDragStart} />
                ))}
              </AnimatePresence>
              {stageLeads.length === 0 && (
                <div className="flex items-center justify-center h-24 text-xs text-muted-foreground/50 border border-dashed border-border/30 rounded-lg">
                  Drop leads here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
