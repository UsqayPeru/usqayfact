"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { loginAuthService } from "@/services/auth/login.service"
import cookies from 'js-cookie';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const [rememberMe, setRememberMe] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const router = useRouter()


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
        const result = await loginAuthService(email, password)

        if (result.status) {
          const user = result.data.retorno[0].username
          const emisores = result.data.retorno.map((item: any) => ({
            ruc: item["ruc"],
            id_local: item["id_local"],
            id_emisor: item["id_emisor"],
            nombre_comercial: item["nombre_comercial"],
            razon_social: item["razon_social"],
            usuario_sol: item["usuario_sol"],
            password_sol: item["password_sol"],
            client_id: item["client_id"],
            client_secret: item["client_secret"],
            username: item["username"],
            password: item["password"],
            apikey: item["apikey"],
            local: item['local']
          }));

          // Guardar en caché y cookie
          localStorage.setItem("emisores", JSON.stringify(emisores));
          cookies.set('uuidfact', JSON.stringify(user), { secure: true});

          router.push("/dashboard")
        } else {
          setError(result.message)
        }
      } catch (err) {
        console.log(err)
        setError("Ocurrio un error, vuelve a intentarlo.")
      } finally {
        setIsLoading(false)
      }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Iniciar sesión</h1>
        <p className="text-sm text-gray-500">
          Bienvenido a usqayfact sistema de facturación electronica.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              placeholder="jeasoncues@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Recuerdame
            </label>
          </div>
        
          <Link
            href="/recovery"
            className="text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Ingresar
        </Button>
       
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continúa con
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        
        <Button variant="outline" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
      </div>

      <div className="text-center text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
          Crear cuenta
        </Link>
      </div>
      
    </div>
  )
}

