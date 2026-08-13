import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function Base64Encoder() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("encode")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const encodeBase64 = (text) => {
    try {
      const bytes = new TextEncoder().encode(text)

      let binary = ""

      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte)
      })

      return btoa(binary)
    } catch {
      throw new Error("Unable to encode the provided text.")
    }
  }

  const decodeBase64 = (text) => {
    try {
      const cleaned = text.replace(/\s/g, "")

      if (!cleaned) {
        throw new Error("Please enter Base64 data.")
      }

      const binary = atob(cleaned)

      const bytes = Uint8Array.from(binary, (char) =>
        char.charCodeAt(0)
      )

      return new TextDecoder().decode(bytes)
    } catch {
      throw new Error(
        "Invalid Base64 data. Please check the input and try again."
      )
    }
  }

  const processBase64 = () => {
    if (!input.trim()) {
      setError(
        mode === "encode"
          ? "Please enter text to encode."
          : "Please enter Base64 data to decode."
      )
      setOutput("")
      return
    }

    try {
      const result =
        mode === "encode"
          ? encodeBase64(input)
          : decodeBase64(input)

      setOutput(result)
      setError("")
      setCopied(false)
    } catch (err) {
      setOutput("")
      setCopied(false)
      setError(
        err?.message ||
          "Unable to process the provided data."
      )
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
      setError(
        "Unable to copy the result. Please copy it manually."
      )
    }
  }

  const clearFields = () => {
    setInput("")
    setOutput("")
    setError("")
    setCopied(false)
  }

  const changeMode = (newMode) => {
    setMode(newMode)
    setInput("")
    setOutput("")
    setError("")
    setCopied(false)
  }

  return (
    <ToolLayout
      title="Base64 Encoder & Decoder"
      description="Encode text to Base64 or decode Base64 data instantly in your browser."
    >
      {copied && (
        <div className="toast">
          ✅ Result copied
        </div>
      )}

      <div className="action-row">
        <button
          className={
            mode === "encode"
              ? "generate-btn"
              : "copy-btn"
          }
          onClick={() => changeMode("encode")}
        >
          Encode to Base64
        </button>

        <button
          className={
            mode === "decode"
              ? "generate-btn"
              : "copy-btn"
          }
          onClick={() => changeMode("decode")}
        >
          Decode Base64
        </button>
      </div>

      <textarea
        className="tool-textarea"
        placeholder={
          mode === "encode"
            ? "Enter text to encode..."
            : "Paste Base64 data to decode..."
        }
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setError("")
        }}
      />

      <button
        className="generate-btn"
        onClick={processBase64}
      >
        {mode === "encode"
          ? "Encode Text"
          : "Decode Base64"}
      </button>

      {error && (
        <p className="tool-error">
          {error}
        </p>
      )}

      <textarea
        className="tool-textarea"
        placeholder={
          mode === "encode"
            ? "Base64 result will appear here..."
            : "Decoded text will appear here..."
        }
        value={output}
        readOnly
      />

      <button
        className="copy-btn"
        onClick={copyOutput}
      >
        {copied
          ? "✅ Copied!"
          : "📋 Copy Result"}
      </button>

      <button
        className="clear-btn"
        onClick={clearFields}
      >
        Clear
      </button>

      <section className="tool-content">

        <div className="tool-info-card">
          <h2>What Is Base64 Encoding?</h2>

          <p>
            Base64 is an encoding method that converts binary
            or text data into a string of characters that can be
            safely represented using a limited set of text
            characters.
          </p>

          <p>
            Base64 is commonly used when applications need to
            represent data inside text-based formats such as
            JSON, XML, HTML, CSS and email messages.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Use the Base64 Encoder</h2>

          <ol>
            <li>
              Select <strong>Encode to Base64</strong>.
            </li>

            <li>
              Enter or paste your text.
            </li>

            <li>
              Click <strong>Encode Text</strong>.
            </li>

            <li>
              Copy the generated Base64 result.
            </li>
          </ol>

          <p>
            You can switch to Decode Base64 when you need to
            convert Base64 data back into readable text.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Base64 Encoding vs Encryption</h2>

          <p>
            Base64 is an encoding method, not an encryption
            method. It does not protect information from being
            read by someone who has access to the encoded value.
          </p>

          <p>
            Anyone with a Base64 decoder can generally convert
            Base64 data back into its original representation.
            Do not use Base64 as a replacement for encryption,
            passwords or other security mechanisms.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Common Uses of Base64</h2>

          <ul>
            <li>
              Representing binary data as text
            </li>

            <li>
              Embedding images in HTML or CSS
            </li>

            <li>
              Transmitting data through text-based APIs
            </li>

            <li>
              Representing data inside JSON and XML
            </li>

            <li>
              Encoding email attachments
            </li>

            <li>
              Working with authentication and API data
            </li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's Base64 Encoder?</h2>

          <ul>
            <li>
              Free to use
            </li>

            <li>
              No account or sign-up required
            </li>

            <li>
              Encode and decode Base64 instantly
            </li>

            <li>
              Supports normal Unicode text
            </li>

            <li>
              Runs directly in your browser
            </li>

            <li>
              Your input is not intentionally uploaded to
              SecureToolHub for processing
            </li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>Is Base64 encryption?</h3>

          <p>
            No. Base64 is encoding rather than encryption.
            Encoded data can be decoded back into its original
            form.
          </p>

          <h3>Can I decode Base64 with this tool?</h3>

          <p>
            Yes. Select Decode Base64, paste your encoded data
            and click Decode Base64.
          </p>

          <h3>Does Base64 make data smaller?</h3>

          <p>
            No. Base64 normally increases the size of binary
            data because it represents the data using text
            characters.
          </p>

          <h3>Can Base64 encode special characters?</h3>

          <p>
            Yes. This tool supports Unicode text, including
            many international characters and symbols.
          </p>

          <h3>Is my data uploaded to a server?</h3>

          <p>
            The encoding and decoding operations are performed
            directly in your browser. Your input is not
            intentionally uploaded to SecureToolHub for this
            operation.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <p>
            You may also find these SecureToolHub tools useful:
          </p>

          <ul>
            <li>
              <Link to="/json-formatter">
                JSON Formatter
              </Link>
              {" "}— format and validate JSON data.
            </li>

            <li>
              <Link to="/url-encoder">
                URL Encoder
              </Link>
              {" "}— encode and decode URL components.
            </li>

            <li>
              <Link to="/jwt-decoder">
                JWT Decoder
              </Link>
              {" "}— decode JSON Web Tokens in your browser.
            </li>

            <li>
              <Link to="/hash-generator">
                Hash Generator
              </Link>
              {" "}— generate cryptographic hashes from text.
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default Base64Encoder