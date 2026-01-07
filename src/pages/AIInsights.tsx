import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap
} from "lucide-react";

const insightCards = [
  {
    title: "Model Performance",
    value: "94.2%",
    change: "+2.1%",
    description: "Recommendation accuracy rate",
    icon: Target,
    color: "accent",
  },
  {
    title: "Grounding Score",
    value: "0.91",
    change: "+0.03",
    description: "Average factual accuracy",
    icon: CheckCircle2,
    color: "success",
  },
  {
    title: "Response Latency",
    value: "1.2s",
    change: "-0.3s",
    description: "Average generation time",
    icon: Zap,
    color: "warning",
  },
  {
    title: "Hallucination Rate",
    value: "0.8%",
    change: "-0.5%",
    description: "Detected false statements",
    icon: AlertTriangle,
    color: "destructive",
  },
];

const recentRecommendations = [
  {
    ticket: "TKT-001",
    query: "Unexpected billing charge",
    confidence: 0.92,
    grounding: 0.91,
    usedByAgent: true,
    responseTime: 1.1,
  },
  {
    ticket: "TKT-002",
    query: "Premium features access issue",
    confidence: 0.87,
    grounding: 0.89,
    usedByAgent: true,
    responseTime: 1.4,
  },
  {
    ticket: "TKT-003",
    query: "Account upgrade request",
    confidence: 0.95,
    grounding: 0.93,
    usedByAgent: true,
    responseTime: 0.9,
  },
  {
    ticket: "TKT-004",
    query: "API integration failure",
    confidence: 0.78,
    grounding: 0.82,
    usedByAgent: false,
    responseTime: 1.8,
  },
];

const modelStats = [
  { name: "Embeddings Generated", value: 12847, max: 15000 },
  { name: "Vector Searches", value: 8934, max: 10000 },
  { name: "LLM API Calls", value: 6721, max: 10000 },
  { name: "Cache Hit Rate", value: 78, max: 100, isPercent: true },
];

export default function AIInsights() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            AI Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor RAG pipeline performance and recommendation quality
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insightCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{card.value}</p>
                      <p className={`text-sm mt-2 font-medium ${
                        card.color === "destructive" ? "text-destructive" : "text-success"
                      }`}>
                        {card.change} from last week
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${card.color}/10`}>
                      <Icon className={`w-5 h-5 text-${card.color}`} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">{card.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Recommendations */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Recent Recommendations
              </CardTitle>
              <CardDescription>Latest AI-generated suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRecommendations.map((rec) => (
                  <div
                    key={rec.ticket}
                    className="p-4 rounded-lg border border-border hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs font-mono text-muted-foreground">{rec.ticket}</span>
                        <p className="font-medium text-foreground mt-0.5">{rec.query}</p>
                      </div>
                      <Badge 
                        variant={rec.usedByAgent ? "default" : "secondary"}
                        className={rec.usedByAgent ? "bg-success/15 text-success border-0" : ""}
                      >
                        {rec.usedByAgent ? "Used" : "Skipped"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Confidence</p>
                        <p className="font-semibold text-accent">{Math.round(rec.confidence * 100)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Grounding</p>
                        <p className="font-semibold text-success">{Math.round(rec.grounding * 100)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Latency</p>
                        <p className="font-semibold text-foreground">{rec.responseTime}s</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Model Usage Stats */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Pipeline Usage
              </CardTitle>
              <CardDescription>This month's API and resource consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modelStats.map((stat) => (
                  <div key={stat.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{stat.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {stat.value.toLocaleString()}{stat.isPercent ? "%" : ""} / {stat.max.toLocaleString()}{stat.isPercent ? "%" : ""}
                      </span>
                    </div>
                    <Progress value={(stat.value / stat.max) * 100} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-foreground">Estimated Usage</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on current trends, you'll reach 85% of your monthly quota by the billing date.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RAG Pipeline Visualization */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>RAG Pipeline Flow</CardTitle>
            <CardDescription>Visual representation of the recommendation generation process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4 py-4 overflow-x-auto">
              {[
                { step: 1, name: "Query Input", icon: "📝", desc: "Customer issue text" },
                { step: 2, name: "Embedding", icon: "🔢", desc: "3072-dim vector" },
                { step: 3, name: "Vector Search", icon: "🔍", desc: "Top-K retrieval" },
                { step: 4, name: "Context Build", icon: "📚", desc: "Format for LLM" },
                { step: 5, name: "LLM Generate", icon: "🤖", desc: "GPT-4 / Claude" },
                { step: 6, name: "Validation", icon: "✅", desc: "Anti-hallucination" },
                { step: 7, name: "Output", icon: "💬", desc: "Recommendation" },
              ].map((item, index, arr) => (
                <div key={item.step} className="flex items-center">
                  <div className="flex flex-col items-center min-w-[100px]">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-2">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-foreground text-center">{item.name}</span>
                    <span className="text-xs text-muted-foreground text-center">{item.desc}</span>
                  </div>
                  {index < arr.length - 1 && (
                    <div className="w-8 h-0.5 bg-border mx-2 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
