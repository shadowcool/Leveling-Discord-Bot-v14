const { Client, Message, EmbedBuilder, Colors } = require('discord.js')

module.exports = {

    name: "ping",

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async(client, message, args) => {

        const wsPing = client.ws.ping;

        const msg = await message.reply('Pinging...')

        const latency = msg.createdTimestamp - message.createdTimestamp;

        const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle(`🏓 Pong!`)
        .setDescription(`Websocket ping: ${wsPing}ms\nLatency: ${latency}ms`)
        .setTimestamp()

        msg.edit({ embeds: [embed], content: '' })

    }

}