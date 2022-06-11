const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")

module.exports = {
    name: "rolesSelector",
    category: "test",
    devOnly: true,
    run: async ({client, message, args}) => {
        message.channel.send({
            embeds: [
                new MessageEmbed().setTitle(("Select Role")).setDescription("Select roles from the buttons below").setColor(("BLUE"))
            ],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId("role-985111995420381224").setStyle("PRIMARY").setLabel("Administrator")
                ])
            ]
        })
    }
}