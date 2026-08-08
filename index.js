const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const http = require('http');

// سيرفر بسيط للحفاظ على تشغيل البوت أونلاين على Render
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

// تعريف الأوامر (Slash Commands)
const commands = [
  new SlashCommandBuilder()
    .setName('panel')
    .setDescription('إرسال لوحة التحكم أو الأزرار التفاعلية')
].map(command => command.toJSON());

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // تسجيل الأوامر في دسكورد تلقائياً
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
});

// التفاعل مع الأوامر والرسائل
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'panel') {
    // إنشاء زر تفاعلي داخل اللوحة
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('my_button')
          .setLabel('اضغط هنا')
          .setStyle(ButtonStyle.Primary),
      );

    await interaction.reply({ 
      content: 'هذه هي اللوحة الخاصة بك:', 
      components: [row],
      ephemeral: false 
    });
  }
});

// الاستجابة للضغط على الأزرار
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'my_button') {
    await interaction.reply({ content: 'شكراً لاستخدامك الزر!', ephemeral: true });
  }
});

// الأوامر العادية بالكلمات
client.on('messageCreate', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(process.env.TOKEN);
