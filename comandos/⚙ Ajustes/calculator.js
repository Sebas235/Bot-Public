const math = require('math-expression-evaluator');
const ms = require("ms");
const moment = require("moment")
const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord.js')
const { Calculator } = require('weky');
module.exports = {
  name: "calculator",
  aliases: ["calculadora"],
  desc: "Usa la calculadora",
  usage: "calc",
  type: "math",
   run: async (client, message, args, cmduser, text, prefix) => {
   
    await Calculator({
            message: message,
            embed: {
                title: 'Calculator',
                color: "BLUE",
        footer: message.guild.name,
                timestamp: false,
            },
            disabledQuery: 'La calculadora se ha desactivado!',
            invalidQuery: 'La ecuación no es válida!',
            othersMessage: 'Solo <@{{author}}> puede usar los botones!',
        });
  }
};