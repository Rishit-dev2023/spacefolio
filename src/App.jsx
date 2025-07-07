import { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const blackholeRef = useRef(null);
  const nebulaRef = useRef(null);
  const dissolveRef = useRef(null);
  const [transitioned, setTransitioned] = useState(false);

  // Video time trigger
  useEffect(() => {
    const bh = blackholeRef.current;

    const handleTime = () => {
      if (!transitioned && bh.currentTime >= 28.95) {
        setTransitioned(true);
        startTransition();
      }
    };

    bh.addEventListener("timeupdate", handleTime);
    return () => bh.removeEventListener("timeupdate", handleTime);
  }, [transitioned]);

  const startTransition = () => {
    // Show dissolve layer
    dissolveRef.current.classList.add("show");

    setTimeout(() => {
      blackholeRef.current.style.display = "none";
      nebulaRef.current.classList.remove("hidden");
      nebulaRef.current.classList.add("fade-in");
      nebulaRef.current.play();

      setTimeout(() => {
        dissolveRef.current.classList.remove("show");
      }, 600);
    }, 1000);
  };

  return (
    <>
      {/* 🔭 Blackhole Video */}
      <video ref={blackholeRef} muted autoPlay playsInline className="video-bg">
        <source src="/assets/blackhole.mp4" type="video/mp4" />
      </video>

      {/* 🌌 Nebula Video */}
      <video ref={nebulaRef} muted loop playsInline className="video-bg hidden">
        <source src="/assets/nebula.mp4" type="video/mp4" />
      </video>

      {/* 🕳️ Dissolve Transition */}
      <div ref={dissolveRef} className="dissolve"></div>

      {/* 🚀 Navbar */}
      <nav className="navbar">
        <h1>🌠 Rishit's Spacefolio</h1>
        <ul style={{ display: "flex", gap: "1rem", fontSize: "0.9rem" }}>
          <li>
            <a href="#about" style={{ color: "#ccc" }}>
              About
            </a>
          </li>
          <li>
            <a href="#projects" style={{ color: "#ccc" }}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" style={{ color: "#ccc" }}>
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* ✨ Hero */}
      <section className="hero">
        <h2>Welcome to the Cosmos</h2>
        <p>
          “Love is the one thing we're capable of perceiving that transcends
          dimensions of time and space.” – Interstellar
        </p>
      </section>
    </>
  );
}

export default App;
