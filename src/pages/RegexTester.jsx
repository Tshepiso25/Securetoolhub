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

      let matches

      if (regex.global || regex.sticky) {
        matches = Array.from(
          testText.matchAll(regex),
          match => match[0]
        )
      } else {
        const match = testText.match(regex)
        matches = match ? [match[0]] : []
      }

      if (!matches.length) {
        setResult("No matches found.")
      } else {
        setResult(
          matches
            .map(
              (match, index) =>
                `Match ${index + 1}: ${match}`
            )
            .join("\n")
        )
      }

      setError("")
    } catch {
      setResult("")
      setError(
        "Invalid regular expression or flags. Check the pattern and JavaScript regex flags."
      )
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
      <div className="tool-form-group">
        <label className="tool-label" htmlFor="regex-pattern">
          Regular Expression
        </label>

        <input
          id="regex-pattern"
          className="tool-input"
          type="text"
          placeholder={"Enter regex pattern, e.g. \\d+"}
          value={pattern}
          onChange={(e) => {
            setPattern(e.target.value)
            setError("")
          }}
        />
      </div>

      <div className="tool-form-group">
        <label className="tool-label" htmlFor="regex-flags">
          JavaScript Flags
        </label>

        <input
          id="regex-flags"
          className="tool-input"
          type="text"
          placeholder="Flags, e.g. gim"
          value={flags}
          onChange={(e) => {
            setFlags(e.target.value)
            setError("")
          }}
        />
      </div>

      <div className="tool-form-group">
        <label className="tool-label" htmlFor="regex-test-text">
          Test Text
        </label>

        <textarea
          id="regex-test-text"
          className="tool-textarea"
          placeholder="Enter text to test..."
          value={testText}
          onChange={(e) => {
            setTestText(e.target.value)
            setError("")
          }}
        />
      </div>

      <div className="action-row">
        <button
          className="generate-btn"
          onClick={testRegex}
        >
          Test Regex
        </button>

        <button
          className="clear-btn"
          onClick={clearFields}
        >
          Clear
        </button>
      </div>

      {error && <p className="tool-error">{error}</p>}

      <div className="tool-form-group">
        <label className="tool-label" htmlFor="regex-result">
          Matches
        </label>

        <textarea
          id="regex-result"
          className="tool-textarea"
          placeholder="Matches will appear here..."
          value={result}
          readOnly
        />
      </div>

      <section className="tool-content">
        <div className="tool-info-card">
          <h2>What Is a Regular Expression?</h2>

          <p>
            A regular expression, commonly called regex, is a pattern used to
            search, match or manipulate text.
          </p>

          <p>
            Developers use regular expressions for validation, searching,
            parsing and extracting information from text.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Test a Regex</h2>

          <ol>
            <li>Enter your regular expression.</li>
            <li>Enter optional JavaScript regex flags.</li>
            <li>Enter the text you want to test.</li>
            <li>Click <strong>Test Regex</strong>.</li>
            <li>Review the matching results.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>Common Regex Examples</h2>

          <ul>
            <li><strong>\d+</strong> — one or more digits</li>
            <li><strong>\w+</strong> — one or more word characters</li>
            <li><strong>^Hello</strong> — text beginning with Hello</li>
            <li><strong>Hello$</strong> — text ending with Hello</li>
            <li><strong>[A-Z]+</strong> — one or more uppercase letters</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Common JavaScript Regex Flags</h2>

          <ul>
            <li><strong>g</strong> — global matching</li>
            <li><strong>i</strong> — case-insensitive matching</li>
            <li><strong>m</strong> — multiline mode</li>
            <li><strong>s</strong> — dot matches newline characters</li>
            <li><strong>u</strong> — Unicode-aware matching</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Regex Testing in JavaScript</h2>

          <p>
            This tool uses JavaScript's built-in
            <code> RegExp </code>
            functionality to compile and test the expression.
          </p>

          <p>
            Because JavaScript regular-expression behavior can differ from
            regex engines in other programming languages, an expression that
            works elsewhere may behave differently here.
          </p>
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
            escapes, duplicate flags or unsupported regular-expression
            syntax.
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
              <Link to="/json-formatter">
                JSON Formatter
              </Link>
            </li>

            <li>
              <Link to="/url-encoder">
                URL Encoder
              </Link>
            </li>

            <li>
              <Link to="/base64-encoder">
                Base64 Encoder
              </Link>
            </li>

            <li>
              <Link to="/timestamp-converter">
                Timestamp Converter
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </ToolLayout>
  )
}

export default RegexTester