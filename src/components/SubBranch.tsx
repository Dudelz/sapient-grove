// Enhanced SubBranch.tsx with better label spacing and dynamic length adjustment
import React from "react";

// Define props expected for each SubBranch component
type SubBranchProps = {
  x1: number;      // Start X (base of main branch)
  y1: number;      // Start Y
  x2: number;      // End X (tip of main branch)
  y2: number;      // End Y
  label: string;   // Text label for the sub-branch
  labelX: number;  // Label X position
  labelY: number;  // Label Y position
  budget: number;  // Budget value used for scaling
  anchorX: number; // Actual starting X of sub-branch
  anchorY: number; // Actual starting Y of sub-branch
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
  anchorX,
  anchorY,
}: SubBranchProps) {
  // Dynamically scale stroke width for visibility, with a sensible minimum
  const strokeWidth = Math.max(3, budget / 5000);

  // Calculate sub-branch direction and length
  const angleRadians = Math.atan2(y2 - y1, x2 - x1);
  const angleDegrees = (angleRadians * 180) / Math.PI;

  // Adjust label along the sub-branch
  const offsetFactor = 0.6;
  const adjustedLabelX = anchorX + (x2 - anchorX) * offsetFactor;
  const adjustedLabelY = anchorY + (y2 - anchorY) * offsetFactor;

  return (
    <>
      {/* Draw the sub-branch line */}
      <line
        x1={anchorX}
        y1={anchorY}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth={strokeWidth}
      />

      {/* Label positioned along the sub-branch */}
      <text
        x={adjustedLabelX}
        y={adjustedLabelY}
        transform={`rotate(${angleDegrees} ${adjustedLabelX} ${adjustedLabelY})`}
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
