import { Bell, Search, Settings } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"
import { Input } from "../ui/input"
import { ModeToggle } from "../ModeToggle"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

function HeaderComponent() {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                UsqayFact
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>CPanel</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode"> Producción</Label>
                </div>
                <p className="text-gray-500">|</p>
                <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                </Button>
               
                <ModeToggle />
            </div>
        </header>
    )
}

export default HeaderComponent