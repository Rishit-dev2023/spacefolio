import { useRef, useEffect, useState } from "react";
import "./App.css";
import emailjs from "@emailjs/browser";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const blackholeRef = useRef(null);
  const nebulaRef = useRef(null);
  const dissolveRef = useRef(null);
  const [transitioned, setTransitioned] = useState(false);

  const formRef = useRef();

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

  useEffect(() => {
    const blackhole = blackholeRef.current;
    const nebula = nebulaRef.current;

    let blackholeReady = false;
    let nebulaReady = false;

    const checkBothReady = () => {
      if (blackholeReady && nebulaReady) {
        setIsLoading(false);
      }
    };

    const handleBlackholeReady = () => {
      blackholeReady = true;
      checkBothReady();
    };

    const handleNebulaReady = () => {
      nebulaReady = true;
      checkBothReady();
    };

    if (blackhole) {
      if (blackhole.readyState >= 3) {
        handleBlackholeReady();
      } else {
        blackhole.addEventListener("canplaythrough", handleBlackholeReady);
      }
    }

    if (nebula) {
      if (nebula.readyState >= 3) {
        handleNebulaReady();
      } else {
        nebula.addEventListener("canplaythrough", handleNebulaReady);
      }
    }

    // Fallback timeout after 10s
    const timeoutId = setTimeout(() => {
      console.warn("⚠️ Loading fallback triggered after 10s.");
      setIsLoading(false);
    }, 10000);

    return () => {
      if (blackhole)
        blackhole.removeEventListener("canplaythrough", handleBlackholeReady);
      if (nebula)
        nebula.removeEventListener("canplaythrough", handleNebulaReady);
      clearTimeout(timeoutId);
    };
  }, []);

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
        delay = 1200; // Pause after full word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500;
      }

      setTimeout(type, delay);
    };

    type();
  }, []);

  return (
    <>
      {isLoading && (
        <div className={`loading-screen ${!isLoading ? "fade-out" : ""}`}>
          <div className="loader"></div>
          <p>🚀 Initiating Cosmic Interface...</p>
        </div>
      )}
      {/* 🔭 Blackhole Video */}
      <video
        ref={blackholeRef}
        className="video-bg"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/assets/blackhole.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* 🌌 Nebula Video */}
      <video
        ref={nebulaRef}
        className="video-bg hidden"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/assets/nebula.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* 🕳️ Dissolve Transition */}
      <div ref={dissolveRef} className="dissolve"></div>

      {/* 🚀 Navbar */}
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
              href="https://drive.google.com/file/d/1ufHTnnoqZAh_xlrmaPFbDeGjV05iQwFT/view?usp=sharing"
              style={{ color: "#ccc" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </nav>

      {/* ✨ Hero */}
      <section className="hero">
        <h2 className="hero-title" style={{ fontSize: "3.5rem" }}>
          Welcome to the Cosmos
        </h2>
        <p
          className="cosmic-quote"
          style={{ fontSize: "1.9rem", lineHeight: "1.8" }}
        >
          “Love is the one thing we're capable of perceiving that transcends
          dimensions of time and space.”
          <strong>– Interstellar</strong>
        </p>
      </section>

      {/* 🌌 About Section */}
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
          ⛰️ the quiet beauty of <strong>nature,</strong>,<br />
          🎶 the healing rhythm of <strong>music</strong>,<br />
          ✍️ the magic of <strong>words</strong>,<br />
          💻 the colorful lines of <strong>code</strong>,<br />
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

      {/* 🌌 Tech Stack section */}
      <section id="tech-stack" className="tech-stack-section">
        <h2
          className="section-title"
          style={{ fontSize: "2.8rem", color: "#FFFFFF", textAlign: "center" }}
        >
          🪐 Stacks in Zero Gravity
        </h2>

        <div class="floating-icons">
          <img src="/assets/HTML5.svg" class="tech-icon" />
          <img src="/assets/CSS3.svg" class="tech-icon" />
          <img src="/assets/JavaScript.svg" class="tech-icon" />
          <img src="/assets/react.svg" class="tech-icon" />
          <img src="/assets/Node.js.svg" class="tech-icon" />
          <img src="/assets/Tailwind CSS.svg" class="tech-icon" />
          <img src="/assets/MongoDB.svg" class="tech-icon" />
          <img src="/assets/Java.svg" class="tech-icon" />
          <img src="/assets/C.svg" class="tech-icon" />
          <img src="/assets/Cplus.svg" class="tech-icon" />
          <img src="/assets/Git.svg" class="tech-icon" />
          <img src="/assets/github-142-svgrepo-com.svg" class="tech-icon" />
          <img src="/assets/IntelliJ IDEA.svg" class="tech-icon" />
          <img
            src="/assets/Visual Studio Code (VS Code).svg"
            class="tech-icon"
          />
          <img src="/assets/Azure SQL Database.svg" class="tech-icon" />
        </div>
      </section>

      {/* 🚧 Projects Section */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="projects-grid">
          <div
            className="project-card hoverable"
            onClick={() =>
              window.open(
                "https://github.com/Rishit-dev2023/Kabadiwala",
                "_blank"
              )
            }
          >
            <h3>
              <u>♻️ Kabadiwala (In Progress⏳)</u>
            </h3>

            <p>
              Turning trash into change — Kabadiwala is a sustainable platform
              where users can schedule waste pickups, track segregation stats,
              and earn eco-points. Designed to make recycling effortless and
              rewarding.
            </p>
          </div>
          <div
            className="project-card hoverable"
            onClick={() => {
              alert(
                "🚨java.lang.StackOverflowError!!!🚨\nYou're inside a portfolio that recurses to itself. 🌀\nIf you know, you know 😉"
              );
              window.location.href = "https://spacefolio-two.vercel.app/";
            }}
          >
            <h3>
              <u>🚀 Spacefolio</u>
            </h3>
            <p>
              A cinematic portfolio drifting through blackholes and looping
              nebulas, crafted with React and cosmic vibes.
              <br />
              <span className="animate-pulse-danger">
                (⚠️ Do not Click here!!!)
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 📡 Contact Section */}
      <section id="contact" className="section">
        <h2>Contact</h2>
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
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
      {/* 🌌 Footer */}
      <footer className="footer">
        <div className="social-icons">
          <a
            href="https://www.linkedin.com/in/rishit-tripathy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/iconmonstr-linkedin-3.svg" alt="LinkedIn" />
          </a>
          <a href="mailto:rishittripathy2020@gmail.com">
            <img src="/assets/email-svgrepo-com.svg" alt="Email" />
          </a>
          <a
            href="https://github.com/Rishit-dev2023"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/github-142-svgrepo-com.svg" alt="GitHub" />
          </a>
          <a
            href="https://leetcode.com/u/rishittripathy2020/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/leetcode-svgrepo-com.svg" alt="LeetCode" />
          </a>
          <a
            href="https://codeforces.com/profile/rishittripathy2020"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/codeforces-svgrepo-com.svg" alt="Codeforces" />
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
