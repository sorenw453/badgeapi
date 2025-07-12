export default async function handler(req, res) {
  const {
    metric = "downloads",
    pkg = "",
    color: colorOverride,
    style = "flat",
    padding = "6",
  } = req.query;

  if (!pkg) {
    res.status(400).send("Invalid or missing pkg param");
    return;
  }

  const pad = parseInt(padding, 10);
  const fontSize = 11;
  const height = 20;
  const radius = style === "pill" ? height / 2 : style === "rounded" ? 4 : 0;

  const COLOR_MAP = {
    downloads: "#d90000ff",
    version: "#d90000ff",
    dependents: "#4c1",
  };

  let status = "";
  let label = metric.charAt(0).toUpperCase() + metric.slice(1);
  let color = colorOverride || COLOR_MAP[metric] || "green";

  try {
    if (metric === "downloads") {
      const npmRes = await fetch(`https://api.npmjs.org/downloads/point/last-week/${pkg}`);
      if (!npmRes.ok) throw new Error("Failed to fetch downloads");
      const data = await npmRes.json();
      status = data.downloads?.toLocaleString() || "0";
    } else if (metric === "version") {
      const npmRes = await fetch(`https://registry.npmjs.org/${pkg}`);
      if (!npmRes.ok) throw new Error("Failed to fetch package info");
      const data = await npmRes.json();
      status = data["dist-tags"]?.latest || "N/A";
    } else {
      status = "N/A";
      color = "lightgrey";
    }
  } catch {
    status = "error";
    color = "lightgrey";
  }

  const labelWidth = Math.ceil(label.length * fontSize * 0.6) + pad * 2;
  const statusWidth = Math.ceil(status.length * fontSize * 0.6) + pad * 2;
  const width = labelWidth + statusWidth;

  const htmlBadge = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <foreignObject x="0" y="0" width="${width}" height="${height}">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        display:flex;
        font-family:Verdana,sans-serif;
        font-size:${fontSize}px;
        height:${height}px;
        line-height:${height}px;
        user-select:none;
      ">
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
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
  res.status(200).send(htmlBadge);
}
