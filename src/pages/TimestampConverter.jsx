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
          `Milliseconds: ${milliseconds}`,
          `Unix Seconds: ${Math.floor(milliseconds / 1000)}`
        ].join("\n")
      )

      setError("")
    } catch {
      setOutput("")
      setError(
        "Unable to convert the timestamp. Please check that the value is within the supported date range."
      )
    }
  }

  const useCurrentTimestamp = () => {
    const timestamp = Math.floor(Date.now() / 1000)

    setInput(String(timestamp))
    setError("")
    setOutput("")
  }

  const clearFields = () => {
    setInput("")
    setOutput("")
    setError("")
  }

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Convert Unix timestamps to readable UTC and local dates instantly with this free online timestamp converter."
    >
      <div className="tool-form-group">
        <label className="tool-label" htmlFor="timestamp-input">
          Unix Timestamp
        </label>

        <input
          id="timestamp-input"
          className="tool-input"
          type="text"
          inputMode="numeric"
          placeholder="Enter Unix timestamp, e.g. 1750000000"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
          }}
        />
      </div>

      <div className="action-row">
        <button
          className="generate-btn"
          onClick={convertTimestamp}
        >
          Convert Timestamp
        </button>

        <button
          className="copy-btn"
          onClick={useCurrentTimestamp}
        >
          Use Current Timestamp
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
        <label className="tool-label" htmlFor="timestamp-output">
          Converted Date
        </label>

        <textarea
          id="timestamp-output"
          className="tool-textarea"
          placeholder="Converted date will appear here..."
          value={output}
          readOnly
        />
      </div>

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

          <p>
            You can also select <strong>Use Current Timestamp</strong> to
            populate the current Unix timestamp.
          </p>
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
            <li>Scheduled tasks</li>
            <li>Distributed systems</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Unix Timestamp Example</h2>

          <p>
            A Unix timestamp such as
            <code> 1750000000 </code>
            represents a specific point in time. The converter translates
            that numeric value into human-readable UTC and local date formats.
          </p>
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
            Yes. Select <strong>Use Current Timestamp</strong> to populate
            the current Unix timestamp.
          </p>

          <h3>Does the converter show UTC and local time?</h3>

          <p>
            Yes. The result includes both the UTC representation and the
            local date representation generated by your browser.
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
              <Link to="/jwt-decoder">
                JWT Decoder
              </Link>
            </li>

            <li>
              <Link to="/uuid-generator">
                UUID Generator
              </Link>
            </li>

            <li>
              <Link to="/regex-tester">
                Regex Tester
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </ToolLayout>
  )
}

export default TimestampConverter