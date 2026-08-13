import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function decodeJwtPart(part) {
  const normalized = part
    .replace(/-/g, "+")
    .replace(/_/g, "/")

  const padded = normalized.padEnd(
    normalized.length + (4 - (normalized.length % 4)) % 4,
    "="
  )

  const binary = atob(padded)

  const bytes = Uint8Array.from(
    binary,
    char => char.charCodeAt(0)
  )

  return JSON.parse(
    new TextDecoder().decode(bytes)
  )
}

function JwtDecoder() {
  const [input, setInput] = useState("")
  const [header, setHeader] = useState("")
  const [payload, setPayload] = useState("")
  const [error, setError] = useState("")

  const decodeToken = () => {
    if (!input.trim()) {
      setError("Please enter a JWT.")
      setHeader("")
      setPayload("")
      return
    }

    try {
      const parts = input.trim().split(".")

      if (parts.length !== 3) {
        throw new Error("Invalid JWT structure.")
      }

      if (!parts[0] || !parts[1] || !parts[2]) {
        throw new Error("Incomplete JWT.")
      }

      const decodedHeader = decodeJwtPart(parts[0])
      const decodedPayload = decodeJwtPart(parts[1])

      setHeader(
        JSON.stringify(decodedHeader, null, 2)
      )

      setPayload(
        JSON.stringify(decodedPayload, null, 2)
      )

      setError("")
    } catch {
      setHeader("")
      setPayload("")
      setError(
        "Invalid JWT. Please check that the token contains a valid header, payload and signature."
      )
    }
  }

  const clearFields = () => {
    setInput("")
    setHeader("")
    setPayload("")
    setError("")
  }

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and inspect JSON Web Token headers and payloads instantly with this free browser-based JWT decoder."
    >
      <div className="tool-form-group">
        <label className="tool-label" htmlFor="jwt-input">
          JWT Token
        </label>

        <textarea
          id="jwt-input"
          className="tool-textarea"
          placeholder="Paste your JWT here..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
          }}
        />
      </div>

      <div className="action-row">
        <button
          className="generate-btn"
          onClick={decodeToken}
        >
          Decode JWT
        </button>

        <button
          className="clear-btn"
          onClick={clearFields}
        >
          Clear
        </button>
      </div>

      {error && <p className="tool-error">{error}</p>}

      {header && (
        <div className="tool-form-group">
          <label className="tool-label" htmlFor="jwt-header">
            JWT Header
          </label>

          <textarea
            id="jwt-header"
            className="tool-textarea"
            value={header}
            readOnly
          />
        </div>
      )}

      {payload && (
        <div className="tool-form-group">
          <label className="tool-label" htmlFor="jwt-payload">
            JWT Payload
          </label>

          <textarea
            id="jwt-payload"
            className="tool-textarea"
            value={payload}
            readOnly
          />
        </div>
      )}

      <section className="tool-content">
        <div className="tool-info-card">
          <h2>What Is a JWT?</h2>

          <p>
            JSON Web Token, commonly called JWT, is a compact token format
            frequently used for authentication and information exchange
            between applications.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Parts of a JWT</h2>

          <p>
            A typical JWT contains three Base64URL-encoded sections separated
            by periods:
          </p>

          <ol>
            <li>Header</li>
            <li>Payload</li>
            <li>Signature</li>
          </ol>

          <p>
            The header and payload contain JSON data encoded using Base64URL.
            The signature is used by applications to verify token integrity
            when the appropriate verification process and key are available.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>What Does This JWT Decoder Do?</h2>

          <p>
            SecureToolHub's JWT Decoder reads the token's header and payload
            and displays their contents as readable JSON.
          </p>

          <p>
            This tool is intended for inspection and debugging. Decoding a
            JWT does not verify its signature or prove that the token is
            authentic.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Important Security Information</h2>

          <p>
            JWT payloads are encoded rather than automatically encrypted.
            Do not assume that information inside a JWT is secret simply
            because it is represented as Base64URL data.
          </p>

          <p>
            Avoid pasting sensitive production tokens into online tools unless
            you understand the security implications.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Decode a JWT</h2>

          <ol>
            <li>Copy the JWT you want to inspect.</li>
            <li>Paste it into the input field.</li>
            <li>Click <strong>Decode JWT</strong>.</li>
            <li>Review the decoded header and payload.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>Does decoding a JWT verify it?</h3>

          <p>
            No. Decoding only exposes the readable header and payload.
            Signature verification requires additional information and
            cryptographic validation.
          </p>

          <h3>Is a JWT encrypted?</h3>

          <p>
            A standard signed JWT is not automatically encrypted. Its header
            and payload can generally be decoded.
          </p>

          <h3>What is the JWT payload?</h3>

          <p>
            The payload contains claims and other information associated with
            the token.
          </p>

          <h3>Does this JWT decoder upload my token?</h3>

          <p>
            The decoding operation is performed in your browser. However,
            you should still avoid entering sensitive production credentials
            or tokens into any online tool unless you understand the risks.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/base64-encoder">
                Base64 Encoder
              </Link>
            </li>

            <li>
              <Link to="/json-formatter">
                JSON Formatter
              </Link>
            </li>

            <li>
              <Link to="/hash-generator">
                Hash Generator
              </Link>
            </li>

            <li>
              <Link to="/url-encoder">
                URL Encoder
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </ToolLayout>
  )
}

export default JwtDecoder