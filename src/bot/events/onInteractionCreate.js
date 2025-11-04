export async function onInteractionCreate(discordClient, interaction) {
  if (!interaction.isChatInputCommand()) return; // only handle slash commands
  console.log("BOT: onInteractionCreate: slash command");
  // Custom logic if ever you need it.

  const command = discordClient.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction); // call the execute function
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
}
