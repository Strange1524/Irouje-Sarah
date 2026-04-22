fetch('https://ibb.co/dvGfwhP')
  .then(res => res.text())
  .then(text => {
    const ogImageMatch = text.match(/<meta property="og:image" content="([^"]+)"/);
    const directLinkMatch = text.match(/<link rel="image_src" href="([^"]+)"/);
    console.log("OG Image:", ogImageMatch ? ogImageMatch[1] : "not found");
    console.log("Direct Link:", directLinkMatch ? directLinkMatch[1] : "not found");
  });
