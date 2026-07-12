import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <ShieldCheck size={30} />
        <span>SecureToolHub</span>
      </Link>

      <ul className="nav-links">
        <li><a href="#popular">Popular</a></li>
        <li><a href="#tools">Tools</a></li>
        <li><a href="#about">About</a></li>
      </ul>

      <div className="nav-actions">

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="github-btn"
        >
          
          GitHub
        </a>

        <button className="browse-btn">
          Browse Tools
        </button>

      </div>

    </nav>
  )
}

export default Navbar