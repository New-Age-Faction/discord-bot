/**
 * Contains dedicated embeds sent in the log channel to represent events that occurred with some of the services
 * exposed by NAF.
 */

import { EmbedBuilder } from "discord.js";
import { EmbedColors } from "./colors.js";
import { ServiceIcons } from "./serviceImages.js";
import { EventIcons } from "./eventImages.js";

// - Imports ------------------------------------------------------------------

// - Constants ----------------------------------------------------------------

// - Functions ----------------------------------------------------------------

//export async function SuccessfulServiceStart(serviceName) {
//  const embed = new EmbedBuilder()
//    .setTitle("The title")
//    .setDescription("The description")
//    .setColor(0x00ff00) // green
//    .setTimestamp()
//    .setAuthor({
//      name: "author name",
//      iconURL: "https://cdn-icons-png.flaticon.com/128/3281/3281188.png",
//      url: "https://author-url.com/",
//    })
//    .setURL("https://anurl.com")
//    .setFooter({
//      text: "footer text",
//      iconURL: "https://cdn-icons-png.flaticon.com/128/3655/3655580.png",
//    })
//    .setThumbnail("https://cdn-icons-png.flaticon.com/128/17083/17083585.png")
//    .setImage(
//      "https://preview.redd.it/fun-fact-the-pukeko-bird-has-wings-v0-exhsm4sn370f1.png?auto=webp&s=5ef82e0a0548dd74e49fbbe813c1284f1b154840"
//    )
//    .addFields({
//      name: "inline field name",
//      value: "inline field value",
//      inline: true,
//    })
//    .addFields({
//      name: "not inline field name",
//      value: "not inline field value",
//      inline: false,
//    });
//  return embed;
//}

/**
 * Prebuilt embed for whenever the services start successfully.
 * @param {*} serviceName
 * @param {*} iconURL
 * @returns
 */
export async function EmbedServiceLaunched(serviceName, iconURL) {
  const embed = new EmbedBuilder()
    .setTitle("Service started")
    .setDescription("The service successfully started and is now operational.")
    .setColor(EmbedColors.SUCCESS) // green
    .setTimestamp()
    .setFooter({
      text: serviceName,
      iconURL: iconURL,
    })
    .setThumbnail(EventIcons.launch);
  console.log(embed);
  return embed;
}
