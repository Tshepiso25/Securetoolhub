import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function UuidGenerator() {
  const [uuid, setUuid] = useState("")
  const [copied, setCopied] = useState(false)

  const generateUuid = () => {
    const value = crypto.randomUUID()
    setUuid(value)
    setCopied(false)
  }

  const copyUuid = async () => {
    if (!uuid) return

    try {
      await navigator.clipboard.writeText(uuid)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setCopied(false)
    }
  }

  const clearUuid = () => {
    setUuid("")
    setCopied(false)
  }

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate random Version 4 UUIDs instantly with this free online UUID generator."
    >
      {copied && <div className="toast">✅ UUID copied</div>}

      <div className="generator-card">

        <input
          className="tool-input"
          type="text"
          value={uuid}
          placeholder="Your UUID will appear here..."
          readOnly
        />

        <button className="generate-btn" onClick={generateUuid}>
          Generate UUID
        </button>

        <button className="copy-btn" onClick={copyUuid}>
          {copied ? "✅ Copied!" : "📋 Copy UUID"}
        </button>

        <button className="clear-btn" onClick={clearUuid}>
          Clear
        </button>

      </div>

      <section className="tool-content">

        <div className="tool-info-card">
          <h2>What Is a UUID?</h2>

          <p>
            A UUID, or Universally Unique Identifier, is a 128-bit identifier
            commonly used to identify records, objects, sessions and resources
            in software systems.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>What Is UUID Version 4?</h2>

          <p>
            Version 4 UUIDs are generated using random or pseudo-random data.
            They are commonly used when applications need identifiers without
            relying on sequential database IDs.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Common UUID Use Cases</h2>

          <ul>
            <li>Database record identifiers</li>
            <li>API resource identifiers</li>
            <li>Application objects</li>
            <li>Session identifiers</li>
            <li>Distributed systems</li>
            <li>Unique filenames and references</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's UUID Generator?</h2>

          <ul>
            <li>Generate UUIDs instantly</li>
            <li>No account required</li>
            <li>Free to use</li>
            <li>Uses your browser's UUID functionality</li>
            <li>Copy UUIDs with one click</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>What version of UUID does this generator create?</h3>
          <p>
            This generator creates Version 4 UUIDs using the browser's
            crypto.randomUUID functionality.
          </p>

          <h3>Are UUIDs guaranteed to be unique?</h3>
          <p>
            UUIDs are designed to make collisions extremely unlikely, but
            mathematical guarantees of absolute uniqueness should not be
            assumed.
          </p>

          <h3>Are UUIDs case sensitive?</h3>
          <p>
            UUIDs are generally represented using hexadecimal characters and
            are commonly written in lowercase.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/password-generator">Password Generator</Link>
            </li>
            <li>
              <Link to="/hash-generator">Hash Generator</Link>
            </li>
            <li>
              <Link to="/jwt-decoder">JWT Decoder</Link>
            </li>
            <li>
              <Link to="/json-formatter">JSON Formatter</Link>
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default UuidGenerator