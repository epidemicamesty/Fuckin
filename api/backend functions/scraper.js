const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  try {
    const response = await axios.get(targetUrl, { timeout: 10000 });
    const $ = cheerio.load(response.data);

    let results = [];

    $("img").each((_, el) => {
      const src = $(el).attr("src");
      if (src) results.push(src);
    });

    $("video source").each((_, el) => {
      const src = $(el).attr("src");
      if (src) results.push(src);
    });

    results = [...new Set(results)];
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: "Scraping failed", details: err.message });
  }
};