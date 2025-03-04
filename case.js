// Di case.js
const {
	downloadContentFromMessage,
	BufferJSON,
	WA_DEFAULT_EPHEMERAL,
	generateWAMessageFromContent,
	proto,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	areJidsSameUser,
	InteractiveMessage,
	getContentType,
} = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const fs = require("fs");
const util = require("util");

const readmore = String.fromCharCode(8206).repeat(4001);

const {
	msg,
	await,
	clockString,
	delay,
	enumGetKey,
	fetchBuffer,
	fetchJson,
	format,
	formatDate,
	formatp,
	generateProfilePicture,
	getBuffer,
	getGroupAdmins,
	getRandom,
	isUrl,
	json,
	log,
	icToDate,
	msToDate,
	parseMention,
	sizeLimit,
	runtime,
	sleep,
	sort,
	toNumber,
} = require("./lib/myfunc");

const threshold = 0.72;

module.exports = async (command, pesannya, sock, m, msg, chatUpdate, store) => {
	try {
		if (typeof command !== "string") {
			console.log("Command bukan string:", command);
			return;
		}
		command = command.toLowerCase();

		switch (command) {
			case "menu":
				sock.sendMessage("120363260056289060@g.us", { text: pesannya });
				break;
			case "tescopy": {
				const jid = "120363260056289060@g.us"; // Ganti dengan JID tujuan

				const messageContent = {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadata: {},
								deviceListMetadataVersion: 2,
							},
							interactiveMessage: proto.Message.InteractiveMessage.fromObject({
								body: proto.Message.InteractiveMessage.Body.create({
									text: "tes",
								}),
								footer: proto.Message.InteractiveMessage.Footer.create({
									text: "tes",
								}),
								header: proto.Message.InteractiveMessage.Header.create({
									hasMediaAttachment: false,
								}),
								nativeFlowMessage:
									proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
										{
											buttons: [
												{
													name: "cta_copy",
													buttonParamsJson: `{
																						"display_text": "Dapatkan Music",
																						"id": "tes",
																						"copy_code": "tes"
																				}`,
												},
											],
										},
									),
							}),
						},
					},
				};

				const msg = generateWAMessageFromContent(jid, messageContent, {
					userJid: sock.user.id, // Pastikan ada user JID
					timestamp: new Date(), // Menambahkan timestamp
				});

				await sock.relayMessage(jid, msg.message, {
					messageId: msg.key.id,
				});

				break;
			}

			default:
				console.log("Command tidak dikenal");
		}
	} catch (err) {
		console.log(
			chalk.yellow.bold("[ ERROR ] case.js :\n") +
				chalk.redBright(util.format(err)),
		);
	}
};

// File watcher untuk memuat ulang file case.js jika terjadi perubahan
process.on("uncaughtException", function (error) {
	let errorMessage = String(error);
	if (errorMessage.includes("conflict")) {
		return;
	}
	if (errorMessage.includes("Cannot derive from empty media key")) {
		return;
	}
	if (errorMessage.includes("Socket connection timeout")) {
		return;
	}
	if (errorMessage.includes("not-authorized")) {
		return;
	}
	if (errorMessage.includes("already-exists")) {
		return;
	}
	if (errorMessage.includes("rate-overlimit")) {
		return;
	}
	if (errorMessage.includes("Connection Closed")) {
		return;
	}
	if (errorMessage.includes("Timed Out")) {
		return;
	}
	if (errorMessage.includes("Value not found")) {
		return;
	}
	console.log("Caught exception: ", error);
});

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(chalk.redBright(`Update ${__filename}`));
	delete require.cache[file];
	require(file);
});
