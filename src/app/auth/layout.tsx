import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login UsqayFact",
  description: "Sistema de facturación electronica"
}



export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex justify-center bg-white">
      <div className="w-full sm:w-full">
        {children}
      </div>
    </div>
  );
}