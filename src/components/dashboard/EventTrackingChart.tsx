import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", events: 42, resolved: 38 },
  { name: "Tue", events: 58, resolved: 52 },
  { name: "Wed", events: 65, resolved: 61 },
  { name: "Thu", events: 48, resolved: 45 },
  { name: "Fri", events: 72, resolved: 68 },
  { name: "Sat", events: 35, resolved: 33 },
  { name: "Sun", events: 28, resolved: 26 },
];

export function EventTrackingChart() {
  return (
    <div className="card-elevated p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Event Tracking</h3>
        <p className="text-sm text-muted-foreground mt-0.5">Weekly captured vs resolved events</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(210, 50%, 25%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(210, 50%, 25%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(168, 80%, 32%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(168, 80%, 32%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "hsl(215, 15%, 45%)" }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "hsl(215, 15%, 45%)" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(0, 0%, 100%)", 
                border: "1px solid hsl(214, 20%, 88%)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
            />
            <Area
              type="monotone"
              dataKey="events"
              stroke="hsl(210, 50%, 25%)"
              fillOpacity={1}
              fill="url(#colorEvents)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="resolved"
              stroke="hsl(168, 80%, 32%)"
              fillOpacity={1}
              fill="url(#colorResolved)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Events Captured</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">Resolved</span>
        </div>
      </div>
    </div>
  );
}
