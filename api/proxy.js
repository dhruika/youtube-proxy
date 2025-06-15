export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { search } = req.query;

    try {
      const response = await fetch('https://magicstudio.app.n8n.cloud/webhook/youtube-titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: search }),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    return res.status(405).json({ message: 'Only GET requests allowed now' });
  }
}

