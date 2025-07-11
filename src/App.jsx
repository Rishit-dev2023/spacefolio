import { useRef, useEffect, useState, useCallback } from "react";
import "./App.css";
import emailjs from "@emailjs/browser";

// Import icons (ensure these paths are correct relative to your project structure)
import MuteIcon from "/assets/sound-off.svg";
import UnmuteIcon from "/assets/sound-on.svg";

// Tech Icons
import htmlIcon from "/assets/HTML5.svg";
import cssIcon from "/assets/CSS3.svg";
import jsIcon from "/assets/JavaScript.svg";
import reactIcon from "/assets/react.svg";
import nodeIcon from "/assets/Node.js.svg";
import tailwindIcon from "/assets/Tailwind CSS.svg";
import mongodbIcon from "/assets/MongoDB.svg";
import javaIcon from "/assets/Java.svg";
import cIcon from "/assets/C.svg";
import cppIcon from "/assets/Cplus.svg";
import gitIcon from "/assets/Git.svg";
import githubIcon from "/assets/github-142-svgrepo-com.svg";
import intellijIcon from "/assets/IntelliJ IDEA.svg";
import vscodeIcon from "/assets/Visual Studio Code (VS Code).svg";
import azureSqlIcon from "/assets/Azure SQL Database.svg";

