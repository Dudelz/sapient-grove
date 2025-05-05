// src/components/BranchLabel.tsx
import React from "react";

type BranchLabelProps = {
  label: string;
  angle: number;
  x: number;
  y: number;
};

function normalizeLabelAngle(angle: number): number {
  // Flip the label to keep it readable
  return angle > 90 && angle < 270 ? angle + 180 : angle;
}

export default function BranchLabel({ label, angle, x, y }: BranchLabelProps) {
  return (
    <text
      x={x}
      y={y}
      transform={`rotate(${normalizeLabelAngle(angle)} ${x} ${y})`}
      fill="white"
      fontSize="12"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ userSelect: "none" }}
    >
      {label}
    </text>
  );
}