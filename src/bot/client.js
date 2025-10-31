/*
    Boot up logic for the discord bot.
*/

// - Imports ------------------------------------------------------------------
import { Client, IntentsBitField } from "discord.js";
import { registerEvents } from "./events/index.js";
import { registerCommands } from "./registerCommands.js";

// - Constants ----------------------------------------------------------------
export const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
    allowedMentions: { parse: [], repliedUser: false }
});

// - Functions ----------------------------------------------------------------

/**
 * Calls required configurations and boots up the discord bot.
 * Registers clients, all the shenanigans discord requires when
 * a bot boots up.
 */
export async function startBot() {
    console.log("BOT: Starting")
    registerEvents(client);
    await registerCommands();

    console.log("BOT: Logging in")
    await client.login(process.env.token);
}
