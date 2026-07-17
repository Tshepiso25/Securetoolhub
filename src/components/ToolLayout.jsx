import { Link, useLocation } from "react-router-dom"
import { ShieldCheck } from "lucide-react"
import Seo from "./Seo"

function ToolLayout({ title, description, children }) {
  const location = useLocation()

  const seoDescription = `${description} Free, fast and secure with no sign-up required.`

  return (
    <div className="tool-page">
      <Seo
        title={`${title} – Free Online Tool`}
        description={seoDescription}
        path={location.pathname}
      />

      <div className="tool-topbar">
        <Link to="/" className="tool-brand">
          <ShieldCheck size={24} />
          SecureToolHub
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