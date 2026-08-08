const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// 1. إنشاء سيرفر ويب وهمي لكي يرضى موقع Render ويترك البوت يعمل
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// 2. كود بوت الدسكورد العادي
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(MTUzNTQ3MzI4NDc5MDA5NT-g4Mg.G6m-b8b.mz-XYwZ8IyGy-QMXgmNoli2MBt4NzhkTtBoztE);
