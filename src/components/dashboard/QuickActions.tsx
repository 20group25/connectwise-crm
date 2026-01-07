import { Zap, Database, Brain, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  icon: React.ElementType;
  title: string;
  description: string;
  color: "primary" | "accent" | "info" | "warning";
}

const actions: QuickAction[] = [
  {
    icon: Zap,
    title: "Event Capture",
    description: "Real-time webhook processing",
    color: "warning",
  },
  {
    icon: Database,
    title: "Vector Search",
    description: "Pinecone similarity queries",
    color: "info",
  },
  {
    icon: Brain,
    title: "RAG Pipeline",
    description: "Context-aware generation",
    color: "accent",
  },
  {
    icon: Shield,
    title: "Validation",
    description: "Anti-hallucination checks",
    color: "primary",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <ActionCard key={action.title} action={action} delay={index * 75} />
      ))}
    </div>
  );
}

function ActionCard({ action, delay }: { action: QuickAction; delay: number }) {
  const Icon = action.icon;
  
  return (
    <button 
      className="card-elevated p-4 text-left hover:border-accent/30 transition-all group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110",
        action.color === "primary" && "bg-primary/10",
        action.color === "accent" && "bg-accent/10",
        action.color === "info" && "bg-info/10",
        action.color === "warning" && "bg-warning/10"
      )}>
        <Icon className={cn(
          "w-5 h-5",
          action.color === "primary" && "text-primary",
          action.color === "accent" && "text-accent",
          action.color === "info" && "text-info",
          action.color === "warning" && "text-warning"
        )} />
      </div>
      <h4 className="font-medium text-foreground text-sm">{action.title}</h4>
      <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
    </button>
  );
}
