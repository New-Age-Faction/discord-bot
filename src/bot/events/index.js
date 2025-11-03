/*
    The goal of this file is to subscribe your custom events to the various
    publishers provided by the discord's client.

    The client is the publisher, your functions are subscribers.
    Google design pattern: Observer.
*/

// - Imports ------------------------------------------------------------------
//import ready from "./ready.js";
//import interactionCreate from "./interactionCreate.js";
//import messageCreate from "./messageCreate.js";

// - Functions ----------------------------------------------------------------
export function registerEvents(client) {
  console.log("BOT: Registering events");
  //client.once("ready", ready);
  //client.on("interactionCreate", interactionCreate);
  //client.on("messageCreate", messageCreate);
}
