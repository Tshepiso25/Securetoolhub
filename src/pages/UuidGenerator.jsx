import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function UuidGenerator() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState([])
  const [copied, setCopied] = useState(false)

  const generateUUIDs = () => {
    const list = []

    for (let i = 0; i < count; i++) {
      list.push(crypto.randomUUID())
    }

    setUuids(list)
    setCopied(false)
  }

  const copyUUIDs = () => {
    if (uuids.length === 0) return

    navigator.clipboard.writeText(uuids.join("\n"))

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1800)
  }

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate secure Version 4 UUIDs instantly."
    >
      {copied && <div className="toast">✅ UUIDs copied</div>}

      <label>Number of UUIDs</label>

      <select
        className="tool-select"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>

      <button
        className="generate-btn"
        onClick={generateUUIDs}
      >
        Generate UUIDs
      </button>

      <textarea
        className="tool-textarea"
        value={uuids.join("\n")}
        readOnly
        placeholder="Generated UUIDs will appear here..."
      />

      <button
        className="copy-btn"
        onClick={copyUUIDs}
      >
        {copied ? "✅ Copied!" : "📋 Copy UUIDs"}
      </button>
    </ToolLayout>
  )
}

export default UuidGenerator