import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function UrlEncoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const encodeUrl = () => {
    if (!input.trim()) {
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
    if (!input.trim()) {
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
      setError(
        "Invalid encoded URL data. Check that the percent-encoded characters are valid."
      )
    }
  }

  const copyOutput = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setError("")

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
      title="URL Encoder & Decoder"
      description="Encode and decode URL components instantly with this free online URL encoding and decoding tool."
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
        placeholder="Encoded or decoded result will appear here..."
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
            URL encoding, also called percent-encoding, converts characters
            into a format that can safely be transmitted within a URL.
            Characters that have special meanings in URLs may need to be
            represented using percent-encoded values.
          </p>

          <p>
            This is particularly important when URLs contain spaces, special
            characters, query parameters or other data that needs to be safely
            represented inside a URL component.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Encode a URL</h2>

          <ol>
            <li>Enter text or a URL component in the input box.</li>
            <li>Click <strong>Encode URL</strong>.</li>
            <li>Review the encoded result.</li>
            <li>Click <strong>Copy Result</strong> if you want to copy it.</li>
          </ol>

          <p>
            The tool uses your browser's built-in URL encoding functionality
            to convert characters into their percent-encoded representation.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Decode URL Data</h2>

          <ol>
            <li>Paste the encoded URL component into the input box.</li>
            <li>Click <strong>Decode URL</strong>.</li>
            <li>Review the decoded text.</li>
            <li>Copy the result if needed.</li>
          </ol>

          <p>
            If the supplied data contains invalid percent-encoding, the tool
            will display an error instead of returning an incorrect result.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>When Is URL Encoding Used?</h2>

          <p>
            URL encoding is commonly used when passing data through web
            addresses, especially when working with query parameters,
            search terms, identifiers and other URL components.
          </p>

          <p>
            For example, a space can be represented as
            <strong> %20</strong> when it is percent-encoded.
          </p>

          <p>
            URL encoding is also useful when an application needs to safely
            include characters that could otherwise be interpreted as part of
            a URL's syntax.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>URL Encoding vs URL Decoding</h2>

          <p>
            <strong>URL encoding</strong> converts text into a URL-safe encoded
            representation.
          </p>

          <p>
            <strong>URL decoding</strong> performs the reverse operation,
            converting percent-encoded characters back into their original
            representation.
          </p>

          <p>
            Together, these operations make it easier to safely prepare and
            interpret data used within URL components.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Is URL Encoding Encryption?</h2>

          <p>
            No. URL encoding is not encryption.
          </p>

          <p>
            Encoded data can generally be decoded back to its original form.
            URL encoding is designed for safe representation of characters,
            not for protecting confidential information.
          </p>

          <p>
            Never rely on URL encoding to protect passwords, authentication
            tokens or other sensitive information.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's URL Encoder?</h2>

          <ul>
            <li>Free to use</li>
            <li>No registration required</li>
            <li>Encode URL components instantly</li>
            <li>Decode percent-encoded values</li>
            <li>Runs directly in your browser</li>
            <li>No software installation required</li>
            <li>Copy results instantly</li>
            <li>Simple developer-friendly interface</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>What does URL encoding do?</h3>

          <p>
            URL encoding converts characters into representations that can
            safely be used within URL components.
          </p>

          <h3>What is percent-encoding?</h3>

          <p>
            Percent-encoding represents certain characters using a percent
            sign followed by hexadecimal characters. For example, a space can
            be represented as %20.
          </p>

          <h3>Is URL encoding the same as encryption?</h3>

          <p>
            No. URL encoding is not a security mechanism and should not be
            used to protect confidential information.
          </p>

          <h3>Can I decode a URL with this tool?</h3>

          <p>
            Yes. Paste URL-encoded data into the input box and select
            <strong> Decode URL</strong>.
          </p>

          <h3>Why can't my URL be decoded?</h3>

          <p>
            The input may contain malformed percent-encoded characters.
            Check that encoded sequences use the correct percent sign followed
            by two hexadecimal characters.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <p>
            You may also find these SecureToolHub tools useful:
          </p>

          <ul>
            <li>
              <Link to="/base64-encoder">
                Base64 Encoder
              </Link>
              {" "}— encode and decode Base64 data.
            </li>

            <li>
              <Link to="/json-formatter">
                JSON Formatter
              </Link>
              {" "}— format, validate and minify JSON.
            </li>

            <li>
              <Link to="/jwt-decoder">
                JWT Decoder
              </Link>
              {" "}— decode JSON Web Tokens in your browser.
            </li>

            <li>
              <Link to="/regex-tester">
                Regex Tester
              </Link>
              {" "}— test regular expressions instantly.
            </li>

            <li>
              <Link to="/hash-generator">
                Hash Generator
              </Link>
              {" "}— generate hashes from text.
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default UrlEncoder