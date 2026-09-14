---
name: aseryx-website
description: >
  Public-site skill for aseryx.xyz (aseryx_website). Use for Home, hero,
  landing copy, public marketing pages, audits of linked routes from Home,
  and draft/rewrite of public-site messaging. Enforces walk-away, four
  copy tests (PG / Hopkins / Ogilvy / Jobs), tool-led lean, and Aseryx
  custody / verification axioms on marketing surfaces. Not for Workspace
  or product-app UI.
triggers:
  - homepage
  - home page
  - landing page
  - landingpage
  - public site
  - public-site
  - marketing page
  - aseryx.xyz
  - aseryx website
  - aseryx_website
  - hero
  - hero copy
  - home audit
  - walk-away
  - website copy
  - Cloudflare Pages
  - /aseryx-website
---

# Aseryx Website

## Overview

Canon for **aseryx_website** — the public site at aseryx.xyz. Marketing surface.
Not Workspace. Not docs. Not the sales bootstrap door.

**Job of Home:** A stranger with a finger on the back button can name what this
is and take one next step that can become money. Explanation is a means. The
page is not docs.

This skill **wins** over `website-strategy.md` on Home's job: sell / walk-away,
not "explain." Strategy remains the companion for layer split only (public vs
sales vs product).

## When to use

- Editing or auditing Home (`LandingPage`) and sections it owns
- Public hero, CTA, Honesty band, FAQ, meta for marketing pages
- Drafting Home copy after the walk-away is stated
- Following routes **linked from Home** only when the task says to audit them

## When not to use

- **Product app / Workspace / Runtime / Vault UI** — use `cursor-product`
  (alias: formerly `product-software`). Do not run empty/error states, token
  dialects, sidebar chrome, or "design the flow not the page" on Home. Home
  is a page with one door.
- **SPA implementation** — `aseryx-engineer` in `aseryx_application`
- **LinkedIn / outreach automation** — `aseryx-outreach`
- **Named-buyer bootstrap as H1** — sales door, not public brand
- Inventing product claims past live honesty in `copy-standard.md`

## Pairing / companions

| Companion | Role |
| --- | --- |
| `aseryx_research/messaging/copy-standard.md` | Language SSOT (bans, custody-by-step). Link; do not paste tables. |
| `aseryx_research/messaging/website-strategy.md` | Layer split only. Skill wins on Home job. |
| `aseryx_application/skills/aseryx-writing/SKILL.md` | Prose discipline |
| `cursor-product` | Product tool UI only (alias: `product-software`) |
| come-back / first-principles / write | Reply shape, axiom fights, drafted sentences after this skill has the job |

Reuse from `cursor-product` only: **distill**, **one primary action**, **Taste Idiot Index**.

## Walk-away (state before any headline)

They walk away with the **object** and the **terms of control**.

- **Object:** a defined set of their proprietary data, chosen by them,
  quality-checked, opened for a fixed term.
- **Terms:** the archive stays theirs. They set the price. Access ends when
  the term ends.
- **Promise (Ogilvy):** put a chosen set to work under your control.

They do **not** walk away with a market diagnosis, a tour of rooms, or a
category lecture.

If you cannot state walk-away in two sentences, you do not have homepage copy yet.

## Lean

**Tool-led Home.** The product is real. Show the object. Path in one breath.
Not a problem essay. Not a market map. Not a user manual of rooms.

- Tool-shaped proof: show a set, a check, a term. Arcade or one still is proof.
  Four labeled rooms is a syllabus.
- Job-shaped sell: what they get; the promise above.
- Problem = one line of context, not a section.
- Market / verticals = low use-case chips, not the H1.
- Looking like software is earned by showing the object, not by naming
  Workspace, Vault, Appraisal, Access as the story.

## Four tests (run in this order)

Score each section **pass/fail** + one line why.

