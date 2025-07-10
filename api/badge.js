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

  const labelWidth = Math.ceil(label.length * fontSize * 0.6) + pad * 2;
  const statusWidth = Math.ceil(status.length * fontSize * 0.6) + pad * 2;
  const width = labelWidth + statusWidth;
  const radius = height / 2;

  function roundedRectPath(x, y, w, h, r, leftSide) {
  if (leftSide) {
    return `
      M${x + r},${y}
      H${x + w}      /* straight top inner edge */
      V${y + h}      /* straight right edge */
      H${x + r}      /* vertical line before bottom-left curve */
      A${r},${r} 0 0 1 ${x},${y + h - r}  /* bottom-left curve */
      V${y + r}      /* vertical left edge */
      A${r},${r} 0 0 1 ${x + r},${y}      /* top-left curve */
      Z
    `;
  } else {
    return `
      M${x},${y}            /* top-left corner (inner edge) */
      H${x + w - r}        /* horizontal line before top-right curve */
      A${r},${r} 0 0 1 ${x + w},${y + r}  /* top-right curve */
      V${y + h - r}        /* vertical right edge */
      A${r},${r} 0 0 1 ${x + w - r},${y + h}  /* bottom-right curve */
      H${x}                /* straight bottom inner edge */
      V${y}                /* back to start */
      Z
    `;
  }
}
  let svg;

  if (style === "pill") {
    svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${labelWidth}" height="${height}" fill="#555" rx="${radius}" ry="${radius}"/>
      <rect x="${labelWidth}" width="${statusWidth}" height="${height}" fill="${color}" rx="${radius}" ry="${radius}"/>
      <text x="${labelWidth / 2}" y="14" fill="#fff" font-family="Verdana" font-size="${fontSize}" text-anchor="middle">${label}</text>
      <text x="${labelWidth + statusWidth / 2}" y="14" fill="#fff" font-family="Verdana" font-size="${fontSize}" text-anchor="middle">${status}</text>
    </svg>
    `.trim();
  } else if (style === "rounded") {
    svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <path d="${roundedRectPath(0, 0, labelWidth, height, radius, true)}" fill="#555"/>
      <path d="${roundedRectPath(labelWidth, 0, statusWidth, height, radius, false)}" fill="${color}"/>
      <text x="${labelWidth / 2}" y="14" fill="#fff" font-family="Verdana" font-size="${fontSize}" text-anchor="middle">${label}</text>
      <text x="${labelWidth + statusWidth / 2}" y="14" fill="#fff" font-family="Verdana" font-size="${fontSize}" text-anchor="middle">${status}</text>
    </svg>
    `.trim();
  } else {
    svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="${labelWidth}" height="${height}" fill="#555"/>
      <rect x="${labelWidth}" width="${statusWidth}" height="${height}" fill="${color}"/>
      <text x="${labelWidth / 2}" y="14" fill="#fff" font-family="Verdana" font-size="${fontSize}" text-anchor="middle">${label}</text>
      <text x="${labelWidth + statusWidth / 2}" y="14" fill="#fff" font-family="Verdana" font-size="${fontSize}" text-anchor="middle">${status}</text>
    </svg>
    `.trim();
  }

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.status(200).send(svg);
}
