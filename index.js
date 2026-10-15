require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  ActivityType,
} = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const fs = require("fs");
const path = require("path");
const config = require("./config");

// Validate token
if (!process.env.DISCORD_TOKEN) {
  console.error("❌ DISCORD_TOKEN is missing in .env");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
  ],
});

// Collections
client.commands = new Collection();
client.cooldowns = new Collection();
client.config = config;

// Music (DisTube)
client.distube = new DisTube(client, {
  leaveOnEmpty: config.music.leaveOnEmpty,
  leaveOnEmptyCooldown: config.music.leaveOnEmptyCooldown,
  leaveOnEnd: config.music.leaveOnEnd,
  leaveOnEndCooldown: config.music.leaveOnEndCooldown,
  emitNewSongOnly: true,
  plugins: [new SpotifyPlugin(), new YtDlpPlugin()],
});

// Load commands
const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands", folder))
    .filter((f) => f.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    }
  }
}

// Load events
const eventFiles = fs
  .readdirSync(path.join(__dirname, "events"))
  .filter((f) => f.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// DisTube events
const { EmbedBuilder } = require("discord.js");

client.distube
  .on("playSong", (queue, song) => {
    const embed = new EmbedBuilder()
      .setColor(config.embedColor)
      .setTitle("🎶 Now Playing")
      .setDescription(`[${song.name}](${song.url})`)
      .addFields(
        { name: "Duration", value: song.formattedDuration, inline: true },
        { name: "Requested by", value: `${song.user}`, inline: true }
      )
      .setThumbnail(song.thumbnail);
    queue.textChannel?.send({ embeds: [embed] }).catch(() => {});
  })
  .on("addSong", (queue, song) => {
    queue.textChannel
      ?.send(`✅ Added **${song.name}** to the queue`)
      .catch(() => {});
  })
  .on("error", (channel, error) => {
    console.error("DisTube error:", error);
    if (channel) channel.send(`❌ Music error: ${error.message}`).catch(() => {});
  })
  .on("empty", (queue) => {
    queue.textChannel?.send("👋 Voice channel empty, leaving...").catch(() => {});
  });

// Login
client.login(process.env.DISCORD_TOKEN);

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});
