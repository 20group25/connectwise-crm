import { Sparkles, CheckCircle2, AlertCircle, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SimilarEvent {
  id: string;
  title: string;
  similarity: number;
  resolution: string;
  date: string;
}

const mockRecommendation = {
  ticketId: "TKT-001",
  customer: "Jane Doe",
  issue: "Unexpected $49.99 charge",
  confidence: 0.92,
  groundingScore: 0.91,
  suggestion: `Hi Jane, I can see you have a question about the $49.99 charge. Based on your account history, you experienced a similar situation in October when you exceeded usage limits. We applied a $20 courtesy discount then. Let me investigate your current usage and resolve this within the hour. Would you like me to apply a similar adjustment while we review?`,
  similarEvents: [
    {
      id: "EVT-891",
      title: "Billing dispute - usage overage",
      similarity: 0.89,
      resolution: "$20 courtesy discount applied",
      date: "Oct 15, 2025",
    },
    {
      id: "EVT-654",
      title: "Unexpected charge inquiry",
      similarity: 0.82,
      resolution: "Charge explanation + 10% discount",
      date: "Aug 3, 2025",
    },
    {
      id: "EVT-432",
      title: "Billing cycle confusion",
      similarity: 0.75,
      resolution: "Billing date adjustment",
      date: "Jun 22, 2025",
    },
  ] as SimilarEvent[],
};

export function AIRecommendationPanel() {
  return (
    <div className="card-elevated overflow-hidden h-fit">
      {/* Header */}
      <div className="p-4 border-b border-border bg-accent/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Recommendation</h3>
              <p className="text-xs text-muted-foreground">Powered by RAG + LLM</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Confidence Scores */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">Confidence</span>
              <span className="text-sm font-bold text-accent">{Math.round(mockRecommendation.confidence * 100)}%</span>
            </div>
            <div className="confidence-bar">
              <div 
                className="confidence-fill" 
                style={{ width: `${mockRecommendation.confidence * 100}%` }} 
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">Grounding</span>
              <span className="text-sm font-bold text-success">{Math.round(mockRecommendation.groundingScore * 100)}%</span>
            </div>
            <div className="confidence-bar">
              <div 
                className="h-full rounded-full bg-success transition-all duration-500" 
                style={{ width: `${mockRecommendation.groundingScore * 100}%` }} 
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-success/10 border border-success/20">
          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
          <span className="text-xs font-medium text-success">No hallucinations detected</span>
        </div>
      </div>

      {/* Generated Response */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-semibold text-foreground mb-2">Suggested Response</h4>
        <div className="p-3 rounded-lg bg-secondary/50 text-sm text-foreground leading-relaxed">
          {mockRecommendation.suggestion}
        </div>
        <div className="flex gap-2 mt-3">
          <Button size="sm" className="btn-gradient-accent flex-1">
            Use Response
          </Button>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      </div>

      {/* Similar Events */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Similar Historical Events</h4>
        <div className="space-y-2">
          {mockRecommendation.similarEvents.map((event) => (
            <SimilarEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SimilarEventCard({ event }: { event: SimilarEvent }) {
  return (
    <div className="p-3 rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all cursor-pointer group">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">{event.id}</span>
            <span className={cn(
              "text-xs font-bold px-1.5 py-0.5 rounded",
              event.similarity >= 0.85 ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
            )}>
              {Math.round(event.similarity * 100)}% match
            </span>
          </div>
          <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{event.resolution}</p>
          <p className="text-xs text-muted-foreground/70 mt-1">{event.date}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
