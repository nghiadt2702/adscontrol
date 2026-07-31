import assert from "node:assert/strict";
import { permissionsForRole } from "../api/_lib/supabase.js";

assert.deepEqual(permissionsForRole("owner"), {
  canSync: true,
  canInvite: true,
  canManageMembers: true,
  canViewWorkspace: true,
  scope: "workspace"
});

assert.equal(permissionsForRole("admin").canSync, true);
assert.equal(permissionsForRole("ua_lead").canSync, false);
assert.equal(permissionsForRole("ua_lead").scope, "workspace");
assert.equal(permissionsForRole("ua_buyer").canInvite, false);
assert.equal(permissionsForRole("ua_buyer").scope, "assigned");

console.log("Auth permission tests passed");
