import { AppSidebar } from "@/components/app-sidebar"
import Banner from "@/components/banner/Banner"
import HeaderComponent from "@/components/header/Header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <SidebarProvider>
        <AppSidebar  className="mt-10 fixed"/>
        <SidebarInset>
          <HeaderComponent />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
