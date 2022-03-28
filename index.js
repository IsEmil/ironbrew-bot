const wait = require('node:timers/promises').setTimeout;
const discord = require("discord.js");
const fetch = require("node-fetch");
const cp = require("child_process");
const stream = require("stream");
const util = require("util");
const path = require("path");
const tmp = require("tmp");
const fs = require("fs");

const config = require("./config.js");
const client = new discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
    ]
});
const streamPipeline = util.promisify(stream.pipeline);

// util
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function obfuscate(source) {
    const input = tmp.fileSync();
    const output = tmp.fileSync();

    fs.writeFileSync(input.name, source);

    cp.spawn("dotnet", [path.join(__dirname, "/ironbrew/IronBrew2 CLI/bin/Debug/netcoreapp3.1/IronBrew2 CLI.dll"), input.name, output.name], {
        cwd: path.join(__dirname, "/ironbrew/IronBrew2 CLI/bin/Debug/netcoreapp3.1/"),
        detached: true,
    }).on("exit", (code) => {
        if (code !== 0) return reject(new Error("Unknown error"));

        input.removeCallback();
        output.removeCallback();

    });
}

client.once("ready", () => {
    console.log("[IronBrew] Ready!")
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == "obfuscate") {
        if (message.attachments && message.attachments.first()) {
            let attachment = message.attachments.first();

            if (attachment.size <= config.max_file_size) {
                let embed = new discord.MessageEmbed()
                    .setTitle("Processing")
                    .setDescription("Obfuscating file, please wait")
                    .setColor("ORANGE");
                message.reply({ embeds: [embed] }).then((m) => {
                    fetch(attachment.url).then((res) => {
                        if (res.ok) {
                            let id = makeid(config.id_length);
                            let outStream = fs.createWriteStream(`temp/${id}_${attachment.name}`);

                            streamPipeline(res.body, outStream).then(async () => {
                                await obfuscate(fs.readFileSync(outStream.path), "utf-8");
                                await fs.unlink(outStream.path, function(err){if(err) return console.log(err);});
                                let embed = new discord.MessageEmbed()
                                    .setTitle("Obfuscated")
                                    .setDescription("Your attachment has been obfuscated successfully")
                                    .setColor("GREEN");
                                await m.edit({ embeds: [embed] });
                                await wait(1000);
                                await message.channel.send({ files: [new discord.MessageAttachment(path.join(__dirname, "/ironbrew/IronBrew2 CLI/bin/Debug/netcoreapp3.1/out.lua"))]})
                                await fs.unlink(path.join(__dirname, "/ironbrew/IronBrew2 CLI/bin/Debug/netcoreapp3.1/out.lua"), function(err){if(err) return console.log(err);});
                            }).catch((err) => {
                                console.log(err)
                                let embed = new discord.MessageEmbed()
                                    .setTitle("Error")
                                    .setDescription("Unable to write file to disk")
                                    .setColor("RED");
                                m.edit({ embeds: [embed] });
                            });
                        } else {
                            let embed = new discord.MessageEmbed()
                                .setTitle("Error")
                                .setDescription("Unable to download file")
                                .setColor("RED");
                            m.edit({ embeds: [embed] });
                        }
                    }).catch((err) => {
                        console.log(err)
                        let embed = new discord.MessageEmbed()
                            .setTitle("Error")
                            .setDescription("Unable to download file")
                            .setColor("RED");
                        m.edit({ embeds: [embed] });
                    });
                });
            } else {
                let embed = new discord.MessageEmbed()
                    .setTitle("Error")
                    .setDescription("Attachment is too large")
                    .setColor("RED");
                message.reply({ embeds: [embed] });
            }
        } else {
            let embed = new discord.MessageEmbed()
                .setTitle("Error")
                .setDescription("No attachment provided")
                .setColor("RED");
            message.reply({ embeds: [embed] });
        }
    }
})

// login
client.login(config.bot_token);