import React from "react";

type BranchProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  budget: number;
};

export default function Branch({ startX, startY, endX, endY, budget }: BranchProps) {
  const strokeWidth = Math.max(20, budget / 20000); // Adjust stroke width based on budget

  return (
    <line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke="sienna"
      strokeWidth={strokeWidth}
    />
  );
}