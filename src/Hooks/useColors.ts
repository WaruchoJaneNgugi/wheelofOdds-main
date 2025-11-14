import type {ColorBlock, ControlButton} from "../Utils/types.ts";
import {useEffect, useRef} from "react";

// More player-friendly version
export const initialColors: ColorBlock[] = [
    // High multipliers
    { id: 1, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 2, name: "8x", hex: "rgb(6,0,148)", multiplier: 8.0 },
    { id: 3, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 4, name: "6x", hex: "#ffd60a", multiplier: 6.0 },
    { id: 5, name: "", hex: "#1a1f2e", multiplier: 0 },

    { id: 6, name: "4x", hex: "rgb(253,114,40)", multiplier: 4.0 },
    { id: 7, name: "", hex: "#1a1f2e", multiplier: 0 },

    // Medium multipliers
    { id: 8, name: "2.5x", hex: "rgb(6,0,148)", multiplier: 2.5 },
    { id: 9, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 10, name: "2x", hex: "#ffd60a", multiplier: 2.0 },
    { id: 11, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 12, name: "1.8x", hex: "rgb(253,114,40)", multiplier: 1.8 },
    { id: 13, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 14, name: "1.5x", hex: "rgb(6,0,148)", multiplier: 1.5 },

    // Low multipliers
    { id: 15, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 16, name: "1.3x", hex: "#ffd60a", multiplier: 1.3 },
    { id: 17, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 18, name: "1.2x", hex: "rgb(253,114,40)", multiplier: 1.2 },
    { id: 19, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 20, name: "1.1x", hex: "rgb(6,0,148)", multiplier: 1.1 },
    { id: 21, name: "", hex: "#1a1f2e", multiplier: 0 },
    { id: 22, name: "1x", hex: "#ffd60a", multiplier: 1.0 },
];

export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined); // ✅ provide initial value
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

export const controls: ControlButton[] = [
    { label: "orange", type: "range", value: "high" },
    { label: "Low (1-10)", type: "range", value: "low" },
];