"use client"

import * as React from "react"
import {
  ClipboardMinus,
  FolderDot,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Store
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Arturo Cueva",
    email: "arturo@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "15 LUKAS PIURA",
      logo: Store,
      plan: "Demo",
    },
    {
      name: "15 LUKAS CASTILLA",
      logo: Store,
      plan: "Demo",
    },
    {
      name: "15 LUKAS SULLANA",
      logo: Store,
      plan: "Demo",
    },
  ],
  navMain: [
    {
      title: "Ventas",
      url: "#",
      icon: ShoppingCart,
      isActive: false,
      items: [
        {
          title: "Comprobantes",
          url: "/invoices",
        },
        {
          title: "Nuevo comprobante",
          url: "/invoices/create",
        }
      ],
    },
    {
      title: "Guias de remisión",
      url: "#",
      icon: FolderDot,
      isActive: false,
      items: [
        {
          title: "Ver guías",
          url: "/billing",
        },
        {
          title: "Nueva guía",
          url: "/boletas",
        }
      ],
    },
    {
      title: "SIRE",
      url: "#",
      icon: ClipboardMinus,
      isActive: false,
      items: [
        {
          title: "SIRE Ventas",
          url: "/billing",
        },
        {
          title: "SIRE Compras",
          url: "/boletas",
        }
      ],
    },
    {
      title: "Configuración",
      url: "#",
      icon: Settings,
      isActive: false,
      items: [
        {
          title: "Mi Cuenta",
          url: "/billing",
        },
        {
          title: "Configuración Empresa",
          url: "/boletas",
        },
        {
          title: "Usuarios",
          url: "#"
        },
        {
          title: "Locales y Series",
          url: "#"
        }
      ],
    },
    
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* TODO: NAVBAR */}
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="mb-10">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
