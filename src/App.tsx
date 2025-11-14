import { useState, useEffect } from 'react';
import './App.css';
import { MainGameArea } from "./Components/MainGameArea.tsx";

// Import all your images
import PointerImg from "./assets/img/scene/pointer-spin2.png";
import LogoImg from "./assets/img/scene/wheelofoddslogo.png";
// Add other images you use in your game

// Loader component with animated logo
const Loader: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const images = [
            PointerImg,
            LogoImg,
            // Add all other image paths you use in your game
        ];

        let loadedCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            setIsComplete(true);
            onLoadingComplete();
            return;
        }

        const handleImageLoad = () => {
            loadedCount++;
            const progress = (loadedCount / totalImages) * 100;
            setLoadingProgress(progress);

            if (loadedCount === totalImages) {
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(onLoadingComplete, 500); // Small delay for smooth transition
                }, 500);
            }
        };

        images.forEach((src) => {
            const img = new Image();
            img.onload = handleImageLoad;
            img.onerror = handleImageLoad; // Also count errors as "loaded" to prevent infinite loading
            img.src = src;
        });
    }, [onLoadingComplete]);

    if (isComplete) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#0a0e1a',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Animated Wheel of ODDS Logo */}
            <div style={{
                position: 'relative',
                marginBottom: '40px'
            }}>
                {/* Outer Ring Animation */}
                <div style={{
                    width: '200px',
                    height: '200px',
                    border: '4px solid #ffd60a',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'spin 3s linear infinite',
                    borderTop: '4px solid transparent',
                    borderRight: '4px solid #1a1f2e'
                }}></div>

                {/* Middle Ring */}
                <div style={{
                    width: '160px',
                    height: '160px',
                    border: '3px solid #ffd60a',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'spinReverse 2s linear infinite',
                    borderBottom: '3px solid transparent',
                    borderLeft: '3px solid #1a1f2e'
                }}></div>

                {/* Inner Ring */}
                <div style={{
                    width: '120px',
                    height: '120px',
                    border: '2px solid #ffd60a',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'spin 1.5s linear infinite',
                    borderTop: '2px solid transparent',
                    borderRight: '2px solid #1a1f2e'
                }}></div>

                {/* Logo Text */}
                <div style={{
                    position: 'relative',
                    textAlign: 'center',
                    zIndex: 10
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #ffd60a, #ff6b00, #ffd60a)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'shimmer 2s ease-in-out infinite',
                        margin: 0,
                        padding: '20px 0'
                    }}>
                        WHEEL
                    </h1>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #ff6b00, #ffd60a, #ff6b00)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'shimmer 2s ease-in-out infinite reverse',
                        margin: 0,
                        padding: '20px 0'
                    }}>
                        of ODDS
                    </h1>
                </div>
            </div>

            {/* Loading Progress Bar */}
            <div style={{
                width: '300px',
                height: '8px',
                backgroundColor: '#1a1f2e',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '20px'
            }}>
                <div style={{
                    width: `${loadingProgress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #ffd60a, #ff6b00)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease',
                    animation: 'pulse 1.5s ease-in-out infinite'
                }}></div>
            </div>

            {/* Loading Text */}
            <p style={{
                color: '#ffd60a',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textAlign: 'center',
                animation: 'fadeInOut 1.5s ease-in-out infinite'
            }}>
                Loading... {Math.round(loadingProgress)}%
            </p>

            {/* Add CSS animations */}
            <style>
                {`
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes spinReverse {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(-360deg); }
          }
          
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          
        `}
            </style>
        </div>
    );
};

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
            <MainGameArea />
        </>
    )
}

export default App