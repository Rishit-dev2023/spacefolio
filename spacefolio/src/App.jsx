import { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const blackholeRef = useRef(null);
  const nebulaRef = useRef(null);
  const dissolveRef = useRef(null);
  const [loopStarted, setLoopStarted] = useState(false);
  const [showNebula, setShowNebula] = useState(false);

  useEffect(() => {
    const blackhole = blackholeRef.current;

    const handleTimeUpdate = () => {
      if (!loopStarted && blackhole.currentTime >= 28.95) {
        setLoopStarted(true);
        dissolveAndSwitch();
      }
    };

    blackhole.addEventListener("timeupdate", handleTimeUpdate);
    return () => blackhole.removeEventListener("timeupdate", handleTimeUpdate);
  }, [loopStarted]);

  const dissolveAndSwitch = () => {
    dissolveRef.current.classList.add("opacity-100");
    setTimeout(() => {
      setShowNebula(true);
      nebulaRef.current.play();
      dissolveRef.current.classList.remove("opacity-100");
    }, 1000);
  };

  useEffect(() => {
    const cursor = document.getElementById("customCursor");
    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX - 8}px, ${
        e.clientY - 8
      }px)`;
    };
    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="App">
      {/* Blackhole Video */}
      <video
        ref={blackholeRef}
        muted
        autoPlay
        playsInline
        className={`video-bg ${showNebula ? "hidden" : ""}`}
      >
        <source src="/assets/blackhole.mp4" type="video/mp4" />
      </video>

      {/* Nebula Video */}
      <video
        ref={nebulaRef}
        muted
        loop
        playsInline
        className={`video-bg transition-opacity duration-1000 ${
          showNebula ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/assets/nebula.mp4" type="video/mp4" />
      </video>

      {/* Dissolve Overlay */}
      <div ref={dissolveRef} className="dissolve-overlay"></div>

      {/* Cosmic Cursor */}
      <div className="cursor" id="customCursor"></div>

      {/* Content */}
      <div className="hero-section fade-up">
        <h1>Welcome to the Cosmos</h1>
        <p>
          “Love is the one thing we’re capable of perceiving that transcends
          dimensions of time and space.” – Interstellar
        </p>
      </div>
    </div>
  );
}

export default App;
