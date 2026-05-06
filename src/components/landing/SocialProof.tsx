"use client";

import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const brands = [
  { name: "Nike", icon: "https://cdn.simpleicons.org/nike" },
  { name: "Adidas", icon: "https://cdn.simpleicons.org/adidas" },
  { name: "Under Armour", icon: "https://cdn.simpleicons.org/underarmour" },
  { name: "Peloton", icon: "https://cdn.simpleicons.org/peloton" },
  { name: "Fitbit", icon: "https://cdn.simpleicons.org/fitbit" },
  { name: "Strava", icon: "https://cdn.simpleicons.org/strava" },
];

export default function SocialProof() {
  return (
    <section className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.p
          className="text-center text-sm font-medium text-muted-foreground mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by{" "}
          <span className="text-foreground font-semibold">10,000+</span>{" "}
          fitness enthusiasts worldwide
        </motion.p>

        {/* Infinite logo slider */}
        <div className="[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <InfiniteSlider gap={64} reverse speed={60} speedOnHover={20}>
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center gap-3 whitespace-nowrap"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.icon}
                  alt={brand.name}
                  className="h-7 w-7 md:h-8 md:w-8 dark:invert"
                  loading="lazy"
                  style={{ opacity: 0.7 }}
                />
                <span className="text-lg md:text-xl font-bold uppercase tracking-wider text-foreground/60">
                  {brand.name}
                </span>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
