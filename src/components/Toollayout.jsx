import { Link } from "react-router-dom"
import { ShieldCheck } from "lucide-react"

function ToolLayout({ title, description, children }) {
  return (
    <div className="tool-page">

      <div className="tool-topbar">
        <Link to="/" className="tool-brand">
          <ShieldCheck size={24} />
          SecureToolHub TEST
        </Link>

        <div className="tool-nav-actions">
          <Link to="/" className="back-home">
            ← Back Home
          </Link>

          <Link to="/#tools" className="browse-tools-link">
            Browse Tools
          </Link>
        </div>
      </div>

      <h1>{title}</h1>

      <p>{description}</p>

      <div className="generator-card">
        {children}
      </div>
    </div>
  )
}

export default ToolLayout