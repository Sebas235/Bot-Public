const Discord = require('discord.js');
const config = require('./config/config.json')
const fs = require('fs');
require('colors')
const client = new Discord.Client({
    restTimeOffset: 0,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
})

setInterval(async function(){
    const fetch = require("node-superfetch")

    let user = "RealAki1"

    const uptime = await fetch.get(`https://decapi.me/twitch/uptime/${user}`)
    const avatar = await fetch.get(`https://decapi.me/twitch/avatar/${user}`)
    const viewers = await fetch.get(`https://decapi.me/twitch/viewercount/${user}`)
    const title = await fetch.get(`https://decapi.me/twitch/title/${user}`)
    const game = await fetch.get(`https://decapi.me/twitch/game/${user}`)

    const twitch = require("./modelos/twitchSchema")
    let data = await twitch.findOne({ user: user, titulo: title.body })

    if(uptime.body !== `${user} is offline`){

      const embed = new Discord.MessageEmbed()
      .setAuthor({ "name": `${user}`, "iconURL": `${avatar.body}` })
      .setTitle(`${title.body}`)
      .setThumbnail(`${avatar.body}`)
      .setURL(`https://www.twitch.tv/${user}`)
      .addField("Game", `${game.body}`, true)
      .addField("Viewers", `${viewers.body}`, true)
      .setImage(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${user}-620x378.jpg`)
      .setColor("BLUE")

      if(!data){
        const newdata = new twitch({
          user: user,
          titulo: `${title.body}`
        })

        await client.channels.cache.get("949060103989002380").send({ content: `${user} esta en directo. **Anda a verlo**\nhttps://www.twitch.tv/${user}`, embed: [embed] })

        return await newdata.save()
      }

      if(data.titulo === `${title.body}`) return;

      await client.channels.cache.get("949060103989002380").send({ content: `${user} esta en directo. **Anda a verlo**\nhttps://www.twitch.tv/${user}`, embed: [embed] })

      await twitch.findOneAndUpdate({ user: user }, { titulo: title.body })
    }
  }, 120000)

client.on("guildCreate", (guild) => {
   
    const canalinv = guild.channels.cache.find(canal => canal.type === 'GUILD_TEXT' && canal.permissionsFor(guild.me).has('SEND_MESSAGES'))
     if(channel.length === 0) return;
    canalinv.send(`Gracias por invitarme!`)
    });

client.on("ready", () => {
    console.log(`Todo  está activo!`)
    const Estado = [
      `Ayuda con .help`,
      `Disfruta del bot!`,
    ];
  
   setInterval(() => {
          client.user.setPresence({ activities: [{ name: Estado[Math.floor(Math.random() * Estado.length)] }], status: 'online', type: "WATCHING" })
      }, 3000)
  })


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.color = config.color;

/* SISTEMA DE IDIOMAS */
client.la = {};
let idiomas = fs.readdirSync('./idiomas').filter(archivo => archivo.endsWith(".json")).map(idioma => idioma.replace(/.json/, ""));
console.log(idiomas)
for(const idioma of idiomas){
    client.la[idioma] = require(`./idiomas/${idioma}`)
}
Object.freeze(client.la)

function requerirhandlers() {
    ["command", "events", "distube", "reaccion_roles", "tickets", "sugerencias", "sorteos", "bienvenida"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch (e) {
            console.warn(e)
        }
    })
}
requerirhandlers();


client.login(config.token).catch(() => console.log(`-[X]- NO HAS ESPECIFICADO UN TOKEN VALIDO O TE FALTAN INTENTOS -[X]-\n [-] ACTIVA LOS INTENTOS EN https://discord.dev [-]`.red))
