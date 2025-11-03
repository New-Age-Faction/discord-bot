import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadCommands() {
  console.log("BOT: Loading available commands");

  const commands = new Map();

  async function readDirRecursive(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recurse into subfolder
        await readDirRecursive(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".js")) {
        const relativePath = `./${path
          .relative(__dirname, fullPath)
          .replace(/\\/g, "/")}`;
        const module = await import(relativePath);

        const command = module.command;
        const execute = module.execute;

        if (!command || !command.name || typeof execute !== "function") {
          console.warn(
            `BOT:    ⚠️ Skipping invalid command file: ${path.relative(
              __dirname,
              fullPath
            )}`
          );
          continue;
        }

        commands.set(command.name, { command, execute });
        console.log(`BOT:    ✅ Loaded command: ${command.name}`);
      }
    }
  }

  await readDirRecursive(__dirname);

  return commands;
}
