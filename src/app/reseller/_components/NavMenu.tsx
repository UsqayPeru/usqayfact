"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "Dashboard", href: "/reseller/dashboard" },
  { name: "Empresas", href: "/reseller/companies" },
  { name: "Integraciones", href: "/reseller/integrations" },
  { name: "Series", href: "/reseller/series" },
  { name: "Monitoreo", href: "/reseller/monitoring" },
  { name: "Logs", href: "/reseller/logs" },
]

export function NavMenu() {
  const pathname = usePathname()

  return (
    <nav className="w-full border-b bg-background">
      <div className="overflow-x-auto">
        <div className="flex h-12 items-center px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 p-2 h-22 text-sm transition-colors hover:bg-gray-100 hover:text-black rounded-lg relative",
                  isActive
                    ? "text-foreground font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

