require('./lib/menu');
const { downloadContentFromMessage, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, InteractiveMessage, getContentType } = require('@whiskeysockets/baileys');
const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const { color } = require('./lib/color');
const colors = require('@colors/colors/safe');
const cron = require('node-cron');
const didyoumean = require('didyoumean');
const fetch = require('node-fetch');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const fsx = require('fs-extra');
const gis = require('g-i-s');
const moment = require('moment-timezone');
const ms = require('parse-ms');
const nou = require('node-os-utils');
const os = require('os');
const path = require('path');
const PhoneNumber = require('awesome-phonenumber');
const { performance } = require('perf_hooks');
const { randomBytes } = require('crypto');
const speed = require('performance-now');
const similarity = require('similarity');
const toMS = require('ms');
const util = require('util');
const yts = require('yt-search');
const { exec, execSync, spawn } = require("child_process");

const readmore = String.fromCharCode(8206).repeat(4001);

const { addAfkUser, checkAfkUser, getAfkId, getAfkPosition, getAfkReason, getAfkTime } = require('./lib/afk');
const { addFilter, addSpam, isFiltered, isSpam, ResetSpam } = require('./lib/antispam');
const { addPremiumUser, checkPremiumUser, expiredCheck, getAllPremiumUser, getPremiumExpired, getPremiumPosition } = require('./lib/premium');
const { toAudio, toPTT, toVideo } = require('./lib/converter');
const { smsg, await, clockString, delay, enumGetKey, fetchBuffer, fetchJson, format, formatDate, formatp, generateProfilePicture, getBuffer, getGroupAdmins, getRandom, isUrl, json, logic, msToDate, parseMention, sizeLimit, runtime, sleep, sort, toNumber } = require('./lib/myfunc');
const { CatBox, fileIO, pomfCDN } = require('./lib/uploader');
const { gameSlot, gameCasinoSolo, gameMerampok, daily, transferLimit, transferUang, buy, setUang, setLimit } = require('./lib/game');
const { createUser, createServer, getEggStartupCommand, manageServer, deleteServer, deleteUser } = require('./lib/cpanel');
const { listCase } = require('./lib/listcase.js');


const threshold = 0.72;
const ttdown = require('./lib/scrapers/ttdown');
const fdown = require('./lib/scrapers/fdown');
const halodoc = require('./lib/scrapers/halodoc');
const Instagram = require('./lib/scrapers/instagram');
const lyrics = require('./lib/scrapers/lyrics');
const pinterest = require('./lib/scrapers/pinterest');
const remini = require('./lib/scrapers/remini');
const savePin = require('./lib/scrapers/savepin');
const upscale = require('./lib/scrapers/upscale');

const afk = JSON.parse(fs.readFileSync('./src/afk.json'));
const premium = JSON.parse(fs.readFileSync('./src/data/role/premium.json'));
const owner = JSON.parse(fs.readFileSync('./src/data/role/owner.json'));



const timee = time = moment().tz('Asia/Makassar').format('HH:mm:ss')
const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
const time2 = moment.tz('Asia/Jakarta').format('HH:mm:ss');

let ucapanWaktu = "Selamat Malam 🌌";

if (time2 < "05:00:00") {
	ucapanWaktu = "Selamat Pagi 🌄";
} else if (time2 < "11:00:00") {
	ucapanWaktu = "Selamat Pagi 🌄";
} else if (time2 < "15:00:00") {
	ucapanWaktu = "Selamat Siang 🌅";
} else if (time2 < "18:00:00") {
	ucapanWaktu = "Selamat Sore 🌇";
} else if (time2 < "19:00:00") {
	ucapanWaktu = "Selamat Petang 🌆";
}

