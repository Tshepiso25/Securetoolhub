import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function UrlEncoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const encodeUrl = () => {
    try {
      setOutput(encodeURIComponent(input))
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setError("Unable to encode text.")
    }
  }

  const decodeUrl = () => {
    try {
      setOutput(decodeURIComponent(input))
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setError("Invalid URL encoded text.")
    }
  }

  const copyOutput = () => {
    if (!output) return

    navigator.clipboard.writeText(output)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1800)
  }

  const clearFields = () => {
    setInput("")
    setOutput("")
    setError("")
    setCopied(false)
  }

  return (
    <ToolLayout
      title="URL Encoder / Decoder"
      description="Encode and decode URL components instantly."
    >
      {copied && <div className="toast">✅ Result copied</div>}

      <textarea
        className="tool-textarea"
        placeholder="Enter text or URL here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="action-row">
        <button
          className="generate-btn"
          onClick={encodeUrl}
        >
          Encode
        </button>

        <button
          className="copy-btn"
          onClick={decodeUrl}
        >
          Decode
        </button>
      </div>

      {error && (
        <p className="tool-error">
          {error}
        </p>
      )}

      <textarea
        className="tool-textarea"
        placeholder="Result will appear here..."
        value={output}
        readOnly
      />

      <button
        className="copy-btn"
        onClick={copyOutput}
      >
        {copied ? "✅ Copied!" : "📋 Copy Result"}
      </button>

      <button
        className="clear-btn"
        onClick={clearFields}
      >
        Clear
      </button>
    </ToolLayout>
  )
}

export default UrlEncoder