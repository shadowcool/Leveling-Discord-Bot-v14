const { Client, Message, EmbedBuilder, Colors } = require('discord.js')
const Levels = require('discord-xp')

module.exports = {

    name: "leaderboard",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async(client, message, args) => {

        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

        if(rawLeaderboard.length < 1) return message.reply('Nobody is in leaderboard yet.')

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `**${e.position}. ${e.username}** **Level:** ${e.level}\n**XP:** ${e.xp.toLocaleString()}`)

        const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle(`${message.guild.name}'s Leaderboard`)
        .setDescription(`${lb.join("\n\n")}`)
        .setTimestamp()

        message.reply({ embeds: [embed] })

    }

}