//Looking around? 
let fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
const Discord = require("discord.js");
const { Client } = ("discord.js");
const client = new Discord.Client();
const prefix = (config.prefix);
const token = (config.bot_token);
const color = (config.color);
const name = (config.name);
const sChannel = (config.suggestionChannel);


client.on('ready', () => {
    console.log('I am ready!');
  });

client.on("message", message => {
if(!message.content.startsWith(prefix)) return;
let args = message.content.substring(prefix.length).split(" ")

if(args[0] === "suggest") {
    suggest(message, args)
} else if(args[0] === "help") {
    help(message, args)
}

function suggest(message, args){
    if(!args[1]) message.channel.send("You need a suggestion!")
    else{
    
        let content = args.splice(1).join(" ")
        
        let embed = new Discord.RichEmbed()
        .setColor(color)
        .setThumbnail(message.author.avatarURL)
        .setTitle(name)
        .setDescription(content)
        .setFooter("Made By "+message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        return client.channels.get(sChannel).send(embed).then(sentEmbed => {
            sentEmbed.react("👍").then(sentEmbed.react("👎")).then(message.channel.send("Suggestion Successfully Made! "+message.author)).then(message.delete({timeout:6000}))
        
        });
    }
    
function help(message, args){
        console.log("I see it");
        let embed = new Discord.RichEmbed()
        .setColor(color)
        .setThumbnail(message.author.avatarURL)
        .setTitle(name+"**HELP**")
        .setDescription(".help **->** Provides the list of commands. ")
        .setDescription(".suggest <suggestion> **->** Makes a suggestion.")
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        return message.channel.send(embed).then(
            sentEmbed => {
                sentEmbed.react("✅");

        }

    );
}

    
    };
});



client.login(token);