import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import PasswordGenerator from './pages/PasswordGenerator'
import JsonFormatter from './pages/JsonFormatter'
import Base64Encoder from './pages/Base64Encoder'
import UrlEncoder from './pages/UrlEncoder'
import UuidGenerator from './pages/UuidGenerator'
import HashGenerator from './pages/HashGenerator'
import QrCodeGenerator from './pages/QrCodeGenerator'
import JwtDecoder from './pages/JwtDecoder'
import RegexTester from './pages/RegexTester'
import TimestampConverter from './pages/TimestampConverter'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/password-generator" element={<PasswordGenerator />} />
      <Route path="/json-formatter" element={<JsonFormatter />} />
      <Route path="/base64-encoder" element={<Base64Encoder />} />
      <Route path="/url-encoder" element={<UrlEncoder />} />
      <Route path="/uuid-generator" element={<UuidGenerator />} />
      <Route path="/hash-generator" element={<HashGenerator />} />
      <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
      <Route path="/jwt-decoder" element={<JwtDecoder />} />
      <Route path="/regex-tester" element={<RegexTester />} />
      <Route path="/timestamp-converter" element={<TimestampConverter />} />
    </Routes>
  )
}

export default App