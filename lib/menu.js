const chalk = require('chalk');
const fs = require('fs');

global.allMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *GROUP MENU* ໒  ֵ  ׄ 
┃ お ─· .pushcontact
┃ お ─· .savecontact
┃ お ─· .sendcontact
┃ お ─· .getcontact
┃ お ─· .contacttag
┃ お ─· .antibadword
┃ お ─· .nsfw
┃ お ─· .antiaudio
┃ お ─· .antiforeign
┃ お ─· .antisticker
┃ お ─· .antiimage
┃ お ─· .antivideo
┃ お ─· .antiviewonce
┃ お ─· .antispam
┃ お ─· .antimedia
┃ お ─· .antidocument
┃ お ─· .anticontact
┃ お ─· .antilocation
┃ お ─· .antilocation
┃ お ─· .antilink
┃ お ─· .antilinkgc
┃ お ─· .mute
┃ お ─· .welcome
┃ お ─· .left
┃ お ─· .adminevent
┃ お ─· .groupevent
┃ お ─· .kick
┃ お ─· .add
┃ お ─· .promote
┃ お ─· .demote
┃ お ─· .setnamegc
┃ お ─· .setppgc
┃ お ─· .deleteppgc
┃ お ─· .setdesk
┃ お ─· .hidetag
┃ お ─· .listonline
┃ お ─· .group
┃ お ─· .editinfo
┃ お ─· .linkgc
┃ お ─· .resetlink
┃ お ─· .afk
┃ お ─· .addlist
┃ お ─· .dellist
┃ お ─· .ceklist
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *SEARCH MENU* ໒  ֵ  ׄ 
┃ お ─· .anime
┃ お ─· kusonimeinfo
┃ お ─· kusonimesearch
┃ お ─· otakudesu
┃ お ─· jkt48news
┃ お ─· mangainfo
┃ お ─· mangadetail
┃ お ─· .imdb
┃ お ─· .bukalapak
┃ お ─· .playstore
┃ お ─· .umma
┃ お ─· .happymod
┃ お ─· .ytsearch
┃ お ─· .tiktoksearch
┃ お ─· .pinterest
┃ お ─· .wallpaper
┃ お ─· .wikipedia
┃ お ─· .wikimedia
┃ お ─· .ringtone
┃ お ─· .traceanime
┃ お ─· .weather
┃ お ─· .presetam
┃ お ─· .soundcloud
┃ お ─· .lyrics
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *DOWNLOAD MENU* ໒  ֵ  ׄ 
┃ お ─· .play
┃ お ─· .ytaudio
┃ お ─· .ytvideo
┃ お ─· .tiktokmp4
┃ お ─· .tiktokmp3
┃ お ─· .tiktokslide
┃ お ─· .instagram
┃ お ─· .facebook
┃ お ─· .fdown
┃ お ─· .gitclone
┃ お ─· .gdrive
┃ お ─· .savepin
┃ お ─· .mediafire
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *CONVERTER/TOOLS* ໒  ֵ  ׄ 
┃ お ─· .brat
┃ お ─· .ssweb
┃ お ─· .qc
┃ お ─· .s
┃ お ─· .swm
┃ お ─· .tourl
┃ お ─· .toimage
┃ お ─· .remini
┃ お ─· .fetch
┃ お ─· .toaudio
┃ お ─· .bass
┃ お ─· .blown
┃ お ─· .deep
┃ お ─· .earrape
┃ お ─· .fast
┃ お ─· .fat
┃ お ─· .nightcore
┃ お ─· .reverse
┃ お ─· .robot
┃ お ─· .slow
┃ お ─· .smooth
┃ お ─· .squirrel
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *STORE MENU* ໒  ֵ  ׄ 
┃ お ─· .updatelist
┃ お ─· .jpm
┃ お ─· .jpm2
┃ お ─· .addlist
┃ お ─· .dellist
┃ お ─· .store
┃ お ─· .list
┃ お ─· .bagi
┃ お ─· .kali
┃ お ─· .kurang
┃ お ─· .tambah
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *PANEL MENU* ໒  ֵ  ׄ 
┃ お ─· .addsrv
┃ お ─· .addusr
┃ お ─· .listsrv
┃ お ─· .listusr
┃ お ─· .addusradmin
┃ お ─· .restartsrv
┃ お ─· .stopsrv
┃ お ─· .startsrv
┃ お ─· .delusr
┃ お ─· .delsrv
┃ お ─· .1gb - 10gb
┃ お ─· .unli
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *GAME MENU* ໒  ֵ  ׄ 
┃ お ─· .tebakkabupaten
┃ お ─· .tebakjkt48
┃ お ─· .tebakhewan
┃ お ─· .tebakml
┃ お ─· .tebakchara
┃ お ─· .tebaklogo
┃ お ─· .tebakaplikasi
┃ お ─· .tebakff
┃ お ─· .tebakhero
┃ お ─· .tebakgame
┃ お ─· .tebakgambar
┃ お ─· .tebakbendera
┃ お ─· .lengkapikalimat
┃ お ─· .asahotak
┃ お ─· .tebakkata
┃ お ─· .tebaktebakan
┃ お ─· .tebaklirik
┃ お ─· .tebakkimia
┃ お ─· .tebaksiapa
┃ お ─· .tebakkalimat
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *FUN MENU* ໒  ֵ  ׄ 
┃ お ─· .checkme
┃ お ─· .mitos
┃ お ─· .faktaunik
┃ お ─· .faktakucing
┃ お ─· .joke
┃ お ─· .suit
┃ お ─· .cekganteng
┃ お ─· .cekcantik
┃ お ─· .cekimut
┃ お ─· .cekjomok
┃ お ─· .cekwaifu
┃ お ─· .cekkpribadian
┃ お ─· .cekmasadepan
┃ お ─· .quotesgalau
┃ お ─· .truth
┃ お ─· .dare
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *RANDOM ANIME MENU* ໒  ֵ  ׄ 
┃ お ─· .neko
┃ お ─· .waifu
┃ お ─· .akira
┃ お ─· .akiyama
┃ お ─· .ana
┃ お ─· .asuna
┃ お ─· .ayuzawa
┃ お ─· .boruto
┃ お ─· .chitanda
┃ お ─· .chitoge
┃ お ─· .deidara
┃ お ─· .doraemon
┃ お ─· .elaina
┃ お ─· .emilia
┃ お ─· .erza
┃ お ─· .fanart
┃ お ─· .gremory
┃ お ─· .hestia
┃ お ─· .hinata
┃ お ─· .husbu
┃ お ─· .icon
┃ お ─· .inori
┃ お ─· .isuzu
┃ お ─· .itachi
┃ お ─· .itori
┃ お ─· .kaga
┃ お ─· .kagura
┃ お ─· .kaguya
┃ お ─· .kakasih
┃ お ─· .kaneki
┃ お ─· .kaori
┃ お ─· .keneki
┃ お ─· .kosaki
┃ お ─· .kotori
┃ お ─· .kuriyama
┃ お ─· .kuroha
┃ お ─· .kurumi
┃ お ─· .loli
┃ お ─· .madara
┃ お ─· .mikasa
┃ お ─· .miku
┃ お ─· .minato
┃ お ─· .naruto
┃ お ─· .natsukawa
┃ お ─· .nekonime
┃ お ─· .nezuko
┃ お ─· .nishimiya
┃ お ─· .onepiece
┃ お ─· .pokemon
┃ お ─· .rem
┃ お ─· .rize
┃ お ─· .sagiri
┃ お ─· .sakura
┃ お ─· .sasuke
┃ お ─· .shina
┃ お ─· .shinka
┃ お ─· .shizuka
┃ お ─· .simp
┃ お ─· .tomori
┃ お ─· .toukachan
┃ お ─· .yatogami
┃ お ─· .yuki
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *BUG MENU* ໒  ֵ  ׄ 
┃ お ─· .xandroid
┃ お ─· .xandroid2
┃ お ─· .xios
┃ お ─· .xios2
┃ お ─· .xgc
┃ お ─· .systemuicrash
┃ お ─· .xsysui
╰──────────── •

