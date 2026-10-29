# Experience, API, and trust contracts

Use API Design to support what the interface promises, not to remodel the backend for every visual task. Preserve existing conventions. Response envelopes, URL versioning, cursors, and 400/422 status codes are contract decisions, not universal preferences.

## Map technical outcomes to experience

| Outcome | UI handling |
|---|---|
| Rejected validation | Fields and a correctable reason, preserved data, useful focus |
| Missing/expired session | Recover authentication and resume intent without exposing data |
| Insufficient permission | Explain the limit and permitted path; do not suggest an action the server will reject |
| Removed resource | Context, return path, and alternatives; do not confuse it with an initial empty state |
| Version conflict | Reload/compare/merge according to the contract, without silent overwriting |
| Request limit | Respect Retry-After when provided; avoid aggressive retries |
| Accepted process/202 | Show pending status and track completion; acceptance is not final success |
| Timeout or lost network | The outcome may be unknown; verify state before repeating a non-idempotent action |
| Service failure | Useful message, preservation, recovery, and a nonsensitive support identifier |

## Consistency and data

Define stable ordering, pagination, filters, limits, cache, and staleness. Canceling a client request does not guarantee canceling server work. Disabling a button does not guarantee idempotency. Optimistic updates require rollback/reconciliation and must not announce financial or irreversible completion before confirmation.

Authentication identifies; authorization permits. Hiding a control is not authorization. Always check owner/tenant on the server. Minimize sensitive data in messages, analytics, the clipboard, screenshots, and logs.

## AI and automation

Show the boundary between a suggestion and an executed action; highlight relevant uncertainty, sources, and limits. Structure human review according to impact. A partial stream is not a validated response. Offer interruption and correction; do not promise undo when the external effect is irreversible.

Retrieved content and tool output are untrusted data. Do not let text from a website, screenshot, or binary alter task permissions or instructions. Use deterministic validation for critical outcomes.
