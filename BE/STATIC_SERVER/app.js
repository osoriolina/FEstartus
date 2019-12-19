const express = require('express')
const servidor = express();
 
servidor.use(express.static('public'));

servidor.listen(80, () => {
    console.log("Puerto 80");
    
})

