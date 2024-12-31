import { FC } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuSubItem, useSidebar } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface Team {
  name: string;
  id: string;
  ruc: string;
  local: string;
  apikey: string;
  logo: FC<React.SVGProps<SVGSVGElement>>;
  plan: string;
}

interface TeamSwitcherProps {
  teams: Team[];
  activeTeam: Team | null;
  setActiveTeam: React.Dispatch<React.SetStateAction<Team | null>>;
}

export function TeamSwitcher({
  teams,
  activeTeam,
  setActiveTeam,
}: TeamSwitcherProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  const handleBranchChange = (branchId: string) => {
    const selectedTeam = teams.find((team) => team.apikey === branchId);
    if (!selectedTeam) {
      console.error(`No se encontró el equipo con apikey: ${branchId}`);
      return;
    }

    setActiveTeam(selectedTeam);

    const newUrl = `${pathname}?current_business=${selectedTeam.apikey}`;
    router.replace(newUrl);
  };

  return (
    <SidebarMenu>
      <SidebarMenuSubItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#DCE9FF] text-[#001433]">
                {activeTeam?.logo && <activeTeam.logo className="size-5" />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam?.name}
                </span>
                <span className="truncate text-xs">[LOCAL{activeTeam?.local}] {activeTeam?.ruc}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Sucursales
            </DropdownMenuLabel>
            {teams.map((team) => {
              if (!team.id) return null;
              return (
                <DropdownMenuItem
                  key={`${team.apikey}-${team.id}`}
                  onClick={() => handleBranchChange(team.apikey)} 
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <team.logo className="size-4 shrink-0" />
                  </div>
                  {team.name} [LOCAL{team.local}] {team.ruc}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuSubItem>
    </SidebarMenu>
  );
}
