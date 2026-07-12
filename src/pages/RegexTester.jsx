import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function RegexTester() {
  const [text, setText] = useState("")
  const [pattern, setPattern] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, "g")
      const matches = text.match(regex)

      if (matches && matches.length > 0) {
        setResult(matches.join("\n"))
      } else {
        setResult("No matches found.")
      }

      setError("")
    } catch {
      setError("Invalid regular expression.")
      setResult("")
    }
  }

  const clearFields = () => {
    setText("")
    setPattern("")
    setResult("")
    setError("")
  }

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test regular expressions instantly inside your browser."
    >
      <textarea
        className="tool-textarea"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        className="tool-input"
        placeholder="Enter regex pattern..."
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
      />

      <button
        className="generate-btn"
        onClick={testRegex}
      >
        Test Regex
      </button>

      {error && (
        <p className="tool-error">
          {error}
        </p>
      )}

      <textarea
        className="tool-textarea"
        placeholder="Matches..."
        value={result}
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

export default RegexTester