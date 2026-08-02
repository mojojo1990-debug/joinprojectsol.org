# Architecture

## Current system

Build 001 is a static progressive web application hosted by GitHub Pages.

- `index.html` contains page structure and content.
- `assets/styles.css` contains visual design and responsive behavior.
- `assets/app.js` contains interaction, draft storage, voice input, and guided first-step logic.
- `manifest.webmanifest` describes the installable web experience.
- `service-worker.js` caches the public app shell.

## Data and privacy

- Draft text is stored only in the visitor's browser through local storage.
- Build 001 sends no conversation text to a server.
- There are no user accounts or cloud records.

## Future live-AI architecture

A production AI release should use:

Browser → secure Project SOL server → AI provider

The server must keep API credentials private, apply rate limits, validate requests, log errors safely, and protect users from abuse. The browser must never contain the private provider key.
