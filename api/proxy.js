// /api/generate-titles.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { topic } = req.body;

    try {
      const response = await fetch('https://magicstudio.app.n8n.cloud/webhook/youtube-titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: topic }), // your n8n expects "title"
      });

      const data = await response.json();
      return res.status(200).json({ titles: data.titles || data }); // handle both formats
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }
}
