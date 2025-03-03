process.on("uncaughtException", console.error);

require('./settings');
const { default: createWASocket, makeCacheableSignalKeyStore, useMultiFileAuthState,  UseMyState, DisconnectReason, fetchLatestBaileysVersion, getContentType, generateForwardMessageContent, generateWAMessageFromContent, generateMessageID, prepareWAMessageMedia, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, delay } = require("@whiskeysockets/baileys");
const readline = require("readline");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const { Low, JSONFile } = require("./lib/lowdb");
const yargs = require('yargs/yargs');
const fs = require('fs');
const chalk = require('chalk');
const FileType = require("file-type");
const path = require("path");
const axios = require('axios');
const _ = require("lodash");
const util = require("util");
const moment = require("moment-timezone");
const PhoneNumber = require('awesome-phonenumber');
const colors = require('@colors/colors/safe');

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, await, sleep } = require('./lib/myfunc');
const { uncache, nocache } = require("./lib/loader");


const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.get("/tes", (req, res) => {
    res.send("WhatsApp Bot is running!");
});

server.listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});

const store = makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
global.db = new Low(new JSONFile("src/" + tempatDB));
global.DATABASE = global.db;

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (!global.db.READ) {
          clearInterval(interval);
          resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
        }
      }, 1000);
    });
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  try {
    await global.db.read();
    global.db.data = {
      'users': {},
      'database': {},
      'chats': {},
      'game': {},
      'settings': {},
      'message': {},
      ...(global.db.data || {})
    };
    global.db.chain = _.chain(global.db.data);
  } catch (error) {
    console.error("⚠️ Gagal membaca database:", error);
  } finally {
    global.db.READ = false;
  }
};

loadDatabase();

if (global.db) {
  setInterval(async () => {
    if (global.db.data && !global.db.READ) {
      try {
        await global.db.write();
      } catch (error) {
        console.error("⚠️ Gagal menyimpan database:", error);
      }
    }
  }, 30000);
}

require('./case.js');
nocache("../case.js", module => console.log(colors.green("[ CHANGE ]") + " " + colors.green(module), "Updated"));
require("./main.js");
nocache("../main.js", module => console.log(colors.green("[ CHANGE ]") + " " + colors.green(module), "Updated"));

const contacts = JSON.parse(fs.readFileSync("./src/data/role/contacts.json"));
const sessionPath = './' + sessionName;

const askQuestion = questionText => {
  const interface = readline.createInterface({
    'input': process.stdin,
    'output': process.stdout
  });
  return new Promise(resolve => {
    interface.question(questionText, resolve);
  });
};

let isFetchingVersion = false;
let retryFetchTimeout = null;
async function fetchVersion() {
  if (isFetchingVersion) {
    return;
  }
  isFetchingVersion = true;
  try {
    const response = await fetch("https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json");
    const versionData = await response.json();
    return versionData.version;
  } catch (error) {
    console.log("Error fetching version:", error.message);
    retryFetchTimeout = setTimeout(() => {
      isFetchingVersion = false;
      fetchVersion();
    }, 5000);
    return [2, 1000, 0x3ca64b97];
  } finally {
    isFetchingVersion = false;
  }
}

