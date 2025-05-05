// src/components/SubBranch.tsx
import React from "react";

type SubBranchProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  labelX: number;
  labelY: number;
  budget: number;
};

export default function SubBranch({
  x1,
  y1,
  x2,
  y2,
  label,
  labelX,
  labelY,
  budget,
}: SubBranchProps) {
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="peru"
        strokeWidth={Math.max(2, budget / 10000)}
      />
      <text
        x={labelX}
        y={labelY}
        fill="black"
        fontSize="10"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ userSelect: "none" }}
      >
        {label}
      </text>
    </>
  );
}