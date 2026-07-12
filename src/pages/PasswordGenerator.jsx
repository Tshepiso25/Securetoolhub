import { useState } from "react"
import ToolLayout from "../components/ToolLayout"

function PasswordGenerator() {
  const [length, setLength] = useState(16)

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, secure passwords instantly."
    >
      <input
        type="text"
        placeholder="Your password will appear here..."
        readOnly
      />

      <div className="slider">
        <label>Password Length</label>

        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <span>{length}</span>
      </div>

      <div className="options">
        <label>
          <input type="checkbox" defaultChecked />
          Uppercase
        </label>

        <label>
          <input type="checkbox" defaultChecked />
          Lowercase
        </label>

        <label>
          <input type="checkbox" defaultChecked />
          Numbers
        </label>

        <label>
          <input type="checkbox" defaultChecked />
          Symbols
        </label>
      </div>

      <button className="generate-btn">
        Generate Password
      </button>
    </ToolLayout>
  )
}

export default PasswordGenerator