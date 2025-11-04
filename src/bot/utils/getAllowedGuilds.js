export function getAllowedGuilds() {
  const allowedGuilds = process.env.ALLOWED_GUILDS.split(",");
  return allowedGuilds;
}
