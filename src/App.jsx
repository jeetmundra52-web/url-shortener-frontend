import { useState, useEffect } from "react";
import LinkForm from "./components/LinkForm.jsx";
import LinkList from "./components/LinkList.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

export default function App() {
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  const [links, setLinks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("links")) || []; }
    catch { return []; }
  });

  useEffect(() => localStorage.setItem("links", JSON.stringify(links)), [links]);

  return (
    <div className="app" data-theme={localStorage.getItem("theme") || "light"}>
      <header className="header">
        <h1>URL Shortener</h1>
        <ThemeToggle />
      </header>
      <main>
        <LinkForm onNewLink={l => setLinks([l, ...links])} />
        <LinkList links={links} onDelete={code => setLinks(links.filter(l => l.shortCode !== code))} />
      </main>
      <footer>Built with love</footer>
    </div>
  );
}