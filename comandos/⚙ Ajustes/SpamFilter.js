const Discord = require('discord.js');
const intents = new Discord.Intents();
const client = new Discord.Client({ intents: 32767 });

const { SpamFilter } = require("discord-chat-filter")

const spamFilter = new SpamFilter({
    warnCountLimit: 3, // Cantidad de mensajes enviados seguidos que generarán una advertencia.
    muteCountLimit: 4, // Cantidad de mensajes enviados seguidos que provocarán un silenciamiento
    kickCountLimit: 7, // Cantidad de mensajes enviados seguidos que provocarán una patada.
    banCountLimit: 7, // Cantidad de mensajes enviados seguidos que provocarán una prohibición.
    maxInterval: 2000, // Cantidad de tiempo (en milisegundos) en que los mensajes se consideran spam.
    warnMessage: "{@user}, Porfavor deja de mandar demasiados mensajes.", // Mensaje a enviar en el chat cuando se advierte a un usuario
    kickMessage: "**{user_tag}** ha sido expulsado por spammear.", // Mensaje que se enviará en el chat cuando se patea a un usuario
    muteMessage: "**{user_tag}** ha sido muteado por spammear.", // Mensaje que se enviará en el chat cuando un usuario esté silenciado
    banMessage: "**{user_tag}** ha sido baneado por spammear.", // Mensaje que se enviará en el chat cuando un usuario esté baneado
    ignoredPermissions: [],
    ignoredMembers: [],
    removeMessages: true,
    modLogsEnabled: false,
    modLogsChannelName: "mod-logs",
});

client.on('messageCreate', async (message) => {
    spamFilter.init(message) // Start
});