"use client";

import React from "react";

export function MotionBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Static Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 dark:opacity-20" />
    </div>
  );
}
