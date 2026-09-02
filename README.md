# WebMCP Portfolio Kit

An agent-navigable portfolio starter kit. Agents can query skills and project evidence, assess coverage against a technical brief, compare engagement options, create a reviewable discovery brief, and prepare a contact inquiry—without scraping HTML or sending a message.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/resilientbeast/webmcp-portfolio-kit&project-name=my-webmcp-portfolio&repository-name=my-webmcp-portfolio)

## Fork in five minutes

1. Click **Deploy with Vercel** above. No environment variables are required.
2. Visit `/setup` in your fork to create and download a valid `profile.json` and `site.config.json`, or edit the files manually.
3. Edit `config/site.config.json` for your name, tagline, avatar, accent colour, social links, and contact selectors.
4. Edit `content/profile.json` for your profile, skills, case studies, and engagement options.
5. Replace `public/avatar.jpg` and update `avatar` if you use a different filename.
6. Push your changes. Vercel redeploys the static Vite app.

### Optional Profile Bootstrapper

`/setup` is a browser-only authoring wizard. It creates local, reviewable JSON downloads and does not modify your repository or publish anything.

For a terminal workflow, run `npm run init-profile`. It writes `content/profile.generated.json` by default; validate it before copying it over your content file:

```bash
npm run init-profile
npm run validate-content -- config/site.config.json content/profile.generated.json
```

An optional AI draft button is included for Vercel deployments. It only accepts pasted author-provided text (not marketplace scraping), is off by default, and remains review-only. To enable it in **your own fork**, set `PROFILE_IMPORT_ENABLED=true` and configure a Gateway model with `PROFILE_DRAFT_MODEL` if you do not want the documented default. Never enable it on a public reference site without rate-limit and budget controls appropriate to your audience. See [the Bootstrapper guide](docs/PROFILE_BOOTSTRAPPER.md).

## Stable WebMCP contract

Every fork exposes the same tool names and schemas. Descriptions interpolate the fork's configuration, while generic code reads its content.

| Tool | Purpose |
| --- | --- |
| `get_profile_snapshot` | Source-attributed role, domains, availability |
| `search_expertise` | Filter the skill matrix |
| `find_relevant_work` | Find matching project evidence |
| `get_case_study_evidence` | Read challenge, actions, stack, metrics, and source |
| `map_requirements_to_evidence` | Show coverage and gaps |
| `compare_engagement_options` | Compare published engagement models |
| `create_discovery_brief` | Save a reviewable, session-only brief |
| `prepare_contact_request` | Fill—never submit—the default contact draft |

## Local development

```bash
npm install
npm run validate-content
npm run dev
```

The starter kit has no required backend, API keys, environment variables, or form provider. The default contact form is intentionally review-only; add your own transport if you need one. Run `npm run validate-content` after editing the two JSON files to catch missing fields, duplicate project IDs, and unmatched skill groups before deploying.

Run `npm run test:forkability` to validate a deliberately unrelated product-design fixture and exercise the generic matching layer without changing the reference profile.

## Test the WebMCP contract

Use the [WebMCP testing runbook](docs/WEBMCP_TESTING.md) after deploying. It includes the Chrome DevTools/Tool Inspector check, browser-native test API smoke check, and deterministic `webmcp-evals` command for all eight tools.

For recording, use the [90-second demo script](docs/DEMO_SCRIPT.md).

## Structure

- `config/`: the small fork surface.
- `content/`: profile content and evidence.
- `src/lib/`: generic matching and WebMCP tool code.
- `src/components/`: reusable UI components.
- `BEFORE_AND_AFTER.md`: WebMCP extension evidence for the reference project.

## License

[MIT](LICENSE)
