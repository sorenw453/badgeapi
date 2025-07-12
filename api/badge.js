// badge.js
export default function handler(req, res) {
  const {
    label = "Badge Generator",
    status = "OK",
    color = "green",
    style = "flat",
    padding = "6",
  } = req.query;

  const pad = parseInt(padding, 10);
  const fontSize = 11;
  const height = 20;

  // Approximate widths; tweak as needed
  const labelWidth = Math.ceil(label.length * fontSize * 0.6) + pad * 2;
  const statusWidth = Math.ceil(status.length * fontSize * 0.6) + pad * 2;
  const width = labelWidth + statusWidth;

  // Border radius based on style
  const radius = style === "pill" ? height / 2 : style === "rounded" ? 4 : 0;

  const htmlBadge = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject x="0" y="0" width="${width}" height="${height}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex; font-family:Verdana,sans-serif; font-size:${fontSize}px; height:${height}px; line-height:${height}px; user-select:none;">
        <div style="
          background:#555;
          color:#fff;
          padding:0 ${pad}px;
          border-radius:${radius}px 0 0 ${radius}px;
          white-space:nowrap;
          display:inline-block;
        ">
          ${label}
        </div>
        <div style="
          background:${color};
          color:#fff;
          padding:0 ${pad}px;
          border-radius:0 ${radius}px ${radius}px 0;
          white-space:nowrap;
          display:inline-block;
        ">
          ${status}
        </div>
      </div>
    </foreignObject>
  </svg>
  `.trim();

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.status(200).send(htmlBadge);
}
