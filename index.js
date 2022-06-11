require("dotenv").config()

const Discord = require("discord.js")
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

client.loadEvents = (bot, reload) => require("./handlers/eventsHandler")(bot,reload)
client.loadCommands = (bot, reload) => require("./handlers/commandsHandler")(bot,reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashCommandsHandler")(bot,reload)
client.loadButtons = (bot, reload) => require("./handlers/buttonsHandler")(bot,reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)

client.on("interactionCreate", (interaction) => {
    if(!interaction.isCommand()) return
    if(!interaction.inGuild()) return interaction.reply(("This command can only be used in a server!"))

    const slashcmd = client.slashCommands.get(interaction.commandName)

    if(!slashcmd) return interaction.reply(("Invalid slash command!"))

    if(slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm))
        return interaction.reply("You do not have permission for this command!")

    slashcmd.run(client, interaction)
})

module.exports = bot

// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate", (message) => {
//     if(message.content == "Hi") {
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