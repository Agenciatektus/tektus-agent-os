#!/usr/bin/env node
/**
 * Tektus Agent OS — First-Run Onboarding Check
 *
 * Hook: UserPromptSubmit
 * Purpose: detect when .tektus/profile.yaml is missing and inject an
 *          instruction to run the tektus-onboarding skill before anything else.
 *
 * Per rule 14 (core/rules/14-first-run-onboarding.md).
 *
 * This hook does NOT run the wizard itself — it only detects state and
 * tells the agent to invoke the onboarding skill.
 */

const fs = require("node:fs");
const path = require("node:path");

const cwd = process.cwd();
const profilePath = path.join(cwd, ".tektus", "profile.yaml");
const skipPath = path.join(cwd, ".tektus", "onboarding-skipped");

const profileExists = fs.existsSync(profilePath);
const skipped = fs.existsSync(skipPath);

if (profileExists || skipped) {
  // Nothing to do — onboarded or explicitly skipped
  process.exit(0);
}

// Inject reminder for the agent
const reminder = `
[Tektus Agent OS — Onboarding pending]

This project does not have a .tektus/profile.yaml yet. Before answering the
user's prompt, invoke the \`tektus-onboarding\` skill via the Skill tool.

Acknowledge the user briefly, run the 3-block interview, save the profile,
apply adaptations (language, squads, skills), THEN answer the original
prompt.

If the user explicitly says "skip onboarding", create an empty
.tektus/onboarding-skipped marker file and proceed without the wizard.

See core/rules/14-first-run-onboarding.md for details.
`;

process.stdout.write(reminder);
process.exit(0);
