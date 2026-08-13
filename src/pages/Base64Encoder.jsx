import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function Base64Encoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const encodeBase64 = () => {
    if (!input) {
      setError("Please enter text to encode.")
      setOutput("")
      return
    }

    try {
      const encoded = btoa(
        new TextEncoder()
          .encode(input)
          .reduce((data, byte) => data + String.fromCharCode(byte), "")
      )

      setOutput(encoded)
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setError("Unable to encode this text.")
    }
  }

  const decodeBase64 = () => {
    if (!input) {
      setError("Please enter Base64 data to decode.")
      setOutput("")
      return
    }

    try {
      const binary = atob(input.trim())
      const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
      const decoded = new TextDecoder().decode(bytes)

      setOutput(decoded)
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setError("Invalid Base64 data. Please check the input.")
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

  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Encode and decode Base64 text instantly with this free browser-based Base64 tool."
    >
      {copied && <div className="toast">✅ Result copied</div>}

      <textarea
        className="tool-textarea"
        placeholder="Enter text or Base64 data..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setError("")
        }}
      />

      <div className="action-row">
        <button className="generate-btn" onClick={encodeBase64}>
          Encode Base64
        </button>

        <button className="copy-btn" onClick={decodeBase64}>
          Decode Base64
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
          <h2>What Is Base64?</h2>

          <p>
            Base64 is an encoding method that represents binary or text data
            using a limited set of ASCII characters. It is commonly used when
            data needs to be transported through systems that are designed to
            handle text.
          </p>

          <p>
            Base64 encoding is frequently encountered in APIs, email systems,
            data URLs, authentication headers and web applications.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Encode Base64</h2>

          <ol>
            <li>Enter the text you want to encode.</li>
            <li>Click <strong>Encode Base64</strong>.</li>
            <li>Copy the generated Base64 string.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>How to Decode Base64</h2>

          <ol>
            <li>Paste your Base64 string into the input box.</li>
            <li>Click <strong>Decode Base64</strong>.</li>
            <li>Review the decoded text.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>Base64 Encoding vs Encryption</h2>

          <p>
            Base64 is an encoding format, not encryption. Encoding changes the
            representation of data but does not provide confidentiality.
          </p>

          <p>
            Anyone with the encoded data can decode it. Sensitive information
            should therefore not be protected simply by converting it to
            Base64.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's Base64 Encoder?</h2>

          <ul>
            <li>Free to use</li>
            <li>No account required</li>
            <li>Encode and decode Base64</li>
            <li>Works directly in your browser</li>
            <li>Supports regular text input</li>
            <li>Copy results instantly</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>Is Base64 encryption?</h3>
          <p>
            No. Base64 is an encoding method and should not be treated as a
            security mechanism.
          </p>

          <h3>Is this Base64 tool free?</h3>
          <p>
            Yes. The Base64 encoder and decoder are free to use.
          </p>

          <h3>Does my text get uploaded?</h3>
          <p>
            The encoding and decoding operations are performed in your
            browser. Your input is not intentionally uploaded to SecureToolHub
            for processing.
          </p>

          <h3>Where is Base64 commonly used?</h3>
          <p>
            Base64 can be found in APIs, authentication systems, data URLs,
            email systems and applications that need to represent binary data
            as text.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/json-formatter">JSON Formatter</Link> — format and
              validate JSON data.
            </li>

            <li>
              <Link to="/url-encoder">URL Encoder</Link> — encode and decode
              URL components.
            </li>

            <li>
              <Link to="/jwt-decoder">JWT Decoder</Link> — inspect JSON Web
              Tokens.
            </li>

            <li>
              <Link to="/hash-generator">Hash Generator</Link> — generate
              cryptographic hashes.
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default Base64Encoder
