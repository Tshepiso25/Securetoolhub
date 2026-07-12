import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function JsonFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)

      setOutput(formatted)
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setError("Invalid JSON. Please check your syntax.")
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)

      setOutput(minified)
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setError("Invalid JSON. Please check your syntax.")
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
      title="JSON Formatter"
      description="Format, beautify, validate and minify JSON data instantly."
    >
      {copied && <div className="toast">✅ JSON copied</div>}

      <textarea
        className="tool-textarea"
        placeholder='Paste JSON here, example: {"name":"SecureToolHub","type":"developer tools"}'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="action-row">
        <button className="generate-btn" onClick={formatJson}>
          Format JSON
        </button>

        <button className="copy-btn" onClick={minifyJson}>
          Minify JSON
        </button>
      </div>

      {error && <p className="tool-error">{error}</p>}

      <textarea
        className="tool-textarea"
        placeholder="Formatted JSON will appear here..."
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

export default JsonFormatter