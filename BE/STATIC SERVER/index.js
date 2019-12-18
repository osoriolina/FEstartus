const express = require('express')
const servidor = express();

let https = require('https')
let  fs = require('fs')
 
servidor.use(express.static('public'));

https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/startus.es/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/startus.es/fullchain.pem')
}, servidor)
.listen(443, () => {
   console.log('servidor escuchando puerto 443');
  
})
