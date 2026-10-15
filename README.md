# Discord All-in-One Self-Hosted Bot

A complete, modular, self-hosted Discord bot built with **Discord.js v14** and **SQLite**.

## Features Included

| Category | Features |
|----------|----------|
| **Moderation** | /ban /kick /timeout /warn /purge |
| **Anti-Nuke** | Detects mass bans, channel deletes → auto ban/kick/strip roles |
| **Auto-Mod** | Anti-spam, anti-invite, bad words, mass mentions |
| **Levels** | XP system, /rank, /leaderboard, level-up announcements |
| **Economy** | /balance /daily /work /pay + wallet & bank |
| **Tickets** | Button panel, private channels, close button |
| **Giveaways** | Start / enter / end / reroll with buttons |
| **Reaction Roles** | /reactionrole – react to get roles |
| **AFK** | /afk + auto remove + mention notification |
| **Snipe** | /snipe last deleted message |
| **Music** | YouTube, Spotify, SoundCloud via DisTube (/play /skip /stop /queue /volume /pause /resume) |
| **Welcomer** | Custom welcome messages with placeholders |
| **Sticky Messages** | /sticky set / /sticky remove |

---

## Quick Start

### 1. Requirements
- Node.js 18+
- A Discord Bot Token (https://discord.com/developers/applications)
- FFmpeg (for music) – ffmpeg-static is included

### 2. Setup

```bash
cd discord-all-in-one-bot
npm install
cp .env.example .env
```

Edit `.env`:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_application_client_id
# Optional for instant testing:
# GUILD_ID=your_test_server_id
```

### 3. Invite the Bot

```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

**Required Privileged Intents** (Developer Portal → Bot):
- Server Members Intent
- Message Content Intent

### 4. Deploy Commands

```bash
npm run deploy
```

### 5. Start the Bot

```bash
npm start
```

---

## Configuration

Most settings live in `config.js`:

- Anti-Nuke thresholds
- Auto-Mod rules & bad word list
- XP rates & cooldowns
- Economy amounts
- Ticket category / support role names
- Music leave behaviour

Commands:
- /setwelcome – set welcome channel + message
- /setlog – set anti-nuke / mod log channel
- /reactionrole – create reaction roles
- /sticky set – sticky messages

---

## Project Structure

```
discord-all-in-one-bot/
├── index.js
├── deploy-commands.js
├── config.js
├── database/db.js
├── commands/
│   ├── moderation/
│   ├── economy/
│   ├── levels/
│   ├── tickets/
│   ├── giveaways/
│   ├── music/
│   ├── utility/
│   └── admin/
├── events/
├── utils/
└── data/                 # SQLite database (auto-created)
```

---

## Permissions

- Administrator recommended (for anti-nuke + full moderation)
  or at minimum: Manage Channels, Manage Roles, Ban/Kick Members, Moderate Members, Manage Messages, Connect + Speak

---

## Tips

1. Put the bot role above roles it needs to manage.
2. Create a role named "Support" for tickets (or change in config.js).
3. Create a category named "Tickets" (or it will be auto-created).
4. Production: use PM2

```bash
npm install -g pm2
pm2 start index.js --name all-in-one-bot
pm2 save
```

## License

MIT – free to use, modify, and self-host.
