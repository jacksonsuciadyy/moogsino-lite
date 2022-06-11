const fs = require("fs")
const { getFiles } = require("../util/functions")

module.exports = (bot, reload) => {
    const { client } = bot

	let slashCommands = getFiles("./slashCommands/", ".js")

	if (slashCommands.legnth === 0) {
		console.log("No events to load")
	}

	slashCommands.forEach((f, i) => {
		if (reload) delete require.cache[require.resolve(`../slashCommands/${f}`)]
		const slashcmd = require(`../slashCommands/${f}`)
		client.slashCommands.set(slashcmd.name, slashcmd)
	})

    console.log(`Loaded ${client.slashCommands.size} Slash Commands`)
}