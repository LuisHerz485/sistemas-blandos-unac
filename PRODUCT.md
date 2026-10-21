# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React (user chose "Vite + framework"; React picked as the framework). Static build deployed to Netlify (`npm run build` → `dist/`).

## Users

Prospective students (and their parents) of a fictitious technical institute, usually browsing from a phone, who want to know enrollment requirements, schedules, or costs and leave their contact so admissions can follow up. Secondary audience: the course instructor and classmates evaluating the group activity "Chatbot de matrícula con registro de interesados" (FIIS – Universidad Nacional del Callao).

## Product Purpose

A basic landing page for a fictitious institute with an enrollment chatbot. The chatbot detects what the visitor is asking about, classifies it into one of three categories (requisitos, horarios, costos), answers what it truthfully can, and registers the interested person through a Google Form whose responses land in Google Sheets. Success: 5 fictitious registrations visible in Sheets with timestamp and correct category; flow works on a phone.

## Positioning

The chatbot classifies intent before registering, so every row in Sheets already arrives tagged by category, ready for the counting/chart analysis the activity requires.

## Operating Context

Static site on Netlify. Google Form (fields: nombre, correo, tipo de consulta, mensaje, autorización) linked to a Google Sheet. The form records data; it does not store the conversation automatically. Tests are done from a phone. Evidence: chatbot link, screenshots, 1‑minute video of a full submission.

## Capabilities and Constraints

- Categories are exactly: Requisitos, Horarios, Costos.
- No real cost information exists: for costs the bot must NOT invent figures and must derive to admisión while registering the interest.
- Only fictitious names and test emails; registration requires explicit authorization.
- Submission goes to Google Forms `formResponse` endpoint (no-cors); entry IDs are configured by the team.

## Brand Commitments

Institute is fictitious: "Instituto Superior Tecnológico Horizonte" (assumed name, editable). Spanish (Peru) copy.

## Evidence on Hand

None real. No testimonials, rankings, employment rates, prices, or accreditations may be invented. Program list and schedules are illustrative and must be labeled as referential.

## Product Principles

1. Never invent an answer; derive to admisión when information is missing.
2. Every conversation ends in a clear, consented registration.
3. Classification is visible to the user so they can correct it before sending.
4. Mobile first: the activity is tested on a phone.

## Accessibility & Inclusion

WCAG AA contrast, keyboard-operable chat, reduced-motion respected.
