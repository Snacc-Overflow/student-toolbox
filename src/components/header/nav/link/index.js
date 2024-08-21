import React from "react";
import { motion } from "framer-motion";
import "./headerLink.css";

export default function Link({ data }) {
  return (
    <motion.a
      href={data.href}
      className="nav-link"
      whileHover={{ x: 15 }}
      whileTap={{ scale: 0.95 }}
    >
      {data.title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="arrow-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </motion.a>
  );
}