async function startBot() {
  const {
    state: authState,
    saveCreds: saveCredentials
  } = await useMultiFileAuthState(sessionPath);

  const sock = createWASocket({
    'printQRInTerminal': false,
    'syncFullHistory': true,
    'markOnlineOnConnect': true,
    'connectTimeoutMs': 60000,
    'defaultQueryTimeoutMs': 0,
    'keepAliveIntervalMs': 10000,
    'generateHighQualityLinkPreview': true,
    'patchMessageBeforeSending': message => {
      const hasButtons = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
      if (hasButtons) {
        message = {
          'viewOnceMessage': {
            'message': {
              'messageContextInfo': {
                'deviceListMetadataVersion': 2,
                'deviceListMetadata': {}
              },
              ...message
            }
          }
        };
      }
      return message;
    },
    'version': (await (await fetch("https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json")).json()).version,
    'browser': ["Ubuntu", "Chrome", "20.0.04"],
    'logger': pino({
      'level': "fatal"
    }),
    'auth': {
      'creds': authState.creds,
      'keys': makeCacheableSignalKeyStore(authState.keys, pino().child({
        'level': "silent",
        'stream': 'store'
      }))
    }
  });

  if (!sock.authState.creds.registered) {
    const phoneNumber = await askQuestion("\n\n\nKetik nomor kamu, contoh input nomor yang benar: 6281234567890\n");
    const pairingCode = await sock.requestPairingCode(phoneNumber.trim());
    console.log(chalk.white.bold("🎉 Kode Pairing Bot Whatsapp kamu :"), chalk.red.bold('' + pairingCode));
  }

  sock.ev.on("connection.update", async update => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let statusCode = new Boom(lastDisconnect?.["error"])?.["output"]['statusCode'];
      if (statusCode === DisconnectReason.badSession) {
        console.log("❌ Aduh, sesi-nya bermasalah nih, kak! Hapus sesi dulu terus coba lagi ya~ 🛠️");
        process.exit();
      } else if (statusCode === DisconnectReason.connectionClosed) {
        console.log("🔌 Yahh, koneksinya putus... Sabar ya, Mora coba sambungin lagi! 🔄");
        startBot();
      } else if (statusCode === DisconnectReason.connectionLost) {
        console.log("📡 Oops, koneksi ke server hilang, kak! Tunggu bentar, Mora sambungin lagi ya~ 🚀");
        startBot();
      } else if (statusCode === DisconnectReason.connectionReplaced) {
        console.log("🔄 Hmm, sesi ini kayaknya lagi dipakai di tempat lain deh... Coba restart bot-nya ya, kak! 💻");
        process.exit();
      } else if (statusCode === DisconnectReason.loggedOut) {
        console.log("🚪 Kak, perangkatnya udah keluar... Hapus folder sesi terus scan QR lagi ya! 📲");
        process.exit();
      } else if (statusCode === DisconnectReason.restartRequired) {
        console.log("🔄 Sebentar ya, Mora lagi mulai ulang koneksinya biar lancar lagi! ♻️");
        startBot();
      } else if (statusCode === DisconnectReason.timedOut) {
        console.log("⏳ Hmm, koneksinya timeout nih, kak! Mora coba sambungin ulang ya~ 🌐");
        startBot();
      } else {
        console.log("❓ Eh, alasan disconnect-nya gak jelas nih, kak... (" + statusCode + " | " + connection + ") 🤔 Tapi tenang, Mora coba sambungin lagi ya! 💪");
        startBot();
      }
    } else if (connection === "open") {
      console.log(chalk.white.bold("\n🎉 Horeee! Berhasil terhubung ke nomor :"), chalk.yellow(JSON.stringify(sock.user, null, 2)));
      console.log("✅ Semua sudah siap, kak! Selamat menjalankan bot-nya ya~ 🥳🎈");
      // const followNewsletters = async newsletterIds => {
      //   for (const newsletterId of newsletterIds) {
      //     try {
      //       await sleep(300);
      //       const newsletterMetadata = await sock.newsletterMetadata("invite", newsletterId);
      //       await sleep(300);
      //       await sock.newsletterFollow(newsletterMetadata.id);
      //     } catch (error) {
      //       console.error("❌ Gagal join saluran ID: " + newsletterId, error);
      //     }
      //   }
      // };
      // (async () => {
      //   await followNewsletters(_0x1370b8);
      // })();
    }
  });

  sock.ev.on('creds.update', saveCredentials);
  sock.ev.on("messages.upsert", () => { });

  sock.ev.on("call", async callUpdate => {
    if (anticall) {
      console.log(callUpdate);
      for (let call of callUpdate) {
        if (!call.isGroup && call.status === "offer") {
          try {
            let callType = call.isVideo ? "📹 Video Call" : "📞 Voice Call";
            let rejectionMessage = "⚠️ *Ups, Kak! Mora gak bisa menerima panggilan " + callType + ".*\n\n😔 Maaf banget, @" + call.from.split('@')[0] + ", panggilan seperti ini dapat membuat jaringan bot terganggu. Kakak akan diblokir sementara ya...\n\n📲 Silakan hubungi *Owner* untuk membuka blokir.";
            await sock.rejectCall(call.id, call.from);
            await sock.sendMessage(call.from, {
              'text': rejectionMessage,
              'mentions': [call.from]
            });
            await sock.sendMessage(call.from, {
              'contacts': {
                'displayName': "Owner",
                'contacts': contacts
              }
            });
            await sleep(5000);
            await sock.updateBlockStatus(call.from, "block");
            console.log("🔒 Pengguna " + call.from + " berhasil diblokir karena melakukan panggilan.");
          } catch (error) {
            console.error("❌ Gagal memproses panggilan dari " + call.from + ':', error);
          }
        }
      }
    }
  });

  sock.ev.on("messages.upsert", async messageUpdate => {
    if (autoswview) {
      const message = messageUpdate.messages[0];
      if (message.key && message.key.remoteJid === "status@broadcast") {
        await sock.readMessages([message.key]);
      }
    }
  });

  // sock.ev.on("messages.upsert", async messageUpdate => {
  //   try {
  //     const mek = messageUpdate.messages[0];
  //     if (!mek.message) {
  //       return;
  //     }
  //     mek.message = Object.keys(mek.message)[0] === 'ephemeralMessage' ? mek.message.ephemeralMessage.message : mek.message;
  //     if (mek.key && mek.key.remoteJid === 'status@broadcast') {
  //       return;
  //     }
  //     const m = smsg(sock, mek, store);
  //     require("./case")(sock, m, messageUpdate, mek, store);
  //   } catch (error) {
  //     console.log(chalk.yellow.bold("[ ERROR ] case.js :\n") + chalk.redBright(util.format(error)));
  //   }
  //});

  sock.ev.on("messages.upsert", async messageUpdate => {
    try {
      const msg = messageUpdate.messages[0];
      if (!msg.message) {
        return;
      }
      msg.message = Object.keys(msg.message)[0] === "ephemeralMessage" ? msg.message.ephemeralMessage.message : msg.message;
      if (msg.key && msg.key.remoteJid === "status@broadcast") {
        return;
      }
      if (!sock["public"] && !msg.key.fromMe && messageUpdate.type === "notify") {
        return;
      }
      if (msg.key.id.startsWith('') && msg.key.id.length === 16) {
        return;
      }
      if (msg.key.id.startsWith("BAE5")) {
        return;
      }
      const m = smsg(sock, msg, store);
      require('./case')(sock, m, messageUpdate, store);
    } catch (error) {
      console.log(error);
    }
  });

  sock.decodeJid = jid => {
    if (!jid) {
      return jid;
    }
    if (/:\d+@/gi.test(jid)) {
      let decodedJid = jidDecode(jid) || {};
      return decodedJid.user && decodedJid.server ? decodedJid.user + '@' + decodedJid.server : jid;
    } else {
      return jid;
    }
  };

  sock.ev.on('contacts.update', contactUpdates => {
    for (let contact of contactUpdates) {
      let decodedId = sock.decodeJid(contact.id);
      if (store && store.contacts) {
        store.contacts[decodedId] = {
          'id': decodedId,
          'name': contact.notify
        };
      }
    }
  });

  sock.getName = (jid, withoutContact = false) => {
    const id = sock.decodeJid(jid);
    withoutContact = sock.withoutContact || withoutContact;
    let contactData;
    if (id.endsWith("@g.us")) {
      return new Promise(async resolve => {
        contactData = store.contacts[id] || {};
        if (!(contactData.name || contactData.subject)) {
          contactData = sock.groupMetadata(id) || {};
        }
        resolve(contactData.name || contactData.subject || PhoneNumber('+' + id.replace("@s.whatsapp.net", '')).getNumber("international"));
      });
    } else {
      contactData = id === "0@s.whatsapp.net" ? {
        'id': id,
        'name': "WhatsApp"
      } : id === sock.decodeJid(sock.user.id) ? sock.user : store.contacts[id] || {};
    }
    return (withoutContact ? '' : contactData.name) || contactData.subject || contactData.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber("international");
  };

  sock.sendContact = async (to, contacts, quoted = '', options = {}) => {
    let contactList = [];
    for (let contact of contacts) {
      contactList.push({
        'displayName': await sock.getName(contact),
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:" + (await sock.getName(contact)) + "\nFN:" + (await sock.getName(contact)) + "\nitem1.TEL;waid=" + contact.split('@')[0] + ':' + contact.split('@')[0] + "\nitem1.X-ABLabel:Mobile\nEND:VCARD"
      });
    }
    sock.sendMessage(to, {
      'contacts': {
        'displayName': contactList.length + " Contact",
        'contacts': contactList
      },
      ...options
    }, {
      'quoted': quoted
    });
  };

  sock['public'] = true;
  sock.serializeM = message => smsg(sock, message, store);
  sock.sendText = (to, text, quoted = '', options) => sock.sendMessage(to, {
    'text': text,
    ...options
  }, {
    'quoted': quoted,
    ...options
  });

  sock.sendImage = async (to, image, caption = '', quoted = '', options) => {
    let imageBuffer = Buffer.isBuffer(image) ? image : /^data:.*?\/.*?;base64,/i.test(image) ? Buffer.from(image.split`,`[1], "base64") : /^https?:\/\//.test(image) ? await getBuffer(image) : fs.existsSync(image) ? fs.readFileSync(image) : Buffer.alloc(0);
    return await sock.sendMessage(to, {
      'image': imageBuffer,
      'caption': caption,
      ...options
    }, {
      'quoted': quoted
    });
  };

  sock.sendTextWithMentions = async (to, text, quoted, options = {}) => sock.sendMessage(to, {
    'text': text,
    'mentions': [...text.matchAll(/@(\d{0,16})/g)].map(match => match[1] + "@s.whatsapp.net"),
    ...options
  }, {
    'quoted': quoted
  });

  sock.sendFromOwner = async (toList, text, quoted, options = {}) => {
    for (const to of toList) {
      await sock.sendMessage(to + "@s.whatsapp.net", {
        'text': text,
        ...options
      }, {
        'quoted': quoted
      });
    }
  };

  sock.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
        buffer = await writeExifImg(buff, options)
    } else {
        buffer = await imageToWebp(buff)
    }
    await sock.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        .then(response => {
            fs.unlinkSync(buffer)
            return response
        })
}

  sock.sendAudio = async (to, audio, quoted = '', ptt = false, options) => {
    let audioBuffer = Buffer.isBuffer(audio) ? audio : /^data:.*?\/.*?;base64,/i.test(audio) ? Buffer.from(audio.split`,`[1], "base64") : /^https?:\/\//.test(audio) ? await getBuffer(audio) : fs.existsSync(audio) ? fs.readFileSync(audio) : Buffer.alloc(0);
    return await sock.sendMessage(to, {
      'audio': audioBuffer,
      'ptt': ptt,
      ...options
    }, {
      'quoted': quoted
    });
  };

  sock.sendVideo = async (to, video, caption = '', quoted = '', gifPlayback = false, options) => {
    let videoBuffer = Buffer.isBuffer(video) ? video : /^data:.*?\/.*?;base64,/i.test(video) ? Buffer.from(video.split`,`[1], 'base64') : /^https?:\/\//.test(video) ? await getBuffer(video) : fs.existsSync(video) ? fs.readFileSync(video) : Buffer.alloc(0);
    return await sock.sendMessage(to, {
      'video': videoBuffer,
      'caption': caption,
      'gifPlayback': gifPlayback,
      ...options
    }, {
      'quoted': quoted
    });
  };

  sock.sendVideoAsSticker = async (to, video, options, quoted = {}) => {
    let videoBuffer = Buffer.isBuffer(video) ? video : /^data:.*?\/.*?;base64,/i.test(video) ? Buffer.from(video.split`,`[1], "base64") : /^https?:\/\//.test(video) ? await getBuffer(video) : fs.existsSync(video) ? fs.readFileSync(video) : Buffer.alloc(0);
    let stickerPath;
    if (options && (options.packname || options.author)) {
      stickerPath = await writeExifVid(videoBuffer, options);
    } else {
      stickerPath = await videoToWebp(videoBuffer);
    }
    await sock.sendMessage(to, {
      'sticker': {
        'url': stickerPath
      },
      ...options
    }, {
      'quoted': quoted
    });
    return stickerPath;
  };

  sock.sendFileUrl = async (to, url, caption, options = {}) => {
    let contentType = '';
    let response = await axios.head(url);
    contentType = response.headers["content-type"];
    if (contentType.split('/')[1] === 'gif') {
      return sock.sendMessage(to, {
        'video': await getBuffer(url),
        'caption': caption,
        'gifPlayback': true,
        ...options
      });
    }
    if (contentType === 'application/pdf') {
      return sock.sendMessage(to, {
        'document': await getBuffer(url),
        'mimetype': "application/pdf",
        'caption': caption,
        ...options
      });
    }
    if (contentType.split('/')[0] === "image") {
      return sock.sendMessage(to, {
        'image': await getBuffer(url),
        'caption': caption,
        ...options
      });
    }
    if (contentType.split('/')[0] === "video") {
      return sock.sendMessage(to, {
        'video': await getBuffer(url),
        'caption': caption,
        'mimetype': 'video/mp4',
        ...options
      });
    }
    if (contentType.split('/')[0] === "audio") {
      return sock.sendMessage(to, {
        'audio': await getBuffer(url),
        'caption': caption,
        'mimetype': "audio/mpeg",
        ...options
      });
    }
  };

  sock.getFile = async (filePath, saveToDisk = false) => {
    let fileBuffer;
    if (Buffer.isBuffer(filePath)) {
      fileBuffer = filePath;
    } else if (/^data:.*?\/.*?;base64,/i.test(filePath)) {
      fileBuffer = Buffer.from(filePath.split`,`[1], "base64");
    } else if (/^https?:\/\//.test(filePath)) {
      fileBuffer = await getBuffer(filePath);
    } else if (fs.existsSync(filePath)) {
      fileBuffer = fs.readFileSync(filePath);
    } else {
      fileBuffer = Buffer.alloc(0);
    }
    let fileType = (await FileType.fromBuffer(fileBuffer)) || {
      'mime': "application/octet-stream",
      'ext': ".bin"
    };
    let filename = path.join(__filename, "../src/" + new Date() * 1 + '.' + fileType.ext);
    if (fileBuffer && saveToDisk) {
      fs.promises.writeFile(filename, fileBuffer);
    }
    return {
      'res': fileBuffer,
      'filename': filename,
      'size': await getSizeMedia(fileBuffer),
      ...fileType,
      'data': fileBuffer
    };
  };

  sock.sendFile = async (to, filePath, filename = '', caption = '', quoted = '', options = {}) => {
    let fileData = await sock.getFile(filePath, true);
    let { res, data, filename: savedFilename } = fileData;
    if (res && res.status !== 200 || data.length <= 10000) {
      try {
        throw {
          'json': JSON.parse(data.toString())
        };
      } catch (error) {
        if (error.json) {
          throw error.json;
        }
      }
    }
    let fileType = {
      'filename': filename
    };
    if (options) {
      fileType.quoted = options;
    }
    let mimeType = '';
    if (/webp/.test(fileData.mime) || /image/.test(fileData.mime) && options.asSticker) {
      mimeType = 'sticker';
    } else if (/image/.test(fileData.mime) || /webp/.test(fileData.mime) && options.asImage) {
      mimeType = "image";
    } else if (/video/.test(fileData.mime)) {
      mimeType = "video";
    } else if (/audio/.test(fileData.mime)) {
      let audioData = await (options.toPTT ? toPTT : toAudio)(data, fileData.ext);
      data = audioData.data;
      savedFilename = audioData.filename;
      mimeType = 'audio';
      mimeType = "audio/ogg; codecs=opus";
    } else {
      mimeType = "document";
    }
    if (options.asDocument) {
      mimeType = "document";
    }
    delete options.asSticker;
    delete options.asLocation;
    delete options.asVideo;
    delete options.asDocument;
    delete options.asImage;
    let messageOptions = {
      ...options,
      'caption': caption,
      'ptt': options.ptt,
      [mimeType]: {
        'url': savedFilename
      },
      'mimetype': mimeType
    };
    let messageResponse;
    try {
      messageResponse = await sock.sendMessage(to, messageOptions, {
        ...fileType,
        ...options
      });
    } catch (error) {
      console.error(error);
      messageResponse = null;
    } finally {
      if (!messageResponse) {
        messageResponse = await sock.sendMessage(to, {
          ...messageOptions,
          [mimeType]: data
        }, {
          ...fileType,
          ...options
        });
      }
      data = null;
      return messageResponse;
    }
  };

  sock.sendPoll = (to, question = '', options = [], selectableCount = global.select) => {
    return sock.sendMessage(to, {
      'poll': {
        'name': question,
        'values': options,
        'selectableCount': selectableCount
      }
    });
  };

  sock.cMod = (jid, message, text = '', sender = sock.user.id, options = {}) => {
    let messageType = Object.keys(message.message)[0];
    let isEphemeral = messageType === "ephemeralMessage";
    if (isEphemeral) {
      messageType = Object.keys(message.message.ephemeralMessage.message)[0];
    }
    let messageContent = isEphemeral ? message.message.ephemeralMessage.message : message.message;
    let messageBody = messageContent[messageType];
    if (typeof messageBody === "string") {
      messageContent[messageType] = text || messageBody;
    } else {
      if (messageBody.caption) {
        messageBody.caption = text || messageBody.caption;
      } else if (messageBody.text) {
        messageBody.text = text || messageBody.text;
      }
    }
    if (typeof messageBody !== "string") {
      messageContent[messageType] = {
        ...messageBody,
        ...options
      };
    }
    if (message.key.participant) {
      sender = message.key.participant = sender || message.key.participant;
    } else if (message.key.participant) {
      sender = message.key.participant = sender || message.key.participant;
    }
    if (message.key.remoteJid.includes("@s.whatsapp.net")) {
      sender = sender || message.key.remoteJid;
    } else if (message.key.remoteJid.includes("@broadcast")) {
      sender = sender || message.key.remoteJid;
    }
    message.key.remoteJid = jid;
    message.key.fromMe = sender === sock.user.id;
    return proto.WebMessageInfo.fromObject(message);
  };

  sock.sendMedia = async (to, media, caption = '', quoted = '', mimeType = '', options = {}) => {
    let mediaData = await sock.getFile(media, true);
    let { mime, ext, res, data, filename } = mediaData;
    if (res && res.status !== 200 || data.length <= 10000) {
      try {
        throw {
          'json': JSON.parse(data.toString())
        };
      } catch (error) {
        if (error.json) {
          throw error.json;
        }
      }
    }
    let mediaType = '';
    if (options.asDocument) {
      mediaType = "document";
    }
    if (options.asSticker || /webp/.test(mime)) {
      let { writeExif } = require("./lib/exif");
      let stickerData = {
        'mimetype': mime,
        'data': data
      };
      filename = await writeExif(stickerData, {
        'packname': options.packname ? options.packname : global.packname,
        'author': options.author ? options.author : global.author,
        'categories': options.categories ? options.categories : []
      });
      await fs.promises.unlink(filename);
      mediaType = 'sticker';
      mime = "image/webp";
    } else if (/image/.test(mime)) {
      mediaType = "image";
    } else if (/video/.test(mime)) {
      mediaType = "video";
    } else if (/audio/.test(mime)) {
      mediaType = "audio";
    } else {
      mediaType = 'document';
    }
    await sock.sendMessage(to, {
      [mediaType]: {
        'url': filename
      },
      'caption': caption,
      'mimetype': mime,
      'fileName': ext,
      ...options
    }, {
      'quoted': quoted,
      ...options
    });
    return fs.promises.unlink(filename);
  };

  sock.copyNForward = async (to, message, readViewOnce = false, options = {}) => {
    let messageContent;
    if (readViewOnce) {
      message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : message.message || undefined;
      messageContent = Object.keys(message.message.viewOnceMessage.message)[0];
      delete (message.message && message.message.ignore ? message.message.ignore : message.message || undefined);
      delete message.message.viewOnceMessage.message[messageContent].viewOnce;
      message.message = {
        ...message.message.viewOnceMessage.message
      };
    }
    let messageType = Object.keys(message.message)[0];
    let forwardContent = await generateForwardMessageContent(message, readViewOnce);
    let forwardType = Object.keys(forwardContent)[0];
    let contextInfo = {};
    if (messageType !== "conversation") {
      contextInfo = message.message[messageType].contextInfo;
    }
    forwardContent[forwardType].contextInfo = {
      ...contextInfo,
      ...forwardContent[forwardType].contextInfo
    };
    const forwardMessage = await generateWAMessageFromContent(to, forwardContent, options ? {
      ...forwardContent[forwardType],
      ...options,
      ...options.contextInfo ? {
        'contextInfo': {
          ...forwardContent[forwardType].contextInfo,
          ...options.contextInfo
        }
      } : {}
    } : {});
    await sock.relayMessage(to, forwardMessage.message, {
      'messageId': forwardMessage.key.id
    });
    return forwardMessage;
  };

  sock.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(match => match[1] + "@s.whatsapp.net");
  };

  sock.downloadAndSaveMediaMessage = async (message, filename, saveToDisk = true) => {
    let messageContent = message.msg ? message.msg : message;
    let mimeType = (message.msg || message).mimetype || '';
    let mediaType = message.mtype ? message.mtype.replace(/Message/gi, '') : mimeType.split('/')[0];
    const mediaStream = await downloadContentFromMessage(messageContent, mediaType);
    let mediaBuffer = Buffer.from([]);
    for await (const chunk of mediaStream) {
      mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
    }
    let fileType = await FileType.fromBuffer(mediaBuffer);
    let filePath = saveToDisk ? "./temp/" + filename + '.' + fileType.ext : "./temp/" + filename;
    await fs.writeFileSync(filePath, mediaBuffer);
    return filePath;
  };

  sock.downloadMediaMessage = async message => {
    let mimeType = (message.msg || message).mimetype || '';
    let mediaType = message.mtype ? message.mtype.replace(/Message/gi, '') : mimeType.split('/')[0];
    const mediaStream = await downloadContentFromMessage(message, mediaType);
    let mediaBuffer = Buffer.from([]);
    for await (const chunk of mediaStream) {
      mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
    }
    return mediaBuffer;
  };

  return sock;
}

