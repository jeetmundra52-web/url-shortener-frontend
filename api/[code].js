// api/[code].js
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Missing code");
  }

  try {
    const backendUrl = `https://url-shortener-backend-crhl.onrender.com/${code}`;
    const response = await fetch(backendUrl);

    // Forward redirect (302) from backend
    if (response.status === 302 || response.status === 301) {
      const location = response.headers.get("location");
      return res.redirect(302, location);
    }

    // Handle other statuses
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).send("Backend error");
  }
}