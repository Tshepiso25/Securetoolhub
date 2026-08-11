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
      const qr = await QRCode.toDataURL(input)
      setQrCode(qr)
      setError("")
    } catch {
      setError("Failed to generate QR code.")
      setQrCode("")
    }
  }

  const clearFields = () => {
    setInput("")
    setQrCode("")
    setError("")
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QR Code Generator",
    url: "https://securettoolhub.com/qr-code-generator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description:
      "Free QR code generator for creating QR codes from text or URLs directly in your browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  const belowTool = (
    <>
      <section className="tool-info-section">
        <h2>What Is a QR Code?</h2>

        <p>
          A QR code is a two-dimensional barcode that can store information
          such as website URLs, text, contact details, and other data. When
          scanned with a compatible phone or QR code reader, the stored
          information can be accessed quickly.
        </p>

        <p>
          SecureToolHub's QR code generator lets you create QR codes from
          text or URLs directly in your browser without creating an account.
        </p>
      </section>

      <section className="tool-info-section">
        <h2>How to Create a QR Code</h2>

        <ol>
          <li>Enter a URL or text into the input box above.</li>
          <li>Click <strong>Generate QR Code</strong>.</li>
          <li>Download the generated QR code as a PNG image.</li>
        </ol>
      </section>

      <section className="tool-info-section">
        <h2>What Can You Use a QR Code For?</h2>

        <ul>
          <li>Sharing website URLs</li>
          <li>Digital menus and business information</li>
          <li>Event information and registration pages</li>
          <li>Sharing text and instructions</li>
          <li>Marketing materials and printed resources</li>
          <li>Quick access to online resources</li>
        </ul>
      </section>

      <section className="tool-info-section">
        <h2>Why Use SecureToolHub's QR Code Generator?</h2>

        <ul>
          <li>Free to use</li>
          <li>No account or sign-up required</li>
          <li>Works directly in your web browser</li>
          <li>Supports both text and URLs</li>
          <li>Download your generated QR code as a PNG</li>
          <li>Simple and fast interface</li>
        </ul>
      </section>

      <section className="tool-info-section">
        <h2>Frequently Asked Questions</h2>

        <div className="tool-faq">
          <h3>Can I create a QR code for a website?</h3>
          <p>
            Yes. Enter the complete website URL into the generator and click
            Generate QR Code.
          </p>

          <h3>Is the QR code generator free?</h3>
          <p>
            Yes. SecureToolHub's QR code generator is free to use and does not
            require an account.
          </p>

          <h3>Can I create a QR code from text?</h3>
          <p>
            Yes. You can enter ordinary text as well as website URLs.
          </p>

          <h3>Do QR codes expire?</h3>
          <p>
            A QR code generated from static text or a URL does not inherently
            expire. However, if the QR code points to a website or online
            resource, that destination needs to remain available.
          </p>

          <h3>What format can I download the QR code in?</h3>
          <p>
            The current generator lets you download your QR code as a PNG
            image.
          </p>
        </div>
      </section>

      <section className="tool-info-section">
        <h2>More Free Developer Tools</h2>

        <p>
          SecureToolHub provides a growing collection of free online tools
          for developers, students, creators, and everyday users.
        </p>

        <div className="related-tools">
          <Link to="/json-formatter">JSON Formatter</Link>
          <Link to="/password-generator">Password Generator</Link>
          <Link to="/url-encoder">URL Encoder</Link>
          <Link to="/base64-encoder">Base64 Encoder</Link>
          <Link to="/uuid-generator">UUID Generator</Link>
        </div>
      </section>
    </>
  )

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate free QR codes instantly from text or URLs."
      structuredData={structuredData}
      belowTool={belowTool}
    >
      <textarea
        className="tool-textarea"
        placeholder="Enter text or URL..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="generate-btn" onClick={generateQrCode}>
        Generate QR Code
      </button>

      {error && <p className="tool-error">{error}</p>}

      {qrCode && (
        <div className="qr-box">
          <img src={qrCode} alt="Generated QR Code" />

          <a href={qrCode} download="securetoolhub-qr-code.png">
            <button className="copy-btn">Download QR Code</button>
          </a>
        </div>
      )}

      <button className="clear-btn" onClick={clearFields}>
        Clear
      </button>
    </ToolLayout>
  )
}

export default QrCodeGenerator