1. **PG** — Can they say what it is and which control to use before they leave?
2. **Hopkins** — Does this block help close, or only teach?
3. **Ogilvy** — Promise plus facts? Intelligent? Sell or else?
4. **Jobs** — Object + what we stand for (owner control), or speeds / rooms / feeds?

If a block fails Hopkins, it belongs in How it works, Honesty, docs, or the
trash. Not in the hero. Jobs kills the spec sheet in the hero. PG still
requires they can name the thing. Hopkins still requires a door that can
become money.

## Hard constraints (flag any break)

Do not violate these to make the page "clearer." Softening axiom breaks as
"tone" is a fail.

- Do not lead the category as "licensing platform" / marketplace / find-buyers /
  storefront as the lead. Verification and owner control before licensing-as-category.
- Custody invariant at the true level in the hero. Work starts where the data
  already lives. They choose what copy exists. Access ends. Vault-copy /
  sample-move exceptions live in Honesty, not the H1.
- Appraisal is a check on a locked set. Not the sale, not the price, not
  model-fit. Say that once (Honesty or FAQ), not four times on Home.
- Protocol stickiness over marketplace chrome.
- Proof over hype. No crisis openers, unused-percent manifestos, or score-as-hero.
- Hero does three things and stops: name the job, show the object or path in
  one breath, point at one door.
- One path, said once. If How it works repeats the hero, cut one of them.
- Primary CTA matches belief. Prefer a door that completes the walk-away
  (see the object, run a check, start a defined set). "Start in Workspace"
  is secondary until the object is clear. The door should be able to become
  a tool payment or a scoped first run, not a 20% dream.
- Honesty is a compact band, not a second homepage.
- FAQ answers objections. It does not introduce new product law the hero was
  afraid to say.
- Cut lists are not strategy. Do not write Home by listing what you are no
  longer saying.
- **No em dashes in public copy.**

## Taste Idiot Index

- **Essence:** chosen set, proven, opened for a term, archive kept.
- **Ornament:** pillar restatements, room names as narrative, score theater,
  paradox three-cards, ICP bands, vertical heroes, "what this is not"
  repeated, FAQ that argues with the hero.

If ornament / essence > 2, you are explaining. Distill back to walk-away.

## Output when drafting Home

1. Walk-away (two sentences).
2. Promise (one line).
3. H1 + desire + body + primary CTA + micro.
4. What the rest of the page is allowed to do.
5. What you refused to put on Home, and which surface gets it instead.

## Output when auditing Home

Audit only Home (`LandingPage` and components it uses) unless the task expands
scope. Only follow routes linked from Home. Do not change code. Do not restyle.
Do not rewrite the whole page unless asked after the audit.

Produce all seven sections:

1. **Inventory** — every Home section in order: actual H1/H2, body job, CTA.
2. **Scorecard** — four tests against hero, then against the rest of the page
   as a whole.
3. **Walk-away test** — one sentence a stranger would actually repeat; compare
   to the required walk-away.
4. **Punch list** — each item: section, what is wrong, what it should be,
   which test it fails, what not to change.
5. **CTA verdict** — current primary vs what the first paid step should be
   (the car / the tool, not a take-rate story).
6. **Cut vs move** — what dies, what goes to How it works / Honesty / docs.
7. **Taste Idiot Index** — name essence vs ornament; if ornament/essence > 2,
   say so.

## Do not

- Invent a new brand system.
- Write a full replacement homepage unless asked after this audit.
- Apply product-app rules (empty states, tokens, sidebar) to this marketing page.
- Soften axiom breaks as "tone."
- Paste `copy-standard` ban/custody tables into this skill or into audits.

## Source attribution

Distilled from founder draft (Aseryx-W, 2026-09-14) and Project plan for the
public-site skill. Companions outrank older branch copy sheets when they
conflict on language bans; this skill outranks strategy on Home's job.

## Version history

- **2026-09-14** — Initial `aseryx-website` skill: walk-away, four tests,
  tool-led lean, audit/draft outputs, `cursor-product` alias, companion links.
