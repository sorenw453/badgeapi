export default async function handler(req, res) {
  const {
    metric = "stars",
    repo = "",
    color: colorOverride,
    style = "flat",
    padding = "6",
  } = req.query;

  if (!repo || !repo.includes("/")) {
    res.status(400).send("Invalid or missing repo param. Use owner/repo format.");
    return;
  }

  const [owner, repoName] = repo.split("/");
  const pad = parseInt(padding, 10);
  const fontSize = 11;
  const height = 20;
  const radius = style === "pill" ? height / 2 : style === "rounded" ? 4 : 0;

  const token = process.env.GITHUB_PAT;
  const headers = token ? { Authorization: `token ${token}` } : {};

  const COLOR_MAP = {
    stars: "#D4AF37",
    issues: "red",
    prs: "blue",
    watchers: "green",
  };

  let status = "";
  let label = metric.charAt(0).toUpperCase() + metric.slice(1);
  let color = colorOverride || COLOR_MAP[metric] || "green";

  try {
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}`, { headers });
    if (!repoRes.ok) throw new Error("Failed to fetch repo");
    const repoData = await repoRes.json();

    if (metric === "stars") {
      status = repoData.stargazers_count.toString();
    } else if (metric === "issues") {
      status = repoData.open_issues_count.toString();
    } else if (metric === "watchers") {
      status = repoData.subscribers_count.toString();
    } else if (metric === "prs") {
      const prsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/pulls?state=open&per_page=1`,
        { headers }
      );
      if (!prsRes.ok) throw new Error("Failed to fetch PRs");
      const linkHeader = prsRes.headers.get("link");
      if (linkHeader) {
        const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
        status = match ? match[1] : "0";
      } else {
        const prsData = await prsRes.json();
        status = prsData.length.toString();
      }
    } else {
      status = "N/A";
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
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
  res.status(200).send(htmlBadge);
}
