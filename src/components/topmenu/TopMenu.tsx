"use client";

import cookies from 'js-cookie';
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaStore } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { PiSignOutBold } from "react-icons/pi";
import * as React from "react"
import { BellOff } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, usePathname } from "next/navigation";
import { Separator } from '../ui/separator';


export const TopMenu = () => {

  const router = useRouter();
  const pathname = usePathname()

  const [isUser, setIsUser] = useState("");

  const [loaded, setLoaded] = useState<boolean>(false);

  const [isClient, setIsClient] = useState(false);

  const [showTour, setShowTour] = useState(false);

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")


  useEffect(() => {
    
    const user = cookies.get('uuidfact');
    if (user) {
      const data = JSON.parse(user ?? '')
      setIsUser(data)
    }
    setLoaded(true);
    setIsClient(true)

  }, []);


  return (
    <>
        
      <nav className="flex px-5 justify-between items-center w-full bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="#">
            <span className="font-bold text-black text-1xl logo flex items-center">
              {" "}
              
               Usqayfact
              <button
                className="m-2 p-2 rounded-md transition-all font-bold hover:text-[#010B51] side-menu-button"
              >
                {/* <FaBars size={17} /> */}
              </button>
            </span>

          </Link>
        </div>

        <div className="flex items-center">

          {/* TODO: AYUDA  */}
          <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Notificaciones</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-bold  text-md leading-none">Notificaciones</h4>
                        <p className="text-sm text-muted-foreground">
                            Comprobantes electrónicos en cola.
                        </p>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                        <div className="grid grid-cols-1 items-center gap-4">
                            <BellOff size={50} className='mx-auto text-gray-400' />
                            <p className='text-xs text-gray-400 text-center'>Por el momento no esta disponible</p>
                        </div>
                    </div>
                </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button
                onClick={() => console.log('Hola')}
                className="m-2 p-2 rounded-md transition-all font-bold hover:text-[#010B51] help-button"
              >
                <FiHelpCircle size={20} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="bg-[#111827]  text-white text-sm font-medium p-2 rounded-xl shadow-lg border w-40">
              Puedes comunicarte con desarrollo para resolver tus dudas.
            </PopoverContent>
          </Popover>


          <button
            className="m-2 p-2 rounded-md transition-all font-semibold hover:text-[#010B51] logout-button"
          >
            <PiSignOutBold size={20} />
          </button>

          {!loaded ? (
            <div className="animate-pulse rounded-full bg-gray-300 p-2 w-10 h-10"></div>
          ) : (
            <span className="rounded-full bg-[#0066C8] text-white p-2 w-10 text-center font-semibold border border-[#0066C8] user-avatar cursor-pointer">
              {isUser.charAt(0).toLocaleUpperCase()}
            </span>
          )}
        </div>
      </nav>
    </>
  );
};
