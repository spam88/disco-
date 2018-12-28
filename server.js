const Discord = require('discord.js');
const config = require('./config.json');
const disco = new Discord.Client();
const prefix = config.prefix;
const allowedUsers = config.allowedUsers;
const roles = config.roleToDisco;

disco.on("ready", () => {
    disco.user.setPresence({ game: { name: `coded by yousef` }, type: 0 });
    console.log("Disco Rolu Aktif.");
});

disco.on("message", message => {

  function discoRole() {
    let random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    roles.forEach((role) => {
      let theRole = message.guild.roles.find("name", role);
      theRole.edit({color: random}).catch(e => {
        return message.channel.send(":x: **HATA:** Rolu Seçiniz.");
      });
    });
  }

  if(message.content.startsWith(prefix + "start")) {
    if(allowedUsers.includes(message.author.id)) {
    setInterval(() => { discoRole(); }, config.ms);
    message.channel.send("```css\nDisco...```");
    message.channel.send("Oyun Tsunamisi Tarafindan Hazirlandim.");
  } else {
    message.reply(`Yetkin Yeterli Değil.`);
  }
} else

if(message.content.startsWith(prefix + "off")) {
  if(allowedUsers.includes(message.author.id)) {
  message.channel.send("Disco Durduruldu.");
  setTimeout(() => { console.log(process.exit(0)); }, 300);
} else {
  message.reply(`Yetkin Yeterli Değil.`);
  }
}

});

disco.login(config.token);
