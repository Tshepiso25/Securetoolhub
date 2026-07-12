import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function HashGenerator() {
  const [input, setInput] = useState("")
  const [algorithm, setAlgorithm] = useState("SHA-256")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)

  const generateHash = async () => {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)

    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")

    setOutput(hashHex)
    setCopied(false)
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
      title="Hash Generator"
      description="Generate SHA-256 and SHA-512 hashes instantly in your browser."
    >
      {copied && <div className="toast">✅ Hash copied</div>}

      <textarea
        className="tool-textarea"
        placeholder="Enter text to hash..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <select
        className="tool-select"
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-512">SHA-512</option>
      </select>

      <button className="generate-btn" onClick={generateHash}>
        Generate Hash
      </button>

      <textarea
        className="tool-textarea"
        placeholder="Hash output will appear here..."
        value={output}
        readOnly
      />

      <button className="copy-btn" onClick={copyOutput}>
        {copied ? "✅ Copied!" : "📋 Copy Hash"}
      </button>

      <button className="clear-btn" onClick={clearFields}>
        Clear
      </button>
    </ToolLayout>
  )
}

export default HashGenerator