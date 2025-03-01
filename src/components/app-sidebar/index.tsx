"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { HomeIcon, Inbox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AppSidebar() {
  const items = [
    {
      title: "Painel",
      url: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Criar campanha",
      url: "/create-campaign",
      icon: <Inbox />,
    },
  ];

  return (
    <div>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <div className="py-5 w-full h-full flex items-center justify-center">
                <Image
                  src="/go-case-logo.svg"
                  alt="Gocase Collabs Logo"
                  width={100}
                  height={50}
                />
              </div>
            </SidebarHeader>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url} className="text-lg">
                          {item.icon}
                          <span className="text-lg">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