startBot();

function smsg(sock, message, store) {
  if (!message) {
          return message;
  }
  let messageInfo = proto.WebMessageInfo;
  if (message.key) {
          message.id = message.key.id;
          message.isBaileys = message.id.startsWith("BAE5") && message.id.length === 10;
          message.chat = message.key.remoteJid;
          message.fromMe = message.key.fromMe;
          message.isGroup = message.chat.endsWith("@g.us");
          message.sender = sock.decodeJid(message.fromMe && sock.user.id || message.participant || message.key.participant || message.chat || '');
          if (message.isGroup) {
                  message.participant = sock.decodeJid(message.key.participant) || '';
          }
  }
  if (message.message) {
          message.mtype = getContentType(message.message);
          message.msg = message.mtype === 'viewOnceMessage' ? message.message[message.mtype].message[getContentType(message.message[message.mtype].message)] : message.message[message.mtype];
          message.body = message.message.conversation || message.msg.caption || message.msg.text || message.mtype === 'listResponseMessage' && message.msg.singleSelectReply.selectedRowId || message.mtype === "buttonsResponseMessage" && message.msg.selectedButtonId || message.mtype === 'viewOnceMessage' && message.msg.caption || message.text;
          let quotedMessage = message.quoted = message.msg.contextInfo ? message.msg.contextInfo.quotedMessage : null;
          message.mentionedJid = message.msg.contextInfo ? message.msg.contextInfo.mentionedJid : [];
          if (message.quoted) {
                  let quotedType = getContentType(quotedMessage);
                  message.quoted = message.quoted[quotedType];
                  if (["productMessage"].includes(quotedType)) {
                          quotedType = getContentType(message.quoted);
                          message.quoted = message.quoted[quotedType];
                  }
                  if (typeof message.quoted === "string") {
                          message.quoted = {
                                  'text': message.quoted
                          };
                  }
                  message.quoted.mtype = quotedType;
                  message.quoted.id = message.msg.contextInfo.stanzaId;
                  message.quoted.chat = message.msg.contextInfo.remoteJid || message.chat;
                  message.quoted.isBaileys = message.quoted.id ? message.quoted.id.startsWith("BAE5") && message.quoted.id.length === 10 : false;
                  message.quoted.sender = sock.decodeJid(message.msg.contextInfo.participant);
                  message.quoted.fromMe = message.quoted.sender === sock.decodeJid(sock.user.id);
                  message.quoted.text = message.quoted.text || message.quoted.caption || message.quoted.conversation || message.quoted.contentText || message.quoted.selectedDisplayText || message.quoted.title || '';
                  message.quoted.mentionedJid = message.msg.contextInfo ? message.msg.contextInfo.mentionedJid : [];
                  message.quoted.getQuotedObj = message.quoted.getQuotedMessage = async () => {
                          if (!message.quoted.id) {
                                  return false;
                          }
                          let quotedMessageData = await store.loadMessage(message.chat, message.quoted.id, sock);
                          return exports.smsg(sock, quotedMessageData, store);
                  };
                  let fakeObj = message.quoted.fakeObj = messageInfo.fromObject({
                          'key': {
                                  'remoteJid': message.quoted.chat,
                                  'fromMe': message.quoted.fromMe,
                                  'id': message.quoted.id
                          },
                          'message': quotedMessage,
                          ... (message.isGroup ? {
                                  'participant': message.quoted.sender
                          } : {})
                  });
                  message.quoted["delete"] = () => sock.sendMessage(message.quoted.chat, {
                          'delete': fakeObj.key
                  });
                  message.quoted.copyNForward = (to, readViewOnce = false, options = {}) => sock.copyNForward(to, fakeObj, readViewOnce, options);
                  message.quoted.download = () => sock.downloadMediaMessage(message.quoted);
          }
  }
  if (message.msg.url) {
          message.download = () => sock.downloadMediaMessage(message.msg);
  }
  message.text = message.msg.text || message.msg.caption || message.message.conversation || message.msg.contentText || message.msg.selectedDisplayText || message.msg.title || '';
  message.reply = (response, chatId = message.chat, options = {}) => Buffer.isBuffer(response) ? sock.sendMedia(chatId, response, "file", '', message, {
          ...options
  }) : sock.sendText(chatId, response, message, {
          ...options
  });
  message.copy = () => exports.smsg(sock, messageInfo.fromObject(messageInfo.toObject(message)));
  message.copyNForward = (to = message.chat, readViewOnce = false, options = {}) => sock.copyNForward(to, message, readViewOnce, options);
  return message;
}

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

let currentFile = require.resolve(__filename);
fs.watchFile(currentFile, () => {
  fs.unwatchFile(currentFile);
  console.log(chalk.redBright("Update " + __filename));
  delete require.cache[currentFile];
  require(currentFile);
});