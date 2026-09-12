"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, X } from "lucide-react";

const galleryCategories = ["All", "Classrooms", "Activities", "Events", "Campus"];

const galleryImages = [
  {
    id: 1,
    title: "Fun Learning in Class",
    category: "Classrooms",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: 2,
    title: "Art & Craft Session",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Annual Sports Day",
    category: "Events",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Safe Play Area",
    category: "Campus",
    image: "https://images.unsplash.com/photo-1545972154-9bb223aac798?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: 5,
    title: "Group Storytelling",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    title: "Cultural Program",
    category: "Events",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 7,
    title: "Science & Discovery Lab",
    category: "Classrooms",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
  {
    id: 8,
    title: "Outdoor Playground Fun",
    category: "Campus",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 9,
    title: "Music & Rhythm Time",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 10,
    title: "Happy Graduation Moments",
    category: "Events",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    span: "col-span-1 row-span-1",
  },
];

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages = activeTab === "All"
    ? galleryImages
    : galleryImages.filter((item) => item.category === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-slate-950 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-slate-800 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
              Campus Gallery
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Glimpses of <span className="text-emerald-600 dark:text-emerald-400">Our Happy Kids</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
              A visual journey through our classrooms, vibrant activities, and joyful moments.
            </p>
          </motion.div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {galleryCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === category
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          <AnimatePresence>
            {filteredImages.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-slate-200/50 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 ${item.span}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative h-[60vh] w-full bg-slate-950">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 block">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedImage.title}
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}