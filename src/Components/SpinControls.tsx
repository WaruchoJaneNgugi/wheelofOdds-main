import {type Dispatch, type FC, type SetStateAction} from "react";

interface SpinControlsProps {
    handleSpin: () => void;
    spinState: boolean;
    betPoints: number;
    OnSetBetPoints: Dispatch<SetStateAction<number>>;
}

export const SpinControls: FC<SpinControlsProps> = ({
                                                        handleSpin,
                                                        spinState,
                                                        betPoints,
                                                        OnSetBetPoints,
                                                    }) => {

    return (
        <div>
            <div className="Spin-main-controls">
                <div className="Bet-amount-area-spin">
                    <div className="bet-Amount-text">
                        <div>Bet Amounts</div>
                        <div>{betPoints} pts</div>
                    </div>

                    <div className="Bet-spin-area">
                        <div className="spin-short-bet">
                            {[10, 20, 50, 100, 250, 500].map((points) => (
                                <div
                                    className={`bet-short-spin ${betPoints === points ? "active-bet":""}`}
                                    key={points}
                                    onClick={() => OnSetBetPoints(points)}
                                >
                                    {points}
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