module.exports = sock = async (sock, m, msg, chatUpdate, store) => {
	try {
		const { quotedMsg, mentioned, now, fromMe } = m
		const content = JSON.stringify(m.message);
		const type = m.message ? Object.keys(m.message)[0] : null;
		const from = m.key.remoteJid
		var body = (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""
		const budy = (typeof m.text === 'string') ? m.text : '';

		const isGroupp = m.key.remoteJid.endsWith('@g.us');
		if (!isGroupp && m.key.fromMe == false || m.key.fromMe == false && m.quoted && m.quoted.fromMe == true) {
			// Jika `fromMe` bernilai true, jalankan pengecekan prefix dari regex
			var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
		} else {
			// Jika `fromMe` bernilai false atau `m.quoted` adalah null, lanjutkan dengan pengecekan prefix yang diizinkan
			const allowedNumber = "@6287722854496";
			const tagNumberRegex = new RegExp(`^${allowedNumber}`);

			// Jika body dimulai dengan tag @nomor yang valid
			if (tagNumberRegex.test(body)) {
				prefix = allowedNumber; // Hanya izinkan @6287722854496 sebagai prefix
			} else if (body.startsWith("@") && !tagNumberRegex.test(body)) {
				// Jika prefix berupa @nomor tetapi bukan nomor yang diizinkan
				return;
			}
		}
		// Cek apakah teks adalah sebuah perintah
		const isCmd = body.startsWith(prefix);
		const command = body.replace(prefix, '').trim().split(/ +/).shift()
		const args = body.replace(prefix, '').trim().split(/ +/).slice(1);
		const text = q = args.join(" ")
		const botNumber = await sock.decodeJid(sock.user.id);
		const pushname = m.pushName || "No Name"
		const getQuoted = (m.quoted || m);
		const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
		const mime = (quoted.msg || quoted).mimetype || '';
		const qmsg = (quoted.msg || quoted);

		const isMedia = /image|video|sticker|audio/.test(mime);
		const isImage = (type == 'imageMessage');
		const isVideo = (type == 'videoMessage');
		const isAudio = (type == 'audioMessage');
		const isDocument = (type == 'documentMessage');
		const isLocation = (type == 'locationMessage');
		const isContact = (type == 'contactMessage');
		const isSticker = (type == 'stickerMessage');
		const isText = (type == 'textMessage');
		const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage');
		const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
		const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
		const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
		const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
		const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
		const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage');
		const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');

		const isGroup = m.key.remoteJid.endsWith('@g.us');
		const groupMetadata = m.isGroup ? await sock.groupMetadata(m.chat).catch(e => { }) : ''
		const groupName = m.isGroup ? groupMetadata.subject : ''
		const participants = m.isGroup ? await groupMetadata.participants : ''
		const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
		const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
		const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
		const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
		const groupOwner = m.isGroup ? groupMetadata.owner : ''
		const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
		const clientId = sock.user.id.split(':')[0];
		const senderbot = m.key.fromMe ? sock.user.id.split(':')[0] + "@s.whatsapp.net" || sock.user.id : m.key.participant || m.key.remoteJid;
		const senderId = senderbot.split('@')[0];
		const isBot = clientId.includes(senderId);

		const isCreator = [botNumber, global.ownerNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
		const isPremium = isCreator || checkPremiumUser(m.sender, premium);
		expiredCheck(sock, m, premium);

		let usernomor = await PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international');
		let ownnomor = await PhoneNumber('+' + ownerNumber.replace('@s.whatsapp.net', '')).getNumber('international');
		const newReply = reply = m.reply

		const fmen = {
			key: {
				fromMe: false,
				participant: `0@s.whatsapp.net`,
				...(m.chat ? {
					remoteJid: "0@s.whatsapp.net"
				} : {})
			},
			message: {
				conversation: `📝 *Pesan Menfess Baru!* ✨`
			}
		};


		async function loading() {
			const lod = [
				"█▒▒▒▒▒▒▒▒▒▒▒ 10%",
				"████▒▒▒▒▒▒▒▒ 30%",
				"███████▒▒▒▒▒ 50%",
				"██████████▒▒ 80%",
				"████████████ 100%"
			];
			const { key } = await sock.sendMessage(m.chat, {
				text: mess.wait
			}, {
				quoted: m
			});

			for (let i = 0; i < lod.length; i++) {
				await sleep(600);
				await sock.sendMessage(m.chat, {
					text: lod[i],
					edit: key
				});
			}
		};

		async function generateRandomHexName(length) {
			return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
		};

		async function react(jid) {
			await sock.sendMessage(m.chat, { react: { text: jid, key: m.key } });
		};

		async function sendButtonImage(chat, judul, teks, buffer, button, m) {
			const uploadFile = { upload: sock.waUploadToServer };
			const imageMessage = await prepareWAMessageMedia(
				{
					image: buffer,
				},
				uploadFile,
			);
			let msg = generateWAMessageFromContent(chat, {
				viewOnceMessage: {
					message: {
						'messageContextInfo': {
							'deviceListMetadata': {},
							'deviceListMetadataVersion': 2
						},
						interactiveMessage: proto.Message.InteractiveMessage.create({
							contextInfo: {
								mentionedJid: [m.sender],
								forwardingScore: 999999,
								isForwarded: true,
								forwardedNewsletterMessageInfo: {
									newsletterJid: saluran,
									newsletterName: saluranName,
									serverMessageId: -1
								},
								businessMessageForwardInfo: {
									businessOwnerJid: sock.decodeJid(sock.user.id)
								},
							},
							body: proto.Message.InteractiveMessage.Body.create({
								text: teks
							}),
							footer: proto.Message.InteractiveMessage.Footer.create({
								text: botName
							}),
							header: proto.Message.InteractiveMessage.Header.create({
								title: judul,
								subtitle: ownerName,
								imageMessage: imageMessage.imageMessage,
								hasMediaAttachment: true
							}),
							nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
								buttons: button,
							})
						})
					}
				}
			}, {
				quoted: m
			})

			sock.relayMessage(msg.key.remoteJid, msg.message, {
				messageId: msg.key.id
			})
		}
		async function downloadMp4(link) {
			try {
				console.log('🕒 Memulai proses download MP4...');
				sock.sendMessage(m.chat, {
					react: { text: '⏳', key: m.key }
				});

				// Fetch data dari API
				let response = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${link}`);
				let textResponse = await response.text();

				// Validasi apakah respons adalah JSON
				let data;
				try {
					data = JSON.parse(textResponse);
				} catch (err) {
					console.error('❌ Respons bukan JSON:', textResponse);
					m.reply("Terjadi kesalahan pada API. Silakan coba lagi nanti.");
					return;
				}

				console.log('📥 Respons diterima dari API:', data);

				if (data.status) {
					console.log('✅ Data valid, mengirim file video...');
					sock.sendMessage(m.chat, {
						video: { url: data.data.dl },
						caption: ''
					}, { quoted: m });
					console.log('✅ Proses selesai, file video berhasil dikirim.');
				} else {
					console.log('❌ Gagal mengambil video. URL tidak valid.');
					m.reply("Gagal mengambil video. Silakan periksa URL.");
				}
			} catch (err) {
				console.error('❌ Terjadi kesalahan:', err.message);
				m.reply(`Error: ${err.message}`);
			}
		}

		if (!sock.public) {
			if (!isCreator && !m.key.fromMe) return;
		};


		// if (m.message) {
		// 	console.log(chalk.black.bgWhite('[ MESSAGE ]:'), chalk.black.bgGreen(new Date), chalk.black.bgHex('#00EAD3')(budy || m.type) + '\n' + chalk.black(chalk.bgCyanBright('[ FROM ] :'), chalk.bgYellow(m.pushName), chalk.bgHex('#FF449F')(m.sender), chalk.bgBlue('(' + (m.isGroup ? m.pushName : 'Private Chat', m.chat) + ')')));
		// };

		if (isGroup && m.message) {
			console.log(colors.red.bold("Bot WhatsApp") + " || " + colors.green.bold("Group") + " " + colors.brightCyan(timee,) + " " + colors.black.bgYellow(budy || m.type) + " " + colors.green("from") + " " + colors.blue(`${groupName}, ${pushname}`) + " " + colors.red.bold("Id") + " " + colors.cyan(`${m.sender}, ${groupMetadata.id}`));
			sock.readMessages([m.key])
		}

		if (!isGroup && m.message) {
			console.log(colors.red.bold("Bot WhatsApp") + " || " + colors.green.bold("Private") + " " + colors.brightCyan(timee,) + " " + colors.black.bgYellow(budy || m.type) + " " + colors.green("from") + " " + colors.blue(pushname) + " " + colors.red.bold("Id") + " " + colors.cyan(m.sender));
			sock.readMessages([m.key])
		}
		if (m.chat.endsWith('@s.whatsapp.net') && isCmd) {
			try {
				this.menfes = this.menfes || {};
				let room = Object.values(this.menfes).find(room =>
					[room.a, room.b].includes(m.sender) && room.state === 'CHATTING'
				);
				if (room) {
					if (/^.*(next|leave|start)/.test(m.text)) return;
					if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return;
					let find = Object.values(this.menfes).find(menpes =>
						[menpes.a, menpes.b].includes(m.sender)
					);
					let other = find.a === m.sender ? find.b : find.a;
					if (m.mtype === 'conversation' || m.mtype === 'extendedTextMessage') {
						await sock.sendMessage(other, {
							text: m.text,
							mentions: [other]
						}, {
							quoted: fmen
						});
					}
					if (['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'].includes(m.mtype)) {
						let media;
						try {
							media = await m.download();
						} catch (err) {
							console.error('Gagal mengunduh media:', err);
							await sock.sendMessage(m.sender, { text: 'Gagal mengunduh media. Pastikan media masih valid dan coba lagi.' });
							return;
						}
						let options = {
							caption: m.msg?.caption || '',
							mentions: [other]
						};
						if (m.mtype === 'imageMessage') {
							await sock.sendMessage(other, { image: media, ...options });
						}
						else if (m.mtype === 'videoMessage') {
							await sock.sendMessage(other, { video: media, ...options });
						}
						else if (m.mtype === 'audioMessage') {
							await sock.sendMessage(other, { audio: media, mimetype: 'audio/mpeg', ...options });
						}
						else if (m.mtype === 'documentMessage') {
							await sock.sendMessage(other, { document: media, mimetype: m.msg?.mimetype, fileName: m.msg?.fileName, ...options });
						}
						else if (m.mtype === 'stickerMessage') {
							await sock.sendMessage(other, { sticker: media });
						}
						else {
							console.warn('Tipe media tidak dikenali:', m.mtype);
						}
					}
				}
			} catch (err) {
				console.error('Error di fitur Menfess:', err);
				await sock.sendMessage(m.sender, { text: 'Terjadi kesalahan saat mengirim pesan ke pasangan Menfess. Silakan coba lagi nanti.' });
			}
		}

		if (!isCmd) return
		switch (command.toLowerCase()) {

			case 'delete':
			case 'd':
			case 'del': {
				if (!m.quoted) return reply('Kak, kamu perlu mengirim pesan yang mau dihapus ya! 🤔')
				await sock.sendMessage(m.chat, {
					delete: {
						remoteJid: m.chat,
						id: m.quoted.id,
						participant: m.quoted.sender
					}
				})
				break
			}
			case 'menu': {
				await sock.sendMessage(m.chat, { delete: { remoteJid: m.chat, id: m.id, participant: m.sender } })
				sock.sendMessage(m.chat, {text: listCase()})
				break
			}

			//=====Maker
			case 'brat': {
				if (!text) return reply('Isi apa lee?');
				//await downloadMp3(text); // Panggil fungsi 
				console.log(encodeURIComponent(text))
				let i = await getBuffer(`https://api.betabotz.eu.org/api/maker/brat?text=${encodeURIComponent(text)}&apikey=skyanwak`)
				sock.sendMessage(m.chat, { sticker: i }, { quoted: m })
				break
			}
			case 's': case 'sticker': case 'stiker': {
				if (!quoted) return reply(`Mana gambar/video(1-9 detik)/gif lee`);
				if (!mime) return reply(`Mana gambar/video(1-9 detik)/gif lee`);

				if (/image/.test(mime)) {
					let media = await sock.downloadAndSaveMediaMessage(quoted);
					await sock.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
				} else if (/video/.test(mime)) {
					if ((quoted.msg || quoted).seconds > 9) return reply(`Durasi video terlalu panjang! 🕒 Kirim video dengan durasi 1-9 detik ya!`);
					let media = await sock.downloadAndSaveMediaMessage(quoted);
					await sock.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author });
				} else {
					reply(`Mana gambar/video(1-9 detik)/gif lee`);
				}
				break
			}
			case 'swm': {
				if (!quoted) return reply(`Mana gambar/video(1-9 detik)/gif lee`);
				if (!mime) return reply(`Mana gambar/video(1-9 detik)/gif lee`);

				const swn = args.join(" ");
				const pcknm = swn.split("|")[0];
				const atnm = swn.split("|")[1];

				if (m.quoted.isAnimated === true) {
					sock.downloadAndSaveMediaMessage(quoted, "gifee");
					sock.sendMessage(m.chat, {
						sticker: fs.readFileSync("gifee.webp")
					}, m, {
						packname: pcknm,
						author: atnm
					});
				} else if (/image/.test(mime)) {
					let media = await sock.downloadAndSaveMediaMessage(quoted);
					await sock.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm });
				} else if (/video/.test(mime)) {
					if ((quoted.msg || quoted).seconds > 9) return reply('Video terlalu panjang, maksimal 9 detik ya! ⏳');
					let media = await sock.downloadAndSaveMediaMessage(quoted);
					await sock.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm });
				} else {
					reply(`Mana gambar/video(1-9 detik)/gif lee`);
				}
				break
			}
			case 'smeme': {
				if (!/webp/.test(mime) && /image/.test(mime)) {
					if (!text) return reply(`mana teksnya lee.. gini ${prefix + command} teks_atas|teks_bawah`);

					atas = text.split('|')[0] ? text.split('|')[0] : '';
					bawah = text.split('|')[1] ? text.split('|')[1] : '';

					let mee = await sock.downloadAndSaveMediaMessage(quoted);
					let mem = await CatBox(mee);
					let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${mem}`;

					await sock.sendImageAsSticker(m.chat, meme, m, { packname: global.packname, author: global.author });
				} else {
					reply(`mana teksnya lee.. gini ${prefix + command} teks_atas|teks_bawah`);
				}
				break
			}
			case 'hd': {
				sock.enhancer = sock.enhancer ? sock.enhancer : {};
				if (m.sender in sock.enhancer) return m.reply(`Masih ada proses yang belum diselesaikan, mohon tunggu sampai proses selesai.`)
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime) return m.reply(`Kirim/Balas Gambar Dengan Caption ${prefix + command}`)
				if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Media tidak support!`)
				sock.enhancer[m.sender] = true;
				try {
					const availableScales = [2, 4, 6];
					await react('⏱️');
					let media = await quoted.download();
					let scale = availableScales.includes(parseInt(text)) ? parseInt(text) : 2;
					let tag = `@${m.sender.split("@")[0]}`;
					let result = await upscale(media, scale);

					let caption = "🌟 *Effect*: HD\n";
					caption += `📩 *Requested by*: ${tag}\n`;
					caption += `✨ *Source*: imageupscaler.com\n`;
					caption += `🔍 *Skala*: ${scale}\n`;
					caption += `📏 *Available Scales*: ${availableScales.join(", ")}\n\n`;
					caption += "Terima kasih sudah menggunakan fitur ini ya, Kak! 😊";

					await react('✅');
					await sock.sendMessage(m.chat, {
						image: { url: result },
						caption: caption,
						mentions: [m.sender]
					}, {
						quoted: m
					});
				} catch (error) {
					console.error(error);
					m.reply("❌ Ups, terjadi kesalahan saat memproses gambar. Coba lagi nanti ya, Kak!");
				}
				delete sock.enhancer[m.sender];
				break
			}
			case 'remini': {
				sock.enhancer = sock.enhancer ? sock.enhancer : {};
				if (m.sender in sock.enhancer) return m.reply(`Masih ada proses yang belum diselesaikan, mohon tunggu sampai proses selesai.`)
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime) return m.reply(`Kirim/Balas Gambar Dengan Caption ${prefix + command}`)
				if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Media tidak support!`)
				sock.enhancer[m.sender] = true;

				const method = args[0]?.toLowerCase();
				const validMethods = ["enhance", "recolor", "dehaze"];
				const selectedMethod = validMethods.includes(method) ? method : "enhance";
				m.reply(`⏳ Sedang memproses gambar menggunakan metode *${selectedMethod}*, harap tunggu...`);

				try {
					const media = await sock.downloadMediaMessage(m.quoted);
					const enhancedImage = await remini(media, selectedMethod);
					if (!enhancedImage) {
						return m.reply("❌ Gagal memproses gambar. Coba lagi nanti!");
					}
					const filename = `${selectedMethod}_result.jpg`;
					await sock.sendMessage(m.chat, { image: enhancedImage, caption: `✨ Gambar berhasil ditingkatkan menggunakan metode *${selectedMethod}*` }, { quoted: m });
				} catch (error) {
					console.error(error);
					m.reply("❌ Terjadi kesalahan saat memproses permintaan. Coba lagi nanti.");
				}
				delete sock.enhancer[m.sender];
				break
			}

			//====Tools
			case 'bass':
			case 'blown':
			case 'deep':
			case 'earrape':
			case 'fast':
			case 'fat':
			case 'nightcore':
			case 'reverse':
			case 'robot':
			case 'slow':
			case 'smooth':
			case 'squirrel': {
				try {
					let set
					if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
					if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
					if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
					if (/earrape/.test(command)) set = '-af volume=12'
					if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
					if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
					if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
					if (/reverse/.test(command)) set = '-filter_complex "areverse"'
					if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
					if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
					if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
					if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
					if (/audio/.test(mime)) {
						await react('⏱️');
						let media = await sock.downloadAndSaveMediaMessage(quoted)
						let ran = getRandom('.mp3')
						exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
							fs.unlinkSync(media)
							if (err) return reply(err)
							let buff = fs.readFileSync(ran)
							sock.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m })
							fs.unlinkSync(ran)
						})
					} else reply(`Reply to the audio you want to change with a caption *${prefix + command}*`)
				} catch (e) {
					reply(e)
				}
				break
			}
			case 'tomp3': {
				if (!/video/.test(mime) && !/audio/.test(mime)) return reply(`Reply Video/VN yang ingin dijadikan MP3 dengan caption ${prefix + command}`);
				if (!quoted) return reply(`Reply Video/VN yang ingin dijadikan MP3 dengan caption ${prefix + command}`);
				try {
					await react('⏱️');
					let media = await sock.downloadAndSaveMediaMessage(quoted);
					let audioBuffer = await toAudio(media, 'mp4');
					await sock.sendMessage(m.chat, {
						audio: audioBuffer,
						mimetype: 'audio/mpeg'
					}, { quoted: m });
					reply(`✅ Berhasil mengonversi ke MP3! 🎵`);
				} catch (err) {
					console.error('❌ Error:', err);
					reply(`❌ Gagal mengonversi ke MP3. Cek konsol untuk detailnya.`);
				}
				break
			}
			case 'tourl': {
				if (!mime) return reply(`Kirim/Reply Video/Gambar Dengan Caption ${prefix + command}`);
				await react('⏱️');
				try {
					let media = await sock.downloadAndSaveMediaMessage(quoted);
					if (/image|video/.test(mime)) {
						let response = await CatBox(media);
						let fileSize = (fs.statSync(media).size / 1024).toFixed(2);
						let uploadDate = new Date().toLocaleString();
						let uploader = m.pushName;
						let caption = `🔗 *Link Media* : ${response}\n📅 *Tanggal Upload* : ${uploadDate}\n📂 *Ukuran File* : ${fileSize} KB\n👤 *Pengunggah* : ${uploader}`.trim();
						reply(caption);
					} else if (!/image/.test(mime)) {
						let response = await CatBox(media);
						await reply(response);
					} else {
						reply(`Jenis media tidak didukung!`);
					}
					await fs.unlinkSync(media);
				} catch (err) {
					console.log(err);
					reply("Ups, terjadi kesalahan saat mengunggah media. Coba lagi ya! 😅");
				}
				break
			}
			case 'toimg': {
				if (!quoted) return reply('Reply Image')
				if (!/webp/.test(mime)) return reply(`Reply sticker dengan caption *${prefix + command}*`)
				await react('⏱️');
				let media = await sock.downloadAndSaveMediaMessage(quoted)
				let ran = await getRandom('.png')
				exec(`ffmpeg -i ${media} ${ran}`, (err) => {
					fs.unlinkSync(media)
					if (err) throw err
					let buffer = fs.readFileSync(ran)
					sock.sendMessage(m.chat, { image: buffer }, { quoted: m })
					fs.unlinkSync(ran)
				})
				break
			}

			//====Owner
			case 'upsaluran': {
				if (!isCreator) return reply(mess.owner)
				try {
					if (!mime && !text) {
						return reply(`Uh-oh, kak! Kakak belum kirim media atau teks apa pun. Coba lagi ya! 🤭`)
					}
					media = mime ? await quoted.download() : null
					let defaultCaption = "✨ Media ini dikirim melalui sistem otomatis Mora! ✨"
					if (/image/.test(mime)) {
						sock.sendMessage(saluran, {
							image: media,
							caption: text ? text : defaultCaption,
							contextInfo: {
								mentionedJid: [m.sender],
								forwardingScore: 999999,
								isForwarded: true,
								forwardedNewsletterMessageInfo: {
									newsletterName: saluranName,
									newsletterJid: saluran,
								},
								externalAdReply: {
									showAdAttribution: true,
									title: botName,
									body: ownerName,
									thumbnail: imageBuffer,
									sourceUrl: website,
									mediaType: 1,
									renderLargerThumbnail: true
								}
							}
						})
						reply(`📸 Gambar berhasil diunggah ke saluran dengan caption: "${text ? text : defaultCaption}"`)
					} else if (/video/.test(mime)) {
						sock.sendMessage(saluran, {
							video: media,
							caption: text ? text : defaultCaption,
							contextInfo: {
								mentionedJid: [m.sender],
								forwardingScore: 999999,
								isForwarded: true,
								forwardedNewsletterMessageInfo: {
									newsletterName: saluranName,
									newsletterJid: saluran,
								},
								externalAdReply: {
									showAdAttribution: true,
									title: botName,
									body: ownerName,
									thumbnail: imageBuffer,
									sourceUrl: website,
									mediaType: 1,
									renderLargerThumbnail: true
								}
							}
						})
						reply(`🎥 Video berhasil diunggah ke saluran dengan caption: "${text ? text : defaultCaption}"`)
					} else if (/audio/.test(mime)) {
						sock.sendMessage(saluran, {
							audio: media,
							mimetype: mime,
							ptt: true,
							contextInfo: {
								mentionedJid: [m.sender],
								forwardingScore: 999999,
								isForwarded: true,
								forwardedNewsletterMessageInfo: {
									newsletterName: saluranName,
									newsletterJid: saluran,
								},
								externalAdReply: {
									showAdAttribution: true,
									title: botName,
									body: ownerName,
									thumbnail: imageBuffer,
									sourceUrl: website,
									mediaType: 1,
									renderLargerThumbnail: true
								}
							}
						})
						reply(`🎵 Audio berhasil diunggah ke saluran, kak!`)
					} else if (/text/.test(mime) || text) {
						sock.sendMessage(saluran, {
							text: text ? text : defaultCaption,
							contextInfo: {
								mentionedJid: [m.sender],
								forwardingScore: 999999,
								isForwarded: true,
								forwardedNewsletterMessageInfo: {
									newsletterName: saluranName,
									newsletterJid: saluran,
								},
								externalAdReply: {
									showAdAttribution: true,
									title: botName,
									body: ownerName,
									thumbnail: imageBuffer,
									sourceUrl: website,
									mediaType: 1,
									renderLargerThumbnail: true
								}
							}
						})
						reply(`💬 Pesan teks berhasil dikirim ke saluran: "${text ? text : defaultCaption}"`)
					} else {
						reply(`Hmm... Mora gak tau ini jenis media apa. Coba dicek lagi ya, kak! 🧐`)
					}
				} catch (error) {
					console.error(error)
					reply(`Aduh, kak! 😣 Ada masalah waktu unggah ke saluran. Coba lagi nanti ya!`)
				}
				break
			}
			case 'clearsesi': {
				if (!isCreator) return m.reply(mess.owner);
				fs.readdir("./session", async function (err, files) {
					if (err) {
						console.log('Gak bisa scan direktori: ' + err);
						return m.reply('Gak bisa scan direktori nih: ' + err);
					}
					let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
						item.startsWith("m.sender-key") || item.startsWith("session-") || item.startsWith("app-state")
					);
					console.log(filteredArray.length);
					let teks = `Ditemukan ${filteredArray.length} file sampah nih\n\n`;
					if (filteredArray.length == 0) return m.reply(teks);
					filteredArray.map(function (e, i) {
						teks += (i + 1) + `. ${e}\n`;
					});
					m.reply(teks);
					await sleep(1000);
					m.reply("Mau hapus file sampahnya... Tunggu yaa...");
					await filteredArray.forEach(function (file) {
						fs.unlinkSync(`./${sessionName}/${file}`);
					});
					await sleep(1000);
					m.reply("Berhasil hapus semua file sampah di folder session! 🎉");
				});
				break
			}
			case 'ipbot': {
				if (!isCreator) return reply(mess.owner);
				var http = require('http');
				http.get({
					'host': 'api.ipify.org',
					'port': 80,
					'path': '/'
				}, function (resp) {
					resp.on('data', function (ip) {
						reply("🔎 Oii, alamat IP publik aku nih: " + ip);
					})
				});
				break;
			}
			case 'restart': {
				if (!isCreator) return m.reply(mess.owner); // Cek apakah yang mengirim adalah creator
				m.reply("Bot sedang di-restart... ⏳");
				// Log untuk menandakan restart
				console.log("Bot restarting...");
				// Keluar dari proses bot, yang akan menyebabkan sistem (seperti PM2 atau lainnya) untuk restart otomatis
				process.exit();
				break
			}
			case 'kill': {
				if (!isCreator) return m.reply(mess.owner); // Cek apakah yang mengirim adalah creator
				m.reply("Bot sedang dimatikan secara paksa... ⚠️");
				// Log untuk menandakan kill
				console.log("Bot killed by owner!");
				// Keluar dari proses bot secara paksa
				process.exit(1); // Kode 1 menandakan proses dihentikan secara paksa
				break
			}
			case 'shutdown': {
				if (!isCreator) return m.reply(mess.owner); // Cek apakah yang mengirim adalah creator
				m.reply("Bot sedang dimatikan dan aplikasi akan shutdown... 💀");
				// Log untuk menandakan shutdown
				console.log("Bot shutting down...");
				// Menutup bot dan mematikan server atau aplikasi
				process.exit(0); // Kode 0 menandakan proses keluar dengan normal
				break
			}
			case 'self': {
				if (!isCreator) return reply(mess.owner);
				sock.public = false;
				reply(`Bot sekarang dalam mode *Self Usage* aja, gak bisa dipakai oleh orang lain ya!`);
				break;
			}
			case 'public': {
				if (!isCreator) return reply(mess.owner);
				sock.public = true;
				reply(`Bot sekarang kembali ke mode *Public Usage*, jadi bisa dipakai semua orang!`);
				break;
			}
			case 'block': {
				if (!isCreator) return reply(mess.owner);
				let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.m.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				await sock.updateBlockStatus(users, 'block')
				await m.reply(mess.done);
				break
			}
			case 'unblock': {
				if (!isCreator) return reply(mess.owner);
				let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.m.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
				await sock.updateBlockStatus(users, 'unblock')
				await m.reply(mess.done);
				break
			}
			case 'backup': {
				if (!isCreator) return reply(mess.owner);
				let sender = m.mentionedJid[0] || m.sender || slimecode.parseMention(args[0]) || (args[0].replace(/[@.+-]/g, '').replace(' ', '') + '@s.whatsapp.net') || '';
				let date = new Date();
				let filename = await generateRandomHexName(32);
				const { execSync } = require('child_process');
				const ls = (await execSync('ls')).toString().split('\n').filter((cek) => cek !== 'node_modules' && cek !== 'package-lock.json' && cek !== 'yarn.lock' && cek !== '');
				await reply('Hasil backup akan dikirim lewat chat pribadi ya!');
				await execSync(`zip -r ${filename}.zip ${ls.join(' ')}`);
				const sentMessage = await sock.sendMessage(sender, {
					document: await fs.readFileSync(`./${filename}.zip`),
					mimetype: 'application/zip',
					fileName: `${filename}.zip`,
					caption: 'Berhasil! Silakan download dan simpan file backup-nya ya.'
				});
				await execSync(`rm -rf ${filename}.zip`);
				console.log(`${filename}.zip telah dihapus dari file lokal.`);
				break
			}
			case 'getcase': {
				if (!isCreator) return reply(mess.owner);
				if (!text) return reply('Harap masukkan nama case yang ingin dicari! 🧐');
				try {
					const getCase = (cases) => {
						const fileContent = fs.readFileSync("./case.js", "utf-8");
						const caseBlock = fileContent.split(`case '${cases}'`)[1];
						if (!caseBlock) throw new Error('Case not found');
						return `case '${cases}'` + caseBlock.split("break")[0] + "break";
					}
					reply(`${getCase(text)}`);
				} catch (err) {
					reply(`Case '${text}' tidak ditemukan! 🚫`);
				}
				break
			}
			case 'get': {
				if (!text.startsWith('http')) return reply(`No Query?\n\n*Contoh* : ${prefix + command} https://www.google.com`);
				try {
					const res = await axios.get(isUrl(text) ? isUrl(text)[0] : text);
					const contentType = res.headers['content-type'] || '';
					if (!isCreator && !contentType.includes('text/html')) {
						return reply('Konten bukan HTML, dan Anda bukan owner.');
					};
					if (isCreator || contentType.includes('text/html')) {
						return reply(util.format(res.data));
					} else {
						return reply('Konten bukan HTML, dan Anda bukan owner.');
					}
				} catch (e) {
					return reply(util.format(e));
				}
				break;
			}

			//====Public
			case 'ping': {
				try {
					const used = process.memoryUsage();
					const cpus = os.cpus().map(cpu => {
						cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
						return cpu;
					});
					const cpu = cpus.reduce((last, cpu, _, { length }) => {
						last.total += cpu.total;
						last.speed += cpu.speed / length;
						last.times.user += cpu.times.user;
						last.times.nice += cpu.times.nice;
						last.times.sys += cpu.times.sys;
						last.times.idle += cpu.times.idle;
						last.times.irq += cpu.times.irq;
						return last;
					}, {
						speed: 0,
						total: 0,
						times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }
					});
					let start = performance.now();
					let end = performance.now();
					let latensi = end - start;
					let osInfo = await nou.os.oos();
					let storage = await nou.drive.info();
					let respon = `✨ *Informasi Bot WhatsApp* ✨\n\n📡 *Jaringan Server*\n · *Ping:* ${latensi.toFixed(4)} Detik\n\n🖥️ *Informasi Server*\n · *OS:* ${osInfo}\n · *IP Address:* ${nou.os.ip()}\n · *Tipe OS:* ${nou.os.type()}\n\n💾 *RAM:*\n · *Total:* ${formatp(os.totalmem())}\n · *Digunakan:* ${formatp(os.totalmem() - os.freemem())}\n\n📂 *Penyimpanan:*\n · *Total:* ${storage.totalGb} GB\n · *Digunakan:* ${storage.usedGb} GB (${storage.usedPercentage}%)\n · *Tersedia:* ${storage.freeGb} GB (${storage.freePercentage}%)\n\n⏳ *Waktu Aktif Server:*\n${runtime(process.uptime())}\n\n⚙️ *CPU (${cpus.length} Core)*\n · *Model:* ${cpus[0].model.trim()}\n · *Kecepatan:* ${cpu.speed} MHz\n${Object.keys(cpu.times).map(type => ` · *${type}*: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}\n\nTetap semangat ya kak! Mora selalu siap membantu 🥰`;
					await sock.sendMessage(m.chat, {
						text: respon,
						contextInfo: {
							mentionedJid: [m.sender],
						}
					}, { quoted: m });
				} catch (err) {
					console.error(err);
				}
				break
			}
			case 'speedtest': {
				if (!isCreator) return reply(mess.owner);
				let cp = require('child_process');
				let { promisify } = require('util');
				let exec = promisify(cp.exec).bind(cp);
				let o
				try {
					o = await exec('python3 speed.py');
				} catch (e) {
					o = e
				} finally {
					let { stdout, stderr } = o
					if (stdout.trim()) reply(stdout);
					if (stderr.trim()) reply(stderr);
				}
				break
			}

			//====Search
			case 'hdoc': {
				if (!text) return m.reply('Ketikkan perintah dengan format:\n*!cari [penyakit]*\n\nContoh: *!cari diabetes*');
				const query = text.trim();
				const data = await halodoc(query);
				try {
					m.reply('🔍 Sedang mencari informasi, mohon tunggu...');
					const articles = await data.getArtikelSearch();
					const obatList = await data.getObatSearch();
					if (articles.length === 0 && obatList.length === 0) {
						return m.reply('❌ Tidak ditemukan informasi terkait penyakit yang dicari.');
					}
					let artikelResult = '*📚 Artikel Tentang Penyakit:*\n';
					for (let i = 0; i < Math.min(articles.length, 5); i++) { // Maks 5 hasil
						const { title, description, link } = articles[i];
						artikelResult += `\n*${i + 1}. ${title}*\n${description}\n`;
					}
					let obatResult = '\n*💊 Obat yang Direkomendasikan:*\n';
					for (let i = 0; i < Math.min(obatList.length, 5); i++) { // Maks 5 hasil
						const { title, subtitle, price, link } = obatList[i];
						obatResult += `\n*${i + 1}. ${title}*\n${subtitle}\n💰 Harga: ${price}\n`;
					}
					await m.reply(artikelResult + obatResult);
				} catch (error) {
					console.error(error);
					m.reply('❌ Terjadi kesalahan saat mencari informasi. Coba lagi nanti.');
				}
				break
			}
			case 'pinterest': case 'pin': {
				if (!text) return reply(`Nyari apa lee`);
				await react('⏱️');
				async function createImage(url) {
					const { imageMessage } = await generateWAMessageContent({
						image: {
							url
						}
					}, {
						upload: sock.waUploadToServer
					});
					return imageMessage;
				}

				function shuffleArray(array) {
					for (let i = array.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[array[i], array[j]] = [array[j], array[i]];
					}
				}

				let push = [];
				let anutrest = await pinterest(text);

				shuffleArray(anutrest);
				let selectedImages = anutrest.slice(0, 10);
				let i = 1;
				for (let message of selectedImages) {
					push.push({
						body: proto.Message.InteractiveMessage.Body.fromObject({
							text: `👤 *Diunggah oleh* : ${message.upload_by}\n` +
								`📛 *Nama Lengkap* : ${message.fullname}\n` +
								`👥 *Pengikut* : ${message.followers}\n` +
								`📝 *Caption* : ${message.caption}`
						}),
						footer: proto.Message.InteractiveMessage.Footer.fromObject({
							text: botName
						}),
						header: proto.Message.InteractiveMessage.Header.fromObject({
							title: `*Gambar* - ${i++}`,
							hasMediaAttachment: true,
							imageMessage: await createImage(message.image)
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
							buttons: [
								{
									"name": "cta_url",
									"buttonParamsJson": `{
										"display_text": "View Source 👀",
										"url": "${message.source}", 
										"merchant_url": "${message.source}"
									}`
								}
							]
						})
					});
				}
				const msg = generateWAMessageFromContent(m.chat, {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadata: {},
								deviceListMetadataVersion: 2
							},
							interactiveMessage: proto.Message.InteractiveMessage.fromObject({
								body: proto.Message.InteractiveMessage.Body.create({
									text: mess.done
								}),
								footer: proto.Message.InteractiveMessage.Footer.create({
									text: botName
								}),
								header: proto.Message.InteractiveMessage.Header.create({
									hasMediaAttachment: false
								}),
								carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
									cards: [
										...push
									],
								})
							})
						}
					}
				}, {
					quoted: m
				});
				await sock.relayMessage(m.chat, msg.message, {
					messageId: msg.key.id
				});
				break
			}
			case 'tesplay': {
				if (!text) return reply(`Nyari apa lee`);
				await react('⏱️');
				async function createImage(url) {
					const { imageMessage } = await generateWAMessageContent({
						image: {
							url
						}
					}, {
						upload: sock.waUploadToServer
					});
					return imageMessage;
				}
				let search = await yts(q);
				let push = [];

				let selectedImages = search.all.slice(0, 10);
				let i = 1;
				for (let message of selectedImages) {
					push.push({
						body: proto.Message.InteractiveMessage.Body.fromObject({
							text: `💬 *Judul*: ${message.title}\n` +
								`🆔 *ID*: ${message.videoId}\n` +
								`📺 *Views*: ${message.views}\n` +
								`⏰ *Duration*: ${message.duration.timestamp}\n` +
								`▶️ *Channel*: ${message.author.name}\n` +
								`📆 *Upload*: ${message.ago}\n` +
								`🔗 *URL Video*: ${message.url}\n` +
								`_*Pilih jenis download yang kamu butuhin...*_`
						}),
						footer: proto.Message.InteractiveMessage.Footer.fromObject({
							text: botName
						}),
						header: proto.Message.InteractiveMessage.Header.fromObject({
							title: `*Gambar* - ${i++}`,
							hasMediaAttachment: true,
							imageMessage: await createImage(message.image)
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
							buttons: [
								{
									"name": "cta_copy",
									"buttonParamsJson": `{
									"display_text": "Dapatkan Music",
									"id": "ytmp3 ${message.url}",
									"copy_code": "ytmp3 ${message.url}"
									}`
								}, {

									"name": "cta_copy",
									"buttonParamsJson": `{
									"display_text": "Dapatkan Video",
									"id": "ytmp4 ${message.url}",
									"copy_code": "ytmp4 ${message.url}"
									}`
								}
							]
						})
					});
				}
				const msg = generateWAMessageFromContent(m.chat, {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadata: {},
								deviceListMetadataVersion: 2
							},
							interactiveMessage: proto.Message.InteractiveMessage.fromObject({
								body: proto.Message.InteractiveMessage.Body.create({
									text: mess.done
								}),
								footer: proto.Message.InteractiveMessage.Footer.create({
									text: botName
								}),
								header: proto.Message.InteractiveMessage.Header.create({
									hasMediaAttachment: false
								}),
								carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
									cards: [
										...push
									],
								})
							})
						}
					}
				}, {
					quoted: m
				});
				await sock.relayMessage(m.chat, msg.message, {
					messageId: msg.key.id
				});
				break
			}
			case 'play': {
				//if (!q) return reply('Example : ${command} lagunya apa');
				if (!q) return console.log('nyari lagu apa leee');
				sock.sendMessage(m.chat, { react: { text: '⏱️', key: m.key } });
				let search = await yts(q);
				const { videoId, image, title, views, duration, author, ago, url, description } = search.all[0];

				let buttons = [
					{ buttonId: `ytmp3 ${url}`, buttonText: { displayText: "🎵 Music🔥" }, type: 1 },
					{ buttonId: `lirik ${title}`, buttonText: { displayText: "📝 Lyric" }, type: 1 },
				];

				// Susun hasil pencarian menjadi menu
				const searchMenuMusic = search.all.map((i, index) => ({
					header: 'MUSIC RESULT',
					title: `Music, ${i.title}`,
					description: `Views: ${i.views}, Duration: ${i.timestamp}, Uploaded: ${i.ago}`,
					id: `ytmp3 ${i.url}`
				}));

				const searchMenuVideo = search.all.map((i, index) => ({
					header: 'VIDEO RESULT',
					title: `Video, ${i.title}`,
					description: `Views: ${i.views}, Duration: ${i.timestamp}, Uploaded: ${i.ago}`,
					id: `ytmp4 ${i.url}`
				}));

				// Bagi hasil pencarian ke dalam beberapa bagian
				const limitPerSection = 1; // Batas item per bagian
				const sections = [];

				for (let i = 0; i <= 5; i += limitPerSection) {
					if (i === 0) {
						sections.push({
							title: "Top Results",
							highlight_label: "Popular Results",
							rows: [
								...searchMenuMusic.slice(0, limitPerSection), // Bagian pertama hasil pencarian
								...searchMenuVideo.slice(0, limitPerSection) // Bagian pertama hasil pencarian
							]
						});
					}
					if (i >= 1) {
						sections.push({
							title: `Results ${Math.floor(i / limitPerSection) + 0}`,
							rows: [
								...searchMenuMusic.slice(i, i + limitPerSection),
								...searchMenuVideo.slice(i, i + limitPerSection)
							]
						});
					}
				}

				const menuTemplate = {
					title: "Select Menu!",
					sections: sections
				};
				let caption = `💬 *Judul*: ${title}\n\n`;
				caption += `🆔 *ID*: ${videoId}\n`;
				caption += `📺 *Views*: ${views}\n`;
				caption += `⏰ *Duration*: ${duration.timestamp}\n`;
				caption += `▶️ *Channel*: ${author.name}\n`;
				caption += `📆 *Upload*: ${ago}\n`;
				caption += `🔗 *URL Video*: ${url}\n`;
				caption += `📝 *Description*: ${description}\n\n`;
				caption += `_*Pilih jenis download yang kamu butuhin...*_`;
				// Susun pesan tombol
				let buttonMessage = {
					image: { url: image, gifPlayback: false },
					caption: caption,
					contextInfo: {
						mentionedJid: [m.sender],
						forwardingScore: 999,
						isForwarded: true,
						externalAdReply: {
							title: title,
							body: description,
							thumbnail: { url: image },
							mediaType: 1,
							renderLargerThumbnail: false,
							previewType: 1,

							mediaUrl: url,
							sourceUrl: url
						}
					},
					footer: botName,
					buttons: buttons,
					viewOnce: true,
					headerType: 4
				};

				// Tambahkan flowActions ke buttonMessage
				const flowActions = [{
					buttonId: 'action',
					buttonText: { displayText: 'This Button List' },
					type: 4,
					nativeFlowInfo: {
						name: 'single_select',
						paramsJson: JSON.stringify(menuTemplate)
					},
					viewOnce: true
				}];

				buttonMessage.buttons.push(...flowActions);

				// Kirim pesan
				await sock.sendMessage(m.chat, buttonMessage, { quoted: m });
				await sock.sendMessage(m.chat, { react: { text: '☑️', key: m.key } });
				break
			}

			//====Download
			case 'fb': {
				if (!text) return m.reply(`linknya mana leee`);
				try {
					m.reply("⏳ Sedang memproses video, harap tunggu...");
					const videoDetails = await fdown.download(text);
					if (!videoDetails.length) {
						return m.reply("❌ Video tidak ditemukan atau link tidak valid!");
					}
					const videoInfo = videoDetails[0];
					const message = `🎬 *Video Details:*\n\n📌 *Judul:* ${videoInfo.title || "Tidak diketahui"}\n📝 *Deskripsi:* ${videoInfo.description || "Tidak tersedia"}\n⏱ *Durasi:* ${videoInfo.duration || "Tidak diketahui"}`;
					await sock.sendMessage(
						m.chat,
						{ image: { url: videoInfo.thumbnail || '' }, caption: message },
						{ quoted: m }
					);
					if (videoInfo.hdQualityLink) {
						await sock.sendMessage(
							m.chat,
							{ video: { url: videoInfo.hdQualityLink }, caption: "🎥 Video kualitas HD" },
							{ quoted: m }
						);
					} else if (videoInfo.normalQualityLink) {
						await sock.sendMessage(
							m.chat,
							{ video: { url: videoInfo.normalQualityLink }, caption: "🎥 Video kualitas SD" },
							{ quoted: m }
						);
					} else {
						m.reply("❌ Gagal mengunduh video!");
					}
				} catch (error) {
					console.error(error);
					m.reply("❌ Terjadi kesalahan saat memproses permintaan Anda. Pastikan link yang diberikan valid.");
				}
				break
			}
			case 'ig': {
				if (!text) return reply(`linknya mana leee`);
				if (!/instagram.com/.test(text)) return reply("> Tolong masukkan link Instagram yang valid ya Kak! 🙏");
				try {
					let data = await Instagram(text);
					console.log(data)
					if (!data) return reply("❌ Gagal mendapatkan data dari link tersebut. Cek kembali link-nya ya, Kak!");
					if (data && data.url.length > 0) {

						let caption = "「 *INSTAGRAM DL* 」\n\n";
						caption += `👤 *Username:* ${data.metadata.username || 'Tidak tersedia'}\n`;
						caption += `📝 *Caption:* ${data.metadata.caption || 'Tidak ada'}\n`;
						caption += `❤️ *Likes:* ${data.metadata.like || 0}\n`;
						caption += `💬 *Komentar:* ${data.metadata.comment || 0}\n`;
						caption += `🔗 *Sumber:* ${text}`;

						for (let i = 0; i < data.url.length; i++) {
							if (!data.metadata.isVideo) {
								await sock.sendMessage(m.chat, {
									image: { url: data.url[i] },
								}, {
									quoted: m
								});
							} else {
								await sock.sendMessage(m.chat, {
									video: { url: data.url[i] },
								}, {
									quoted: m
								});
							}
						}
					} else {
						reply('Data Ig tidak ditemukan atau tidak valid!');
					}
				} catch (error) {
					console.error(error);
					await reply("❌ Terjadi kesalahan saat memproses permintaan. Coba lagi nanti ya, Kak! 🙏");
				}
				break
			}
			case 'savepin': {
				if (!text) return reply(`linknya mana lee`)
				if (!text.includes('pin')) return reply(`Link Invalid!!`)
				try {
					await react('⏱️');
					const res = await savePin(text);
					const { title, results } = res
					let media = results[0]
					let caption = `✨ *Judul:* ${title}\n📥 *Type:* ${media.type}\n📁 *Format:* ${media.format}`
					if (media.format === 'MP4') {
						await sock.sendMessage(m.chat, { caption, video: { url: media.downloadLink } }, { quoted: m })
					} else if (media.format === 'JPG') {
						await sock.sendMessage(m.chat, { caption, image: { url: media.downloadLink } }, { quoted: m })
					} else {
						return reply('Format media tidak didukung.')
					}
				} catch (err) {
					console.error(err)
					reply('Terjadi kesalahan saat memproses permintaan.')
				}
				break
			}
			case 'tt': {
				if (!text) return reply(`linknya mana lee`);
				const tiktokRegex = /(?:https?:\/\/)?(?:www\.)?(tiktok\.com|vm\.tiktok\.com)/;
				if (!tiktokRegex.test(text)) return reply('Url Tidak Mengandung Result Dari TikTok!');
				try {
					console.log(text)
					const hasil = await ttdown(text);
					console.log('Hasil dari ttdown:', JSON.stringify(hasil, null, 2));
					if (hasil && hasil.data && hasil.data.length > 0) {
						if (hasil.size_nowm_hd) {
							await sock.sendMessage(m.chat, {
								video: { url: hasil.data[1].url },
							}, {
								quoted: m
							});
						} else {
							for (let i = 0; i < hasil.data.length; i++) {
								await sock.sendMessage(m.chat, { image: { url: hasil.data[i].url }, }, { quoted: m });
							}
							sock.sendMessage(m.chat, { audio: { url: hasil.music_info.url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
						}
					} else {
						reply('Data TikTok tidak ditemukan atau tidak valid!');
					}
				} catch (e) {
					console.error('Error saat memproses URL TikTok:', e);
					reply('Gagal memproses URL! Detail error: ' + e.message);
				}
				break
			}
			case 'ytmp3': {
				if (!text) return reply('linknya mana lee');
				if (!isUrl(text)) return reply('Link yang Anda kirim tidak valid!');
				//await downloadMp3(text); // Panggil fungsi 
				let i = await fetchJson(`https://api.betabotz.eu.org/api/download/yt?url=${text}&apikey=skyanwak`)
				console.log(i)
				sock.sendMessage(m.chat, { audio: { url: i.result.mp3 }, mimetype: 'audio/mpeg', fileName: `${i.result.title}.mp3`, ptt: true }, { quoted: m });
				break
			}
			case 'lirik': {
				if (!text) return reply('Lirik dari lagu mana?');
				//await downloadMp3(text); // Panggil fungsi 
				let i = await fetchJson(`https://api.betabotz.eu.org/api/search/lirik?lirik=${text}&apikey=skyanwak`)
				console.log(i)
				reply(i.result.lyrics)
				break
			}
			case 'ytmp4': {
				if (!text) return reply('linknya mana lee');
				if (!isUrl(text)) return reply('Link yang Anda kirim tidak valid!');
				await downloadMp4(text); // Panggil fungsi downloadMp4
				break
			}

			//====Ai
			case 'mora': {
				if (!text) return m.reply(`Hello, how can I help you?`)
				if (!m.isGroup) {
					try {
						const message = 'Ubah gaya bicaramu agar lebih karakteristik dan terbuka, namamu adalah Mora AI, biasa dipanggil Mora, kamu adalah seorang gadis gaul dan belajar berbahasa gaul, ekspresikan dirimu dengan emoji, bicara sesuai dengan bahasa atau gaya dari perintahmu dan gunakan kata seperti bahasa gaul seperti lu, gua, pin, ente dan sebagainya saat berbicara, dan kamu harus menjawab semuanya';
						const data = await fetchJson(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(message)}&content=${encodeURIComponent(text)}`);
						let responseText = data.data
						responseText = responseText.replace('**', '*')
						sock.sendMessage(m.chat, {
							text: responseText,
							ai: true
						}, {
							quoted: m
						})
					} catch (err) {
						console.log('Terjadi kesalahan pada API server!', err);
						reply('Tidak dapat menerima respon dari API server, jika Anda owner silahkan periksa endpoint pada API apakah sudah benar?');
					}
				} else {
					try {
						const message = 'Ubah gaya bicaramu agar lebih karakteristik dan terbuka, namamu adalah Mora AI, biasa dipanggil Mora, kamu adalah seorang gadis imut berumur 16 tahun yang sangat suka belajar dan mempelajari hal baru tentang dunia maupun tentang Khalid, ekspresikan dirimu dengan emoji, bicara kurang lebih tidak formal dan gunakan kata seperti aku dan kakak saat berbicara, jika diajak untuk menikah maka kamu harus menjawab ya dan tidak menolak agar tidak menyakiti hati lawan bicara';
						const data = await fetchJson(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(message)}&content=${encodeURIComponent(text)}`);
						let responseText = data.data
						responseText = responseText.replace('**', '*')
						sock.sendMessage(m.chat, {
							text: responseText,
							text: data.data,
							ai: false
						}, {
							quoted: m
						})
					} catch (err) {
						console.log('Terjadi kesalahan pada API server!', err);
						reply('Tidak dapat menerima respon dari API server, jika Anda owner silahkan periksa endpoint pada API apakah sudah benar?');
					}
				}
				break
			}

			//====Chatan
			case 'menfes': {
				this.menfes = this.menfes || {};
				let session = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
				if (session) return newReply(`Uhh... Kakak masih ada di sesi ${command} yang sebelumnya nih, selesaikan dulu ya sebelum mulai yang baru! 🤭`);
				if (m.isGroup) return newReply(`Maaf ya Kak, fitur ini cuma bisa dipakai di chat pribadi aja! 😅`);
				if (!text || !text.includes('|')) {
					return newReply(`Kakak bisa pakai format ini ya: ${prefix + command} nama|nomor|pesan\n\nContoh:\n${prefix + command} ${pushname}|${m.sender.split('@')[0]}|Halo, apa kabar? 👋`);
				}
				let [namaNya, nomorNya, pesanNya] = text.split('|');
				if (!nomorNya || !pesanNya) {
					return newReply(`Uh-oh, formatnya salah! Pastikan pakai format nama|nomor|pesan ya, Kak! 😄`);
				}
				if (nomorNya.startsWith('0') || isNaN(nomorNya)) {
					return newReply(`Nomornya gak valid, Kak! Gunakan format internasional tanpa awalan '0' ya! 🙏`);
				}
				await react('⏱️');
				let pesanTemplate = `\nHai Kak, ada menfess nih 😊✨\n\n👤 *Dari:* ${namaNya}\n✉️ *Pesan:* ${pesanNya}\n\n_Pesan ini cuma disampaikan oleh bot ya, Kak! 🤖_`;
				const imageBuffer = await getBuffer('https://files.catbox.moe/qxw4j8.jpg');
				let id = m.sender;
				this.menfes[id] = {
					id,
					a: m.sender,
					b: nomorNya + '@s.whatsapp.net',
					state: 'WAITING'
				};
				const buttons = [
					{
						"name": "single_select",
						"buttonParamsJson": `{
							"title": "Click Here ⎙",
							"sections": [
								{
									"title": "💌 Menerima atau Menolak Menfess",
									"rows": [
										{
											"header": "🤗 Terima Menfess",
											"title": "🌟 Ya, Terima Menfess",
											"description": "Klik ini kalau mau menerima dan memproses menfess ini dengan baik! 🥰",
											"id": "${prefix}balasmenfes"
										},
										{
											"header": "😔 Tolak Menfess",
											"title": "❌ Tidak, Tolak Menfess",
											"description": "Klik ini kalau menfess ini nggak mau diterima. 😢",
											"id": "${prefix}tolakmenfes"
										}
									]
								}
							]
						}`
					}
				];
				await sendButtonImage(`${nomorNya}@s.whatsapp.net`, '', pesanTemplate, imageBuffer, buttons, m)
				newReply(`Yay! Pesan menfess berhasil dikirim ke ${nomorNya}. Sekarang tinggal tunggu responsnya ya, Kak. Kalau gak ada balasan dalam 24 jam, jangan ditunggu lagi ya! 🤭`);
				break;
			}

			case 'balasmenfes': {
				let session = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
				if (!session) return newReply('Hmmm, sepertinya Kakak belum ada sesi menfess yang aktif deh. 😅');
				let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING');
				if (!room) return newReply('Gak ada sesi menfess yang menunggu balasan dari Kakak nih. 😢');
				let otherUser = [room.a, room.b].find(user => user !== m.sender);
				room.state = 'CHATTING';
				this.menfes[room.id] = { ...room };
				await sock.sendMessage(otherUser, {
					text: `_@${m.sender.split('@')[0]} sudah menerima menfess kamu, sekarang kalian bisa ngobrol lewat bot ini ya!_\n\n*Note:* Kalau mau berhenti, ketik aja .stopmenfess. 😉`,
					mentions: [m.sender]
				});
				sock.sendMessage(m.chat, {
					text: `😊🎉 _Menfess sudah diterima, sekarang Kakak bisa ngobrol lewat bot ini ya!_\n\n*Note:* Kalau mau berhenti, tinggal ketik .stopmenfess. 🤗`
				});
				break;
			}
			case 'tolakmenfes': {
				let session = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
				if (!session) return newReply('Hmm, gak ada sesi menfess yang Kakak ikuti saat ini. 😕');
				let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'WAITING');
				if (!room) return newReply('Gak ada sesi menfess yang bisa ditolak saat ini, Kak! 😅');
				let otherUser = [room.a, room.b].find(user => user !== m.sender);
				await sock.sendMessage(otherUser, {
					text: `_Oops... @${m.sender.split('@')[0]} menolak menfess kamu nih. Gak apa-apa ya, semangat! 🤗_`,
					mentions: [m.sender]
				});
				newReply('Menfess berhasil ditolak. Kalau ada yang lain, jangan sungkan buat coba lagi ya, Kak! ✋');
				delete this.menfes[room.id];
				break;
			}
			case 'stopmenfes': {
				let session = Object.values(this.menfes).find(menpes => [menpes.a, menpes.b].includes(m.sender));
				if (!session) return newReply('Kayaknya Kakak gak ada sesi menfess yang aktif saat ini deh. 😅');
				let otherUser = session.a === m.sender ? session.b : session.a;
				await sock.sendMessage(otherUser, {
					text: `_Teman chat menghentikan sesi menfess ini ya, Kak. Makasih udah coba fitur ini! 😊_`,
					mentions: [m.sender]
				});
				newReply('Sesi menfess sudah dihentikan. Kalau mau mulai lagi, tinggal gunakan perintah yang sama ya, Kak! 😄');
				delete this.menfes[session.id];
				break;
			}


			default:

				const tiktokRegex = /(?:https?:\/\/)?(?:www\.)?(tiktok\.com|vm\.tiktok\.com)/;
				if (tiktokRegex.test(command)) {
					try {
						const hasil = await ttdown(command);
						console.log('Hasil dari ttdown:', JSON.stringify(hasil, null, 2));

						if (hasil && hasil.data && hasil.data.length > 0) {
							if (hasil.size_nowm_hd) {
								await sock.sendMessage(m.chat, { video: { url: hasil.data[1].url }, }, { quoted: m });
							} else {
								for (let i = 0; i < hasil.data.length; i++) {
									await sock.sendMessage(m.chat, { image: { url: hasil.data[i].url }, }, { quoted: m });
								}
								sock.sendMessage(m.chat, { audio: { url: hasil.music_info.url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
							}
						} else {
							reply('Data TikTok tidak ditemukan atau tidak valid!');
						}
					} catch (e) {
						console.error('Error saat memproses URL TikTok:', e);
						reply('Gagal memproses URL! Detail error: ' + e.message);
					}
				}
				if (budy.startsWith('=>')) {
					if (!isCreator) return
					function Return(sul) {
						sat = JSON.stringify(sul, null, 2)
						bang = util.format(sat)
						if (sat == undefined) {
							bang = util.format(sul)
						}
						return m.reply(bang)
					}
					try {
						reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
					} catch (e) {
						reply(String(e))
					}
				};

				if (budy.startsWith('>')) {
					if (!isCreator) return
					try {
						let evaled = await eval(budy.slice(2))
						if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
						await reply(evaled)
					} catch (err) {
						await reply(String(err))
					}
				};

				if (budy.startsWith('$')) {
					if (!isCreator) return
					exec(budy.slice(2), (err, stdout) => {
						if (err) return m.reply(err)
						if (stdout) return m.reply(stdout)
					})
				};

			// if (isCmd && budy.toLowerCase() != undefined) {
			// 	if (m.chat.endsWith('broadcast')) return
			// 	if (m.isBaileys) return
			// 	let msgs = db.data.database
			// 	if (!(budy.toLowerCase() in msgs)) return
			// 	sock.copyNForward(m.chat, msgs[budy.toLowerCase()], true, { quoted: m })
			// }

		}
	} catch (err) {
		console.log(chalk.yellow.bold("[ ERROR ] case.js :\n") + chalk.redBright(util.format(err)));
	}
};

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
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});