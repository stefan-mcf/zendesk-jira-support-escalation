# Provider workflow notes

## Zendesk conditions

The trigger uses an all-conditions gate:

1. the ticket is created;
2. the ticket type is `problem`;
3. the exact engineering-escalation tag is present.

Removing any one condition prevents the webhook action.

## Jira mapping

| Zendesk value | Jira destination |
| --- | --- |
| Subject | Summary |
| Ticket ID | Description and source key |
| Priority | Priority context |
| Status | Support state |
| Ticket URL | Source link |
| Escalation tag | Route classification |

## Failure handling

A provider-normalised field does not establish that the create failed. Reconciliation searches the stable source key, reads the full destination record and checks downstream execution before deciding whether another write is safe.

## Activation

Secrets stay in provider configuration. The trigger and Jira rule should be activated only after an authorised destination project, endpoint rotation, controlled ticket and duplicate query are ready.

