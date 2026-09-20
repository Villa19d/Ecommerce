import React from 'react';

export default function Logo({ className = "h-9 w-auto" }) {
  return (
    <svg
      viewBox="0 0 340 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Isotipo */}
      <rect x="2" y="2" width="60" height="60" rx="14" className="fill-[#0F172A] dark:fill-white" />
      <path
        d="M20 22H24L27 40H43L46 26H28"
        className="stroke-white dark:stroke-[#0F172A]"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30" cy="46" r="2.5" className="fill-white dark:fill-[#0F172A]" />
      <circle cx="40" cy="46" r="2.5" className="fill-white dark:fill-[#0F172A]" />
      <path
        d="M37 20L31 29H38L33 36"
        className="stroke-[#F59E0B] dark:stroke-[#FBBF24]"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Texto adaptativo */}
      <text
        x="75"
        y="38"
        className="fill-[#0F172A] dark:fill-[#FFFFFF]"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="1.5"
      >
        NITRO<tspan className="fill-[#2563EB] dark:fill-[#38BDF8]">STORE</tspan>
      </text>

      {/* Subtítulo adaptativo */}
      <text
        x="76"
        y="53"
        className="fill-[#64748B] dark:fill-[#94A3B8]"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="600"
        letterSpacing="3"
      >
        E-COMMERCE DEMO
      </text>
    </svg>
  );
}
