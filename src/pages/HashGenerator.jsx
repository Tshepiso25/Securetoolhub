import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

async function generateHash(text, algorithm) {
  const data = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)

  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("")
}

function HashGenerator() {
  const [input, setInput] = useState("")
  const [algorithm, setAlgorithm] = useState("SHA-256")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const createHash = async () => {
    if (!input.trim()) {
      setError("Please enter text to hash.")
      setOutput("")
      setCopied(false)
      return
    }

    try {
      const hash = await generateHash(input, algorithm)

      setOutput(hash)
      setError("")
      setCopied(false)
    } catch {
      setOutput("")
      setCopied(false)
      setError("Unable to generate the hash.")
    }
  }

  const copyHash = async () => {
    if (!output) {
      setError("Generate a hash before copying it.")
      return
    }

    try {
      await navigator.clipboard.writeText(output)

      setCopied(true)
      setError("")

      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setCopied(false)
      setError("Unable to copy the hash. Please copy it manually.")
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
      title="Hash Generator"
      description="Generate SHA-256 and SHA-512 hashes instantly with this free browser-based hash generator."
    >
      {copied && <div className="toast">✅ Hash copied</div>}

      <div className="tool-form-group">
        <label className="tool-label" htmlFor="hash-input">
          Text to Hash
        </label>

        <textarea
          id="hash-input"
          className="tool-textarea"
          placeholder="Enter text to hash..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError("")
          }}
        />
      </div>

      <div className="tool-form-group">
        <label className="tool-label" htmlFor="hash-algorithm">
          Hash Algorithm
        </label>

        <select
          id="hash-algorithm"
          className="tool-select"
          value={algorithm}
          onChange={(e) => {
            setAlgorithm(e.target.value)
            setOutput("")
            setCopied(false)
            setError("")
          }}
        >
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </div>

      <div className="action-row">
        <button
          className="generate-btn"
          onClick={createHash}
        >
          Generate Hash
        </button>

        <button
          className="copy-btn"
          onClick={copyHash}
          disabled={!output}
        >
          {copied ? "✅ Copied!" : "📋 Copy Hash"}
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
        <label className="tool-label" htmlFor="hash-output">
          Hash Result
        </label>

        <textarea
          id="hash-output"
          className="tool-textarea"
          placeholder="Hash result will appear here..."
          value={output}
          readOnly
        />
      </div>

      <section className="tool-content">
        <div className="tool-info-card">
          <h2>What Is a Hash?</h2>

          <p>
            A cryptographic hash function transforms input data into a
            fixed-length string called a hash or digest.
          </p>

          <p>
            Hash functions are commonly used for data integrity checks,
            digital fingerprints, file verification and security-related
            applications.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>SHA-256 vs SHA-512</h2>

          <p>
            SHA-256 produces a 256-bit digest, while SHA-512 produces a
            512-bit digest. Both algorithms belong to the SHA-2 family of
            cryptographic hash functions.
          </p>

          <ul>
            <li>SHA-256 produces a 64-character hexadecimal digest.</li>
            <li>SHA-512 produces a 128-character hexadecimal digest.</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>How to Generate a Hash</h2>

          <ol>
            <li>Enter the text you want to hash.</li>
            <li>Select SHA-256 or SHA-512.</li>
            <li>Click <strong>Generate Hash</strong>.</li>
            <li>Copy the resulting hash if needed.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>Important Hashing Properties</h2>

          <ul>
            <li>The same input produces the same hash.</li>
            <li>
              Small input changes produce substantially different hashes.
            </li>
            <li>
              Cryptographic hashes are designed to be computationally
              difficult to reverse.
            </li>
            <li>
              Hashes are commonly represented as hexadecimal strings.
            </li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Hashing vs Encryption</h2>

          <p>
            Hashing and encryption are different concepts. Encryption is
            designed to allow data to be recovered using the appropriate key.
            Cryptographic hashing is designed as a one-way transformation.
          </p>

          <p>
            A hash should therefore not be treated as a form of encryption.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's Hash Generator?</h2>

          <ul>
            <li>Free SHA-256 hashing</li>
            <li>Free SHA-512 hashing</li>
            <li>Browser-based processing</li>
            <li>No account or sign-up required</li>
            <li>Copy results instantly</li>
            <li>Simple developer-friendly interface</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>Can a hash be decrypted?</h3>

          <p>
            A cryptographic hash is designed to be one-way rather than
            reversible like encryption.
          </p>

          <h3>Which hashing algorithm should I use?</h3>

          <p>
            SHA-256 is widely used and is suitable for many general hashing
            and integrity-checking tasks. SHA-512 produces a longer digest.
          </p>

          <h3>Is hashing the same as encryption?</h3>

          <p>
            No. Encryption is designed to be reversible with the appropriate
            key, while cryptographic hashing is designed as a one-way
            transformation.
          </p>

          <h3>Does this hash generator upload my text?</h3>

          <p>
            Hash generation is performed in the browser using the Web
            Crypto API. The tool does not intentionally upload your input
            to SecureToolHub for hashing.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/uuid-generator">
                UUID Generator
              </Link>
            </li>

            <li>
              <Link to="/password-generator">
                Password Generator
              </Link>
            </li>

            <li>
              <Link to="/base64-encoder">
                Base64 Encoder
              </Link>
            </li>

            <li>
              <Link to="/jwt-decoder">
                JWT Decoder
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </ToolLayout>
  )
}

export default HashGenerator