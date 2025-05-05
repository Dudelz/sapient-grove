// src/App.tsx
import React from 'react'
import Trunk from "./components/Trunk";
import { businessFinance } from "./data/businessFinance";
import Branch from "./components/Branch";
import SubBranch from "./components/SubBranch";
import BranchLabel from "./components/BranchLabel";
import BranchModel from "./models/BranchModel";



export default function App() {
  const departmentEntries = Object.entries(businessFinance.departments);

  const angles = [175, 120, 60, 5];
  const labelAngles = [...angles].reverse(); // ← Rotations go right → left
  const trunkWidth = 75; // Width of the trunk
  const startY = 400; // base Y-coordinate of the trunk meets the branches
  const trunkCenterX = 300; // Middle of the trunk position
  const trunkLeftX = trunkCenterX - trunkWidth / 2; 
  const trunkRightX = trunkCenterX + trunkWidth / 2; 

  
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>🌳 Welcome to The Sapient Grove</h1>
      <svg width="100%" height="600px" viewBox="0 0 600 600">
        {/* Trunk */}
        <Trunk centerX={300} centerY={400} width={75} height={150}/>

        {/* Main branches */}
        {departmentEntries.map(([deptName, dept], index) => {
          const angle = angles[index]; // Space the branches apart
          const labelAngle = labelAngles[index]; // for label orientation// for label orientation
          // const radians = (angle * Math.PI) / 180;
          // const branchLength = dept.budget / 500; // Make length relative to budget
          //const branchLength = dept.budget / 3000; // Make length relative to budget
          const numberOfBranches = departmentEntries.length;
          const spacing = trunkWidth / (numberOfBranches - 1); // Divide evenly
          const startX = trunkLeftX + spacing * index; 
          const startY = 400;
          
          // Using model to encapsulate the logic
          //const branch = new BranchModel(startX, startY, angle, dept.budget, dept.subBranches || []);
          const subBranchList = Object.entries(dept.subcategories || {}).map(([name, budget]) => ({
            name,
            budget
          }));
          const branch = new BranchModel(startX, startY, angle, dept.budget, subBranchList);
          // const endX = startX + branchLength * Math.cos(radians);
          // const endY = startY - branchLength * Math.sin(radians);
          const endX = branch.getEndX();
          const endY = branch.getEndY();
          const { x: labelX, y: labelY } = branch.getLabelPosition();
          

          //const labelOffset = 20; // Distance to push labels outward from the start
          // const labelX = startX + labelOffset * Math.cos(radians);
          // const labelY = startY - labelOffset * Math.sin(radians);

          return (
            <g key={deptName}>
              {/* Branch line*/}
              <Branch
                startX={startX}
                startY={startY}
                endX={endX}
                endY={endY}
                budget={dept.budget}
              />

              {/* Department Label */}
              <BranchLabel
                label={deptName}
                angle={labelAngle}
                x={labelX}
                y={labelY}
              />

              {/* Sub-branches rendered here */}
              {branch.getSubBranchPositions().map((sub, i) => (
                <SubBranch
                  key={`${deptName}-sub-${i}`}
                  x1={endX}
                  y1={endY}
                  x2={sub.x}
                  y2={sub.y}
                  label={sub.name}
                  labelX={sub.labelX}
                  labelY={sub.labelY}
                  budget={sub.budget}
                />
              ))}
            </g> 
          );
        })}
      </svg>
    </div>
  )
}