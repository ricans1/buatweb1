const fs = require('fs');
const chalk = require('chalk');

global.prefa = ['!', '.', ',', '🐤', '🗿']
global.xprefix = '.'
global.themeemoji = '🪀'

global.ytname = 'YouTube: @zal_x_u'; // Nama YouTube Kamu
global.socialm = 'GitHub: ???'; // Nama GitHub Kamu
global.location = '11 Naitōmachi, Shinjuku City, Tokyo 160-0014, Jepang'; // Lokasi Kamu

global.botName = 'Mora AI'; // Nama Bot Kamu
global.ownerNumber = '6281248249833'; // Nomor Kamu
global.ownerName = 'rizel'; // Nama Kamu
global.website = 'https://www.khaliddesu.my.id'; // Web Kamu
global.wagc = 'https://www.khaliddesu.my.id'; // Web Kamu
global.packname = botName; // Nama Pack
global.author = ownerName; // Nama Author
global.creator = '6281248249833@s.whatsapp.net'; // Nomor Creator
global.premium = ['6281248249833'] // User Premium
global.hituet = 0 // Hit Command
global.prefa = '.'; // Prefix
global.tempatDB = 'database.json'; // Tempat Database

global.saluran = '120363364330631981@newsletter'; // ID Saluran Kamu
global.saluranName = ownerName; // Nama Saluran Kamu
global.sessionName = 'session'; // Nama Folder Sesi Bot Kamu

global.panel = 'https://rizal-dev.web.id'; // Link Panel Kamu
global.cred = 'ptla_f7HcvW06cfhGfHOgtFl2qTerBDyr6ZtVxg'; // API PTLA Kamu
global.apiuser = 'ptlc_ftQh1nWARELuyfLtOpiqpXoyApGGpxrWLfS'; // API PTLC Kamu
global.eggs = '15'; // Eggs Number (Recommended)
global.nets = '5'; // Nets Number (Recommended)
global.location = '1'; // Location Number (Recommended)

global.typereply = 'v4'; // Gaya Reply v1-v4
global.autoblocknumber = '62'; // Auto Block Number
global.antiforeignnumber = '62'; // Anti Foreign Number
global.welcome = true // Auto Welcome Msg
global.anticall = true // Anti Call
global.autoswview = true // Auto View Status
global.adminevent = true // Admin Event Msg
global.groupevent = true // Group Event Msg

global.limit = {
	free: 20, // Limit User Non-premium
	premium: 1000, // Limit User Premium
	vip: 'VIP' // Limit User VIP 👑
};

global.uang = {
	free: 1000, // Uang User Non-premium
	premium: 1000000, // Uang User Premium
	vip: 1000000 // Uang User VIP 👑
};

global.bot = {
	limit: 0, // Limit Awal Bot
	uang: 0 // Uang Awal Bot
};

global.game = {
	suit: {}, // Sesi Game Suit
	menfes: {}, // Sesi Menfess
	tictactoe: {}, // Sesi Tictactoe
	kuismath: {}, // Sesi Kuis Mathematics
	tebakbom: {}, // Sesi Tebak Bom
};

global.mess = {
	admin: "Fitur ini khusus buat admin aja ya, Kak! 🫢",
	botAdmin: "Mora harus jadi admin dulu biar bisa jalanin ini! 😭",
	done: "Done Kak! ✨",
	error: "Eh, ada yang salah nih... coba lagi ya, Kak! 😖",
	group: "Eits, fitur ini cuma bisa dipakai di grup~ 🫡",
	limit: "Yah, limit penggunaan Kakak udah habis... 😢\n\nCoba ketik .buy untuk membeli dan menambah limit, atau upgrade ke premium ✨",
	noCmd: "Hmm... perintahnya gak ada di daftar Mora nih. Coba cek lagi ya, Kak! 🤔",
	nsfw: "Fitur NSFW dimatikan di grup ini, coba minta izin ke admin dulu ya~ 🫣",
	owner: "Hanya pemilik yang bisa akses fitur ini, Kak! 👑",
	premium: "Fitur ini cuma buat pengguna premium, Kak! 🌟",
	private: "Fitur ini cuma bisa dipakai di chat pribadi, Kak! 💌",
	success: "Yeay, berhasil! 🎉",
	wait: "Tunggu sebentar ya, Kak... Mora lagi proses nih! ⏳🤗"
};

global.imageDonasi = 'https://i.ibb.co.com/p2nKgqP/image.png'; // Url Image Donasi (dana, qris etc..)
global.imageUrl = 'https://i.ibb.co.com/p2nKgqP/image.png'; // Url Image
global.imageBuffer = fs.readFileSync('./media/image.png'); // Buffer Image

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})