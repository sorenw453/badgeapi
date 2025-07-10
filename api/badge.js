export default function handler(req, res) {
  const {
    label = "Badge Generator",
    status = "OK",
    color = "green",
    style = "flat",
  } = req.query;

  const pad = 6;
  const fontSize = 11;
  const height = 20;
  const radius = style === "pill" ? height / 2 : style === "rounded" ? 4 : 0;

  const labelWidth = Math.ceil(label.length * fontSize * 0.6) + pad * 2;
  const statusWidth = Math.ceil(status.length * fontSize * 0.6) + pad * 2;

  const labelStyle = [
    "background:#555",
    "color:#fff",
    "padding:0 " + pad + "px",
    "font-family:Verdana,sans-serif",
    "font-size:" + fontSize + "px",
    "line-height:" + height + "px",
    "user-select:none",
    radius && style === "pill" ? `border-radius:${radius}px 0 0 ${radius}px` : "",
    radius && style === "rounded" ? `border-radius:${radius}px 0 0 ${radius}px` : "",
    "display:inline-block",
    "white-space:nowrap",
  ].filter(Boolean).join(";");

  const statusStyle = [
    `background:${color}`,
    "color:#fff",
    "padding:0 " + pad + "px",
    "font-family:Verdana,sans-serif",
    "font-size:" + fontSize + "px",
    "line-height:" + height + "px",
    "user-select:none",
    radius && style === "pill" ? `border-radius:0 ${radius}px ${radius}px 0` : "",
    radius && style === "rounded" ? `border-radius:0 ${radius}px ${radius}px 0` : "",
    "display:inline-block",
    "white-space:nowrap",
  ].filter(Boolean).join(";");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;">
      <div style="display:inline-flex; font-weight:700;">
        <span style="${labelStyle}">${label}</span>
        <span style="${statusStyle}">${status}</span>
      </div>
    </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.status(200).send(html.trim());
}
