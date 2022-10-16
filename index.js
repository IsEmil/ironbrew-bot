require("dotenv").config();

const {
    REST,
    Routes,
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActivityType,
    Partials,
} = require("discord.js");
const path = require("path");
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageTyping,
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
    ]
});

let commandMap = new Map();

/**
 * @description Loads all available commands
 */
function loadCommands() {
    const commandsPath = path.join(__dirname, 'interactions');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            commandMap.set(command.data.name, command);
            console.log(`Loaded command '${command.data.name}.js'`);
        } catch (err) {
            console.log(err);
        }
    }
}

/**
 * @description Loads all slash commands
 */
function deployCommands() {
    const commands = [];
    const commandsPath = path.join(__dirname, 'interactions');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    rest.put(Routes.applicationGuildCommands(client.user.id, "827916807574257704"), { body: commands }).then(() => {
        console.log('Successfully registered application commands.')
    }).catch((err) => {
        console.log(err)
    });
}

client.on("ready", () => {
    console.log("Client Ready");

    client.user.setPresence({ activities: [{ name: `over obfuscation`, type: ActivityType.Watching }] });
});

client.on("interactionCreate", (interaction) => {
    if (interaction.isCommand()) {
        if (commandMap.has(interaction.commandName)) {
            try {
                const command = commandMap.get(interaction.commandName);

                // execute
                command.execute(interaction, interaction.member, client);
            } catch (e) {
                console.log(`Error in command ${interaction.commandName} (or middleware): ${e}`);
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Error")
                            .setDescription(`An error occurred executing the \`${interaction.commandName}\` command Please try again later.`)
                            .setColor("#2f3136")
                    ], ephemeral: true
                });
            }
        } else {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription(`Unknown Command - ID: \`${interaction.commandId}\``)
                        .setColor("#2f3136")
                ], ephemeral: true
            });
        }
    }
});


client.login(process.env.TOKEN).then(() => {
    console.log("Logged In");
    deployCommands();
    loadCommands();
}).catch((err) => {
    console.log(err)
});
