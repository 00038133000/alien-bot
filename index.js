const { Client, GatewayIntentBits, Partials } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.Channel], // Supaya bot bisa baca DM
});

client.once('ready', () => {
  console.log(`✅ Bot aktif sebagai ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return; // Jangan balas pesan dari bot

  if (message.channel.type === 1) { // 1 = DM channel
    const userId = message.author.id;
    const content = message.content.toLowerCase();

    if (content === 'hi') {
      message.channel.send('Hai! Siapa nama kamu, ya? 😊');

      const filter = m => m.author.id === userId;
      const collector = message.channel.createMessageCollector({ filter, time: 15000, max: 1 });

      collector.on('collect', m => {
        const nama = m.content;
        message.channel.send(
          `Senang kenalan sama kamu, ${nama}! 🛸\n` +
          `✨ Ini undangan debut Alien VTuber khusus buat kamu:\n` +
          `📅 10 April 2025 — 19.00 WIB\n` +
          `🔗 https://bit.ly/alien-debut`
        );
      });

      collector.on('end', collected => {
        if (collected.size === 0) {
          message.channel.send('Wah, aku gak dapet jawaban kamu nih 😥. Coba ketik "hi" lagi ya!');
        }
      });
    }
  }
});

client.login(process.env.BOT_TOKEN);
