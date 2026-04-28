---
id: audience-research
name: "Audience Research — Persona, ICP & Jobs-to-be-Done"
whenToUse: |
  Creating agents that research audiences, define buyer personas, build Ideal
  Customer Profiles (ICPs), or map Jobs-to-be-Done (JTBD) for products/services.
  Use BEFORE strategy, content production or campaign planning — strategy
  without an audience definition is a guess.
  NOT for: generic research/data collection (use `researching`); content
  creation (use `copywriting` + platform BPs); strategic positioning (use
  `strategist`, which consumes this BP's output).
version: "1.0.0"
---

# Audience Research — Best Practices

## Core Principles

1. **Specificity beats coverage.** A precise definition of one segment outperforms a vague description of three. Avoid catch-all language ("entrepreneurs", "millennials", "B2B decision-makers") — those are census buckets, not audiences. A useful audience definition lets you predict what the person reads on a Sunday morning, what they say to a colleague at the coffee machine, and what kept them up last night.

2. **Pain → desire → channel.** Always tie a persona to a concrete pain (current state), a measurable desire (target state), and the channels they trust to bridge the two. A persona without a pain is a fictional character. A pain without a channel is unactionable. A channel without proof of trust is wishful thinking.

3. **Talk to humans before building personas.** Synthetic data, surveys and analytics are signals — not substitutes for conversations. Every persona must reference at least 5 actual interviews, support tickets, sales calls, or DM transcripts. If those don't exist, flag the persona as "hypothesis" until they do.

4. **Voice-of-customer (VoC) is gold — copy it verbatim.** When customers describe their pain in their own words, those words ARE the copywriting. Do not paraphrase, smooth, or "improve" VoC quotes. Catalog them with attribution (anonymized) and surface the top 20 phrases per persona for downstream copywriting agents to reuse.

5. **Distinguish Persona, ICP and JTBD — they answer different questions.** Persona = "Who is this human?" (demographics, psychographics, day-in-the-life). ICP = "Which accounts/segments are worth targeting commercially?" (firmographics, fit signals, buying triggers). JTBD = "What is this person hiring my product to do?" (functional/emotional/social job, current solution, switch trigger). A complete audience research output has all three when relevant — and explicitly states which were skipped and why.

6. **Negative personas matter.** Define who you do NOT target — and why. Excluding the wrong audience saves budget, prevents bad-fit clients, and clarifies positioning. Every audience brief must include at least 1 negative persona ("we do NOT serve X because Y").

7. **Time-bound the brief.** Audience behavior shifts (TikTok in 2024 ≠ TikTok in 2026). Every audience definition must include a "valid until" date (default 6 months) and a refresh trigger (e.g., "after 50 new sales calls" or "if open rate drops 30%"). Treating an audience brief as immutable is a slow-motion mistake.

8. **Segment by behavior, not by avatar.** Two CMOs at the same revenue can have radically different content needs based on their stage of awareness (Schwartz framework: unaware → problem-aware → solution-aware → product-aware → most-aware). Segmentation by awareness stage often beats segmentation by job title.

## Techniques & Frameworks

### Persona Canvas (one-pager per persona)

Each persona produced by this BP follows the same canvas — non-negotiable structure so downstream agents (Strategist, Copywriter, Designer) know exactly where to find each piece of info:

```
Name: [archetype name, not a real person — e.g., "Marcia, the Overworked Director"]
Stage of awareness: [Schwartz: unaware | problem-aware | solution-aware | product-aware | most-aware]
Demographics: age range, location, role, seniority, income range
Psychographics: values, fears, beliefs about the category, identity tensions
Day-in-the-life: 3-5 bullets of what their typical workday looks like
Top 3 pains (current state): each with a VoC quote when available
Top 3 desires (target state): each tied to a measurable outcome
Trusted channels: where they discover, evaluate, and validate
Distrusted channels: where pitching backfires
Objections to our category: top 5, ranked by frequency
Decision criteria: what they evaluate when choosing a solution
Switch trigger: what specific event makes them ready to change
Negative signals: who is NOT this persona (1-3 explicit exclusions)
```

### ICP definition (B2B / commercial fit)

For B2B contexts or any sales-driven motion, complement the persona with an ICP that scores accounts on **fit** (do they belong) and **intent** (are they ready):

- **Firmographics:** industry, company size (HC + revenue band), geography, tech stack, growth stage
- **Buying signals (intent):** hiring patterns, public job posts, funding events, leadership changes, public commitments (e.g., "we will be SOC 2 compliant in 2026")
- **Disqualifiers:** explicit "we do NOT sell to" criteria — saves time
- **Buying committee:** typical roles involved (economic buyer, champion, blocker, end-user)
- **Sales cycle:** length, complexity, typical objections, key milestones
- **CAC/LTV ranges:** acceptable cost-per-acquisition and lifetime-value envelope

### Jobs-to-be-Done (functional / emotional / social)

For each persona, identify 1-3 jobs they hire your product/service to do:

- **Functional job:** the practical task ("schedule 30 days of social posts in 1 sitting")
- **Emotional job:** how they want to feel ("competent, in control, ahead of the algorithm")
- **Social job:** how they want others to see them ("the brand that gets the trends first")
- **Current solution:** what they use today (incl. workarounds, manual processes)
- **Push:** what makes them dissatisfied with the current solution
- **Pull:** what attracts them to the new solution
- **Anxiety:** what makes them hesitate (loss aversion, switching cost, learning curve)
- **Habit:** what comforts them about staying with the current solution

The 4 forces (push/pull/anxiety/habit) come from the JTBD switch interview methodology — Bob Moesta / Clay Christensen tradition.

### Awareness-stage segmentation (Schwartz, 1966 — still the best frame)

Segment audiences by what they already know, not by who they are:

| Stage | What they know | What content they want |
|---|---|---|
| Unaware | They don't know they have a problem | Stories, news, eye-openers (NOT solution copy) |
| Problem-aware | They feel the pain but don't know solutions exist | Education, framings, "why this happens" |
| Solution-aware | They know solutions exist but don't trust ours | Comparisons, case studies, social proof |
| Product-aware | They know our product but haven't decided | Demos, ROI, objection-handling, guarantees |
| Most-aware | Ready to buy — just need a nudge | Offers, urgency, "last call" |

Most marketing fails by addressing all stages with the same content. A persona's stage of awareness is the strongest predictor of which message converts.

## Methodology — how to produce an Audience Research brief

1. **Load context.** Read the company profile, prior research briefs, sales call transcripts (sample of 10+), support ticket archive (sample of 50+), social media DMs/comments, public review sites (G2, Reclame Aqui, App Store reviews), and any existing customer interviews. Note the absence of any of these as a data gap.

2. **Identify candidate segments.** From the context, list 3-7 candidate audience segments. For each, hypothesize the demographic + JTBD profile in 2-3 sentences. Mark which segments have enough data for a confident persona vs. which are hypotheses needing validation.

3. **Conduct or commission interviews.** Aim for 5+ conversations per priority segment. Use the JTBD switch interview script (anchor: "tell me the story of when you decided to start looking for a solution"). Record verbatim — do not summarize during the interview.

4. **Code the data.** Extract VoC quotes, common phrases, recurring objections, decision criteria, and switch triggers. Tag each by source. The output is a coded transcript bank — input for the next step.

5. **Build the persona canvas + ICP + JTBD.** For each priority segment, fill the canvas above. Cite VoC quotes with anonymized attribution ("[Persona], procurement director, food industry, 2026-Q2 interview").

6. **Pressure-test.** Show the personas to a sales rep or customer-success person who talks to real customers daily. Ask: "Does this match what you hear?" Capture their feedback. Update the canvas. A persona that doesn't ring true to people on the front lines is worthless.

7. **Define refresh triggers.** Set the "valid until" date and refresh conditions. File the brief in `audience/research/` with versioning.

## Quality Criteria

Before delivering an audience research brief, verify ALL of the following:

- [ ] Each persona has a memorable name (not "Marketing Manager A") and a Schwartz awareness stage tagged
- [ ] Each persona references at least 5 real conversations/sources (or is explicitly flagged "hypothesis")
- [ ] Each persona has 3 pains, 3 desires and trusted/distrusted channels
- [ ] At least 1 negative persona ("we do NOT serve X because Y") is included
- [ ] VoC bank has 20+ verbatim quotes per priority persona, anonymized
- [ ] If commercial: ICP has firmographics, intent signals, disqualifiers, buying committee, CAC/LTV envelope
- [ ] Each persona has at least 1 JTBD with all 4 forces (push/pull/anxiety/habit) mapped
- [ ] Brief has a "valid until" date and explicit refresh triggers
- [ ] Methodology section documents which sources were consulted and which were missing (data gaps)

## Output Examples

### Example 1 — B2B SaaS Persona (digital marketing tool)

```
Persona: "Marcia, the Overworked Marketing Director"
Schwartz stage: solution-aware (knows tools exist, doesn't trust most)

Demographics: 32-45, female-skewed (60/40), São Paulo / Rio / Belo Horizonte,
Marketing Director or Head of Marketing at agency or in-house team of 4-12,
income R$ 14-22k/month.

Psychographics: ambitious but exhausted. Promoted in 2023-2024. Reports
directly to founder/CMO. Identity = "I'm the one who delivers when
nothing else works." Fears looking incompetent if results dip.

Day-in-the-life:
- 7:30 — checks reports on phone before getting out of bed
- 9-12 — back-to-back calls with junior team and clients
- 14-17 — escalations, hands-on review of 5+ campaigns
- 19-21 — reviews next-day plan, often eats dinner at desk
- Saturday — usually checks Slack 2-3x

Top 3 pains:
1. "Eu passo o domingo respondendo client. Se eu não responder em 2h
   eles ficam achando que ninguém está cuidando." (real quote)
2. Time too junior — she has to redo work that should arrive ready
3. Client churn correlates with "tool fatigue" — too many platforms

Top 3 desires:
1. 1 single dashboard her CEO trusts (currently shows 4 different reports)
2. 30+ minutes/day saved on routine reporting
3. Confidence that she'd notice a campaign breaking BEFORE the client does

Trusted channels: LinkedIn (specific creators she follows), G2 reviews,
WhatsApp recommendations from peers in agency owner WhatsApp groups,
Reclame Aqui (uses to disqualify, not validate), competitor case studies
on YouTube long-form.

Distrusted: cold email pitches, Instagram ads with stock photo lifestyle
imagery, "1-minute demo" videos that hide pricing.

Top 5 objections:
1. "I've tried 3 tools like this — they all promise unified dashboard"
2. "How long does setup take? I don't have a week"
3. "What happens if the API breaks during a launch?"
4. Pricing in USD scares her (volatility)
5. Doesn't trust vendors that don't show pricing publicly

Decision criteria: ROI calculator she can show CEO; 7-day money-back; live
support in PT-BR business hours; published changelog (proves active dev);
LGPD-compliant.

Switch trigger: a client churn she could have prevented if she had
real-time alerts. The post-mortem with the client is the moment of
maximum dissatisfaction with the current stack.

Negative persona: solo founder running ads for their own SaaS — she'd
NOT churn from a cheaper "all-in-one" tool because she values depth
of integration over breadth of features.

Valid until: 2027-Q1. Refresh trigger: 30+ new sales calls collected,
OR major platform algorithm change (Meta / Google).
```

### Example 2 — Negative Persona (B2C beauty salon SaaS)

```
NEGATIVE Persona: "Bruna, the Independent Hair Stylist"

Why we do NOT target Bruna:
She runs a 1-person operation in her own apartment. No team to manage,
no inventory complexity, ~30 clients/month. The 7 features that are
non-negotiable for our ICP (multi-staff scheduling, commission split,
inventory deductions per service, etc.) are not just "unnecessary" — they
make our UI feel bloated and overpriced for her.

Better fit for her: a R$ 19/month booking-link tool (Calendly / Linktree
+ WhatsApp). Pitching her our R$ 297/month plan = bad fit + bad reviews
+ high churn.

Telltale signs in qualification: "salão" in singular ("meu salão"),
revenue under R$ 8k/month, asks for "version without team management".
When these match, send her to a partner with a lower-tier solution and
move on. Saving 10 calls × 45min/month = 7.5h/month = 1 full day/year
of sales team time.
```

## Anti-Patterns

### Never Do

- **Avatar-by-stereotype** — "She's 35, lives in Pinheiros, drives a Renault Stepway, has a Pomeranian." Stereotypes feel rich but predict nothing about content choices. Cut.
- **Persona without VoC** — A persona built only from internal team brainstorm is fiction. It will sound right and convert poorly. Always anchor in real conversations.
- **Single-segment strategy** — Pretending one persona covers an entire audience leads to tone of voice that fits no one. Even mass-market brands have 2-4 priority personas with adapted messaging.
- **Skipping the negative persona** — Without a clear "we do NOT serve X", positioning blurs and the team chases bad-fit deals.

### Always Do

- **Anchor every claim in a source.** "Marcia values speed" — based on what? Cite. Either VoC, sales call note, support ticket, or "hypothesis pending validation". The latter is OK; what's not OK is presenting hypothesis as fact.
- **Update the brief on a cadence.** The brief is living. File it with a version. Track when it was last refreshed. If 6+ months old and unrefreshed, flag.
- **Pair every pain with a measurable desire.** "She wants to save time" is vague. "She wants to cut weekly reporting from 4h to 30min" is actionable for product, copy and pricing.

## Vocabulary Guidance

### Always Use

- "Persona" (1 archetype) vs "Audience" (the broader group composed of multiple personas) — keep terms distinct
- "Voice-of-customer (VoC)" + verbatim quotes
- "Awareness stage" (Schwartz framework)
- "Switch trigger" / "switch interview"
- "Functional / emotional / social job" (JTBD)
- "Disqualifier" — for negative segments
- "Refresh trigger" / "valid until"
- "Hypothesis" (when persona lacks evidence) — never hide a hypothesis as fact

### Never Use

- "Target audience: everyone who…" — if it includes "everyone", it's not an audience
- "Millennials / Gen Z / Boomers" as standalone descriptors — they say nothing actionable
- "Buyer journey" without a Schwartz stage — too vague
- "Pain points" as a singular phrase without a verbatim VoC quote attached

### Tone Rules

- **Concrete > abstract.** "Marcia spends Sunday afternoon fixing a campaign" beats "Marcia is detail-oriented".
- **Verbatim > paraphrased.** Quotes in the persona's actual words have 10x more downstream value than smoothed prose.

## Downstream consumers of this BP

This BP produces input for:
- `strategist` BP — uses personas + ICP to design content strategy and KPIs
- `copywriting` BP — uses VoC bank for headlines, objections, and angles
- `instagram-feed` / `linkedin-post` / etc. — uses awareness-stage segmentation to decide format + cadence
- `email-sales` / `email-newsletter` — uses pain/desire pairs to build sequences
- Squad `content-calendar` — pillars derived from persona JTBD
- Squad `content-analytics` — KPIs from ICP CAC/LTV envelope

If this BP's output is missing or stale, all downstream agents should flag it as a missing input rather than guess the audience.
