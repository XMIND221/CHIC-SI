"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LogoMosaic() {
  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 via-white to-amber-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-amber-900 via-rose-400 to-amber-700 bg-clip-text text-transparent mb-4">
            L'Art de l'Élégance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez l'essence de Si-Chic à travers notre identité visuelle, symbole de raffinement et d'authenticité
            parisienne.
          </p>
        </motion.div>

        {/* Logo Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Brown Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="group relative"
          >
            <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-amber-100 overflow-hidden transform transition-all duration-500 group-hover:shadow-3xl">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-rose-50 opacity-50"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-amber-200/20 to-rose-200/20 rounded-full blur-3xl"></div>

              {/* Logo Container */}
              <div className="relative z-10 flex items-center justify-center h-64 lg:h-80">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20%C3%A0%2012.07.22_f9d2588c.jpg-3UitYCKzhu6QBUzao0DJP6FnNe2vJy.jpeg"
                  alt="Si-Chic Logo Marron - Élégance Classique"
                  width={280}
                  height={280}
                  className="object-contain filter drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Description */}
              <div className="relative z-10 text-center mt-6">
                <h3 className="text-xl font-playfair font-semibold text-amber-900 mb-2">Élégance Classique</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  La sophistication intemporelle dans sa forme la plus pure
                </p>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 right-6 w-1 h-1 bg-rose-300 rounded-full animate-pulse delay-1000"></div>
            </div>
          </motion.div>

          {/* Rose Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{ scale: 1.05, rotateY: -5 }}
            className="group relative"
          >
            <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-rose-100 overflow-hidden transform transition-all duration-500 group-hover:shadow-3xl">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-amber-50 opacity-50"></div>
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-rose-200/20 to-amber-200/20 rounded-full blur-3xl"></div>

              {/* Logo Container */}
              <div className="relative z-10 flex items-center justify-center h-64 lg:h-80">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-09-02%20%C3%A0%2012.07.22_97b28f5b.jpg-AcNoZRywQdKLnA3y953db4d91gt3me.jpeg"
                  alt="Si-Chic Logo Rose - Féminité Moderne"
                  width={280}
                  height={280}
                  className="object-contain filter drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Description */}
              <div className="relative z-10 text-center mt-6">
                <h3 className="text-xl font-playfair font-semibold text-rose-900 mb-2">Féminité Moderne</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  L'expression contemporaine de la grâce et du raffinement
                </p>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-6 right-4 w-2 h-2 bg-rose-300 rounded-full animate-pulse delay-500"></div>
              <div className="absolute bottom-4 left-6 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-1500"></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Decorative Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">
            Maison de Couture Parisienne • Depuis 2024
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
            <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
