export type SubBranchData = {
  name: string;
  budget: number;
};

export default class BranchModel {
    startX: number;
    startY: number;
    angle: number;
    budget: number;
  
    subBranches: SubBranchData[];

    constructor(startX: number, startY: number, angle: number, budget: number, subBranches: SubBranchData[] = []) {
      this.startX = startX;
      this.startY = startY;
      this.angle = angle;
      this.budget = budget;
      this.subBranches = subBranches;
    }
  
    getBranchLength(): number {
      return this.budget / 500;
    }
  
    getRadians(): number {
      return (this.angle * Math.PI) / 180;
    }
  
    getEndX(): number {
      return this.startX + this.getBranchLength() * Math.cos(this.getRadians());
    }
  
    getEndY(): number {
      return this.startY - this.getBranchLength() * Math.sin(this.getRadians());
    }
  
    getLabelPosition(offset: number = 20): { x: number; y: number } {
      return {
        x: this.startX + offset * Math.cos(this.getRadians()),
        y: this.startY - offset * Math.sin(this.getRadians()),
      };
    }

    getSubBranchPositions(offset: number = 40): { 
      x: number; 
      y: number; 
      labelX: number; 
      labelY: number; 
      name: string; 
      budget: number;
      anchorX: number;
      anchorY: number;
    }[] {
      const baseRadians = this.getRadians();
      const spacing = 20; // degrees between sub-branches
      const baseAngle = this.angle - ((this.subBranches.length - 1) * spacing) / 2;
      const branchLength = this.getBranchLength();
    
      return this.subBranches.map((sub, index) => {
        const angle = baseAngle + index * spacing;
        const radians = (angle * Math.PI) / 180;

        const length = sub.budget / 1000;
        const x = this.getEndX();
        const y = this.getEndY();

        // 🌿 Randomize the spawn point along the last 25% of the branch
        //const variation = 0.75 + Math.random() * 0.25; // 75% to 100% of branch length
        const spreadStart = 0.4; // 40% of main branch length
        const spreadEnd = 0.9;   // 90%
        const spreadRange = spreadStart + Math.random() * (spreadEnd - spreadStart);
        const anchorX = this.startX + branchLength * spreadRange * Math.cos(baseRadians);
        const anchorY = this.startY - branchLength * spreadRange * Math.sin(baseRadians); 

        const branchAngle = baseRadians;
        // Used to calculate sub-branch angle
        //const subAngle = radians;

        // Determin if sub-branch angle is clockwise or counter-clockwise compared to main branch angle
        // const angleDiff = subAngle - branchAngle;
        // const sideFactor = angleDiff > 0 ? 1 : -1; // Choose side of offset
        const mainVecX = Math.cos(branchAngle);
        const mainVecY = -Math.sin(branchAngle);

        const subVecX = Math.cos(radians);
        const subVecY = -Math.sin(radians);

        // Cross product to determine relative side
        const cross = mainVecX * subVecY - mainVecY * subVecX;
        const sideFactor = Math.sign(cross);


        // Calculate perpendicular angle
        const perpAngle = branchAngle + Math.PI / 2; // 90 degrees rotated

        // Offset by half of the branch thickness outward
        const branchThickness = Math.max(3, this.budget / 10000);
        const offsetX = sideFactor * (branchThickness / .75) * Math.cos(perpAngle);
        const offsetY = sideFactor * (branchThickness / .75) * Math.sin(perpAngle);

        //Adjust anchor point outward
        const finalAnchorX = anchorX + offsetX;
        const finalAnchorY = anchorY + offsetY;

        // 🌿 Calculate sub-branch endpoint from randomized anchor point
        const baseLength = 90; // minimum length
        const scaledLength = sub.budget / 500; //scale factor
        const subLength = Math.max(baseLength, scaledLength);
        const endX = anchorX + subLength * Math.cos(radians);
        const endY = anchorY - subLength * Math.sin(radians);

        // 🌿 Label slightly away from the branch 
        const labelX = anchorX + 20 * Math.cos(radians);
        const labelY = anchorY - 20 * Math.sin(radians);

    
        return {
          x: endX,
          y: endY,
          labelX,
          labelY,
          name: sub.name,
          budget: sub.budget,
          anchorX: finalAnchorX,
          anchorY: finalAnchorY,
        };
      });
    }
  }