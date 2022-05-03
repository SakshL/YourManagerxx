const {
	MessageEmbed
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
var ee = require(`${process.cwd()}/botconfig/embed.json`)
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const { MessageButton, MessageActionRow } = require('discord.js')
const { handlemsg } = require(`${process.cwd()}/handlers/functions`)
module.exports = {
	name: "developer",
	description: "Shows Information about the Developer",
	run: async (client, interaction, cmduser, es, ls, prefix, player, message) => {
		//things u can directly access in an interaction!
		const { member, channelId, guildId, applicationId, commandName, deferred, replied, ephemeral, options, id, createdTimestamp } = interaction; 
		const { guild } = member;
		
		try {	
			let button_public_invite = new MessageButton().setStyle('LINK').setLabel(client.la[ls].cmds.info.developer.buttons.invite).setURL("https://discord.com/api/oauth2/authorize?client_id=971137909438709811&permissions=8&scope=bot%20applications.commands%20applications.commands")
			let button_support_dc = new MessageButton().setStyle('LINK').setLabel(client.la[ls].cmds.info.developer.buttons.dc).setURL("https://discord.gg/notsaksh")
			let button_invite = new MessageButton().setStyle('LINK').setLabel(client.la[ls].cmds.info.developer.buttons.botlist).setURL(`https://botlist.milrato.eu`)
			const allbuttons = [new MessageActionRow().addComponents([button_public_invite, button_support_dc, button_invite])]
			interaction?.reply({embeds: [new MessageEmbed()
				.setColor(es.color)
				.setFooter(client.getFooter(es))
				.setTimestamp()
				.setThumbnail("https://cdn.discordapp.com/avatars/966411522106605608/df7b527a701d9a1ab6d73213576fe295.webp?size=1024")
				.setTitle(client.la[ls].cmds.info.developer.title)
				.setURL("https://milrato.eu")
				.setDescription(client.la[ls].cmds.info.developer.description)],
components: allbuttons
			}).catch(error => console.log(error));
		} catch (e) {
			console.log(String(e.stack).grey.bgRed)
			return message.reply({embeds: [new MessageEmbed()
			  .setColor(es.wrongcolor)
			  .setFooter(client.getFooter(es))
			  .setTitle(client.la[ls].common.erroroccur)
			  .setDescription(eval(client.la[ls]["cmds"]["info"]["color"]["variable2"]))
			]});
		}
	}
}
/**
 * @INFO
 * Bot Coded by NotSaksh#6969 | https://discord.gg/notsaksh
 * @INFO
 * Work for Nexus Development | https://milrato.eu
 * @INFO
 * Please mention him / Nexus Development, when using this Code!
 * @INFO
 */
