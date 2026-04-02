"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ParallaxGallery({ images }: ParallaxGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Split images into two columns
  const leftColumn = images.filter((_, i) => i % 2 === 0);
  const rightColumn = images.filter((_, i) => i % 2 === 1);

  // Parallax: left column moves up, right column moves down
  const leftY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div ref={containerRef} className="w-full max-w-[900px] mx-auto">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column – shifts up */}
        <motion.div className="flex flex-col gap-4" style={{ y: leftY }}>
          {leftColumn.map((img) => (
            <div
              key={img.src}
              className="relative w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          ))}
        </motion.div>

        {/* Right Column – shifts down */}
        <motion.div className="flex flex-col gap-4 pt-12" style={{ y: rightY }}>
          {rightColumn.map((img) => (
            <div
              key={img.src}
              className="relative w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
