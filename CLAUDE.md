# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository is not a software codebase. It currently contains RTF documentation files for FRFCX sales outreach materials rather than application source code.

Key files:
- `FRFCX_Sales_English_Manual.rtf` — fuller sales English manual in RTF format
- `FRFCX_Sales_English_Manual_Simple.rtf` — simplified version of the manual

## Working With This Repository

There is no detected build, lint, test, package-manager, or runtime setup in the current repository snapshot. Before assuming software-project workflows, first verify whether additional source files have been added.

For the current contents, the main tasks are document-oriented:
- read and revise the RTF manuals
- compare the full and simplified versions
- improve bilingual wording for sales communication
- convert content into other business document formats if requested

## Content Structure

From the simplified manual, the material is organized as a bilingual sales quick guide for showroom / retail display / shop fitting outreach. The document is structured by sales stage rather than by software modules:
- first contact scripts
- sending catalogs and project references
- customization responses
- pricing responses
- post-inquiry follow-up
- no-response follow-up
- no-current-demand replies
- keyword glossary
- short operating principles for sales staff

Each section follows a repeatable pattern:
- Chinese section heading
- English template text intended for customer-facing use
- Chinese explanation for internal guidance

## Editing Guidance

When updating these files:
- preserve the bilingual structure unless the user asks for a monolingual rewrite
- keep placeholders like `[Name]` and `[Your Name]` intact unless the user wants them standardized
- treat the English lines as externally sent customer copy, so prioritize natural business English over literal translation
- keep the simplified file concise; move longer explanations to the full manual instead of expanding both files in parallel

## File Format Notes

The repository uses RTF files, not Markdown or source code. Expect formatting control words and font tables at the raw-text level when reading files directly. If making edits programmatically, be careful not to break RTF syntax.
