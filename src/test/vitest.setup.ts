import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const envExamplePath = resolve(process.cwd(), ".env.example");
const envExample = readFileSync(envExamplePath, "utf8");

for (const rawLine of envExample.split(/\r?\n/)) {
  const line = rawLine.trim();
  if (!line || line.startsWith("#")) continue;

  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (!match) continue;

  const [, key, rawValue] = match;
  if (process.env[key] !== undefined) continue;

  const value =
    rawValue.startsWith('"') && rawValue.endsWith('"')
      ? rawValue.slice(1, -1)
      : rawValue;

  process.env[key] = value;
}
