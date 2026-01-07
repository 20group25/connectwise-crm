import { cn } from "@/lib/utils";
import { Clock, User, ChevronRight } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  customer: string;
  status: "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high";
  createdAt: string;
  aiConfidence?: number;
}

const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Unexpected $49.99 charge on my account",
    customer: "Jane Doe",
    status: "open",
    priority: "high",
    createdAt: "10 min ago",
    aiConfidence: 0.92,
  },
  {
    id: "TKT-002",
    subject: "Unable to access premium features",
    customer: "John Smith",
    status: "pending",
    priority: "medium",
    createdAt: "25 min ago",
    aiConfidence: 0.87,
  },
  {
    id: "TKT-003",
    subject: "Request for account upgrade",
    customer: "Sarah Johnson",
    status: "open",
    priority: "low",
    createdAt: "1 hour ago",
    aiConfidence: 0.95,
  },
  {
    id: "TKT-004",
    subject: "Integration API not responding",
    customer: "Tech Corp Ltd",
    status: "pending",
    priority: "high",
    createdAt: "2 hours ago",
    aiConfidence: 0.78,
  },
  {
    id: "TKT-005",
    subject: "Password reset not working",
    customer: "Mike Wilson",
    status: "resolved",
    priority: "medium",
    createdAt: "3 hours ago",
  },
];

export function TicketList() {
  return (
    <div className="card-elevated overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Tickets</h3>
        <p className="text-sm text-muted-foreground mt-0.5">AI-ready recommendations available</p>
      </div>
      <div className="divide-y divide-border">
        {mockTickets.map((ticket, index) => (
          <TicketRow key={ticket.id} ticket={ticket} delay={index * 100} />
        ))}
      </div>
    </div>
  );
}

function TicketRow({ ticket, delay }: { ticket: Ticket; delay: number }) {
  return (
    <div 
      className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
            <span className={cn(
              "status-badge",
              ticket.status === "open" && "status-open",
              ticket.status === "pending" && "status-pending",
              ticket.status === "resolved" && "status-resolved"
            )}>
              {ticket.status}
            </span>
            {ticket.priority === "high" && (
              <span className="status-badge bg-destructive/15 text-destructive">urgent</span>
            )}
          </div>
          <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {ticket.subject}
          </h4>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {ticket.customer}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {ticket.createdAt}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {ticket.aiConfidence && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">AI Ready</p>
              <p className="text-sm font-semibold text-accent">{Math.round(ticket.aiConfidence * 100)}%</p>
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  );
}