╭─ׁ ࣪ ִֶָ☾. *OTHERS MENU* ໒  ֵ  ׄ 
┃ お ─· .ping
┃ お ─· .speedtest
┃ お ─· .otakudesu
┃ お ─· .gempa
┃ お ─· .quotesanime
┃ お ─· .githubstalk
┃ お ─· .npmstalk
┃ お ─· .mlstalk
┃ お ─· .runtime
┃ お ─· .donate
┃ お ─· .script
┃ お ─· .repository
┃ お ─· .infobot
┃ お ─· .owner
┃ お ─· .getinfoch
┃ お ─· .getinfogc
┃ お ─· .jadibot
┃ お ─· .stopjadibot
┃ お ─· listjadibot
╰──────────── •
`}

global.ownerMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *OWNER MENU* ໒  ֵ  ׄ 
┃ お ─· .backup
┃ お ─· .addbadword
┃ お ─· .delbadword
┃ お ─· .listbadword
┃ お ─· .resetdbuser
┃ お ─· .resethit
┃ お ─· .setmenu
┃ お ─· .setreply
┃ お ─· .statustext
┃ お ─· .statusvideo
┃ お ─· .statusimage
┃ お ─· .statusaudio
┃ お ─· .upsaluran
┃ お ─· .setimgmenu
┃ お ─· .setvidmenu
┃ お ─· .addtitle
┃ お ─· .deltitle
┃ お ─· .addlimit
┃ お ─· .dellimit
┃ お ─· .addpremium
┃ お ─· .delpremium
┃ お ─· .listpremium
┃ お ─· .addowner
┃ お ─· .delowner
┃ お ─· .clearsession
┃ お ─· .joingroup
┃ お ─· .outgroup
┃ お ─· .joinchannel
┃ お ─· .outchannel
┃ お ─· .getsession
┃ お ─· .myip
┃ お ─· .shutdown
┃ お ─· .restart
┃ お ─· .kill
┃ お ─· .autoread
┃ お ─· .unavailable
┃ お ─· .autorecordtype
┃ お ─· .autorecord
┃ お ─· .autotype
┃ お ─· .autobio
┃ お ─· .autosticker
┃ お ─· .safesearch
┃ お ─· .autodownload
┃ お ─· .autoblock
┃ お ─· .onlygc
┃ お ─· .onlypc
┃ お ─· .self
┃ お ─· .public
┃ お ─· .setexif
┃ お ─· .setprefix
┃ お ─· .setautoblock
┃ お ─· .setantiforeign
┃ お ─· .pushcontact
┃ お ─· .savecontact
┃ お ─· .sendcontact
┃ お ─· .getcontact
┃ お ─· .contacttag
┃ お ─· .ban
┃ お ─· .unban
┃ お ─· .getcase
┃ お ─· .setppbot
┃ お ─· .deleteppbot
┃ お ─· .setbiobot
┃ お ─· .listpc
┃ お ─· .listgc
┃ お ─· .creategc
┃ お ─· .autoswview
┃ お ─· .anticall
┃ お ─· .addvideo
┃ お ─· .delvideo
┃ お ─· .listvideo
┃ お ─· .addimage
┃ お ─· .delimage
┃ お ─· .listimage
┃ お ─· .addsticker
┃ お ─· .delsticker
┃ お ─· .liststicker
┃ お ─· .addaudio
┃ お ─· .delaudio
┃ お ─· .listaudio
┃ お ─· .addlist
┃ お ─· .dellist
┃ お ─· .ceklist
╰──────────── •
`}

