const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running!\n');
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening...');
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

// ضع توكن البوت الحقيقي هنا بين علامتي التنصيص
client.login("MTUzNTQ3MzI4NDc5MDA5NTg4Mg.G6m-b8b.mz-XYwZ8IyGy-QMXgmNoli2MBt4NzhkTtBoztE");
