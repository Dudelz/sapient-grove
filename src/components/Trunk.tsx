// src/components/Trunk.tsx
import React from 'react';

type TrunkProps = {
    centerX: number;
    centerY: number;
    width: number;
    height: number;  
};

export default function Trunk({ centerX, centerY, width, height }: TrunkProps) {
    const x = centerX - width / 2; // Calculate the x position to center the trunk
    const y = centerY; // Y position of the trunk base  

    return (
        <rect 
            x={x} 
            y={y} 
            width={width} 
            height={height} 
            fill="saddlebrown" 
        />
    );
}