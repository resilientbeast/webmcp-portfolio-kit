# Portfolio Bootstrapper

The Bootstrapper is an optional authoring aid at `/setup`. It turns user-entered information into downloadable `content/profile.json` and `config/site.config.json` drafts. It does not modify a repository, deploy a site, or send contact messages.

## Manual path: zero configuration

Use the form to enter your public profile, skills, projects, links, and source URLs. Download the two files, replace the corresponding files in your fork, then run:

```bash
npm run validate-content
npm run build
```

The same path is available in the terminal:

```bash
npm run init-profile
npm run validate-content -- config/site.config.json content/profile.generated.json
```

## Optional AI draft

The AI button accepts pasted CV text, a marketplace profile export, or project notes that you own or are authorised to use. It does not fetch or scrape PeoplePerHour, Upwork, Fiverr, or any other marketplace.

To enable it in your own Vercel fork:

1. Enable AI Gateway for the Vercel project and configure an appropriate budget/rate limit.
2. Set `PROFILE_IMPORT_ENABLED=true`.
3. Optionally set `PROFILE_DRAFT_MODEL` to an available Gateway model.

On Vercel, Gateway can authenticate the function using the deployment identity. For local or non-Vercel execution, provide `AI_GATEWAY_API_KEY` privately; never expose it to browser code.

The endpoint limits source text to 12,000 characters, rejects cross-origin requests, keeps generated claims review-only, and is disabled by default. Generated outcomes are marked `needs-review` or `self-reported` until the portfolio owner verifies them.
