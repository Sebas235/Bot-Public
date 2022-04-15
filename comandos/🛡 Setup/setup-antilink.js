const setupSchema = require(`${process.cwd()}/modelos/setups.js`)
module.exports = {
    name: "setup-antilink",
    aliases: ["latencia", "ms"],
    desc: "Sirve para ver la latencia del Bot",
    run: async (client, message, args, prefix) => {
        let setups_data = await setupSchema.findOne({guildID: message.guild.id});
        setups_data.antilinks = !setups_data.antilinks
        setups_data.save();
        message.reply(`Se ha ${setups_data.antilinks ? "ACTIVADO" : "DESACTIVADO"} el sistema de antilinks`)
    }
}