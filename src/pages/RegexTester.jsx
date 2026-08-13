import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testText, setTestText] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")

  const testRegex = () => {
    if (!pattern) {
      setError("Please enter a regular expression.")
      setResult("")
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      const matches = testText.match(regex)

      if (!matches) {
        setResult("No matches found.")
      } else {
        setResult(
          matches
            .map((match, index) => `Match ${index + 1}: ${match}`)
            .join("\n")
        )
      }

      setError("")
    } catch {
      setResult("")
      setError("Invalid regular expression or flags.")
    }
  }

  const clearFields = () => {
    setPattern("")
    setFlags("g")
    setTestText("")
    setResult("")
    setError("")
  }

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test JavaScript regular expressions against text instantly with this free online regex tester."
    >
      <input
        className="tool-input"
        type="text"
        placeholder="Enter regex pattern, e.g. \\d+"
        value={pattern}
        onChange={(e) => {
          setPattern(e.target.value)
          setError("")
        }}
      />

      <input
        className="tool-input"
        type="text"
        placeholder="Flags, e.g. gim"
        value={flags}
        onChange={(e) => {
          setFlags(e.target.value)
          setError("")
        }}
      />

      <textarea
        className="tool-textarea"
        placeholder="Enter text to test..."
        value={testText}
        onChange={(e) => {
          setTestText(e.target.value)
          setError("")
        }}
      />

      <button className="generate-btn" onClick={testRegex}>
        Test Regex
      </button>

      {error && <p className="tool-error">{error}</p>}

      <textarea
        className="tool-textarea"
        placeholder="Matches will appear here..."
        value={result}
        readOnly
      />

      <button className="clear-btn" onClick={clearFields}>
        Clear
      </button>

      <section className="tool-content">

        <div className="tool-info-card">
          <h2>What Is a Regular Expression?</h2>

          <p>
            A regular expression, commonly called regex, is a pattern used to
            search, match or manipulate text.
          </p>

          <p>
            Developers use regular expressions for tasks such as validation,
            searching, parsing and extracting information.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Test a Regex</h2>

          <ol>
            <li>Enter your regular expression.</li>
            <li>Enter optional JavaScript regex flags.</li>
            <li>Enter the text you want to test.</li>
            <li>Click <strong>Test Regex</strong>.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>Common Regex Examples</h2>

          <ul>
            <li><strong>\d+</strong> — one or more digits</li>
            <li><strong>\w+</strong> — one or more word characters</li>
            <li><strong>^Hello</strong> — text beginning with Hello</li>
            <li><strong>Hello$</strong> — text ending with Hello</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Common JavaScript Regex Flags</h2>

          <ul>
            <li><strong>g</strong> — global matching</li>
            <li><strong>i</strong> — case-insensitive matching</li>
            <li><strong>m</strong> — multiline mode</li>
            <li><strong>s</strong> — dot matches newline characters</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>What programming language does this tester use?</h3>
          <p>
            The tester uses JavaScript's built-in RegExp functionality.
          </p>

          <h3>Why is my regex invalid?</h3>
          <p>
            Invalid expressions can result from unmatched brackets, invalid
            escapes or unsupported regular-expression syntax.
          </p>

          <h3>What are regex flags?</h3>
          <p>
            Flags modify how a JavaScript regular expression behaves, such as
            enabling global or case-insensitive matching.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/json-formatter">JSON Formatter</Link>
            </li>
            <li>
              <Link to="/url-encoder">URL Encoder</Link>
            </li>
            <li>
              <Link to="/base64-encoder">Base64 Encoder</Link>
            </li>
            <li>
              <Link to="/timestamp-converter">Timestamp Converter</Link>
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default RegexTester