// TO FINISH

import fs from "fs";
import path from "path";

export function loadCommands() {
  const commands = new Map();

  const commandDirs = fs.readdirSync(new URL(".", import.meta.url));
  for (const dir of commandDirs) {
    const commandFiles = fs.readdirSync(new URL(`./${dir}`, import.meta.url))
      .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
      const { command, execute } = await import(`./${dir}/${file}`);
      commands.set(command.name, { command, execute });
    }
  }

  return commands;
}
