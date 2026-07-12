import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function JwtDecoder() {
  const [token, setToken] = useState("")
  const [header, setHeader] = useState("")
  const [payload, setPayload] = useState("")
  const [error, setError] = useState("")

  const decodeJWT = () => {
    try {
      const parts = token.split(".")

      if (parts.length !== 3) {
        throw new Error()
      }

      const decode = (str) => {
        const base64 = str.replace(/-/g, "+").replace(/_/g, "/")
        return JSON.parse(atob(base64))
      }

      setHeader(JSON.stringify(decode(parts[0]), null, 2))
      setPayload(JSON.stringify(decode(parts[1]), null, 2))
      setError("")
    } catch {
      setHeader("")
      setPayload("")
      setError("Invalid JWT token.")
    }
  }

  const clearFields = () => {
    setToken("")
    setHeader("")
    setPayload("")
    setError("")
  }

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode JSON Web Tokens instantly inside your browser."
    >
      <textarea
        className="tool-textarea"
        placeholder="Paste JWT token..."
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <button
        className="generate-btn"
        onClick={decodeJWT}
      >
        Decode JWT
      </button>

      {error && (
        <p className="tool-error">{error}</p>
      )}

      <h3>Header</h3>

      <textarea
        className="tool-textarea"
        value={header}
        readOnly
      />

      <h3>Payload</h3>

      <textarea
        className="tool-textarea"
        value={payload}
        readOnly
      />

      <button
        className="clear-btn"
        onClick={clearFields}
      >
        Clear
      </button>

    </ToolLayout>
  )
}

export default JwtDecoder