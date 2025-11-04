/*
    The goal of this file is to subscribe your custom events to the various
    publishers provided by the discord's client.

    The client is the publisher, your functions are subscribers.
    Google design pattern: Observer.
*/

// - Imports ------------------------------------------------------------------
import { onClientReady } from "./onClientReady.js";
import { onInteractionCreate } from "./onInteractionCreate.js";

// - Functions ----------------------------------------------------------------
export function registerEvents(discordClient) {
  console.log("BOT: Registering events");
  discordClient.client.once("clientReady", () => {
    onClientReady(discordClient);
    discordClient.onClientReady();
  });
  discordClient.client.on("interactionCreate", async (interaction) => {
    onInteractionCreate(discordClient, interaction);
  });
  //client.on("messageCreate", messageCreate);
}
