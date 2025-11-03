export const command = {
    name: "test",
    description: "this is the description!",
};

export async function execute(interaction) {
    console.log("BOT: /test");
    await interaction.reply("this is a reply");
}
