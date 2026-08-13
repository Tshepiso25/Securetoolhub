import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function UrlEncoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const encodeUrl = () => {
    if (!input) {
      setError("Please enter text or a URL to encode.")
      setOutput("")
      return
    }

    try {
      setOutput(encodeURIComponent(input))
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setError("Unable to encode the input.")
    }
  }

  const decodeUrl = () => {
    if (!input) {
      setError("Please enter encoded URL data to decode.")
      setOutput("")
      return
    }

    try {
      setOutput(decodeURIComponent(input))
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setError("Invalid encoded URL data.")
    }
  }

  const copyOutput = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setError("Unable to copy the result.")
    }
  }

  const clearFields = () => {
    setInput("")
    setOutput("")
    setError("")
    setCopied(false)
  }

  return (
    <ToolLayout
      title="URL Encoder & Decoder"
      description="Encode and decode URL components instantly with this free online URL encoding tool."
    >
      {copied && <div className="toast">✅ Result copied</div>}

      <textarea
        className="tool-textarea"
        placeholder="Enter text or URL..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setError("")
        }}
      />

      <div className="action-row">
        <button className="generate-btn" onClick={encodeUrl}>
          Encode URL
        </button>

        <button className="copy-btn" onClick={decodeUrl}>
          Decode URL
        </button>
      </div>

      {error && <p className="tool-error">{error}</p>}

      <textarea
        className="tool-textarea"
        placeholder="Result will appear here..."
        value={output}
        readOnly
      />

      <button className="copy-btn" onClick={copyOutput}>
        {copied ? "✅ Copied!" : "📋 Copy Result"}
      </button>

      <button className="clear-btn" onClick={clearFields}>
        Clear
      </button>

      <section className="tool-content">

        <div className="tool-info-card">
          <h2>What Is URL Encoding?</h2>

          <p>
            URL encoding converts characters into a format that can safely be
            transmitted as part of a URL. Characters that have special meaning
            in URLs may need to be percent-encoded.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Encode a URL Component</h2>

          <ol>
            <li>Enter your text or URL component.</li>
            <li>Click <strong>Encode URL</strong>.</li>
            <li>Copy the encoded result.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>How to Decode URL Data</h2>

          <ol>
            <li>Paste the encoded value.</li>
            <li>Click <strong>Decode URL</strong>.</li>
            <li>Review the decoded result.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>When Is URL Encoding Used?</h2>

          <p>
            URL encoding is commonly used when passing query parameters,
            search terms, identifiers and other values through web addresses.
          </p>

          <p>
            For example, spaces and certain reserved characters may be
            represented using percent-encoded values.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's URL Encoder?</h2>

          <ul>
            <li>Free to use</li>
            <li>No registration required</li>
            <li>Encode URL components instantly</li>
            <li>Decode percent-encoded values</li>
            <li>Browser-based processing</li>
            <li>Copy results instantly</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>What does URL encoding do?</h3>
          <p>
            URL encoding converts characters into representations that can be
            safely used within URL components.
          </p>

          <h3>Is URL encoding encryption?</h3>
          <p>
            No. URL encoding is not encryption and does not protect sensitive
            information.
          </p>

          <h3>Can I decode a URL with this tool?</h3>
          <p>
            Yes. Paste the encoded value and select Decode URL.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/base64-encoder">Base64 Encoder</Link>
            </li>
            <li>
              <Link to="/json-formatter">JSON Formatter</Link>
            </li>
            <li>
              <Link to="/jwt-decoder">JWT Decoder</Link>
            </li>
            <li>
              <Link to="/regex-tester">Regex Tester</Link>
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default UrlEncoder