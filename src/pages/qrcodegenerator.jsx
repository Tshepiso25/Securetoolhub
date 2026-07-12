import { useState } from "react"
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

  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes instantly from text or URLs."
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
            <button className="copy-btn">
              Download QR Code
            </button>
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