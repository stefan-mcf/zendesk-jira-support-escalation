# Zendesk to Jira Support Escalation

A guarded support-to-engineering route that turns an approved Zendesk problem ticket into one mapped Jira task.

**Status:** Controlled provider route verified; the automation was disabled after the route test.

**My contribution:** Trigger design, webhook integration, field mapping and failure reconciliation.

## Zendesk returned `open` for a ticket requested as `new`

The initial exact-field readback flagged a status mismatch in the [controlled synthetic execution](examples/execution.json). A separate read confirmed one Zendesk ticket with one private comment, a webhook response of HTTP 200 and one matching Jira issue. Reconciliation established the handoff outcome without a second submission.

The automation was disabled after the test. `npm run validate` checks the local trigger and mapping contract. See the [retained route view](assets/overview.png) and [evidence index](docs/evidence.md) for the provider record.

## How it works

### Escalation path

```text
private Zendesk ticket
        │
        ├── type = problem
        ├── approved escalation tag
        └── created event
                  │
                  ▼
          Zendesk trigger
                  │
                  ▼
      authenticated webhook
                  │
                  ▼
          Jira Automation
                  │
                  ▼
      Support Engineering task
```

The route is intentionally narrow. It accepts synthetic or internally approved tickets, uses a private Zendesk comment, and maps six fields into Jira. It does not send a customer reply.

### Trigger and payload

The Zendesk trigger requires all configured conditions, including the exact escalation tag. The webhook sends only:

- ticket ID;
- subject;
- priority;
- status;
- ticket URL;
- escalation tag.

Jira Automation validates the shared endpoint configuration and creates a task in the designated engineering project. The issue description retains the source ticket URL and mapped support context.

## Implementation

```text
assets/       selected route and provider screens
contracts/    trigger and Jira mapping contracts
examples/     controlled request and result
scripts/      structural validator
docs/         failure and activation notes
```

[Provider workflow notes](docs/architecture.md)

## Validation

```bash
npm run validate
```

The validator checks the trigger and six-field mapping contract. It does not create a new Zendesk ticket or Jira task.

## Scope and current state

The automation was disabled after the controlled route test. Provider URLs, webhook secrets, tenant identifiers and live ticket IDs are excluded from this repository.

The Zendesk AI Support Copilot uses the same integration family with a stricter application-level approval and idempotency layer. This repository isolates the provider-native trigger, mapping and reconciliation decisions.

## Documentation

- [Provider workflow notes](docs/architecture.md)
- [Evidence index](docs/evidence.md)
