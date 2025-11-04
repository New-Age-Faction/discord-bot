/*
    The goal of this file is to subscribe overwrite the collection of commands
    of the discord client, by your own collection, loaded from the commands
    folder.

    The client is the publisher, your functions are subscribers.
    Google design pattern: Observer.
*/

// - Imports ------------------------------------------------------------------
import { Collection } from "discord.js";
import { loadCommands } from "./loadCommands.js";

// - Functions ----------------------------------------------------------------
export async function registerCommands(discordClient) {
  const commands = await loadCommands();

  console.log("BOT: registering the commands.");
  discordClient.commands = new Collection(commands);
}
