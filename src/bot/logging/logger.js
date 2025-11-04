/*
  Discord client wrapper.
  This class operates as a singleton.
  Meaning anything that imports the discordbot once it's up and ready to go,
  won't have to set it up again.
*/

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

export class Logger {
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
    // If the logger already has an instance, we return it rather than building a whole new object
    if (Logger.#instance) {
      return Logger.#instance;
    }

    // Saving the client for later uses
    this.client = discordClient;

    // Sets the current instance as the one everyone else will see
    Logger.#instance = this;
  }

  /**
   * Get the instance of the singleton Discord bot.
   * If none exist, a new one is created.
   * @param {*} config
   * @returns
   */
  static getInstance(config) {
    if (!Logger.#instance) {
      new Logger(config); // creates singleton
    }
    return Logger.#instance;
  }

  /**
   * Use this to send a custom embed directly to the log channel.
   *
   * @param {*} embed
   */
  async sendEmbed(embed) {
    await this.client.logChannel.send({ embeds: [embed] });
  }

  /**
   * Sends a markdown enabled text directly to the log channel.
   * @param {*} text
   */
  async sendText(text) {
    await this.client.logChannel.send(text);
  }
}
