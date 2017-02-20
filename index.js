const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json")

client.on('ready', () => {
    console.log('I am ready!');
});

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome ${member.user} to this server.`);
});

client.on("guildCreate", guild => {
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`)
});

client.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing Minecraft");
  if(!playRole) return;

  if(newMember.user.presence.game && newMember.user.presence.game.name.startsWith("Minecraft")) {
    newMember.addRole(playRole);
  }else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)) {

  }
});

client.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];

  command = command.slice(config.prefix.length);

let args = message.content.split(" ").slice(1);

if (command === "math") {
  let numArray = args.map(n=> parseInt(n));
  let math = args[1];
  if (math === "+") {
      message.channel.sendMessage(numArray[0] + numArray[2]);
  }
  if (math === "-") {
      message.channel.sendMessage(numArray[0] - numArray[2]);
  }
  if (math === "/") {
      message.channel.sendMessage(numArray[0] / numArray[2]);
  }
  if (math === "*") {
      message.channel.sendMessage(numArray[0] * numArray[2]);
  }

}

if (command === "say") {
  message.channel.sendMessage(args.join(" "));
}

  if (command === "ping") {
    message.channel.sendMessage("pong");
  } else
  if (command === "foo") {
    message.channel.sendMessage("bar!");
  }
});

client.login(config.token);
