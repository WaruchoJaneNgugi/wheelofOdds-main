import {Canvas} from "./Canvas";
import {useEffect, useState} from "react";
import "../assets/maincss.css";
import {SpinControls} from "./SpinControls.tsx";
import type {ColorBlock} from "../Utils/types.ts";
import {ResultPopup} from "./ResultPopUp.tsx";
import {Topbar} from "./Topbar.tsx";

export const MainGameArea = () => {
    const [spinState, setSpinState] = useState<boolean>(false);
    const [winner, setWinner] = useState<ColorBlock | null>(null);
    const [betAmount, setBetAmount] = useState<number>(20);
    const [amountWon, setAmountWon] = useState<number>(0);
    const [balance, setBalance] = useState<number>(1000);
    const [isMuted, setIsMuted] = useState<boolean>(false);


    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
    };

    const handleSpin = () => {
        if (spinState) return;
        setBalance(prev => prev - betAmount);
        setSpinState(true);
    };

    // Reset spin state when winner is set (wheel stops)
    useEffect(() => {
        if (winner) {
            setSpinState(false); // Reset spin state immediately when wheel stops
        }
    }, [winner]);

    useEffect(() => {
        if (!winner) return;

        let payout = 0;


        if (winner.multiplier !== 0) {
            payout = betAmount * winner.multiplier;
            setBalance(prev => prev + payout);
            console.log("DEBUG - WIN! Payout:", payout);
        } else {
            payout = 0;
            console.log("DEBUG - LOSE! Landed on zero");
        }

        setAmountWon(payout);

    }, [betAmount, winner]);

    return (
        <div className="Spin-main-container">
            <div className="spin-main-game-area">
                <Topbar
                    balance={balance}
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
                    OnSetBetAmount={setBetAmount}
                    betAmount={betAmount}
                />
                <ResultPopup
                    winner={winner ? winner.name : null}
                    amountWon={amountWon}
                    onClose={() => setWinner(null)}
                />
            </div>
        </div>
    );
};