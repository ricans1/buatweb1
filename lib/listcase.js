/* 
- _ -
*/

const fs = require('fs')
const chalk = import('chalk')
const util = require('util')

const listCase = () => {
const code = fs.readFileSync("./case.js", "utf8")
var regex = /case\s+'([^']+)':/g;
var matches = [];
var match;
while ((match = regex.exec(code))) {
matches.push(match[1]);
}
let teks = `*Total Case*: ${matches.length} \n\n` 
matches.forEach(function (x) {
   teks += "  ◦  " + x + "\n"
})
return teks
}
const listCasee = () => {
   const code = fs.readFileSync("./case.js", "utf8")
   var regex = /case\s+'([^']+)':/g;
   var matches = [];
   var match;
   while ((match = regex.exec(code))) {
   matches.push(match[1]);
   }
   teks = '['
   matches.forEach(function (x) {
      teks += "" + x + ", "
   })
   teks += ']'
   return teks
   }
module.exports = {
   listCase, listCasee
}