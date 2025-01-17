"use client"
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-700 to-blue-500 flex items-center justify-center">
      <motion.div
        className="text-center p-8 bg-white/20 backdrop-blur-md rounded-xl shadow-xl max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          ¡Bienvenido a <span className="text-orange-400">UsqayFact</span>!
        </motion.h1>
        <p className="text-white text-lg mb-6">
          La mejor solución para la gestión de facturación profesional.
        </p>
       <Link href="/dashboard">
       <motion.button
          className="bg-orange-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Empezar
        </motion.button>
       </Link>
      </motion.div>
    </div>
  );
}

