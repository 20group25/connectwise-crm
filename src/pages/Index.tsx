import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TicketList } from "@/components/dashboard/TicketList";
import { AIRecommendationPanel } from "@/components/dashboard/AIRecommendationPanel";
import { EventTrackingChart } from "@/components/dashboard/EventTrackingChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Ticket, Clock, Sparkles, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">AI-Powered Event Tracking & Recommendations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Open Tickets"
            value={12}
            change="+3 from yesterday"
            changeType="negative"
            icon={Ticket}
          />
          <StatsCard
            title="Avg Response Time"
            value="32s"
            change="83% faster with AI"
            changeType="positive"
            icon={Clock}
          />
          <StatsCard
            title="AI Recommendations"
            value={847}
            change="+124 this week"
            changeType="positive"
            icon={Sparkles}
          />
          <StatsCard
            title="Resolution Rate"
            value="94.2%"
            change="+2.1% vs last month"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Tickets & Chart */}
          <div className="xl:col-span-2 space-y-6">
            <TicketList />
            <EventTrackingChart />
          </div>

          {/* Right Column - AI Panel */}
          <div className="xl:col-span-1">
            <AIRecommendationPanel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
