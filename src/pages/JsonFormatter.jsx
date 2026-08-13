import { useState } from "react"
import { Link } from "react-router-dom"
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
    } catch (err) {
      setOutput("")
      setCopied(false)
      setError(getJsonErrorMessage(err))
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)

      setOutput(minified)
      setError("")
      setCopied(false)
    } catch (err) {
      setOutput("")
      setCopied(false)
      setError(getJsonErrorMessage(err))
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
      setError("Unable to copy the result. Please copy it manually.")
    }
  }

  const clearFields = () => {
    setInput("")
    setOutput("")
    setError("")
    setCopied(false)
  }

  const getJsonErrorMessage = (err) => {
    if (!err?.message) {
      return "Invalid JSON. Please check your syntax."
    }

    const match = err.message.match(/position (\d+)/)

    if (match) {
      const position = Number(match[1])

      return `Invalid JSON. Syntax error near character ${position}. Check commas, quotes, brackets and braces around this location.`
    }

    return "Invalid JSON. Please check your syntax."
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
        onChange={(e) => {
          setInput(e.target.value)
          setError("")
        }}
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

      <section className="tool-content">
        <div className="tool-info-card">
          <h2>What Is a JSON Formatter?</h2>

          <p>
            A JSON formatter is a tool that takes JSON data and reorganizes it
            into a readable, structured format. Formatting JSON makes nested
            objects, arrays, keys and values easier to inspect and debug.
          </p>

          <p>
            SecureToolHub's JSON Formatter also validates your JSON while
            formatting it and can minify valid JSON when you need a smaller
            version for applications or APIs.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Format JSON</h2>

          <ol>
            <li>Paste your JSON into the input box.</li>
            <li>Click <strong>Format JSON</strong>.</li>
            <li>Review the formatted result.</li>
            <li>Click <strong>Copy Result</strong> to copy it.</li>
          </ol>

          <p>
            If the JSON contains a syntax error, the formatter will display an
            error message to help you identify the problem.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>JSON Formatting vs JSON Minifying</h2>

          <p>
            Formatted JSON contains indentation and line breaks that make the
            data easier for humans to read. This is useful when developing,
            debugging or inspecting API responses.
          </p>

          <p>
            Minified JSON removes unnecessary whitespace and line breaks. This
            produces a more compact representation that can be useful when
            transferring or storing JSON data.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Common JSON Errors</h2>

          <ul>
            <li>Missing or extra commas</li>
            <li>Using single quotes instead of double quotes</li>
            <li>Missing quotation marks around property names</li>
            <li>Unclosed brackets or braces</li>
            <li>Trailing commas</li>
            <li>Invalid JSON values</li>
          </ul>

          <p>
            JSON is strict about its syntax. Even a small formatting mistake
            can prevent an API, application or configuration file from
            processing the data correctly.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's JSON Formatter?</h2>

          <ul>
            <li>Free to use</li>
            <li>No account or sign-up required</li>
            <li>Runs directly in your browser</li>
            <li>Format and beautify JSON instantly</li>
            <li>Validate JSON syntax</li>
            <li>Minify JSON when you need compact output</li>
            <li>Copy your formatted result instantly</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>What is JSON?</h3>
          <p>
            JSON, or JavaScript Object Notation, is a lightweight text format
            commonly used to exchange structured data between applications,
            websites and APIs.
          </p>

          <h3>Is this JSON formatter free?</h3>
          <p>
            Yes. The core JSON formatting, validation and minification
            features are free to use.
          </p>

          <h3>Does my JSON get uploaded to a server?</h3>
          <p>
            The formatter processes JSON directly in your browser. Your input
            is not intentionally uploaded to SecureToolHub for formatting.
          </p>

          <h3>Can I minify JSON with this tool?</h3>
          <p>
            Yes. Paste valid JSON and select <strong>Minify JSON</strong> to
            remove unnecessary whitespace.
          </p>

          <h3>Why is my JSON invalid?</h3>
          <p>
            Common causes include missing commas, incorrect quotation marks,
            unclosed brackets or braces, and trailing commas.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <p>
            You may also find these SecureToolHub tools useful:
          </p>

          <ul>
            <li>
              <Link to="/jwt-decoder">JWT Decoder</Link> — decode JSON Web
              Tokens in your browser.
            </li>

            <li>
              <Link to="/base64-encoder">Base64 Encoder</Link> — encode and
              decode Base64 data.
            </li>

            <li>
              <Link to="/url-encoder">URL Encoder</Link> — encode and decode
              URL components.
            </li>

            <li>
              <Link to="/hash-generator">Hash Generator</Link> — generate
              secure hashes from text.
            </li>
          </ul>
        </div>
      </section>
    </ToolLayout>
  )
}

export default JsonFormatter