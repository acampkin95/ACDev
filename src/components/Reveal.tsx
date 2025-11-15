"use client";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type Props = PropsWithChildren<{
  delay?: number;
  className?: string;
}>;

export default function Reveal({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

