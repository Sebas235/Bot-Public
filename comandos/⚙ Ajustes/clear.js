const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'clear',
    premisos: "MANAGE_MESSAGES",
    
    run: async (client, message, args, prefix) => {
 
        const cantidad = args[0]

        if(!cantidad) return message.reply({
            embeds: [new MessageEmbed()
                .setTitle(`<:Equi:953592092641333269> |  Error.  |  <:Equi:953592092641333269>`)
                .setDescription(`**"<:Equi:953592092641333269>  |  Debes escribir una cantidad de mensajes para eliminar."**`)
                .setColor(client.color)
                .setTimestamp()
            ]
        })

        if(isNaN(cantidad)) return message.reply({
            embeds: [new MessageEmbed()
                .setTitle(`<:Equi:953592092641333269> |  Error.  |  <:Equi:953592092641333269>`)
                .setDescription(`**<:Equi:953592092641333269>  |  Debes escribir una cantidad de mensajes para eliminar.**`)
                .setColor(client.color)
                .setTimestamp()
                .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            ]
        })

        if(cantidad > 99) return message.reply({
            embeds: [new MessageEmbed()
            .setTitle(`<:Equi:953592092641333269> |  Error.  |  <:Equi:953592092641333269>`)
            .setDescription(`**<:Equi:953592092641333269>  |  Has pasado el límite, max 99 mensajes.**`)
            .setColor(client.color)
            .setTimestamp()
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true})})
        ]
        })

        message.delete().then(q => {
            message.channel.bulkDelete(cantidad)
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setTitle(`<:864513767047299122:957816218033721454>   |  Mensajes borrados.`)
                    .setDescription(`**Se han borrado ${cantidad} de mensajes exitosamente.**`)
                    .setColor(client.color)
                    .setTimestamp()
                    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true})})
                ]
            })
        })
    }
}