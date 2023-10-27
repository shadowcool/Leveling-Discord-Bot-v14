const { Client, IntentsBitField, Collection } = require('discord.js')
const Levels = require("discord-xp");
const config = require('./config.json')
const fs = require('fs')
const path = require('path')

const client = new Client({

    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMembers],

})

client.commands = new Collection()

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}`)
    Levels.setURL(config.MONGO_URL)  
    
    let commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'))

    commandFiles.forEach(file => {
            
        const commandFile = file.split('.')[0]
        const command = require(process.cwd() + `/commands/${commandFile}`)
        client.commands.set(command.name, command)

    })

})

client.on('messageCreate', async (message) => {

    if (message.author.bot) return

    const randomXp = Math.floor(Math.random() * 29) + 1
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp)
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id)
        message.channel.send(
            `${message.author.toString()}, congratulations! You have leveled up to **${user.level}**. :tada:`
        )
    }

    if (!message.content.startsWith(config.PREFIX)) return;

    const args = message.content.slice(config.PREFIX.length).trim().split(/ + /g)

    const command = args.shift().toLowerCase()

    const commands = client.commands;

    if(!commands.has(command)) return;

    if(commands.has(command)) {
        commands.get(command).run(client, message, args);
    }

})

client.login(config.TOKEN)