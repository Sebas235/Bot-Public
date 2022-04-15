const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "reportbug",
    description: "Reporta un bug del bot",
    category: "Utilidad",
    aliases: [],

    run: async (client, message, args) => {
        

        
        const reporte = args.join(" ")
        if(!reporte) return  message.reply({ content: 'Debes decir tu reporte'})

        const embed = new MessageEmbed()
        .setTitle(':x: | ¡Nuevo Reporte!')
        .setDescription(`**__Descripcion del reporte__** \n${reporte}\n\nReporte publicada por ${message.author.tag}`)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter({ text: 'Un Reporte más'})

        client.channels.cache.get("957830433557594142").send({
            content: '<@&957831098476396614> ha llegado un nuevo reporte!',
            embeds: [embed]
        })

        message.reply(`Gracias por tu reporte los desarolladores lo van a mirar`).then(msg => {
            setTimeout(() => msg.delete(), 4000)
})



   }  
}