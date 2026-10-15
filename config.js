module.exports = {
  // Bot settings
  defaultPrefix: "!",
  embedColor: "#5865F2",
  errorColor: "#ED4245",
  successColor: "#57F287",
  warningColor: "#FEE75C",

  // Owners (can use owner-only commands)
  owners: process.env.OWNER_IDS ? process.env.OWNER_IDS.split(",") : [],

  // Moderation defaults
  moderation: {
    muteRoleName: "Muted",
    maxWarns: 5,
    warnAction: "timeout", // timeout | kick | ban
    defaultTimeout: "1h",
  },

  // Anti-Nuke thresholds (actions per 10 seconds)
  antiNuke: {
    enabled: true,
    bans: 3,
    kicks: 5,
    channelDeletes: 3,
    roleDeletes: 3,
    roleCreates: 5,
    webhookCreates: 3,
    action: "ban", // ban | kick | striproles
  },

  // Auto-Mod
  autoMod: {
    enabled: true,
    antiSpam: {
      enabled: true,
      maxMessages: 5,
      interval: 5000, // ms
      action: "timeout",
      duration: "10m",
    },
    antiInvite: true,
    antiLink: false,
    badWords: ["badword1", "badword2"], // add your list
    maxMentions: 5,
    maxEmojis: 15,
  },

  // Levels
  levels: {
    enabled: true,
    xpPerMessage: [15, 25], // random between
    cooldown: 60000, // 60s
    levelUpChannel: null, // set via command
    announceLevelUp: true,
  },

  // Economy
  economy: {
    enabled: true,
    currency: "🪙",
    currencyName: "Coins",
    dailyAmount: [100, 300],
    workAmount: [50, 150],
    begAmount: [10, 50],
  },

  // Tickets
  tickets: {
    enabled: true,
    categoryName: "Tickets",
    supportRoleName: "Support",
    maxTicketsPerUser: 2,
  },

  // Music
  music: {
    enabled: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 60000,
    leaveOnEnd: true,
    leaveOnEndCooldown: 60000,
  },

  // Sticky messages
  sticky: {
    enabled: true,
    maxStickies: 5, // per channel
  },
};