global.groupMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *GROUP MENU* ໒  ֵ  ׄ 
┃ お ─· .pushcontact
┃ お ─· .savecontact
┃ お ─· .sendcontact
┃ お ─· .getcontact
┃ お ─· .contacttag
┃ お ─· .antibadword
┃ お ─· .nsfw
┃ お ─· .antiaudio
┃ お ─· .antiforeign
┃ お ─· .antisticker
┃ お ─· .antiimage
┃ お ─· .antivideo
┃ お ─· .antiviewonce
┃ お ─· .antispam
┃ お ─· .antimedia
┃ お ─· .antidocument
┃ お ─· .anticontact
┃ お ─· .antilocation
┃ お ─· .antilocation
┃ お ─· .antilink
┃ お ─· .antilinkgc
┃ お ─· .mute
┃ お ─· .welcome
┃ お ─· .left
┃ お ─· .adminevent
┃ お ─· .groupevent
┃ お ─· .kick
┃ お ─· .add
┃ お ─· .promote
┃ お ─· .demote
┃ お ─· .setnamegc
┃ お ─· .setppgc
┃ お ─· .deleteppgc
┃ お ─· .setdesk
┃ お ─· .hidetag
┃ お ─· .listonline
┃ お ─· .group
┃ お ─· .editinfo
┃ お ─· .linkgc
┃ お ─· .resetlink
┃ お ─· .afk
┃ お ─· .addlist
┃ お ─· .dellist
┃ お ─· .ceklist
╰──────────── •
`}

global.searchMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *SEARCH MENU* ໒  ֵ  ׄ 
┃ お ─· .anime
┃ お ─· kusonimeinfo
┃ お ─· kusonimesearch
┃ お ─· otakudesu
┃ お ─· jkt48news
┃ お ─· mangainfo
┃ お ─· mangadetail
┃ お ─· .imdb
┃ お ─· .bukalapak
┃ お ─· .playstore
┃ お ─· .umma
┃ お ─· .happymod
┃ お ─· .ytsearch
┃ お ─· .tiktoksearch
┃ お ─· .pinterest
┃ お ─· .wallpaper
┃ お ─· .wikipedia
┃ お ─· .wikimedia
┃ お ─· .ringtone
┃ お ─· .traceanime
┃ お ─· .weather
┃ お ─· .presetam
┃ お ─· .soundcloud
┃ お ─· .lyrics
╰──────────── •
`}

