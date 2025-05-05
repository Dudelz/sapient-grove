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
      budget: number 
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
        const variation = 0.75 + Math.random() * 0.25; // 75% to 100% of branch length
        const anchorX = this.startX + branchLength * variation * Math.cos(baseRadians);
        const anchorY = this.startY - branchLength * variation * Math.sin(baseRadians); 


        // const endX = x + length * Math.cos(radians);
        // const endY = y - length * Math.sin(radians);
        // const labelX = x + 20 * Math.cos(radians);
        // const labelY = y - 20 * Math.sin(radians);

        // 🌿 Calculate sub-branch endpoint from randomized anchor point
        const subLength = sub.budget / 1000;
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
        };
      });
    }
  }