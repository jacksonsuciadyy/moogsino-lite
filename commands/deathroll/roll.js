{
    var lastNum = 99999
}

module.exports = {
    name: "roll",
    category: "deathroll",
    permissions: [],
    devOnly: false,
    run: async ({bot, message, args}) => {
        let member = message.member
        let maxNum = message.content.trim().split(" ")[1]
        let rand = Math.random() * maxNum;
        rand = Math.floor(rand);
        if(rand == 0)
        rand = 1
        if(rand !== 1) {
            lastNum = rand
            message.reply(`${message.author.username} roll a 🎲${rand} ( out of ${maxNum} ).`)
        } else if(maxNum > lastNum) {
            message.reply(`The number you roll can't be more than ${lastNum}`)
        } else if(rand === 1) {
            lastNum = 99999
            message.reply(`${message.author.username} roll a 🎲${rand} ( out of ${maxNum} ).`)

        }
    }
}