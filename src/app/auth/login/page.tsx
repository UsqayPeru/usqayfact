import { Metadata } from "next"
import { UserAuthForm } from "./_components/UserAuthForm"
import { FloatingCards } from "@/components/floating/FloatingCard"

export const metadata: Metadata = {
  title: "Login | UsqayFact",
  description: "Sistema de facturación electronica.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-blue-600 p-10 text-white lg:flex">
        <div className="relative z-10 flex w-full flex-col items-start">
          <FloatingCards />
          <div className="mt-auto">
            <h1 className="text-4xl font-bold leading-tight text-white">
              UsqayFact
            </h1>
            <p className="mt-4 max-w-sm text-lg text-blue-100">
              Sistema de facturación electronica de Perú.
            </p>
          </div>
          {/* Decorative dots */}
          <div className="mt-8 flex gap-2">
            <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white opacity-50"></div>
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute left-4 top-4 h-8 w-8 rounded-full bg-blue-500 opacity-20"></div>
        <div className="absolute right-72 top-4 h-16 w-16 rounded-full bg-blue-500 opacity-20"></div>
        <div className="absolute bottom-8 right-8 h-16 w-16 rounded-full bg-blue-500 opacity-20"></div>
        <div className="absolute right-24 top-1/4 h-12 w-12 rounded-full bg-blue-500 opacity-20"></div>
      </div>

      {/* Right Section */}
      <div className="flex w-full items-center justify-center bg-white px-4 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}

