const Discord = require("discord.js")
require("dotenv").config()

// const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "!",
    owners: ["166560098817277952"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashCommands = new Discord.Collection()
client.buttons = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/eventsHandler")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commandsHandler")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashCommandsHandler")(bot, reload)
client.loadButtons = (bot, reload) => require("./handlers/buttonsHandler")(bot, reload)

client.loadEvents(bot, false)
console.log("Finished Loading Events!")
client.loadCommands(bot, false)
console.log("Finished Loading Commands!")
client.loadSlashCommands(bot, false)
console.log("Finished Loading Slash Commands!")
client.loadButtons(bot, false)
console.log("Finished Loading Buttons!")


module.exports = bot

// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate", (message) => {
//     if (message.content == "hi"){
//         message.reply("Hello World!")
//     }
// })

// const welcomeChannelId = "926530810008453120"

// client.on("guildMemberAdd", async (member) => {
//     const img = await generateImage(member)
//     member.guild.channels.cache.get(welcomeChannelId).send({
//         content: `<@${member.id}> Welcome to the server!`,
//         files: [img]
//     })
// })

client.login(process.env.TOKEN)