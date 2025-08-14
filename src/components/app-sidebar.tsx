import * as React from "react";
import {
  AudioWaveform,
  BarChartBig,
  BookOpen,
  Bot,
  CalendarClock,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  ListOrdered,
  Map,
  PieChart,
  Settings2,
  Soup,
  SquareTerminal,
  Users,
  Utensils,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Manwah",
    email: "m@example.com",
    avatar: "/images/manwah-logo.svg",
  },
  teams: [
    {
      name: "Manwah",
      logo: GalleryVerticalEnd,
      plan: "Management System",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Orders",
      url: "/orders",
      icon: ListOrdered,
      isActive: true,
    },
    {
      title: "Menu",
      url: "/menu",
      icon: Utensils,
    },
    {
      title: "Reservations",
      url: "/reservations",
      icon: CalendarClock,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Ingredients",
      url: "/ingredients",
      icon: Soup,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChartBig,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