global.downloadMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *DOWNLOAD MENU* ໒  ֵ  ׄ 
┃ お ─· .play
┃ お ─· .ytaudio
┃ お ─· .ytvideo
┃ お ─· .tiktokmp4
┃ お ─· .tiktokmp3
┃ お ─· .tiktokslide
┃ お ─· .instagram
┃ お ─· .facebook
┃ お ─· .fdown
┃ お ─· .gitclone
┃ お ─· .gdrive
┃ お ─· .savepin
┃ お ─· .mediafire
╰──────────── •
`}

global.convertMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *CONVERTER/TOOLS* ໒  ֵ  ׄ 
┃ お ─· .brat
┃ お ─· .ssweb
┃ お ─· .qc
┃ お ─· .s
┃ お ─· .swm
┃ お ─· .tourl
┃ お ─· .toimage
┃ お ─· .remini
┃ お ─· .fetch
┃ お ─· .toaudio
┃ お ─· .bass
┃ お ─· .blown
┃ お ─· .deep
┃ お ─· .earrape
┃ お ─· .fast
┃ お ─· .fat
┃ お ─· .nightcore
┃ お ─· .reverse
┃ お ─· .robot
┃ お ─· .slow
┃ お ─· .smooth
┃ お ─· .squirrel
╰──────────── •
`}

global.storeMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *STORE MENU* ໒  ֵ  ׄ 
┃ お ─· .updatelist
┃ お ─· .jpm
┃ お ─· .jpm2
┃ お ─· .addlist
┃ お ─· .dellist
┃ お ─· .store
┃ お ─· .list
┃ お ─· .bagi
┃ お ─· .kali
┃ お ─· .kurang
┃ お ─· .tambah
╰──────────── •
`}

global.panelMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *PANEL MENU* ໒  ֵ  ׄ 
┃ お ─· .addsrv
┃ お ─· .addusr
┃ お ─· .listsrv
┃ お ─· .listusr
┃ お ─· .addusradmin
┃ お ─· .restartsrv
┃ お ─· .stopsrv
┃ お ─· .startsrv
┃ お ─· .delusr
┃ お ─· .delsrv
┃ お ─· .1gb - 10gb
┃ お ─· .unli
╰──────────── •
`}

