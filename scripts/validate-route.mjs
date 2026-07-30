import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const route = await readJson(new URL("../contracts/route.json", import.meta.url));
const execution = await readJson(new URL("../examples/execution.json", import.meta.url));

assert.equal(route.active, false);
assert.equal(route.zendesk.all_conditions.comment_visibility, "private");
assert.equal(route.webhook.fields.length, 6);
assert.equal(route.jira.dedupe_key, "zendesk_ticket_id");
assert.equal(execution.request.route_tag, route.zendesk.all_conditions.required_tag);
assert.equal(execution.readback.matching_zendesk_tickets, 1);
assert.equal(execution.readback.zendesk_webhook_status, 200);
assert.equal(execution.readback.jira_automation_status, "success");
assert.equal(execution.readback.matching_jira_issues, route.jira.expected_issue_count);

console.log("Zendesk to Jira route contract is valid.");

