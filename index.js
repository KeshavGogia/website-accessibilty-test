import pa11y from "pa11y";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/api/test', async (req, res) => {
  if (!req.query.url) {
    res.status(400).json({ error: 'url is required' });
  } else {
    try {
      const results = await pa11y(req.query.url);
      res.status(200).json(results);
    } catch (error) {
      console.error('Error occurred during pa11y execution:', error);
      res.status(500).json({ error: 'An error occurred while processing the URL' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
