# WebMCP Portfolio Kit — video presentation

**Target duration:** 2 minutes 35 seconds (acceptable range: 90–180 seconds)
**Format:** screen recording with short title cards; use voiceover throughout.
**Do not record:** browser tabs with personal information, API keys, local environment files, or the Devpost submission form.

## Before recording

1. Open [the production site](https://webmcp-portfolio-kit.vercel.app) in Chrome with `chrome://flags/#enable-webmcp-testing` enabled.
2. Open DevTools → **Application** → **WebMCP**; ensure all eight registered tools are visible.
3. Prepare a short technical brief containing AWS, WooCommerce migration, and disaster recovery.
4. Keep the public GitHub repository, Vercel deployment, and a terminal showing the completed `webmcp-evals` result in separate clean tabs/windows.
5. Use only the reliable demonstration path: map requirements → relevant work → case study → discovery brief → contact draft. Show the remaining tools in DevTools rather than invoking every tool.

## Timed screenplay and voiceover

| Time | Visual / recording | Voiceover |
| --- | --- | --- |
| 0:00–0:10 | **Title card.** “WebMCP Portfolio Kit” / “Evidence, not résumé scraping.” Fade into the live Vercel site. | “This is WebMCP Portfolio Kit: a forkable professional portfolio that lets an agent inspect evidence, identify gaps, and prepare a human-reviewed next step.” |
| 0:10–0:25 | Scroll the hero and briefly show normal visitor navigation. | “A normal portfolio is written for a person to browse. An agent has to scrape pages, infer structure, and can easily turn a polished claim into an ungrounded recommendation.” |
| 0:25–0:42 | Open `config/site.config.json` and `content/profile.json` side-by-side briefly, then show `/setup` and its draft/export controls. Use a simple highlight overlay: **config / content / generic code**. | “I extended an existing portfolio into a reusable starter kit. Forkers can edit a small site configuration and structured profile file directly, or use the built-in Bootstrapper to create reviewable, validated drafts from their own profile material. The UI, matching layer, and WebMCP contract stay generic.” |
| 0:42–0:58 | DevTools → Application → WebMCP. Slowly pan across the eight registered tools. | “The site exposes eight WebMCP tools. They cover profile evidence, skills, relevant work, case studies, requirement mapping, engagement options, a reviewable discovery brief, and a contact draft.” |
| 0:58–1:25 | Run `map_requirements_to_evidence` with the prepared brief. Keep DevTools activity visible while the Projects view shows the evidence matrix and any gap. | “Here an agent receives a real technical brief: AWS, a WooCommerce migration, and disaster recovery. Instead of claiming a perfect match, the tool returns source-linked skills and project evidence, and it states when direct evidence is missing.” |
| 1:25–1:43 | Invoke `find_relevant_work`, then open one result with `get_case_study_evidence`. Show the project evidence and source label. | “The agent can then open the underlying case study. Every recommendation points back to visible project evidence, rather than asking the visitor to trust a generated summary.” |
| 1:43–2:01 | Invoke `create_discovery_brief`. Show the brief in the UI. | “When there is enough evidence to continue, the agent creates a discovery brief. It is session-only and visibly marked reviewable—not sent—so the person stays in control.” |
| 2:01–2:18 | Invoke `prepare_contact_request`; show the populated contact form and **do not submit**. | “Finally, it can prepare a contact request. The tool fills a draft only. No message is transmitted, no external action is taken, and the visitor reviews the exact text before deciding whether to send it.” |
| 2:18–2:34 | Show `/setup`, then the public GitHub repo, MIT license, README’s Deploy with Vercel button, and optionally the alternate fixture/test output. | “This is not a bespoke résumé chatbot. A fork can be deployed with Vercel, then personalised through the Bootstrapper without scraping a marketplace profile or publishing anything automatically. The public kit has an open-source license and a separate alternate-persona test that proves the matching code is not hardwired to this reference profile.” |
| 2:34–2:48 | Terminal recording: `webmcp-evals` output showing **Passed steps: 8/8**. | “The contract is tested, not merely described. The official WebMCP Evals smoke test passes all eight tools against the live production deployment.” |
| 2:48–2:55* | Return to the live site with DevTools WebMCP panel visible. End on title/repository/live URL. | “The optional AI draft path is disabled by default; the portfolio itself remains static, source-attributed, and zero-config. WebMCP Portfolio Kit makes professional evidence inspectable by agents, explicit about gaps, and safe at the handoff to a human.” |

\*The final shot ends at roughly **2:55**; trim pauses to land between **2:30 and 3:00**.

## Recording notes

- Keep narration calm and literal. Do not say “AI determines the best freelancer” or “zero hallucination risk.” Say: **the tool never invents evidence**.
- Narrate the explicit gap in the evidence map. A visible limitation is more credible than a forced “perfect fit.”
- The strongest visual proof is DevTools showing the registered tools and activity, followed by the `Passed steps: 8/8` terminal result.
- If an agent UI is unreliable during recording, execute the prepared tool calls through the browser's WebMCP testing surface, while keeping DevTools and the resulting human UI state on screen. Do not improvise on camera.

## Voiceover-only copy

> This is WebMCP Portfolio Kit: a forkable professional portfolio that lets an agent inspect evidence, identify gaps, and prepare a human-reviewed next step.
>
> A normal portfolio is written for a person to browse. An agent has to scrape pages, infer structure, and can easily turn a polished claim into an ungrounded recommendation.
>
> I extended an existing portfolio into a reusable starter kit. Forkers can edit a small site configuration and structured profile file directly, or use the built-in Bootstrapper to create reviewable, validated drafts from their own profile material. The UI, matching layer, and WebMCP contract stay generic.
>
> The site exposes eight WebMCP tools. They cover profile evidence, skills, relevant work, case studies, requirement mapping, engagement options, a reviewable discovery brief, and a contact draft.
>
> Here an agent receives a real technical brief: AWS, a WooCommerce migration, and disaster recovery. Instead of claiming a perfect match, the tool returns source-linked skills and project evidence, and it states when direct evidence is missing.
>
> The agent can then open the underlying case study. Every recommendation points back to visible project evidence, rather than asking the visitor to trust a generated summary.
>
> When there is enough evidence to continue, the agent creates a discovery brief. It is session-only and visibly marked reviewable—not sent—so the person stays in control.
>
> Finally, it can prepare a contact request. The tool fills a draft only. No message is transmitted, no external action is taken, and the visitor reviews the exact text before deciding whether to send it.
>
> This is not a bespoke résumé chatbot. A fork can be deployed with Vercel, then personalised through the Bootstrapper without scraping a marketplace profile or publishing anything automatically. The public kit has an open-source license and a separate alternate-persona test that proves the matching code is not hardwired to this reference profile.
>
> The contract is tested, not merely described. The official WebMCP Evals smoke test passes all eight tools against the live production deployment.
>
> The optional AI draft path is disabled by default; the portfolio itself remains static, source-attributed, and zero-config. WebMCP Portfolio Kit makes professional evidence inspectable by agents, explicit about gaps, and safe at the handoff to a human.
