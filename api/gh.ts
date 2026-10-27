// Vercel serverless function: proxies GitHub's public REST API.
//
// Without a GITHUB_TOKEN env var set, this just forwards requests unauthenticated
// (same 60 req/hr limit as calling GitHub directly, but shared across all visitors
// behind this deployment rather than each visitor's own IP — so it's only a net
// improvement once a token is added).
//
// To raise the limit to 5000 req/hr: create a GitHub personal access token
// (classic, no scopes needed — this only reads public data) and add it as
// GITHUB_TOKEN in the Vercel project's Environment Variables. Never put it in
// client-side code or commit it to the repo.

export default async function handler(req: { query: Record<string, string | string[]> }, res: {
  status: (code: number) => typeof res
  setHeader: (name: string, value: string) => typeof res
  send: (body: string) => void
}) {
  const path = req.query.path
  if (!path || Array.isArray(path)) {
    res.status(400).setHeader('Content-Type', 'application/json').send(JSON.stringify({ error: 'Missing "path" query param' }))
    return
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'sumit-portfolio',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const ghRes = await fetch(`https://api.github.com/${path}`, { headers })
  const body = await ghRes.text()

  res
    .status(ghRes.status)
    .setHeader('Content-Type', 'application/json')
    .setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120')
    .send(body)
}
