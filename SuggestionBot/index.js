//Looking around? 
// Version: 1.2v
let fs = require("fs");
const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
const Discord = require("discord.js");
const { Client } = ("discord.js");
const client = new Discord.Client();
const prefix = (config.prefix);
const token = (config.bot_token);
const color = (config.color);
const name = (config.name);
const sChannel = (config.suggestionChannel);
const wChannel = (config.welcomeChannel);


client.on("ready", () => {
    console.log("#################################");
    console.log("#################################");
    console.log("##        Sleepin_ Bots        ##");
    console.log("##       Suggestion Bots       ##");
    console.log("##           Online            ##");
    console.log("#################################");
    console.log("#################################");
});

client.on("guildMemberAdd", member => {
    member.guild.channels.get(wChannel).send("Welcome to Sleepin_'s Small Shack "+ member)

})

client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.substring(prefix.length).split(" ")

    if (args[0] === "suggest") {
        suggest(message, args)
    }
    else if (args[0] === "help") {
        help(message, args)
    }
    else if (args[0] === "restart") {
        restart(message, args)
    }
    function restart(message, args) {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            message.channel.send("You do not have permission to restart the bot!")
        }
        else {
            let embed = new Discord.RichEmbed()
                .setColor(color)
                .setTitle(name)
                .setDescription("**Restarting...**")
                .setFooter(message.author.tag, message.author.avatarURL)
                .setTimestamp(new Date())
            return message.channel.send(embed).then(
                setTimeout(() => {
                    process.exit()
                }, 500)

            );
        }

    }
    function help(message, args) {

        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setThumbnail(message.author.avatarURL)
            .setTitle(name)
            .addField(prefix + "suggest <suggestion> **->**", "Makes a suggestion")
            .addField(prefix + "restart **->**", "Restarts the bot")
            .setDescription("Provides the list of commands.")
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTimestamp(new Date())
        return message.channel.send(embed).then(
            sentEmbed => {
                sentEmbed.react("✅");

            }

        );
    }

    function suggest(message, args) {
        if (!args[1]) message.channel.send("You need a suggestion!")
        else {

            let content = args.splice(1).join(" ")

            let embed = new Discord.RichEmbed()
                .setColor(color)
                .setThumbnail(message.author.avatarURL)
                .setTitle(name)
                .addField("**Suggestion**", content)
                .setFooter("Made By " + message.author.tag, message.author.avatarURL)
                .setTimestamp(new Date())
            let embedsent = new Discord.RichEmbed()
                .setColor(color)
                .setTitle("👍 **SUGGESTON MADE**")
                .setDescription(message.author+(" Has made a suggestion!"))
                .setFooter(bot.user.avatarURL)
                .setTimestamp(new Date())
            return client.channels.get(sChannel).send(embed).then(sentEmbed => {
                sentEmbed.react("👍").then(message.delete({ timeout: 6000 })).then(sentEmbed.react("👎")).then(message.channel.send(embedsent))
            })

        }

    };

});

client.login(token);
