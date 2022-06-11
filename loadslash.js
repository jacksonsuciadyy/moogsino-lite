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

const guildID = "973074473353871390"

client.slashCommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashCommandsHandler")(bot,reload)
console.log("Successfully loading slash commands")
client.loadSlashCommands(bot, false)
console.log("Successfully running slash commands")

client.on("ready", async () => {
    const guild = client.guilds.cache.get(guildID)
    if(!guild)
        console.error("Target guild not found!")

    await guild.commands.set([...client.slashCommands.values()])

    console.log(`Successfully loaded in ${client.slashCommands.size}`)
    process.exit(0)
})


module.exports = bot

client.login(process.env.TOKEN)