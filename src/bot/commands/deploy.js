import { REST, Routes } from "discord.js";
import "dotenv/config";

export async function deployCommands(client) {
  console.log("BOT: Deploying slash commands to Discord...");

  const rest = new REST({ version: "10" }).setToken(process.env.token);
  const commandsMap = client.commands;
  const commands = Array.from(commandsMap.values()).map(
    ({ command }) => command
  );

  try {
    // ⚙️ For development, deploy to one guild (fast updates)
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.clientId,
        process.env.guildId
      ),
      { body: commands }
    );

    // 💡 For global commands (slower propagation), use this instead:
    //await rest.put(Routes.applicationCommands(process.env.clientId), {
    //  body: commands,
    //});

    console.log(`BOT: ✅ Successfully deployed ${commands.length} commands.`);
  } catch (err) {
    console.error("BOT: ❌ Failed to deploy commands:", err);
  }
}
