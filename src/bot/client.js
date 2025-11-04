/*
  Discord client wrapper.
  This class operates as a singleton.
  Meaning anything that imports the discordbot once it's up and ready to go,
  won't have to set it up again.
*/

// - Imports ------------------------------------------------------------------
import { Client, IntentsBitField, REST, Routes } from "discord.js";
import { registerEvents } from "./events/index.js";
import { registerCommands } from "./commands/index.js";
import { DiscordBotLogger } from "./logging/discordBotLogger.js";

// - Constants ----------------------------------------------------------------
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  allowedMentions: { parse: [], repliedUser: false },
});

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

export class DiscordBot {
  static #instance;

  /**
   * Singleton builder. If an instance of the bot already exists
   * then it'll be given to you when building. Otherwise, the bot
   * is configured.
   */
  constructor(option = {}) {
    // If the bot already has an instance, we return it rather than building a whole new object
    if (DiscordBot.#instance) {
      return DiscordBot.#instance;
    }

    // Performing all the registrations that must happen at the start.
    this.client = client;
    this.registerEnvironment();

    // Sets the current instance as the one everyone else will see
    DiscordBot.#instance = this;
  }

  /**
   * Get the instance of the singleton Discord bot.
   * If none exist, a new one is created.
   * @param {*} config
   * @returns
   */
  static getInstance(config) {
    if (!DiscordBot.#instance) {
      new DiscordBot(config); // creates singleton
    }
    return DiscordBot.#instance;
  }

  /**
   * Call this to start the discord bot.
   * Executes all the registrations required.
   */
  async start() {
    registerEvents(this);
    await registerCommands(this);

    console.log("BOT: Logging in");
    await this.client.login(this.token);
  }

  /**
   * # PRIVATE
   * Returns an instance of the log channel for you to send messages directly to
   * **WARNING** use the logger service instead!!!!
   */
  async registerLogChannel() {
    console.log("BOT: Registering log channel");
    this.logChannel = await this.client.channels.fetch(
      this.privateLogsChannelID
    );

    console.log(this.logChannel.name);

    if (!this.logChannel || !this.logChannel.isTextBased()) {
      console.error("Invalid log channel or cannot send messages there");
      return;
    }
  }

  /**
   * # PRIVATE
   * Registers all the bot's environment variables as actual attributes that can
   * be accessed at any time.
   */
  registerEnvironment() {
    this.token = process.env.token;
    this.appID = process.env.clientID;
    this.deploymentServerID = process.env.guildID;
    console.log("BOT: Fetching live chat channel ID");
    //this.liveChatChannelID = this.client.channels.cache.get(
    //  getSetting("chatID")
    //);

    console.log("BOT: Fetching private log chat channel ID");
    this.privateLogsChannelID = process.env.log_channel_id;

    console.log("BOT:\tappID: ", this.appID);
    console.log("BOT:\tserverID: ", this.deploymentServerID);
  }

  /**
   * # PRIVATE
   * This has to be binded in registerEvents.
   * Executes logic when the discord bot becomes ready.
   */
  async onClientReady() {
    // Registering the bot's user for future uses
    this.user = this.client.user;

    await this.registerLogChannel();
    console.log("BOT: Starting logger service");
    this.logger = new DiscordBotLogger(this);
    await this.logger.started();

    this.deployCommands();
  }

  /**
   * # PRIVATE
   * Makes the slash commands previously registered available
   * by deploying them.
   * @param {*} discordClient
   */
  async deployCommands() {
    console.log("BOT: Deploying slash commands to Discord...");

    const rest = new REST({ version: "10" }).setToken(this.token);
    const commandsMap = this.commands;
    const commands = Array.from(commandsMap.values()).map(
      ({ command }) => command
    );

    try {
      console.log("BOT: Awaiting REST");
      await rest.put(
        Routes.applicationGuildCommands(this.appID, this.deploymentServerID),
        { body: commands }
      );
      console.log("BOT: Deployed the commands");
    } catch (err) {
      console.log("Failed to deploy the commands");
      console.error(err);
    }
  }
}
