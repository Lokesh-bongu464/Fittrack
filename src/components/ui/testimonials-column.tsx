"use client";

import React from "react";
import { motion } from "framer-motion";
import StarRating from "@/components/shared/StarRating";

type Testimonial = {
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
  image: string;
};

export function TestimonialsColumn(props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(
                ({ quote, image, name, role, rating }, i) => (
                  <div
                    className="rounded-3xl border bg-card p-8 shadow-lg shadow-primary/5 max-w-xs w-full"
                    key={i}
                  >
                    <StarRating rating={rating} size="sm" className="mb-3" />
                    <p className="text-sm leading-relaxed text-foreground/80">
                      &ldquo;{quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <div className="font-semibold text-sm tracking-tight leading-5">
                          {name}
                        </div>
                        <div className="text-xs leading-5 text-muted-foreground tracking-tight">
                          {role}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
}
