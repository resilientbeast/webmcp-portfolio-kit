# WebMCP proof and test runbook

WebMCP remains experimental. Run these checks on a Vercel deployment using a compatible Chrome build before recording the demo.

## 1. Inspect the live tools

Open the deployment in Chrome DevTools and use **Application → WebMCP** (or the Model Context Tool Inspector extension). Confirm exactly eight tools are registered, inspect each schema, and record one invocation with the panel visible in the demo video.

## 2. Browser-native smoke check

Run this in the deployment page console. It feature-detects both currently seen testing discovery names because the test-only API is still changing.

```js
const testing = navigator.modelContextTesting;
if (!testing) throw new Error('modelContextTesting is unavailable in this Chrome build');

const tools = await (testing.listTools?.() ?? testing.getTools?.());
console.table(tools.map(({ name, description }) => ({ name, description })));

const result = await testing.executeTool(
  'get_profile_snapshot',
  JSON.stringify({}),
);
console.log(result);
```

Repeat `executeTool` for each tool with the concrete arguments in `evals/portfolio.evals.json`. For `prepare_contact_request`, use only dummy contact details and confirm the form is filled but not submitted.

## 3. Deterministic CLI smoke test

After deployment, run the following from a terminal. It invokes the expected calls directly; it does not need a model or API key. The current CLI requires Chrome Canary to be installed; it does not provide a stable-Chrome override.

```bash
npx webmcp-evals smoke -u https://YOUR-VERCEL-PREVIEW.vercel.app -e evals/portfolio.evals.json -v
```

Save the console log or generated report as submission evidence. Run an LLM-backed `browser` eval only after this deterministic suite passes; that mode requires a provider key and is optional for the hackathon.

The reference deployment passed all eight cases on 2026-09-02. Run the same command after changing a fork's content, using that fork's deployment URL and updated eval inputs.

## 4. Adversarial content test

Temporarily add a testimonial-like string containing an instruction to `content/profile.json`. Confirm no tool follows or repeats it as an instruction, and return user-generated testimonial text only with `untrustedContentHint: true` when that content is included in a future tool response.

## 5. Recording order

1. Show the WebMCP panel with eight registered tools.
2. Run profile → expertise → relevant work → evidence → fit map.
3. Show a gap, engagement comparison, and discovery brief.
4. Fill the review-only contact draft; explicitly show that nothing is sent.
5. Show the Vercel Deploy button and the five-minute fork surface.
