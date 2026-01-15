import { Target, Coins, TrendingUp, RotateCcw, Sparkles, Crown } from 'lucide-react';
import type { FC } from "react";
import { initialColors } from "../Hooks/useColors.ts";

export const HowToPlay: FC = () => {
    // Filter to show only one of each color type with the highest multiplier
    const filteredColors = initialColors.reduce((acc, color) => {
        // Skip black/zero segments
        if (color.multiplier === 0) return acc;

        // Find existing color in accumulator
        const existingColor = acc.find(c => c.hex === color.hex);

        if (!existingColor) {
            // If color doesn't exist, add it
            acc.push(color);
        } else {
            // If color exists, keep the one with higher multiplier
            if (color.multiplier > existingColor.multiplier) {
                const index = acc.indexOf(existingColor);
                acc[index] = color;
            }
        }

        return acc;
    }, [] as typeof initialColors);

    // Sort by multiplier value (descending) for consistent display
    const sortedColors = filteredColors.sort((a, b) => b.multiplier - a.multiplier);

    // Get black segment info
    const blackSegment = initialColors.find(color => color.multiplier === 0);
    const blackHex = blackSegment?.hex || '#1a1f2e';

    return (
        <div className="how-to-play">
            <h3 className="content-title">How to Play Wheel of ODDs</h3>

            <div className="instructions-grid">
                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Coins size={24} />
                    </div>
                    <h4>Place Your Points Bet</h4>
                    <p>Select how many points to bet from available options (10, 20, 50, 100, 250, 500 points)</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <Target size={24} />
                    </div>
                    <h4>Spin the Wheel</h4>
                    <p>Click SPIN to start the wheel and watch where it lands. No color selection needed!</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <RotateCcw size={24} />
                    </div>
                    <h4>Win Points</h4>
                    <p>Win your bet multiplied by the multiplier shown on the segment where the wheel stops</p>
                </div>

                <div className="instruction-card">
                    <div className="instruction-icon">
                        <TrendingUp size={24} />
                    </div>
                    <h4>Collect Rewards</h4>
                    <p>Higher multipliers = bigger point rewards! Land on zero and you lose your bet points</p>
                </div>
            </div>

            <div className="game-rules">
                <h4>Game Rules</h4>
                <ul>
                    <li>Start with 150 points to play with</li>
                    <li>Each spin costs points based on your bet amount</li>
                    <li>The wheel contains segments with multipliers from 1x to 3x</li>
                    <li>Black segments (zero) result in losing your bet points</li>
                    <li>Win only if the wheel stops on a multiplier segment</li>
                    <li>Points balance updates automatically after each spin</li>
                    <li>Manage your points wisely - they're your game currency!</li>
                    <li>The goal is to maximize your points through strategic betting</li>
                </ul>
            </div>

            <div className="multiplier-info">
                <h4>Multiplier Values & Colors</h4>
                <div className="multiplier-list">
                    {sortedColors.map((color, index) => (
                        <div key={index} className="multiplier-item">
                            <span
                                className="color-dot"
                                style={{
                                    backgroundColor: color.hex,
                                    boxShadow: `0 0 10px ${color.hex}`
                                }}
                            ></span>
                            <span>
                                <span className="color-name" style={{ color: color.hex, fontWeight: 'bold' }}>
                                    {getColorName(color.hex)}:
                                </span> Up to {color.multiplier}x
                            </span>
                        </div>
                    ))}
                    <div className="multiplier-item">
                        <span
                            className="color-dot"
                            style={{
                                backgroundColor: blackHex,
                                boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)'
                            }}
                        ></span>
                        <span>
                            <span style={{ color: '#ccc', fontWeight: 'bold' }}>Black:</span> Lose bet points (0x)
                        </span>
                    </div>
                </div>
                <p className="rule-note">Note: Higher multipliers appear less frequently on the wheel!</p>
            </div>

            <div className="points-tips">
                <h4>Points Strategy Tips</h4>
                <ul>
                    <li>Start with smaller point bets (10-50) to understand the game mechanics</li>
                    <li>Higher point bets = higher potential rewards but more risk</li>
                    <li>Track your points balance - don't bet more than you can afford to lose</li>
                    <li>The wheel is random - there's no guaranteed winning strategy</li>
                    <li>Have fun! The goal is entertainment, not just accumulating points</li>
                    <li>Remember: Black segments mean you lose your bet points</li>
                </ul>
            </div>

            <div className="wheel-facts">
                <h4>Wheel Facts</h4>
                <div className="facts-grid">
                    <div className="fact-item">
                        <Sparkles size={16} />
                        <span>{initialColors.length} segments total on the wheel</span>
                    </div>
                    <div className="fact-item">
                        <Crown size={16} />
                        <span>Highest multiplier: {sortedColors[0]?.multiplier}x (appears only once!)</span>
                    </div>
                    <div className="fact-item">
                        <Target size={16} />
                        <span>{initialColors.filter(c => c.multiplier > 0).length} multiplier segments</span>
                    </div>
                    <div className="fact-item">
                        <RotateCcw size={16} />
                        <span>{initialColors.filter(c => c.multiplier === 0).length} black segments</span>
                    </div>
                </div>
                <p className="probability-note">
                    {(initialColors.filter(c => c.multiplier > 0).length / initialColors.length * 100).toFixed(0)}% chance to win on each spin! Good luck!
                </p>
            </div>
        </div>
    );
};

// Helper function to get color name from hex
function getColorName(hex: string): string {
    const colorMap: Record<string, string> = {
        'rgb(6,0,148)': 'Dark Blue',
        '#ffd60a': 'Yellow',
        'rgb(253,114,40)': 'Orange',
        '#8B0000': 'Red'
    };

    return colorMap[hex] || 'Color';
}