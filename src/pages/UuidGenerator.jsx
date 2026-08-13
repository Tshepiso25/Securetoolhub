import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function UuidGenerator() {
  const [uuid, setUuid] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const generateUuid = () => {
    try {
      const value = crypto.randomUUID()

      setUuid(value)
      setCopied(false)
      setError("")
    } catch {
      setUuid("")
      setCopied(false)
      setError("Unable to generate a UUID in this browser.")
    }
  }

  const copyUuid = async () => {
    if (!uuid) {
      setError("Generate a UUID before copying it.")
      return
    }

    try {
      await navigator.clipboard.writeText(uuid)
      setCopied(true)
      setError("")

      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setCopied(false)
      setError("Unable to copy the UUID. Please copy it manually.")
    }
  }

  const clearUuid = () => {
    setUuid("")
    setCopied(false)
    setError("")
  }

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random UUID Version 4 identifiers instantly with this free online UUID generator."
    >
      {copied && <div className="toast">✅ UUID copied</div>}

      <div className="generator-card">
        <label className="tool-label" htmlFor="uuid-output">
          Generated UUID
        </label>

        <input
          id="uuid-output"
          className="tool-input"
          type="text"
          value={uuid}
          placeholder="Your UUID will appear here..."
          readOnly
          aria-label="Generated UUID"
        />

        <div className="action-row">
          <button
            className="generate-btn"
            onClick={generateUuid}
          >
            Generate UUID
          </button>

          <button
            className="copy-btn"
            onClick={copyUuid}
            disabled={!uuid}
          >
            {copied ? "✅ Copied!" : "📋 Copy UUID"}
          </button>

          <button
            className="clear-btn"
            onClick={clearUuid}
          >
            Clear
          </button>
        </div>

        {error && <p className="tool-error">{error}</p>}
      </div>

      <section className="tool-content">
        <div className="tool-info-card">
          <h2>What Is a UUID?</h2>

          <p>
            A UUID, or Universally Unique Identifier, is a 128-bit identifier
            commonly used to identify records, objects, sessions, resources
            and other entities in software systems.
          </p>

          <p>
            UUIDs allow applications to create identifiers without depending
            on simple sequential numbers such as 1, 2, 3 or 4.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>What Is UUID Version 4?</h2>

          <p>
            UUID Version 4 identifiers are generated using randomly generated
            data. They are commonly used when an application needs an
            identifier that does not depend on a database sequence.
          </p>

          <p>
            SecureToolHub generates Version 4 UUIDs using the browser's
            built-in <code>crypto.randomUUID()</code> functionality.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Generate a UUID</h2>

          <ol>
            <li>Click <strong>Generate UUID</strong>.</li>
            <li>Review the generated UUID.</li>
            <li>Click <strong>Copy UUID</strong> to copy it.</li>
            <li>Use the UUID in your application, database or API.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>Common UUID Use Cases</h2>

          <ul>
            <li>Database record identifiers</li>
            <li>API resource identifiers</li>
            <li>Application objects</li>
            <li>Session identifiers</li>
            <li>Distributed systems</li>
            <li>Unique references</li>
            <li>Temporary resource identifiers</li>
            <li>Client-side application data</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>UUID Format</h2>

          <p>
            A standard UUID is commonly represented as 32 hexadecimal
            characters separated into five groups by hyphens.
          </p>

          <p>
            A Version 4 UUID follows the familiar
            <code> 8-4-4-4-12 </code>
            hexadecimal representation.
          </p>

          <p>
            Example:
          </p>

          <pre className="tool-code-block">
            550e8400-e29b-41d4-a716-446655440000
          </pre>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's UUID Generator?</h2>

          <ul>
            <li>Free UUID generation</li>
            <li>No account or registration required</li>
            <li>Generate UUIDs instantly</li>
            <li>Uses your browser's built-in UUID functionality</li>
            <li>Copy UUIDs with one click</li>
            <li>Browser-based processing</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>What version of UUID does this generator create?</h3>

          <p>
            This generator creates Version 4 UUIDs using the browser's
            <code> crypto.randomUUID() </code>
            functionality.
          </p>

          <h3>Are UUIDs guaranteed to be unique?</h3>

          <p>
            UUIDs are designed to make collisions extremely unlikely.
            However, absolute mathematical uniqueness should not be assumed.
          </p>

          <h3>Are UUIDs case sensitive?</h3>

          <p>
            UUIDs are commonly represented using hexadecimal characters and
            are typically written in lowercase. Applications should follow
            the requirements of the system where the UUID is being used.
          </p>

          <h3>Can I use a UUID as a database ID?</h3>

          <p>
            Yes. UUIDs are commonly used as identifiers for database records,
            although the appropriate identifier strategy depends on the
            database and application architecture.
          </p>

          <h3>Does this UUID generator upload my UUID?</h3>

          <p>
            The UUID is generated directly in your browser using the
            browser's built-in cryptographic UUID functionality.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/password-generator">
                Password Generator
              </Link>
            </li>

            <li>
              <Link to="/hash-generator">
                Hash Generator
              </Link>
            </li>

            <li>
              <Link to="/jwt-decoder">
                JWT Decoder
              </Link>
            </li>

            <li>
              <Link to="/json-formatter">
                JSON Formatter
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </ToolLayout>
  )
}

export default UuidGenerator