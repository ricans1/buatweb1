process.on("uncaughtException", console.error);

const {
  default: createWASocket,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  getContentType,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  generateMessageID,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  delay,
} = require("@whiskeysockets/baileys");
const readline = require("readline");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const chalk = require("chalk");
const colors = require("@colors/colors/safe");

const {
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  sleep,
} = require("./lib/myfunc");
const { uncache, nocache } = require("./lib/loader");

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});

const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store",
  }),
});

require("./case.js");
nocache("../case.js", (module) =>
  console.log(
    colors.green("[ CHANGE ]") + " " + colors.green(module),
    "Updated",
  ),
);
require("./main.js");
nocache("../main.js", (module) =>
  console.log(
    colors.green("[ CHANGE ]") + " " + colors.green(module),
    "Updated",
  ),
);

const sessionPath = "./Auth";

const askQuestion = (questionText) => {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    interface.question(questionText, resolve);
  });
};

async function startBot() {
  const { state: authState, saveCreds: saveCredentials } =
    await useMultiFileAuthState(sessionPath);

  const sock = createWASocket({
    printQRInTerminal: false,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
    patchMessageBeforeSending: (message) => {
      const hasButtons = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
      );
      if (hasButtons) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
    version: (
      await (
        await fetch(
          "https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json",
        )
      ).json()
    ).version,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({
      level: "fatal",
    }),
    auth: {
      creds: authState.creds,
      keys: makeCacheableSignalKeyStore(
        authState.keys,
        pino().child({
          level: "silent",
          stream: "store",
        }),
      ),
    },
  });

  if (!sock.authState.creds.registered) {
    const phoneNumber = await askQuestion(
      "\n\nKetik nomor kamu, contoh input nomor yang benar: 6281234567890\n",
    );
    const pairingCode = await sock.requestPairingCode(phoneNumber.trim());
    console.log(
      chalk.white.bold("🎉 Kode Pairing Bot Whatsapp kamu :"),
      chalk.red.bold("" + pairingCode),
    );
  }

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      let statusCode = new Boom(lastDisconnect?.["error"])?.["output"][
        "statusCode"
      ];
      if (statusCode === DisconnectReason.badSession) {
        console.log(
          "❌ Aduh, sesi-nya bermasalah nih, kak! Hapus sesi dulu terus coba lagi ya~ 🛠️",
        );
        process.exit();
      } else if (statusCode === DisconnectReason.connectionClosed) {
        console.log(
          "🔌 Yahh, konekinya putus... Sabar ya, Mora coba sambungin lagi! 🔄",
        );
        startBot();
      } else if (statusCode === DisconnectReason.connectionLost) {
        console.log(
          "📡 Oops, konekpsi ke server hilang, kak! Tunggu bentar, Mora sambungin lagi ya~ 🚀",
        );
        startBot();
      } else if (statusCode === DisconnectReason.connectionReplaced) {
        console.log(
          "🔄 Hmm, sesi ini kayaknya lagi dipakai di tempat lain deh... Coba restart bot-nya ya, kak! 💻",
        );
        process.exit();
      } else if (statusCode === DisconnectReason.loggedOut) {
        console.log(
          "🚪 Kak, perangkatnya udah keluar... Hapus folder sesi terus scan QR lagi ya! 📲",
        );
        process.exit();
      } else if (statusCode === DisconnectReason.restartRequired) {
        console.log(
          "🔄 Sebentar ya, Mora lagi mulai ulang konekinya biar lancar lagi! ♻️",
        );
        startBot();
      } else if (statusCode === DisconnectReason.timedOut) {
        console.log(
          "⏳ Hmm, konekinya timeout nih, kak! Mora coba sambungin ulang ya~ 🌐",
        );
        startBot();
      } else {
        console.log(
          "❓ Eh, alasan disconnect-nya gak jelas nih, kak... (" +
            statusCode +
            " | " +
            connection +
            ") 🤔 Tapi tenang, Mora coba sambungin lagi ya! 💪",
        );
        startBot();
      }
    } else if (connection === "open") {
      console.log(
        chalk.white.bold("\n🎉 Horeee! Berhasil terhubung ke nomor :"),
        chalk.yellow(JSON.stringify(sock.user, null, 2)),
      );
      console.log(
        "✅ Semua sudah siap, kak! Selamat menjalankan bot-nya ya~ 🥳🎈",
      );
    }
  });

  sock.ev.on("creds.update", saveCredentials);
  sock.ev.on("messages.upsert", () => {});

  sock.ev.on("call", async (callUpdate) => {
    console.log(callUpdate);
    for (let call of callUpdate) {
      if (!call.isGroup && call.status === "offer") {
        try {
          let callType = call.isVideo ? "📹 Video Call" : "📞 Voice Call";
          let rejectionMessage =
            "⚠️ *Ups, Kak! Mora gak bisa menerima panggilan " +
            callType +
            ".*\n\n😔 Maaf banget, @" +
            call.from.split("@")[0] +
            ", panggilan seperti ini dapat membuat jaringan bot terganggu. Kakak akan diblokir sementara ya...\n\n📲 Silakan hubungi *Owner* untuk membuka blokir.";
          await sock.rejectCall(call.id, call.from);
          await sock.sendMessage(call.from, {
            text: rejectionMessage,
            mentions: [call.from],
          });
          await sock.sendMessage(call.from, {
            contacts: {
              displayName: "Owner",
              contacts: contacts,
            },
          });
          await sleep(5000);
          await sock.updateBlockStatus(call.from, "block");
          console.log(
            "🔒 Pengguna " +
              call.from +
              " berhasil diblokir karena melakukan panggilan.",
          );
        } catch (error) {
          console.error(
            "❌ Gagal memproses panggilan dari " + call.from + ":",
            error,
          );
        }
      }
    }
  });

  sock.ev.on("messages.upsert", async (messageUpdate) => {
    try {
      const msg = messageUpdate.messages[0];
      const m = smsg(sock, msg, store);
      require("./case")(sock, m, messageUpdate, store);
    } catch (error) {}
  });

  app.get("/tes", (req, res) => {
    const command = "tescopy"; // Ini string, jadi aman
    const pesannya = "menu"; // Ini string, jadi aman

    require("./case")(command, pesannya, sock, store);
    res.send(`Command '${command}' telah dipanggil`);
  });

  sock.serializeM = (message) => smsg(sock, message, store);

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
    message.isBaileys =
      message.id.startsWith("BAE5") && message.id.length === 10;
    message.chat = message.key.remoteJid;
    message.fromMe = message.key.fromMe;
    message.isGroup = message.chat.endsWith("@g.us");
    message.sender = sock.decodeJid(
      (message.fromMe && sock.user.id) ||
        message.participant ||
        message.key.participant ||
        message.chat ||
        "",
    );
    if (message.isGroup) {
      message.participant = sock.decodeJid(message.key.participant) || "";
    }
  }
  if (message.message) {
    message.mtype = getContentType(message.message);
    message.msg =
      message.mtype === "viewOnceMessage"
        ? message.message[message.mtype].message[
            getContentType(message.message[message.mtype].message)
          ]
        : message.message[message.mtype];
    message.body =
      message.message.conversation ||
      message.msg.caption ||
      message.msg.text ||
      (message.mtype === "listResponseMessage" &&
        message.msg.singleSelectReply.selectedRowId) ||
      (message.mtype === "buttonsResponseMessage" &&
        message.msg.selectedButtonId) ||
      (message.mtype === "viewOnceMessage" && message.msg.caption) ||
      message.text;
    let quotedMessage = (message.quoted = message.msg.contextInfo
      ? message.msg.contextInfo.quotedMessage
      : null);
    message.mentionedJid = message.msg.contextInfo
      ? message.msg.contextInfo.mentionedJid
      : [];
    if (message.quoted) {
      let quotedType = getContentType(quotedMessage);
      message.quoted = message.quoted[quotedType];
      if (["productMessage"].includes(quotedType)) {
        quotedType = getContentType(message.quoted);
        message.quoted = message.quoted[quotedType];
      }
      if (typeof message.quoted === "string") {
        message.quoted = {
          text: message.quoted,
        };
      }
      message.quoted.mtype = quotedType;
      message.quoted.id = message.msg.contextInfo.stanzaId;
      message.quoted.chat = message.msg.contextInfo.remoteJid || message.chat;
      message.quoted.isBaileys = message.quoted.id
        ? message.quoted.id.startsWith("BAE5") &&
          message.quoted.id.length === 10
        : false;
      message.quoted.sender = sock.decodeJid(
        message.msg.contextInfo.participant,
      );
      message.quoted.fromMe =
        message.quoted.sender === sock.decodeJid(sock.user.id);
      message.quoted.text =
        message.quoted.text ||
        message.quoted.caption ||
        message.quoted.conversation ||
        message.quoted.contentText ||
        message.quoted.selectedDisplayText ||
        message.quoted.title ||
        "";
      message.quoted.mentionedJid = message.msg.contextInfo
        ? message.msg.contextInfo.mentionedJid
        : [];
      message.quoted.getQuotedObj = message.quoted.getQuotedMessage =
        async () => {
          if (!message.quoted.id) {
            return false;
          }
          let quotedMessageData = await store.loadMessage(
            message.chat,
            message.quoted.id,
            sock,
          );
          return exports.smsg(sock, quotedMessageData, store);
        };
      let fakeObj = (message.quoted.fakeObj = messageInfo.fromObject({
        key: {
          remoteJid: message.quoted.chat,
          fromMe: message.quoted.fromMe,
          id: message.quoted.id,
        },
        message: quotedMessage,
        ...(message.isGroup
          ? {
              participant: message.quoted.sender,
            }
          : {}),
      }));
      message.quoted["delete"] = () =>
        sock.sendMessage(message.quoted.chat, {
          delete: fakeObj.key,
        });
      message.quoted.copyNForward = (to, readViewOnce = false, options = {}) =>
        sock.copyNForward(to, fakeObj, readViewOnce, options);
      message.quoted.download = () => sock.downloadMediaMessage(message.quoted);
    }
  }
  if (message.msg.url) {
    message.download = () => sock.downloadMediaMessage(message.msg);
  }
  message.text =
    message.msg.text ||
    message.msg.caption ||
    message.message.conversation ||
    message.msg.contentText ||
    message.msg.selectedDisplayText ||
    message.msg.title ||
    "";
  message.reply = (response, chatId = message.chat, options = {}) =>
    Buffer.isBuffer(response)
      ? sock.sendMedia(chatId, response, "file", "", message, {
          ...options,
        })
      : sock.sendText(chatId, response, message, {
          ...options,
        });
  message.copy = () =>
    exports.smsg(sock, messageInfo.fromObject(messageInfo.toObject(message)));
  message.copyNForward = (
    to = message.chat,
    readViewOnce = false,
    options = {},
  ) => sock.copyNForward(to, message, readViewOnce, options);
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