// Social Icons
import linkedinSocialIcon from "/assets/iconmonstr-linkedin-3.svg";
import emailSocialIcon from "/assets/email-svgrepo-com.svg";
import githubSocialIcon from "/assets/github-142-svgrepo-com.svg";
import leetcodeSocialIcon from "/assets/leetcode-svgrepo-com.svg";
import codeforcesSocialIcon from "/assets/codeforces-svgrepo-com.svg";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState("blackhole"); // 'blackhole' or 'nebula'
  const [showDissolve, setShowDissolve] = useState(false); // Controls the dissolve overlay
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false); // New state for audio loading

  const blackholeVideoRef = useRef(null);
  const nebulaVideoRef = useRef(null);
  const audioRef = useRef(new Audio("/assets/interstellar-theme.mp3"));
  const formRef = useRef(null);

  // --- EmailJS Form Submission ---
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_xeyfein", // Replace with your EmailJS service ID
        "template_0e968uy", // Replace with your template ID
        formRef.current,
        "yKvWx_BBv2VFOVd8t" // Replace with your public key
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          alert("❌ Message failed to send.");
          console.error(error);
        }
      );
  };

  // --- Initial Video Loading & Loading Screen Logic ---
  useEffect(() => {
    const blackhole = blackholeVideoRef.current;
    let blackholeLoaded = false;

    const hideLoadingScreen = () => {
      setIsLoading(false);
      console.log("Loading screen hidden.");
    };

    const handleBlackholeCanPlay = () => {
      blackholeLoaded = true;
      hideLoadingScreen();
    };

    if (blackhole) {
      if (blackhole.readyState >= 3) {
        handleBlackholeCanPlay();
      } else {
        blackhole.addEventListener("canplay", handleBlackholeCanPlay);
      }
    }

    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.warn(
          "⚠️ Loading fallback triggered after 10s. Forcing loading screen hide."
        );
        hideLoadingScreen();
      }
    }, 10000);

    return () => {
      if (blackhole) {
        blackhole.removeEventListener("canplay", handleBlackholeCanPlay);
      }
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  // --- Video Transition Logic (Blackhole to Nebula) ---
  useEffect(() => {
    const blackhole = blackholeVideoRef.current;
    if (!blackhole) return;

    const handleTimeUpdate = () => {
      if (
        blackhole.currentTime >= blackhole.duration - 1.5 &&
        activeVideo === "blackhole"
      ) {
        setShowDissolve(true);
        setTimeout(() => {
          setActiveVideo("nebula");
          if (blackhole) blackhole.pause();
          setShowDissolve(false);
        }, 800);
      }
    };

    blackhole.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      blackhole.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [activeVideo]);

  // --- Audio Control Functions ---
  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .catch((err) =>
          console.warn("Audio play failed (user initiated):", err)
        );
    } else {
      audio.pause();
    }
  }, []);

  // --- Audio Event Listener Effect & Autoplay Delay ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.3;

    const handlePlay = () => setIsAudioPlaying(true);
    const handlePause = () => setIsAudioPlaying(false);
    const handleCanPlayThrough = () => {
      console.log("Audio is ready to play through.");
      setIsAudioLoaded(true); // Set audio as loaded
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("canplaythrough", handleCanPlayThrough); // Listen for canplaythrough

    const playTimeout = setTimeout(() => {
      audio.play().catch((err) => {
        console.warn("Audio autoplay blocked or failed after delay:", err);
        setIsAudioPlaying(false);
      });
    }, 7000);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      clearTimeout(playTimeout);
    };
  }, []);

  // --- Typewriting Effect for About Section ---
  useEffect(() => {
    const roles = [
      "CSE Undergrad at IIIT-Bh.",
      "Aspiring Developer.",
      "Cinema Freak.",
      "Astrophile 🚀",
    ];
    const el = document.getElementById("role-typing");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimer;

    const type = () => {
      const currentRole = roles[roleIndex];
      if (!el) return;

      if (isDeleting) {
        el.textContent = currentRole.substring(0, charIndex--);
      } else {
        el.textContent = currentRole.substring(0, charIndex++);
      }

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length + 1) {
        delay = 1200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500;
      }
      typingTimer = setTimeout(type, delay);
    };

    type();

    return () => clearTimeout(typingTimer);
  }, []);

  // --- Dynamic Tech Icon Positioning ---
  const techIconsData = [
    { src: htmlIcon, alt: "HTML5" },
    { src: cssIcon, alt: "CSS3" },
    { src: jsIcon, alt: "JavaScript" },
    { src: reactIcon, alt: "React" },
    { src: nodeIcon, alt: "Node.js" },
    { src: tailwindIcon, alt: "Tailwind CSS" },
    { src: mongodbIcon, alt: "MongoDB" },
    { src: javaIcon, alt: "Java" },
    { src: cIcon, alt: "C" },
    { src: cppIcon, alt: "C++" },
    { src: gitIcon, alt: "Git" },
    { src: githubIcon, alt: "GitHub" },
    { src: intellijIcon, alt: "IntelliJ IDEA" },
    { src: vscodeIcon, alt: "Visual Studio Code" },
    { src: azureSqlIcon, alt: "Azure SQL Database" },
  ];

  // Projects data
  const projectCards = [
    {
      title: "♻️ Kabadiwala ( In Progress⏳ )",
      description:
        "Turning trash into change — Kabadiwala is a sustainable platform where users can schedule waste pickups, track segregation stats, and earn eco-points. Designed to make recycling effortless and rewarding.",
      link: "https://github.com/Rishit-dev2023/Kabadiwala",
      warning: false,
    },
    {
      title: "🚀 Spacefolio",
      description: `Spacefolio — a cinematic portfolio orbiting through blackholes, dissolving into nebulas, and echoing with a cosmic tune in the background.
Crafted to feel less like a website, more like a voyage through spacetime.  `,
      link: "https://spacefolio-two.vercel.app/",
      warning: true,
      onClick: () => {
        alert(
          "🚨java.lang.StackOverflowError!!!🚨\nYou're inside a portfolio that recurses to itself. 🌀\nIf you know, you know 😉"
        );
        window.location.href = "https://spacefolio-two.vercel.app/";
      },
    },
  ];

  return (
    <>
      {/* --- Loading Screen --- */}
      {isLoading && (
        <div className="loading-screen">
          <div className="loader"></div>
          <p>🚀 Initiating Cosmic Interface...</p>
        </div>
      )}

      {/* --- Video Backgrounds --- */}
      <video
        ref={blackholeVideoRef}
        className={`video-bg ${activeVideo === "blackhole" ? "is-active" : ""}`}
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/assets/blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <video
        ref={nebulaVideoRef}
        className={`video-bg ${activeVideo === "nebula" ? "is-active" : ""}`}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop
      >
        <source src="/assets/nebula.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* --- Dissolve Transition Overlay --- */}
      <div className={`dissolve ${showDissolve ? "show" : ""}`}></div>

      {/* --- Navbar --- */}
      <nav className="navbar">
        <a
          href="https://spacefolio-two.vercel.app/"
          className="spacefolio-link"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h1>🌠 Rishit's Spacefolio</h1>
        </a>
        <ul style={{ display: "flex", gap: "2rem", fontSize: "1rem" }}>
          <li>
            <a href="#about" style={{ color: "#ccc" }}>
              About
            </a>
          </li>
          <li>
            <a href="#tech-stack" style={{ color: "#ccc" }}>
              TechStack
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
          <li>
            <a
              href="https://drive.google.com/file/d/1wtc5md-_SB6tOljpnlCIoD19yIWOvcy-/view?usp=sharing"
              style={{ color: "#ccc" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>

      {/* --- Audio Toggle Button --- */}
      {isAudioLoaded && ( // Only render the button if audio is loaded
        <button
          onClick={toggleAudio}
          className={`audio-toggle ${isAudioPlaying ? "glow" : "static"}`}
        >
          <img
            src={isAudioPlaying ? UnmuteIcon : MuteIcon}
            alt={isAudioPlaying ? "Sound On" : "Sound Off"}
          />
        </button>
      )}

      {/* --- Hero Section --- */}
      <section className="hero">
        <h2 className="hero-title">Welcome to the Cosmos</h2>
        <p className="cosmic-quote">
          “Love is the one thing we're capable of perceiving that transcends
          dimensions of time and space.”
          <strong>– Interstellar</strong>
        </p>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="about-section fade-in-enchant">
        <p className="about-intro">Hey, I'm</p>
        <h2 className="about-name">
          <span className="magic-letter">R</span>ISHIT{" "}
          <span className="magic-letter">T</span>RIPATHY<span>.</span>
        </h2>
        <p className="about-role">
          <span id="role-typing"></span>
        </p>

        <p className="about-description">
          <span style={{ fontSize: "2rem", fontWeight: "bold" }}>In</span>
          <br />
          ⛰️ the quiet beauty of <strong>nature,</strong>,
          <br />
          🎶 the healing rhythm of <strong>music</strong>,
          <br />
          ✍️ the magic of <strong>words</strong>,
          <br />
          💻 the colorful lines of <strong>code</strong>,
          <br />
          🌌 and the wonder of the <strong>stars</strong> —
          <span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            {" "}
            I find pieces of myself.
          </span>
          <br />
          <br />
          I’m a <strong>CSE undergrad</strong> 👨‍💻 with a soft corner for
          technology, astronomy and aerospace. A{" "}
          <strong>wannabe developer</strong>, yes — but also a{" "}
          <strong>cinephile</strong>, a <strong>part-time writer</strong> of
          thoughts that don’t always fit in words, and a{" "}
          <strong>full-time stargazer</strong> who believes “Somewhere,
          something incredible is waiting to be known.”
          <br />
          <br />
          Align our orbits — let's connect across space and time. 🚀💫
        </p>
      </section>

      {/* --- Tech Stack section --- */}
      <section id="tech-stack" className="tech-stack-section">
        <h2 className="section-title">🪐 Stacks in Zero Gravity</h2>
        <div className="floating-icons">
          {techIconsData.map((icon, index) => (
            <img
              key={index}
              src={icon.src}
              className="tech-icon"
              loading="lazy"
              alt={icon.alt}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projectCards.map((project, index) => (
            <div
              key={index}
              className="project-card hoverable"
              onClick={
                project.onClick || (() => window.open(project.link, "_blank"))
              }
            >
              <h3>
                <u>{project.title}</u>
              </h3>
              <p>
                {project.description}
                {project.warning && <br /> && (
                  <span className="animate-pulse-danger">
                    (⚠️ Do not Click here!!!)
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="section">
        <h2>Connect Across the Universe</h2>
        <p>Have a project in mind or just want to talk space? Reach out!</p>
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* --- Footer --- */}
      <footer className="footer">
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/rishit-tripathy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={linkedinSocialIcon} alt="LinkedIn" loading="lazy" />
          </a>
          <a href="mailto:rishittripathy2020@gmail.com">
            <img src={emailSocialIcon} alt="Email" loading="lazy" />
          </a>
          <a
            href="https://github.com/Rishit-dev2023"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubSocialIcon} alt="GitHub" loading="lazy" />
          </a>
          <a
            href="https://leetcode.com/u/rishittripathy2020/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={leetcodeSocialIcon} alt="LeetCode" loading="lazy" />
          </a>
          <a
            href="https://codeforces.com/profile/rishittripathy2020"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={codeforcesSocialIcon} alt="Codeforces" loading="lazy" />
          </a>
        </div>

        <p className="footer-quote">
          “Everything should not be alright for{" "}
          <span className="highlight">'alright'</span> to seem alright.”-
          Rishit✌️
        </p>

        <p className="footer-credit">
          © {new Date().getFullYear()} Rishit Tripathy. All galaxies reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
