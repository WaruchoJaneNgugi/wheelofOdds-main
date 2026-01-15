import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css";
import {SpinControls} from "./SpinControls.tsx";
import type {ColorBlock} from "../Utils/types.ts";
import {ResultPopup} from "./ResultPopUp.tsx";
import {Topbar} from "./Topbar.tsx";
import {useSpinAudio} from "../SpinOddsAudio/useSpinAudio.ts";

export const MainGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [winner, setWinner] = useState<ColorBlock | null>(null);
    const [betPoints, setBetPoints] = useState<number>(10);
    const [pointsWon, setPointsWon] = useState<number>(0);
    const [points, setPoints] = useState<number>(150);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [showPopUp,setShowpopUp]=useState<boolean>(false)
    // Initialize the audio hook
    const { playSpinCornerSnd, playSpinWheelLoop } = useSpinAudio(isMuted, true);

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
    };

    const handleSpin = () => {
        if (spinState) return;
        if(betPoints > points)return;
        setPoints(prev => prev - betPoints);
        setSpinState(true);

        // Play bet sound when spinning starts
        playSpinCornerSnd("PlaySnd");

        // Play wheel rolling sound for 3 seconds (adjust duration as needed)
        playSpinWheelLoop(3000);
    };

    // Reset spin state when winner is set (wheel stops)
    useEffect(() => {
        setShowpopUp(false);
        if (winner) {
            setShowpopUp(true);
            setSpinState(false); // Reset spin state immediately when wheel stops

            // Play win/lose sound based on result
            if (winner.multiplier !== 0) {
                playSpinCornerSnd("popUpWin");
                setShowpopUp(true);
                setTimeout(() => setShowpopUp(false), 2000);

            } else {
                setShowpopUp(true);

                playSpinCornerSnd("popUpLose");
                setTimeout(() => setShowpopUp(false), 2000);

            }
        }
    }, [winner, playSpinCornerSnd]);

    useEffect(() => {
        if (!winner) return;

        let payout = 0;

        if (winner.multiplier !== 0) {
            payout = betPoints * winner.multiplier;
            setPoints(prev => prev + payout);
            console.log("DEBUG - WIN! Payout:", payout);

            // Play bonus sound for big wins (optional - adjust threshold as needed)
            if (winner.multiplier >= 5) {
                playSpinCornerSnd("BonusWinSnd");
            }
        } else {
            payout = 0;
            console.log("DEBUG - LOSE! Landed on zero");
        }

        setPointsWon(payout);

    }, [betPoints, winner, playSpinCornerSnd]);

    // Play bet amount sound when bet amount changes
    useEffect(() => {
        if (betPoints > 20) { // Don't play on initial load
            playSpinCornerSnd("BetAmountSnd");
        }
    }, [betPoints, playSpinCornerSnd]);

    return (
        <div className="Spin-main-container">
            <div className="spin-main-game-area">
                <Topbar
                    points={Math.floor(points)}
                    onMuteToggle={handleMuteToggle}
                    isMuted={isMuted}
                />
                <div className="spin-game-area">

                    <Canvas
                        spinState={spinState}
                        OnSetWinner={setWinner}
                    />
                </div>
                <SpinControls
                    handleSpin={handleSpin}
                    spinState={spinState}
                    OnSetBetPoints={setBetPoints}
                    betPoints={betPoints}
                />
                {showPopUp && (
                    <ResultPopup
                        winner={winner ? winner.name : null}
                        pointsWon={pointsWon}
                        onClose={() => setWinner(null)}
                    />
                )}

            </div>
        </div>
    );
};