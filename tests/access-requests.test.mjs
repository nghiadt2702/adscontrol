import assert from "node:assert/strict";
import { assertAccessRequestId, normalizeAccessRequest } from "../api/_lib/access-requests.js";

assert.deepEqual(normalizeAccessRequest({
  email: "  USER@Example.COM ",
  fullName: "Nguyễn Minh Anh",
  message: "  Need workspace access.  "
}), {
  email: "user@example.com",
  fullName: "Nguyễn Minh Anh",
  message: "Need workspace access."
});

assert.throws(() => normalizeAccessRequest({ email: "not-an-email", fullName: "User" }), /Email không hợp lệ/);
assert.throws(() => normalizeAccessRequest({ email: "user@example.com", fullName: "" }), /họ và tên/);
assert.throws(() => assertAccessRequestId("not-a-uuid"), /không hợp lệ/);
assert.equal(assertAccessRequestId("123e4567-e89b-12d3-a456-426614174000"), "123e4567-e89b-12d3-a456-426614174000");

console.log("Access request validation tests passed");
