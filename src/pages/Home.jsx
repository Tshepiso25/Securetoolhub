import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Seo from '../components/Seo'

import {
  Lock,
  Braces,
  Cog,
  Globe,
  BadgeCheck,
  Hash,
  QrCode,
  KeyRound,
  Regex,
  Clock3,
  ShieldCheck
} from 'lucide-react'

function Home() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const tools = [
    {
      icon: <Lock />,
      title: "Password Generator",
      description: "Create strong, random passwords instantly.",
      link: "/password-generator",
      category: "Security"
    },
    {
      icon: <Braces />,
      title: "JSON Formatter",
      description: "Format, validate and beautify JSON data.",
      link: "/json-formatter",
      category: "Formatting"
    },
    {
      icon: <Cog />,
      title: "Base64 Encoder",
      description: "Encode and decode Base64 strings.",
      link: "/base64-encoder",
      category: "Encoding"
    },
    {
      icon: <Globe />,
      title: "URL Encoder",
      description: "Encode and decode URL components.",
      link: "/url-encoder",
      category: "Encoding"
    },
    {
      icon: <BadgeCheck />,
      title: "UUID Generator",
      description: "Generate secure Version 4 UUIDs instantly.",
      link: "/uuid-generator",
      category: "Generators"
    },
    {
      icon: <Hash />,
      title: "Hash Generator",
      description: "Generate SHA-256 and SHA-512 hashes instantly.",
      link: "/hash-generator",
      category: "Security"
    },
    {
      icon: <QrCode />,
      title: "QR Code Generator",
      description: "Generate QR codes from text or URLs instantly.",
      link: "/qr-code-generator",
      category: "Generators"
    },
    {
      icon: <KeyRound />,
      title: "JWT Decoder",
      description: "Decode JSON Web Tokens instantly.",
      link: "/jwt-decoder",
      category: "Security"
    },
    {
      icon: <Regex />,
      title: "Regex Tester",
      description: "Test regular expressions instantly.",
      link: "/regex-tester",
      category: "Utilities"
    },
    {
      icon: <Clock3 />,
      title: "Timestamp Converter",
      description: "Convert Unix timestamps to readable dates.",
      link: "/timestamp-converter",
      category: "Utilities"
    }
  ]
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://securettoolhub.com/#website",
        url: "https://securettoolhub.com",
        name: "SecureToolHub",
        description:
          "Free, fast and secure browser-based tools for developers, students and creators.",
        inLanguage: "en",
        publisher: {
          "@id": "https://securettoolhub.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://securettoolhub.com/#organization",
        name: "SecureToolHub",
        url: "https://securettoolhub.com",
        description:
          "SecureToolHub provides free browser-based tools for developers, students and creators.",
        founder: {
          "@type": "Organization",
          name: "Nedopulse Consulting Group"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://securettoolhub.com/#webpage",
        url: "https://securettoolhub.com",
        name: "SecureToolHub – Free Online Developer Tools",
        description:
          "Use free, fast and secure online developer tools for passwords, JSON, Base64, URLs, UUIDs, hashes, QR codes, JWTs, regex and timestamps.",
        isPartOf: {
          "@id": "https://securettoolhub.com/#website"
        },
        about: {
          "@id": "https://securettoolhub.com/#organization"
        },
        inLanguage: "en"
      },
      {
        "@type": "ItemList",
        "@id": "https://securettoolhub.com/#tools",
        name: "SecureToolHub Developer Tools",
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.title,
          url: `https://securettoolhub.com${tool.link}`
        }))
      }
    ]
  }
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === "All" ||
      tool.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
   <>
  <Seo
    title="SecureToolHub – Free Online Developer Tools"
    description="Use free, fast and secure online developer tools for passwords, JSON, Base64, URLs, UUIDs, hashes, QR codes, JWTs, regex and timestamps."
    path="/"
    structuredData={homeStructuredData}
  />

      <Navbar />

      <section className="hero hero-v2">
        <div className="particles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="hero-map">
          <div className="map-line line-one"></div>
          <div className="map-line line-two"></div>
          <div className="map-dot dot-one"></div>
          <div className="map-dot dot-two"></div>
          <div className="map-dot dot-three"></div>
          <div className="map-dot dot-four"></div>
        </div>

        <div className="hero-v2-content">
          <div className="badge">
            ⚡ 100% Free • No Sign Up • Instant Access
          </div>

          <h1>
            All-In-One <span>Developer Toolkit</span>
          </h1>

          <p>
            Powerful, fast and secure tools for developers, students and creators.
            Encode, format, generate and debug directly in your browser.
          </p>

          <div className="hero-buttons">
            <a href="#tools" className="hero-btn">
              🚀 Explore Tools
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hero-btn secondary-btn"
            >
              ⭐ GitHub
            </a>
          </div>

          <div className="hero-lock">
            <ShieldCheck />
          </div>

          <div className="hero-stats">
            <div>
              <strong>10+</strong>
              <span>Developer Tools</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Browser Based</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Sign Up Required</span>
            </div>
          </div>

          <input
            className="tool-search"
            type="text"
            placeholder="🔍 Search developer tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="hero-energy">
          <div className="energy-wave wave1"></div>
          <div className="energy-wave wave2"></div>
          <div className="energy-wave wave3"></div>
        </div>
      </section>

      <div className="categories">
        <button
          className={selectedCategory === "All" ? "active-category" : ""}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        <button
          className={selectedCategory === "Security" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Security")}
        >
          Security
        </button>

        <button
          className={selectedCategory === "Encoding" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Encoding")}
        >
          Encoding
        </button>

        <button
          className={selectedCategory === "Formatting" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Formatting")}
        >
          Formatting
        </button>

        <button
          className={selectedCategory === "Generators" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Generators")}
        >
          Generators
        </button>

        <button
          className={selectedCategory === "Utilities" ? "active-category" : ""}
          onClick={() => setSelectedCategory("Utilities")}
        >
          Utilities
        </button>
      </div>

      <section className="trust-strip">
        <div className="trust-card">
          ⚡
          <h3>Lightning Fast</h3>
          <p>Instant results with no waiting.</p>
        </div>

        <div className="trust-card">
          🔒
          <h3>Privacy First</h3>
          <p>Your data never leaves your browser.</p>
        </div>

        <div className="trust-card">
          🌍
          <h3>Browser Based</h3>
          <p>No downloads or installations.</p>
        </div>

        <div className="trust-card">
          🚀
          <h3>Always Free</h3>
          <p>Core developer tools available for everyone.</p>
        </div>
      </section>

      <section className="featured-heading">
        <div className="featured-badge">
          ⭐ Featured
        </div>

        <h2>Powerful Developer Tools</h2>

        <p>
          Everything you need for encoding, security, formatting and productivity
          — completely free and running directly in your browser.
        </p>
      </section>

      <section id="popular" className="popular-tools">
        <div className="popular-header">
          <span>⭐ Most Popular</span>

          <h2>Start With The Essentials</h2>

          <p>
            The tools most developers need first — fast, secure and browser-based.
          </p>
        </div>

        <div className="popular-layout">
          <Link to="/password-generator" className="popular-main-card">
            <div className="popular-tag">🔥 Most Used</div>

            <div className="popular-icon">
              {tools[0].icon}
            </div>

            <h3>Password Generator</h3>

            <p>
              Create strong, secure passwords instantly with custom options.
            </p>

            <strong>Open Password Generator →</strong>
          </Link>

          <div className="popular-side">
            <Link to="/json-formatter" className="popular-small-card">
              <div className="popular-icon">
                {tools[1].icon}
              </div>

              <h3>JSON Formatter</h3>
              <p>Beautify and validate JSON data.</p>
            </Link>

            <Link to="/jwt-decoder" className="popular-small-card">
              <div className="popular-icon">
                {tools[7].icon}
              </div>

              <h3>JWT Decoder</h3>
              <p>Decode JWT tokens instantly.</p>
            </Link>
          </div>
        </div>
      </section>

      <section id="tools" className="tools">
        {filteredTools.map((tool) => (
          <div className="tool-card" key={tool.title}>
            <div className="tool-icon">
              {tool.icon}
            </div>

            <h3>{tool.title}</h3>

            <p>{tool.description}</p>

            <Link to={tool.link}>
              <button>Open Tool →</button>
            </Link>
          </div>
        ))}
      </section>

      <section className="coming-soon">
        <div className="coming-left">
          <div className="coming-icon">
            🛠️
          </div>

          <div>
            <h2>More Tools Coming Soon!</h2>

            <p>
              We're constantly adding new tools to make your developer life easier.
            </p>
          </div>
        </div>

        <button className="request-btn">
          Request a Tool 💬
        </button>
      </section>

      <section id="about" className="why">
        <h2>Why Choose SecureToolHub?</h2>

        <div className="why-grid">
          <div className="why-card">
            ⚡
            <h3>Instant Access</h3>
            <p>No installations required.</p>
          </div>

          <div className="why-card">
            🔒
            <h3>Private & Secure</h3>
            <p>Your data stays in your browser.</p>
          </div>

          <div className="why-card">
            🎁
            <h3>100% Free</h3>
            <p>All tools are completely free.</p>
          </div>

          <div className="why-card">
            🚀
            <h3>Fast & Reliable</h3>
            <p>Built for speed and simplicity.</p>
          </div>
        </div>
      </section>

      <footer className="footer premium-footer">
        <div className="footer-glow"></div>

        <div className="footer-grid">
          <div className="footer-brand">
            <h2>SecureToolHub</h2>

            <p>
              Fast, secure and browser-based developer tools for creators,
              students and developers.
            </p>
          </div>

          <div className="footer-column">
            <h4>Tools</h4>
            <a href="#tools">All Tools</a>
            <a href="#popular">Popular Tools</a>
            <Link to="/password-generator">Password Generator</Link>
            <Link to="/json-formatter">JSON Formatter</Link>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#about">About</a>
            <a href="#tools">Categories</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 SecureToolHub. Built for developers worldwide by Nedopulse
            Consulting Group.
          </p>

          <span>100% Free • No Sign Up • Browser Based</span>
        </div>
      </footer>
    </>
  )
}

export default Home