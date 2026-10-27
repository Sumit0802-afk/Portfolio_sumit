// Vercel serverless function: the contribution calendar straight from GitHub's
// GraphQL API, so new commits show up within a minute or two.
//
// GitHub's GraphQL API always needs a token, so this uses the same
// GITHUB_TOKEN as api/gh.ts. Without one it answers 501 and the site falls
// back to the public (slower-updating) contributions service instead.

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`

export default async function handler(req: { query: Record<string, string | string[]> }, res: {
  status: (code: number) => typeof res
  setHeader: (name: string, value: string) => typeof res
  send: (body: string) => void
}) {
  const login = req.query.user
  const json = (code: number, body: unknown, cache = 'no-store') =>
    res.status(code).setHeader('Content-Type', 'application/json').setHeader('Cache-Control', cache).send(JSON.stringify(body))

  if (!login || Array.isArray(login)) return json(400, { error: 'Missing "user" query param' })
  if (!process.env.GITHUB_TOKEN) return json(501, { error: 'GITHUB_TOKEN not configured' })

  const ghRes = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
      'User-Agent': 'sumit-portfolio',
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  })
  const body = await ghRes.json()
  if (!ghRes.ok || body.errors) return json(ghRes.ok ? 502 : ghRes.status, { error: 'GitHub GraphQL request failed' })

  json(200, body.data.user.contributionsCollection.contributionCalendar, 's-maxage=60, stale-while-revalidate=120')
}
