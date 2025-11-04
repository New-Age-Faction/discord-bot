/*
  Discord client wrapper.
  This class operates as a singleton.
  Meaning anything that imports the discordbot once it's up and ready to go,
  won't have to set it up again.
*/

import { ServiceIcons } from "./embeds/serviceImages.js";
import { EmbedServiceLaunched } from "./embeds/servicesEvents.js";
import { Logger } from "./logger.js";

// - Imports ------------------------------------------------------------------

// - Constants ----------------------------------------------------------------

// - Functions ----------------------------------------------------------------

/**
 * Calls required configurations and boots up the discord bot.
 * Registers clients, all the shenanigans discord requires when
 * a bot boots up.
 */
//export async function startBot() {
//  console.log("BOT: Starting");
//  registerEvents(client);
//  await registerCommands(client);
//
//  console.log("BOT: Logging in");
//  await client.login(process.env.token);
//  //await deployCommands(client);
//}

export class DiscordBotLogger {
  static #instance;

  /**
   * Singleton builder. If an instance of the logger already exists
   * then it'll be given to you when building. Otherwise, the logger
   * is configured.
   *
   * ## WARNING
   * The logger can ONLY be configured once the DiscordBot is ready!
   */
  constructor(discordClient) {
    // If the bot already has an instance, we return it rather than building a whole new object
    if (DiscordBotLogger.#instance) {
      return DiscordBotLogger.#instance;
    }
    console.log("DISCORD LOG: Building instance");

    this.client = discordClient;
    this.serviceName = "Discord bot";

    console.log("DISCORD LOG: Saving logger instance");
    this.logger = new Logger(this.client);

    // Sets the current instance as the one everyone else will see
    DiscordBotLogger.#instance = this;
  }

  /**
   * Get the instance of the singleton Discord bot.
   * If none exist, a new one is created.
   * @param {*} config
   * @returns
   */
  static getInstance(config) {
    if (!DiscordBotLogger.#instance) {
      new DiscordLogger(config); // creates singleton
    }
    return DiscordBotLogger.#instance;
  }

  /**
   * Send only when the service starts
   * @param {*} serviceName
   */
  async started() {
    console.log("DISCORD LOG: Sending started embed");
    const embed = await EmbedServiceLaunched(
      this.serviceName,
      ServiceIcons.bot
    );
    await this.logger.sendEmbed(embed);
  }
}
