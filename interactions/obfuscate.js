const {
    SlashCommandBuilder,
    Interaction,
    GuildMember,
    EmbedBuilder,
} = require('discord.js');
const fetch = require('node-fetch');
const tmp = require("tmp");
const fs = require("fs");

const IB2 = require("../ib2.js");

/**
 * @description The function executed when a command is invoked
 * @param {Interaction} interaction
 */
async function run(interaction) {
    const response = await fetch(interaction.options.getAttachment("code").url); // gets the file from returned url 
    const text = await response.text(); // file code

    IB2(text).then(async (src) => {
        const input = tmp.fileSync();

        fs.writeFileSync(input.name, src);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Completed")
                    .setDescription(`Successfully obfuscated your code!`)
                    .setColor("#2f3136")
            ], ephemeral: true,
            files: [
                {
                    name: "Protected.lua",
                    attachment: input.name
                }
            ]
        });

        input.removeCallback();
    }).catch(async (err) => {
        console.log(err)
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("Error")
                    .setDescription(`An error occurred executing the obfuscation. Please try again later.`)
                    .setColor("#2f3136")
            ]
        });
    });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('obfuscate')
        .setDescription('Obfuscate your lua script.')
        .addAttachmentOption(option =>
            option.setName('code')
                .setDescription('The lua script you want to obfuscate.')
                .setRequired(true)
        ),
    execute: run
};
