import { chown, lchown, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const nodeUid = 1000;
const nodeGid = 1000;
const allowedRoot = path.resolve("/data/raw");
const rawDataDir = path.resolve(process.env.RAW_DATA_DIR || allowedRoot);

function assertRawDataPath(target) {
  if (target !== allowedRoot && !target.startsWith(`${allowedRoot}${path.sep}`)) {
    throw new Error("RAW_DATA_DIR must stay within /data/raw in the production container.");
  }
}

async function ownTree(target) {
  assertRawDataPath(target);
  await chown(target, nodeUid, nodeGid);
  const entries = await readdir(target, { withFileTypes: true });
  for (const entry of entries) {
    const child = path.join(target, entry.name);
    assertRawDataPath(child);
    if (entry.isSymbolicLink()) {
      await lchown(child, nodeUid, nodeGid);
    } else if (entry.isDirectory()) {
      await ownTree(child);
    } else {
      await chown(child, nodeUid, nodeGid);
    }
  }
}

if (typeof process.getuid === "function" && process.getuid() === 0) {
  await mkdir(rawDataDir, { recursive: true });
  await ownTree(rawDataDir);
  process.setgid(nodeGid);
  process.setuid(nodeUid);
}

await import("./server.mjs");
