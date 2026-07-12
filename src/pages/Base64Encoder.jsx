import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function Base64Encoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const encodeText = () => {
    try {
      setOutput(btoa(input))
      setCopied(false)
    } catch {
      setOutput("Encoding failed.")
    }
  }

  const decodeText = () => {
    try {
      setOutput(atob(input))
      setCopied(false)
    } catch {
      setOutput("Invalid Base64 input.")
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
    setCopied(false)
  }

  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Encode text into Base64 or decode Base64 back into readable text."
    >
      {copied && <div className="toast">✅ Result copied</div>}

      <textarea
        className="tool-textarea"
        placeholder="Enter text or Base64 here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="action-row">
        <button className="generate-btn" onClick={encodeText}>
          Encode
        </button>

        <button className="copy-btn" onClick={decodeText}>
          Decode
        </button>
      </div>

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
    </ToolLayout>
  )
}

export default Base64Encoder