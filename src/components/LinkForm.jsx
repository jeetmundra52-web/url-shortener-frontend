import { useState } from "react";
import { shortenUrl } from "../api.js";
import { toast, ToastContainer } from "react-toastify";
import QRCode from "react-qr-code";
import "react-toastify/dist/ReactToastify.css";

export default function LinkForm({ onNewLink }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [expiryDays, setExpiryDays] = useState(7);
  const [result, setResult] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!originalUrl) return toast.error("Enter a URL");

    const data = await shortenUrl(originalUrl, customCode, expiryDays);
    if (data.message) return toast.error(data.message);

    setResult(data);
    onNewLink({
      shortUrl: data.shortUrl,
      shortCode: data.shortCode,
      originalUrl: data.originalUrl,
      createdAt: new Date().toISOString()
    });
    toast.success("Shortened!");
  };

  const copy = async text => {
    await navigator.clipboard.writeText(text);
    toast("Copied!");
  };

  return (
    <section className="card">
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="https://example.com/very/long/path"
          value={originalUrl}
          onChange={e => setOriginalUrl(e.target.value)}
        />
        <input
          placeholder="custom code (optional)"
          value={customCode}
          onChange={e => setCustomCode(e.target.value)}
        />
        <label>
          Expiry days:{" "}
          <input
            type="number"
            min="0"
            value={expiryDays}
            onChange={e => setExpiryDays(e.target.value)}
          />
        </label>
        <button type="submit">Shorten</button>
      </form>

      {result && (
        <div className="result">
          <div className="row">
            <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">
              {result.shortUrl}
            </a>
            <button onClick={() => copy(result.shortUrl)}>Copy</button>
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <QRCode value={result.shortUrl} size={128} />
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" />
    </section>
  );
}