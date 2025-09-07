async function scrape() {
  const url = document.getElementById("urlInput").value;
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "⏳ Scraping...";

  try {
    const res = await fetch(`/api/scraper?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      gallery.innerHTML = "⚠️ No images or videos found.";
      return;
    }

    gallery.innerHTML = "";
    data.results.forEach(src => {
      if (src.endsWith(".mp4") || src.includes("video")) {
        const vid = document.createElement("video");
        vid.src = src;
        vid.controls = true;
        gallery.appendChild(vid);
      } else {
        const img = document.createElement("img");
        img.src = src;
        gallery.appendChild(img);
      }
    });
  } catch (err) {
    gallery.innerHTML = "❌ Error scraping.";
    console.error(err);
  }
}