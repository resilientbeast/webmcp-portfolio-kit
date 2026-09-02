# Before and after WebMCP

## Before

This repository was a human-only Vite portfolio deployed on Cloud Run. Content was duplicated between page components, and agents had to infer skills and project evidence by reading rendered HTML.

## After

The project is now **WebMCP Portfolio Kit**: a static, forkable reference implementation with a stable eight-tool contract. Identity lives in `config/site.config.json`; skills, case studies, and engagement options live in `content/profile.json`; generic WebMCP and matching code lives in `src/lib/`.

Agents can inspect a source-labelled profile, search expertise, find and read work evidence, map a brief to coverage and gaps, compare engagement options, create a session-only discovery brief, and prepare—but never submit—a contact draft.

The reference deployment remains a sample portfolio. Any freelancer can replace configuration and content without changing tool names or source code.
