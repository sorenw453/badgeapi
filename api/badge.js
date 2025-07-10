export default function handler(req, res) {
  const {
    label = "Badge Generator",
    status = "OK",
    color = "green",
    style = "flat",
  } = req.query;

  const fontSize = 11;
  const padding = 5;
  const height = 20;

  const labelWidth = label.length * fontSize * 0.6 + padding;
  const statusWidth = status.length * fontSize * 0.6 + padding;
  const width = labelWidth + statusWidth;

  const isPill = style === "pill";
  const isRounded = style === "rounded";
  const cornerRadius = isPill ? height / 2 : isRounded ? 4 : 0;

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    ${
      isRounded
        ? `
      <defs>
        <clipPath id="rounded">
          <rect x="0" y="0" width="${labelWidth}" height="${height}" rx="${cornerRadius}" ry="${cornerRadius}" />
          <rect x="${labelWidth}" y="0" width="${statusWidth}" height="${height}" rx="${cornerRadius}" ry="${cornerRadius}" />
        </clipPath>
      </defs>
      <g clip-path="url(#rounded)">
    `
        : `<g>`
    }
      <rect width="${labelWidth}" height="${height}" fill="#555" rx="${cornerRadius}" ry="${cornerRadius}"/>
      <rect x="${labelWidth}" width="${statusWidth}" height="${height}" fill="${color}" rx="${cornerRadius}" ry="${cornerRadius}"/>
      <text x="${labelWidth / 2}" y="14" fill="#fff" font-family="Verdana" font-size="11" text-anchor="middle">${label}</text>
      <text x="${labelWidth + statusWidth / 2}" y="14" fill="#fff" font-family="Verdana" font-size="11" text-anchor="middle">${status}</text>
    </g>
  </svg>
  `.trim();

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.status(200).send(svg);
}
