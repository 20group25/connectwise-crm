import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Ticket, 
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const weeklyData = [
  { name: "Mon", tickets: 42, resolved: 38, aiUsed: 35 },
  { name: "Tue", tickets: 58, resolved: 52, aiUsed: 48 },
  { name: "Wed", tickets: 65, resolved: 61, aiUsed: 55 },
  { name: "Thu", tickets: 48, resolved: 45, aiUsed: 42 },
  { name: "Fri", tickets: 72, resolved: 68, aiUsed: 62 },
  { name: "Sat", tickets: 35, resolved: 33, aiUsed: 30 },
  { name: "Sun", tickets: 28, resolved: 26, aiUsed: 24 },
];

const responseTimeData = [
  { hour: "00:00", withAI: 32, withoutAI: 180 },
  { hour: "04:00", withAI: 28, withoutAI: 165 },
  { hour: "08:00", withAI: 35, withoutAI: 210 },
  { hour: "12:00", withAI: 42, withoutAI: 240 },
  { hour: "16:00", withAI: 38, withoutAI: 195 },
  { hour: "20:00", withAI: 30, withoutAI: 175 },
];

const ticketCategories = [
  { name: "Billing", value: 35, color: "hsl(210, 50%, 25%)" },
  { name: "Technical", value: 28, color: "hsl(168, 80%, 32%)" },
  { name: "Account", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "General", value: 17, color: "hsl(199, 89%, 48%)" },
];

const agentPerformance = [
  { name: "Harry P.", tickets: 45, satisfaction: 4.8, aiAdoption: 92 },
  { name: "Sarah L.", tickets: 38, satisfaction: 4.6, aiAdoption: 88 },
  { name: "Mike R.", tickets: 42, satisfaction: 4.5, aiAdoption: 78 },
  { name: "Jane D.", tickets: 35, satisfaction: 4.7, aiAdoption: 95 },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track performance metrics and team productivity
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total Tickets", value: "1,247", change: "+12%", up: true, icon: Ticket },
            { title: "Avg Response Time", value: "32s", change: "-45%", up: false, icon: Clock },
            { title: "AI Adoption", value: "87%", change: "+8%", up: true, icon: TrendingUp },
            { title: "Active Customers", value: "892", change: "+5%", up: true, icon: Users },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                      <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
                        stat.up ? "text-success" : "text-accent"
                      }`}>
                        {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {stat.change} from last month
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Ticket Volume */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Weekly Ticket Volume</CardTitle>
              <CardDescription>Tickets created vs resolved with AI assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(210, 50%, 25%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(210, 50%, 25%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(168, 80%, 32%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(168, 80%, 32%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 15%, 45%)" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 15%, 45%)" }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="tickets" stroke="hsl(210, 50%, 25%)" fillOpacity={1} fill="url(#colorTickets)" strokeWidth={2} />
                    <Area type="monotone" dataKey="aiUsed" stroke="hsl(168, 80%, 32%)" fillOpacity={1} fill="url(#colorAI)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Response Time Comparison */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Response Time Comparison</CardTitle>
              <CardDescription>With AI vs Without AI (in seconds)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" vertical={false} />
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 15%, 45%)" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 15%, 45%)" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="withAI" stroke="hsl(168, 80%, 32%)" strokeWidth={2} dot={{ fill: "hsl(168, 80%, 32%)" }} />
                    <Line type="monotone" dataKey="withoutAI" stroke="hsl(215, 15%, 45%)" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "hsl(215, 15%, 45%)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground">With AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Without AI</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Categories */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Ticket Categories</CardTitle>
              <CardDescription>Distribution by issue type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ticketCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ticketCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {ticketCategories.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="text-sm font-medium text-foreground">{cat.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Performance */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Agent Performance</CardTitle>
              <CardDescription>Team productivity and AI adoption rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={agentPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 15%, 45%)" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "hsl(215, 15%, 45%)" }} />
                    <Tooltip />
                    <Bar dataKey="tickets" fill="hsl(210, 50%, 25%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="aiAdoption" fill="hsl(168, 80%, 32%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Tickets Handled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground">AI Adoption %</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