global.gameMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *GAME MENU* ໒  ֵ  ׄ 
┃ お ─· .tebakkabupaten
┃ お ─· .tebakjkt48
┃ お ─· .tebakhewan
┃ お ─· .tebakml
┃ お ─· .tebakchara
┃ お ─· .tebaklogo
┃ お ─· .tebakaplikasi
┃ お ─· .tebakff
┃ お ─· .tebakhero
┃ お ─· .tebakgame
┃ お ─· .tebakgambar
┃ お ─· .tebakbendera
┃ お ─· .lengkapikalimat
┃ お ─· .asahotak
┃ お ─· .tebakkata
┃ お ─· .tebaktebakan
┃ お ─· .tebaklirik
┃ お ─· .tebakkimia
┃ お ─· .tebaksiapa
┃ お ─· .tebakkalimat
╰──────────── •
`}

global.funMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *FUN MENU* ໒  ֵ  ׄ 
┃ お ─· .checkme
┃ お ─· .mitos
┃ お ─· .faktaunik
┃ お ─· .faktakucing
┃ お ─· .joke
┃ お ─· .suit
┃ お ─· .cekganteng
┃ お ─· .cekcantik
┃ お ─· .cekimut
┃ お ─· .cekjomok
┃ お ─· .cekwaifu
┃ お ─· .cekkpribadian
┃ お ─· .cekmasadepan
┃ お ─· .quotesgalau
┃ お ─· .truth
┃ お ─· .dare
╰──────────── •
`}

global.randomAnimeMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *RANDOM ANIME MENU* ໒  ֵ  ׄ 
┃ お ─· .neko
┃ お ─· .waifu
┃ お ─· .akira
┃ お ─· .akiyama
┃ お ─· .ana
┃ お ─· .asuna
┃ お ─· .ayuzawa
┃ お ─· .boruto
┃ お ─· .chitanda
┃ お ─· .chitoge
┃ お ─· .deidara
┃ お ─· .doraemon
┃ お ─· .elaina
┃ お ─· .emilia
┃ お ─· .erza
┃ お ─· .fanart
┃ お ─· .gremory
┃ お ─· .hestia
┃ お ─· .hinata
┃ お ─· .husbu
┃ お ─· .icon
┃ お ─· .inori
┃ お ─· .isuzu
┃ お ─· .itachi
┃ お ─· .itori
┃ お ─· .kaga
┃ お ─· .kagura
┃ お ─· .kaguya
┃ お ─· .kakasih
┃ お ─· .kaneki
┃ お ─· .kaori
┃ お ─· .keneki
┃ お ─· .kosaki
┃ お ─· .kotori
┃ お ─· .kuriyama
┃ お ─· .kuroha
┃ お ─· .kurumi
┃ お ─· .loli
┃ お ─· .madara
┃ お ─· .mikasa
┃ お ─· .miku
┃ お ─· .minato
┃ お ─· .naruto
┃ お ─· .natsukawa
┃ お ─· .nekonime
┃ お ─· .nezuko
┃ お ─· .nishimiya
┃ お ─· .onepiece
┃ お ─· .pokemon
┃ お ─· .rem
┃ お ─· .rize
┃ お ─· .sagiri
┃ お ─· .sakura
┃ お ─· .sasuke
┃ お ─· .shina
┃ お ─· .shinka
┃ お ─· .shizuka
┃ お ─· .simp
┃ お ─· .tomori
┃ お ─· .toukachan
┃ お ─· .yatogami
┃ お ─· .yuki
╰──────────── •
`}

global.bugMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *BUG MENU* ໒  ֵ  ׄ 
┃ お ─· .xandroid
┃ お ─· .xandroid2
┃ お ─· .xios
┃ お ─· .xios2
┃ お ─· .xgc
┃ お ─· .systemuicrash
┃ お ─· .xsysui
╰──────────── •
`}

global.otherMenu = (prefix, hituet) => {
return`
╭─ׁ ࣪ ִֶָ☾. *OTHERS MENU* ໒  ֵ  ׄ 
┃ お ─· .ping
┃ お ─· .speedtest
┃ お ─· .otakudesu
┃ お ─· .kusonimeinfo
┃ お ─· .kusonimesearch
┃ お ─· .quotesanime
┃ お ─· .gempa
┃ お ─· .githubstalk
┃ お ─· .npmstalk
┃ お ─· .mlstalk
┃ お ─· .runtime
┃ お ─· .donate
┃ お ─· .script
┃ お ─· .repository
┃ お ─· .infobot
┃ お ─· .owner
┃ お ─· .getinfoch
┃ お ─· .getinfogc
┃ お ─· .jadibot
┃ お ─· .stopjadibot
┃ お ─· listjadibot
╰──────────── •
`}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})