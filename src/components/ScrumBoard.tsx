import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, FileEdit, UserSearch, Users, GripVertical, Clock, CheckCircle2, Flame } from "lucide-react";
import { scrumTasks as initialTasks } from "@/lib/mockData";
import type { ScrumTask, TaskStatus } from "@/lib/mockData";
import { toast } from "sonner";

const columns: { key: TaskStatus; label: string; icon: React.ElementType; color: string }[] = [
  { key: "today", label: "Today's Tasks", icon: Flame, color: "text-warm" },
  { key: "in_progress", label: "In Progress", icon: Clock, color: "text-primary" },
  { key: "waiting", label: "Waiting", icon: Clock, color: "text-muted-foreground" },
  { key: "completed", label: "Completed", icon: CheckCircle2, color: "text-success" },
];

const typeIcons: Record<string, React.ElementType> = {
  follow_up: MessageCircle,
  call: Phone,
  update: FileEdit,
  profiling: UserSearch,
  meeting: Users,
};

const priorityColors: Record<string, string> = {
  high: "border-l-hot",
  medium: "border-l-warm",
  low: "border-l-muted-foreground",
};

function ScrumTaskCard({
  task,
  onDragStart,
}: {
  task: ScrumTask;
  onDragStart: (e: React.DragEvent, task: ScrumTask) => void;
}) {
  const Icon = typeIcons[task.type] || FileEdit;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, task)}
      className={`group rounded-lg border border-border/50 bg-card p-3 shadow-card cursor-grab active:cursor-grabbing hover:shadow-elevated hover:border-primary/30 transition-all border-l-2 ${priorityColors[task.priority]}`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-3 h-3 text-muted-foreground/30 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground leading-snug">{task.title}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <Icon className="w-3 h-3 text-muted-foreground" />
            {task.leadName && <span className="text-[10px] text-primary truncate">{task.leadName}</span>}
            {task.dueTime && <span className="text-[10px] text-muted-foreground ml-auto">{task.dueTime}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ScrumBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);
  const [draggedTask, setDraggedTask] = useState<ScrumTask | null>(null);

  const handleDragStart = (e: React.DragEvent, task: ScrumTask) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    if (!draggedTask || draggedTask.status === status) return;

    setTasks((prev) => prev.map((t) => (t.id === draggedTask.id ? { ...t, status } : t)));
    if (status === "completed") {
      toast.success("✅ Task completed!", { description: draggedTask.title });
    }
    setDraggedTask(null);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const completionPct = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div>
      {/* Progress header */}
      <div className="flex items-center gap-4 mb-4 p-3 rounded-xl border border-border/40 bg-card/50">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-foreground">Daily Progress</span>
            <span className="text-xs font-mono text-primary glow-number">{completionPct}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-primary"
            />
          </div>
        </div>
        <div className="text-center px-3 border-l border-border/40">
          <span className="text-lg font-bold font-mono text-foreground">{completedTasks}/{totalTasks}</span>
          <p className="text-[10px] text-muted-foreground">Done</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warm/10 text-warm text-xs font-semibold">
          <Flame className="w-3.5 h-3.5" />
          7-day streak
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          const isOver = dragOverCol === col.key;

          return (
            <div
              key={col.key}
              className={`rounded-xl border transition-all ${
                isOver ? "border-primary/50 shadow-glow-primary bg-primary/5" : "border-border/40 bg-gradient-kanban"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.key); }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, col.key)}
            >
              <div className="p-3 border-b border-border/30 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <col.icon className={`w-3.5 h-3.5 ${col.color}`} />
                  <h3 className="text-xs font-semibold text-foreground">{col.label}</h3>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground">{colTasks.length}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[120px] max-h-[50vh] overflow-y-auto">
                <AnimatePresence>
                  {colTasks.map((task) => (
                    <ScrumTaskCard key={task.id} task={task} onDragStart={handleDragStart} />
                  ))}
                </AnimatePresence>
                {colTasks.length === 0 && (
                  <div className="flex items-center justify-center h-16 text-[10px] text-muted-foreground/40 border border-dashed border-border/30 rounded-lg">
                    Drop tasks here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
