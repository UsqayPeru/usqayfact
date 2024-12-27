"use client"

import { motion } from "framer-motion"
import { Store } from "lucide-react"

export function FloatingCards() {
  return (
    <div className="relative h-80 w-full">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-10 w-64 rounded-xl bg-white p-4 shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 text-zinc-600">
            <Store className="mx-auto mt-3" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Usqay POS</h3>
            </div>
            <p className="text-sm text-gray-500">100+</p>
          </div>
        </div>
      </motion.div>
      

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute right-10 top-20 w-32 rounded-xl bg-orange-400 p-4 text-white shadow-lg"
      >
        <div className="space-y-2">
          <div className="h-8 w-full rounded-md bg-orange-300"></div>
          <p className="text-2xl font-bold">103</p>
          <p className="text-sm">Total clientes</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-20 w-48 rounded-xl bg-white p-4 shadow-lg"
      >
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">Usqay Restaurantes</h3>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full bg-blue-600"
                style={{
                  opacity: i * 0.2,
                }}
              ></div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

