const { Client, Message, EmbedBuilder, Colors } = require('discord.js')
const Levels = require('discord-xp')

module.exports = {

    name: "rank",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async(client, message, args) => {

        const target = message.mentions.users.first() || message.author;

        const level = await Levels.fetch(target.id, message.guild.id);

        if(!level) return message.reply('Seems like this user has not earned any xp so far.')

        const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle(`${target.displayName}'s Level`)
        .setDescription(`**Level:** ${level.level}\n**XP:** ${level.xp}`)
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        message.reply({ embeds: [embed] })

    }

}