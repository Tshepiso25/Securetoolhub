import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [dateOutput, setDateOutput] = useState("")
  const [timestampOutput, setTimestampOutput] = useState("")
  const [error, setError] = useState("")

  const convertTimestampToDate = () => {
    const numericTimestamp = Number(timestamp)

    if (!timestamp || Number.isNaN(numericTimestamp)) {
      setError("Please enter a valid Unix timestamp.")
      setDateOutput("")
      return
    }

    const milliseconds =
      timestamp.length === 10 ? numericTimestamp * 1000 : numericTimestamp

    const date = new Date(milliseconds)

    if (Number.isNaN(date.getTime())) {
      setError("Invalid timestamp.")
      setDateOutput("")
      return
    }

    setDateOutput(date.toUTCString())
    setError("")
  }

  const convertDateToTimestamp = () => {
    if (!dateInput) {
      setError("Please enter a valid date.")
      setTimestampOutput("")
      return
    }

    const date = new Date(dateInput)

    if (Number.isNaN(date.getTime())) {
      setError("Invalid date.")
      setTimestampOutput("")
      return
    }

    setTimestampOutput(Math.floor(date.getTime() / 1000))
    setError("")
  }

  const clearFields = () => {
    setTimestamp("")
    setDateInput("")
    setDateOutput("")
    setTimestampOutput("")
    setError("")
  }

  return (
    <ToolLayout
      title="Timestamp Converter"
      description="Convert Unix timestamps to human-readable dates and dates back to Unix time."
    >
      <h3>Unix Timestamp to Date</h3>

      <input
        className="tool-input"
        placeholder="Example: 1751750400"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
      />

      <button className="generate-btn" onClick={convertTimestampToDate}>
        Convert to Date
      </button>

      <textarea
        className="tool-textarea"
        placeholder="Date result..."
        value={dateOutput}
        readOnly
      />

      <h3>Date to Unix Timestamp</h3>

      <input
        className="tool-input"
        type="datetime-local"
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
      />

      <button className="generate-btn" onClick={convertDateToTimestamp}>
        Convert to Timestamp
      </button>

      <textarea
        className="tool-textarea"
        placeholder="Timestamp result..."
        value={timestampOutput}
        readOnly
      />

      {error && <p className="tool-error">{error}</p>}

      <button className="clear-btn" onClick={clearFields}>
        Clear
      </button>
    </ToolLayout>
  )
}

export default TimestampConverter