import { useState } from "react"
import { Link } from "react-router-dom"
import ToolLayout from "../components/ToolLayout"

function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const generatePassword = () => {
    let characters = ""

    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) characters += "0123456789"
    if (includeSymbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (!characters) {
      setPassword("")
      setError("Please select at least one character type.")
      return
    }

    const array = new Uint32Array(length)
    crypto.getRandomValues(array)

    let result = ""

    for (let i = 0; i < length; i++) {
      result += characters[array[i] % characters.length]
    }

    setPassword(result)
    setError("")
    setCopied(false)
  }

  const copyPassword = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setError("Unable to copy the password. Please copy it manually.")
    }
  }

  const clearFields = () => {
    setPassword("")
    setCopied(false)
    setError("")
  }

  const getStrength = () => {
    if (!password) return ""

    let score = 0

    if (password.length >= 12) score++
    if (password.length >= 16) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score >= 5) return "Strong"
    if (score >= 3) return "Medium"
    return "Weak"
  }

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong random passwords instantly with this free online password generator."
    >
      {copied && <div className="toast">✅ Password copied</div>}

      <div className="generator-card">

        <input
          className="tool-input"
          type="text"
          value={password}
          placeholder="Your password will appear here..."
          readOnly
        />

        {password && (
          <p className="password-strength">
            Strength: <strong>{getStrength()}</strong>
          </p>
        )}

        <label className="tool-label">
          Password Length: <strong>{length}</strong>
        </label>

        <input
          className="tool-range"
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />

        <div className="checkbox-group">

          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            Uppercase letters
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Lowercase letters
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Symbols
          </label>

        </div>

        <button className="generate-btn" onClick={generatePassword}>
          Generate Password
        </button>

        <button className="copy-btn" onClick={copyPassword}>
          {copied ? "✅ Copied!" : "📋 Copy Password"}
        </button>

        <button className="clear-btn" onClick={clearFields}>
          Clear
        </button>

      </div>

      {error && <p className="tool-error">{error}</p>}

      <section className="tool-content">

        <div className="tool-info-card">
          <h2>What Is a Password Generator?</h2>

          <p>
            A password generator creates random combinations of letters,
            numbers and symbols that can be used as passwords for online
            accounts, applications and other services.
          </p>

          <p>
            Strong randomly generated passwords can make it significantly
            harder for attackers to guess or brute-force an account password.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>How to Generate a Strong Password</h2>

          <ol>
            <li>Choose your preferred password length.</li>
            <li>Select the character types you want to include.</li>
            <li>Click <strong>Generate Password</strong>.</li>
            <li>Copy the generated password and store it securely.</li>
          </ol>
        </div>

        <div className="tool-info-card">
          <h2>What Makes a Password Strong?</h2>

          <p>
            Password strength generally improves when passwords are longer and
            use a varied combination of character types.
          </p>

          <ul>
            <li>Use a longer password whenever possible.</li>
            <li>Use uppercase and lowercase letters.</li>
            <li>Include numbers.</li>
            <li>Include symbols when supported.</li>
            <li>Avoid predictable words and patterns.</li>
            <li>Avoid reusing passwords across different accounts.</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Password Length and Security</h2>

          <p>
            Password length is an important factor in resistance to guessing
            and brute-force attacks. Longer passwords generally provide a
            larger search space than shorter passwords.
          </p>

          <p>
            SecureToolHub allows passwords between 8 and 64 characters so you
            can generate passwords suitable for a wide range of services.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Why Use SecureToolHub's Password Generator?</h2>

          <ul>
            <li>Free to use</li>
            <li>No account or sign-up required</li>
            <li>Generate passwords up to 64 characters</li>
            <li>Choose letters, numbers and symbols</li>
            <li>Uses your browser's cryptographic random generator</li>
            <li>Copy passwords instantly</li>
            <li>Password generation happens directly in your browser</li>
          </ul>
        </div>

        <div className="tool-info-card">
          <h2>Frequently Asked Questions</h2>

          <h3>Are the passwords randomly generated?</h3>

          <p>
            Yes. The generator uses the browser's cryptographic random-value
            functionality to select characters for the generated password.
          </p>

          <h3>What is the maximum password length?</h3>

          <p>
            SecureToolHub's password generator supports passwords up to 64
            characters long.
          </p>

          <h3>Should I reuse generated passwords?</h3>

          <p>
            No. Use a different strong password for each important account to
            reduce the impact of a compromised password.
          </p>

          <h3>Does SecureToolHub store my generated passwords?</h3>

          <p>
            Password generation takes place directly in your browser. The
            generated password is not intentionally sent to SecureToolHub for
            generation or storage.
          </p>

          <h3>Is a password generator the same as a password manager?</h3>

          <p>
            No. A password generator creates passwords, while a password
            manager is designed to securely store and manage credentials.
          </p>
        </div>

        <div className="tool-info-card">
          <h2>Related Developer & Security Tools</h2>

          <ul>
            <li>
              <Link to="/hash-generator">Hash Generator</Link> — generate
              SHA-256 and SHA-512 hashes in your browser.
            </li>

            <li>
              <Link to="/uuid-generator">UUID Generator</Link> — generate
              random Version 4 UUIDs.
            </li>

            <li>
              <Link to="/jwt-decoder">JWT Decoder</Link> — inspect JWT headers
              and payloads.
            </li>

            <li>
              <Link to="/base64-encoder">Base64 Encoder</Link> — encode and
              decode Base64 data.
            </li>
          </ul>
        </div>

      </section>
    </ToolLayout>
  )
}

export default PasswordGenerator