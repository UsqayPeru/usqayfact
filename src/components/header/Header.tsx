'use client';

import { Bell, Search, Settings } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"
import { Input } from "../ui/input"
import { ModeToggle } from "../ModeToggle"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import { ModalEnviroment } from "../enviroment/ModalEnviroment";
import Cookies from "js-cookie";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, 
    //SelectLabel, 
    SelectTrigger, SelectValue } from "../ui/select";

function HeaderComponent() {
    const [isProduction, setIsProduction] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [token, setToken] = useState("");
    const [branch, setBranch] = useState([]);

    useEffect(() => {
        const user = Cookies.get("uuidfact");
        const emisores = localStorage.getItem("emisores");
        if ( user ) {
            let data = JSON.parse(user);
            let dataEmisores = JSON.parse(emisores || "")
            setToken(data);
            setBranch(dataEmisores)
        }
    }, [])


    const handleSwitchChange = () => {
        if (!isProduction) {
            setIsModalOpen(true)
        } else {
            setIsProduction(false)
        }
    }

    const handleConfirmProduction = () => {
        setIsProduction(true)
        setIsModalOpen(false)
    }

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
                            <BreadcrumbPage>Panel de control</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
                {token === "usq@y" && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">Menú Reseller</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-bold  text-md leading-none">Reseller: Usqay</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Configuración solo para reseller.
                                    </p>
                                </div>
                                <Separator />
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <label htmlFor="">Elegir empresa</label>
                                        <Link
                                            href="#"
                                            className="flex justify-start"
                                        > 
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecciona una empresa" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {branch.map((item: { id: string; apikey: string,  local: string, ruc: string, nombre_comercial: string }) => (
                                                            <SelectItem key={item.apikey} value={item.apikey}>
                                                               [LOCAL{item.local}] {item.ruc} {item.nombre_comercial}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </Link>
                                    </div>
                                    <Separator  className="mt-4"/>
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <Link
                                            href="/reseller/dashboard"
                                            className="flex justify-start"
                                        > 
                                            Intranet
                                        </Link>
                                    </div>
                                   
                                   
                                    <div className="grid grid-cols-1 items-center gap-4">
                                        <Link
                                            href="#"
                                            className="flex justify-start text-red-500"
                                        > 
                                            Salir
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}

                {token !== "usq@y" && (
                <div className="flex items-center space-x-2">
                    <Switch
                        id="production-mode"
                        checked={isProduction}
                        onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="production-mode">
                        {isProduction ? "Producción" : "Demo"}
                    </Label>
                </div>
                )}
                <p className="text-gray-500">|</p>
                <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                </Button>

                <ModeToggle />
            </div>

            <ModalEnviroment
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmProduction}
            />
        </header>
    )
}

export default HeaderComponent