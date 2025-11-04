/*
    Main entry point of the discord bot.
    This file should contain the absolute minimum amount of program.
    It's purpose is to load and initialize the bot.
*/

// - Imports --------------------------------------------------------------------
import { DiscordBot } from "./bot/client.js";
//import { startServer } from "./server/index.js";
import dotenv from "dotenv";

// Load the config for all the services handled by this bot.
dotenv.config();

(async () => {
  try {
    const discordBot = new DiscordBot();
    discordBot.start();

    console.log("Services booted");
  } catch (err) {
    console.error("Failed to start services:", err);
  }
})();
