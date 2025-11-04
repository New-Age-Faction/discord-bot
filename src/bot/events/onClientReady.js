import { leaveUnauthorizedGuilds } from "../utils/leaveUnauthorizedGuilds.js";

export function onClientReady(client) {
  console.log("BOT: OnReady");

  console.log("BOT: Leaving unauthorized guilds");
  leaveUnauthorizedGuilds(client);
}
