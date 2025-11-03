/*
    The goal of this file is to subscribe overwrite the collection of commands
    of the discord client, by your own collection, loaded from the commands
    folder.

    The client is the publisher, your functions are subscribers.
    Google design pattern: Observer.
*/

// - Imports ------------------------------------------------------------------
import { Client, GatewayIntentBits, Collection, Events } from "discord.js";
import { loadCommands } from "./loadCommands.js";
import { deployCommands } from "./deploy.js";

// - Functions ----------------------------------------------------------------
export async function registerCommands(client) {
  const commands = await loadCommands();

  console.log("BOT: registering the commands.");
  client.commands = new Collection(commands);
}
