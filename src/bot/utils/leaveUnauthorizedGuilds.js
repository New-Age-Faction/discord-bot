// - Imports ------------------------------------------------------------------
import { getAllowedGuilds } from "./getAllowedGuilds.js";

// - Functions ----------------------------------------------------------------

/**
 * Leaves any guilds / aka servers that the bot is currently joined in.
 * @param {*} client
 */
export function leaveUnauthorizedGuilds(client) {
  // Gets which guilds / aka servers the bot can be in:
  const allowedGuilds = getAllowedGuilds();

  client.guilds.cache.forEach((guild) => {
    if (!allowedGuilds.includes(guild.id)) {
      console.log(
        `BOT: Leaving unauthorized guild on startup: ${guild.name} (${guild.id})`
      );
      logID.send(
        `Leaving unauthorized guild on startup: ${guild.name} (${guild.id})`
      );
      guild.leave();
    }
  });
}
