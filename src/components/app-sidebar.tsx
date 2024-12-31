"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  ClipboardMinus,
  FolderDot,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Store,
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
import { title } from "process";

interface Team {
  name: string;
  id: string;
  ruc: string;
  local: string;
  apikey: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  plan: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);


  useEffect(() => {
    const userCookie = Cookies.get("uuidfact");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setUserData(user);
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }

    const emisoresUsqay = localStorage.getItem("emisores");
    if (emisoresUsqay) {
      try {
        const emisores = JSON.parse(emisoresUsqay);

        if (emisores.length > 0) {
          const parsedTeams = emisores.map((emisor: any, index: number) => ({
            id: emisor.id || `team-${index}`,
            ruc: emisor.ruc,
            local: emisor.local,
            name: emisor.nombre_comercial,
            apikey: emisor.apikey,
            logo: Store,
            plan: "Demo",
          }));
          setTeams(parsedTeams);
          setActiveTeam(parsedTeams[0]);

        }
      } catch (error) {
        console.error("Error parsing teams data:", error);
      }
    }
  }, []);

  const data = {
    user: userData,
    teams: teams.length > 0 ? teams : [{ id: "default", name: "Default Team", apikey: "", ruc: "", local: "", logo: Store, plan: "Demo" }],
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
          },
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
          },
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
          },
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
            url: "#",
          },
          {
            title: "Locales y Series",
            url: "#",
          },
          {
            title: "API (Integración)",
            url: "/integration"
          }
        ],
      },
    ],
    projects: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={data.teams}
          activeTeam={activeTeam} 
          setActiveTeam={setActiveTeam} 
        />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="mb-10">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
