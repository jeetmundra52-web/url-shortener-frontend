export default function LinkList({ links, onDelete }) {
  if (!links.length) return <div className="card">No links yet</div>;

  const copy = text => navigator.clipboard.writeText(text);

  return (
    <section className="card list">
      {links.map(l => (
        <div key={l.shortCode} className="link-row">
          <div className="col">
            <a href={l.shortUrl} target="_blank" rel="noopener noreferrer">
              {l.shortUrl}
            </a>
            <div className="small">{l.originalUrl}</div>
          </div>
          <div className="actions">
            <button onClick={() => copy(l.shortUrl)}>Copy</button>
            <button onClick={() => onDelete(l.shortCode)}>Delete</button>
          </div>
        </div>
      ))}
    </section>
  );
}