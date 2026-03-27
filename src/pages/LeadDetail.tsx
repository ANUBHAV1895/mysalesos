import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, MessageCircle, Mail, Clock, ChevronRight, Sparkles, CheckCircle2, ArrowUpRight, Copy, ExternalLink } from "lucide-react";
import { leads } from "@/lib/mockData";
import type { LeadStatus } from "@/lib/mockData";
import { toast } from "sonner";

const actionIcons: Record<string, React.ElementType> = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  wait: Clock,
};

const interactionIcons: Record<string, React.ElementType> = {
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  meeting: ArrowUpRight,
  note: Sparkles,
};

const statusColors: Record<string, string> = {
  hot: "bg-hot/10 text-hot border-hot/30",
  warm: "bg-warm/10 text-warm border-warm/30",
  cold: "bg-cold/10 text-cold border-cold/30",
};

const statusOptions: LeadStatus[] = ["hot", "warm", "cold"];

export default function LeadDetailPage() {
  const { id } = useParams();
  const initialLead = leads.find((l) => l.id === id) || leads[0];
  const [lead, setLead] = useState(initialLead);
  const ActionIcon = actionIcons[lead.nextAction] || Sparkles;

  const suggestedStatus: LeadStatus = lead.status === "warm" ? "hot" : lead.status === "cold" ? "warm" : "hot";
  const suggestedLabel = lead.status === "warm" ? "Warm → Hot" : lead.status === "cold" ? "Cold → Warm" : "Keep as Hot";

  const whatsAppDraft = `Hi ${lead.name.split(" ")[0]}, hope you're doing well! Just wanted to follow up on our conversation${
    lead.objections.length > 0 ? ` regarding ${lead.objections[0].toLowerCase()}` : ""
  }. Would love to help move things forward — let me know a good time to connect. 🙌`;

  const handleStatusChange = (newStatus: LeadStatus) => {
    setLead((prev) => ({ ...prev, status: newStatus }));
    toast.success(`Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`);
  };

  const handleNextAction = () => {
    if (lead.nextAction === "call") {
      toast.success("📞 Initiating call...", { description: `Calling ${lead.name}` });
    } else if (lead.nextAction === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(whatsAppDraft)}`, "_blank");
    } else if (lead.nextAction === "email") {
      window.open(`mailto:?subject=Follow up&body=${encodeURIComponent(whatsAppDraft)}`, "_blank");
    } else {
      toast.info("⏰ Reminder set!", { description: "We'll remind you to follow up" });
    }
  };

  const handleSendWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(whatsAppDraft)}`, "_blank");
    toast.success("Opening WhatsApp...");
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(whatsAppDraft);
    toast.success("Message copied to clipboard!");
  };

  return (
    <div>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to My Day
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card p-5 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold text-foreground">{lead.name}</h1>
                <p className="text-sm text-muted-foreground">{lead.company} · {lead.source}</p>
              </div>
              {/* One-click status change */}
              <div className="flex items-center gap-1.5">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-all ${
                      lead.status === status
                        ? statusColors[status]
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Stage: <span className="text-foreground font-medium">{lead.stage}</span></span>
              <span>Deal: <span className="text-foreground font-mono font-semibold">₹{lead.dealValue.toLocaleString()}</span></span>
              <span>Health: <span className={`font-mono font-semibold ${lead.healthScore > 70 ? 'text-primary' : lead.healthScore > 40 ? 'text-warm' : 'text-destructive'}`}>{lead.healthScore}%</span></span>
            </div>
          </motion.div>

          {/* AI Summary */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-primary">AI Summary</h3>
            </div>
            <div className="space-y-2 text-sm text-foreground/80">
              {lead.interactions.slice(0, 3).map((interaction, i) => (
                <p key={i}>• {interaction.summary}</p>
              ))}
              {lead.objections.length > 0 && (
                <p className="text-warm mt-2">⚠️ Key objections: {lead.objections.join(", ")}</p>
              )}
              <p className="text-muted-foreground text-xs mt-2">
                Sentiment: <span className={lead.sentiment === "positive" ? "text-primary" : lead.sentiment === "negative" ? "text-destructive" : "text-muted-foreground"}>{lead.sentiment}</span>
              </p>
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">📊 Activity Timeline</h3>
            <div className="space-y-4">
              {lead.interactions.map((interaction, i) => {
                const Icon = interactionIcons[interaction.type] || Sparkles;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{interaction.date}</p>
                      <p className="text-sm text-foreground mt-0.5">{interaction.summary}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Next Best Action */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="rounded-xl border border-primary/30 bg-card p-5 shadow-glow-primary"
          >
            <h3 className="text-sm font-semibold text-foreground mb-3">🎯 Next Best Action</h3>
            <button
              onClick={handleNextAction}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <ActionIcon className="w-4 h-4" />
              {lead.nextActionLabel}
            </button>
            <p className="text-xs text-muted-foreground text-center mt-2">{lead.aiReason}</p>
          </motion.div>

          {/* Smart Status Update */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">🔄 Smart Status Update</h3>
            <div className="p-3 rounded-lg bg-accent/5 border border-accent/15 mb-3">
              <p className="text-xs text-accent mb-2">AI suggests:</p>
              <p className="text-sm font-medium text-foreground">{suggestedLabel}</p>
            </div>
            <button
              onClick={() => handleStatusChange(suggestedStatus)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Update
            </button>
          </motion.div>

          {/* WhatsApp Draft */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">AI WhatsApp Draft</h3>
            </div>
            <div className="p-3 rounded-lg bg-muted text-sm text-foreground leading-relaxed mb-3">
              {whatsAppDraft}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSendWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors active:scale-[0.98]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Send via WhatsApp
              </button>
              <button
                onClick={handleCopyDraft}
                className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-muted text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
