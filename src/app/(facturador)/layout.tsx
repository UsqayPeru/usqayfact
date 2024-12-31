import { AppSidebar } from "@/components/app-sidebar"
import Banner from "@/components/banner/Banner"
import HeaderComponent from "@/components/header/Header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function FacturadorLayout({ children }: { children: React.ReactNode }) { 
  const cookiesStore = await cookies();

  const user = cookiesStore.get('uuidfact');

  if ( !user ) {
    redirect('/auth/login')
  }

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
