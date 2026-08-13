import { useState } from "react"
import { Link } from "react-router-dom"
import QRCode from "qrcode"
import ToolLayout from "../components/ToolLayout"

function QrCodeGenerator() {
  const [input, setInput] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [error, setError] = useState("")

  const generateQrCode = async () => {
    if (!input.trim()) {
      setError("Please enter text or a URL.")
      setQrCode("")
      return
    }

    try {
      const qr = await QRCode.toDataURL(input.trim(), {
        width: 500,
        margin: 2
      })

      setQrCode(qr)
      setError("")
    } catch {
      setQrCode("")
      setError("Failed to generate the QR code.")
    }
  }

  const clearFields = () => {
    setInput("")
    setQrCode("")
    setError("")
  }

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate free QR codes from text or URLs instantly with this browser-based QR code generator."
    >
      <textarea
        className="tool-textarea"
        placeholder="Enter text or URL..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
          setError("")
        }}
      />

      <button className="generate-btn" onClick={generateQrCode}>
        Generate QR Code
      </button>

      {error && <p className="tool-error">{error}</p>}

      {qrCode && (
        <div className="qr-box">
          <img
            src={qrCode}
            alt="Generated QR code"
          />

          <a
            href={qrCode}
            download="securetoolhub-qr-code.png"
          >
            <button className="copy-btn">
              Download QR Code
            </button>
          </a>
        </div>
      )}

      <button className="clear-btn" onClick={clearFields}>
        Clear
      </button>

      <section className="tool-content">

        <div className="tool-info-card">
          <h2>What Is a QR Code?</h2>

          <p>
            A QR code is a two-dimensional barcode that can store information
            such as URLs, text and other data. Smartphones and QR scanning
            applications can read the encoded information.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Create a QR Code</h2>

          <ol>
            <li>Enter a URL or text.</li>
            <li>Click <strong>Generate QR Code</strong>.</li>
            <li>Scan the generated QR code or download the image.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>Common QR Code Uses</h2>

          <ul>
            <li>Website URLs</li>
            <li>Contact information</li>
            <li>Event information</li>
            <li>Product information</li>
            <li>Digital menus</li>
            <li>Marketing materials</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's QR Code Generator?</h2>

          <ul>
            <li>Free QR code generation</li>
            <li>No account required</li>
            <li>Generate QR codes instantly</li>
            <li>Download QR codes as PNG images</li>
            <li>Browser-based generation</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>Can I create a QR code for a website?</h3>
          <p>
            Yes. Enter the complete website URL and generate the QR code.
          </p>

          <h3>Can I download the QR code?</h3>
          <p>
            Yes. After generating the QR code, use the Download QR Code
            button.
          </p>

          <h3>Does SecureToolHub store my QR code data?</h3>
          <p>
            The QR code is generated in the browser using the QR code library
            used by the application.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer Tools</h2>

          <ul>
            <li>
              <Link to="/url-encoder">URL Encoder</Link>
            </li>
            <li>
              <Link to="/base64-encoder">Base64 Encoder</Link>
            </li>
            <li>
              <Link to="/uuid-generator">UUID Generator</Link>
            </li>
            <li>
              <Link to="/timestamp-converter">Timestamp Converter</Link>
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default QrCodeGenerator