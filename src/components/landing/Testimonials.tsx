"use client";

import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-column";
import { testimonials } from "@/lib/constants";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl text-center">
            Loved by{" "}
            <span className="text-primary">Fitness Enthusiasts</span>
          </h2>
          <p className="text-center mt-5 text-muted-foreground text-lg">
            See what our community has to say about their FitTrack experience.
          </p>
        </motion.div>

        {/* Scrolling Columns */}
        <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
