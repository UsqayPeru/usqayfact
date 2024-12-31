"use client"

import Cookies from 'js-cookie';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

export function NavUser({
  user,
}: {
  user: string
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()
  const [showLogout, setShowLogout] = useState(false);

  const LogoutSystem = () => {
    Cookies.remove('uuidfact');
    router.push('/auth/login')
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-[#0066C8] border-[#0066C8] text-white">{user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user}</span>
                  <span className="truncate text-xs">usqayfact@sistemausqay.com</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-[#0066C8] border-[#0066C8] text-white">{user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user}</span>
                    <span className="truncate text-xs">usqayfact@sistemausqay.com</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Cuenta
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Facturación
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notificaciones
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowLogout(true)}
              >
                <LogOut />
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

        <Dialog open={showLogout} onOpenChange={setShowLogout}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cerrar sesión</DialogTitle>
              <DialogDescription>
                ¿Desea cerrar sesión?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLogout(false)}>Cancelar</Button>
              <Button onClick={LogoutSystem}>Salir</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  )
}
