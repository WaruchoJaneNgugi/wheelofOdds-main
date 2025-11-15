import {type Dispatch, type FC, type SetStateAction} from "react";

interface SpinControlsProps {
    handleSpin: () => void;
    spinState: boolean;
    betAmount: number;
    OnSetBetAmount: Dispatch<SetStateAction<number>>;
}

export const SpinControls: FC<SpinControlsProps> = ({
                                                        handleSpin,
                                                        spinState,
                                                        betAmount,
                                                        OnSetBetAmount,
                                                    }) => {
    // Get unique non-zero multiplier colors (highest multiplier for each color)
    // const uniqueColorControls = () => {
    //     const colorMap = new Map();
    //
    //     initialColors
    //         .filter(color => color.multiplier > 0)
    //         .forEach(color => {
    //             // For each color hex, keep the one with the highest multiplier
    //             if (!colorMap.has(color.hex) || color.multiplier > colorMap.get(color.hex).multiplier) {
    //                 colorMap.set(color.hex, color);
    //             }
    //         });
    //
    //     return Array.from(colorMap.values()).map(color => ({
    //         label: `${color.multiplier}x`,
    //         type: "range" as const,
    //         value: color.multiplier.toString(),
    //         color: color.hex,
    //         text: color.multiplier === 8 ? "Blue" : (color.multiplier === 6 ? "Yellow" : "Orange")
    //     }));
    // };

    // const handleControlClick = (btn: ReturnType<typeof uniqueColorControls>[0]) => {
    //     OnSetActive((prev) => {
    //         if (btn.type === "range") {
    //             return {...prev, range: btn.value};
    //         }
    //         return prev;
    //     });
    // };
    //
    // const colorControls = uniqueColorControls();

    return (
        <div>
            <div className="Spin-main-controls">
                <div className="Bet-amount-area-spin">
                    <div className="bet-Amount-text">
                        <div>Bet Amount</div>
                        <div>{betAmount}</div>
                    </div>

                    <div className="Bet-spin-area">
                        <div className="spin-short-bet">
                            {[10, 50, 100,250, 500].map((amount) => (
                                <div
                                    className={`bet-short-spin ${betAmount === amount ? "active-bet":""}`}
                                    key={amount}
                                    onClick={() => OnSetBetAmount(amount)}
                                >
                                    {amount}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Color selection buttons */}


                <div
                    className={`control-spin-btn ${spinState ? "active-spin" : "Spin"}`}
                    onClick={() => {
                        if (spinState) {
                            return;
                        }
                        handleSpin();
                    }}
                >
                    {spinState ? "Spinning..." : "Spin"}
                </div>
            </div>
        </div>
    );
};