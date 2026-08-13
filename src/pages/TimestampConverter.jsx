import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function TimestampConverter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")

  const convertTimestamp = () => {
    if (!input.trim()) {
      setError("Please enter a Unix timestamp.")
      setOutput("")
      return
    }

    const timestamp = Number(input.trim())

    if (!Number.isFinite(timestamp)) {
      setError("Please enter a valid numeric timestamp.")
      setOutput("")
      return
    }

    try {
      const milliseconds =
        Math.abs(timestamp) < 100000000000
          ? timestamp * 1000
          : timestamp

      const date = new Date(milliseconds)

      if (Number.isNaN(date.getTime())) {
        throw new Error()
      }

      setOutput(
        [
          `UTC: ${date.toISOString()}`,
          `Local: ${date.toString()}`,
          `Milliseconds: ${milliseconds}`
        ].join("\n")
      )

      setError("")
    } catch {
      setOutput("")
      setError("Unable to convert the timestamp.")
    }
  }

  const useCurrentTimestamp = () => {
    const timestamp = Math.floor(Date.now() / 1000)
    setInput(String(timestamp))
    setError("")
  }

  const clearFields = () => {
    setInput("")
    setOutput("")
    setError("")
  }

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Convert Unix timestamps to readable dates instantly with this free online timestamp converter."
    >
      <input
        className="tool-input"
        type="text"
        placeholder="Enter Unix timestamp, e.g. 1750000000"
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setError("")
        }}
      />

      <button className="generate-btn" onClick={convertTimestamp}>
        Convert Timestamp
      </button>

      <button className="copy-btn" onClick={useCurrentTimestamp}>
        Use Current Timestamp
      </button>

      {error && <p className="tool-error">{error}</p>}

      <textarea
        className="tool-textarea"
        placeholder="Converted date will appear here..."
        value={output}
        readOnly
      />

      <button className="clear-btn" onClick={clearFields}>
        Clear
      </button>

      <section className="tool-content">

        <div className="tool-info-card">
          <h2>What Is a Unix Timestamp?</h2>

          <p>
            A Unix timestamp represents a point in time as the number of
            seconds that have elapsed since January 1, 1970 at 00:00:00 UTC,
            commonly known as the Unix epoch.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Convert a Unix Timestamp</h2>

          <ol>
            <li>Enter a Unix timestamp.</li>
            <li>Click <strong>Convert Timestamp</strong>.</li>
            <li>Review the UTC and local date representations.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>Seconds vs Milliseconds</h2>

          <p>
            Unix timestamps are commonly represented in seconds, while
            JavaScript Date values use milliseconds.
          </p>

          <p>
            This tool detects common timestamp formats and converts them into
            readable date representations.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Where Are Timestamps Used?</h2>

          <ul>
            <li>APIs</li>
            <li>Databases</li>
            <li>Application logs</li>
            <li>Authentication systems</li>
            <li>Web applications</li>
            <li>Event tracking</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>What is the Unix epoch?</h3>
          <p>
            The Unix epoch begins at January 1, 1970 at 00:00:00 UTC.
          </p>

          <h3>Are timestamps in seconds or milliseconds?</h3>
          <p>
            Unix timestamps are commonly expressed in seconds, while
            JavaScript timestamps are commonly represented in milliseconds.
          </p>

          <h3>Can I get the current Unix timestamp?</h3>
          <p>
            Yes. Select Use Current Timestamp to populate the current Unix
            timestamp.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/json-formatter">JSON Formatter</Link>
            </li>
            <li>
              <Link to="/jwt-decoder">JWT Decoder</Link>
            </li>
            <li>
              <Link to="/uuid-generator">UUID Generator</Link>
            </li>
            <li>
              <Link to="/regex-tester">Regex Tester</Link>
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default TimestampConverter