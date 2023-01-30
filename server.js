const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app)

const port = process.env.PORT || 10000;

app.get('/',  (req, res) => {
    // 1 - MRZ;       2 - VIZ  
    var givenName1="MIHAI"; var givenName2="|HiHAI";
    var surName1=""; var surName2="";
    var fullName1=""; var fullName2="";

    let mrz = 'PEROUCOSMA<<MIHAI<<<<<<<<<<<<<<<<<<<<<<<<<3<'
    let prenume = ''
    // var i = 0; while (i++) {
    //     if (mrz.charAt(i) === '<') mrz = mrz.substring(i + 1, mrz.length)
    // }

    // for(let i = 0; i < mrz.length -1 ; i++) {
    //     // console.log(mrz.substring(i, i+2))
    //     if (mrz.substring(i, i+2) == '<<') {
    //         // console.log('substring: ' +  mrz.substring(i + 2, mrz.length) + ' ' + mrz.substring(i + 2, mrz.length).length)
    //         prenume = mrz.substring(i + 2, mrz.length)
    //         break
    //     }
    //     // if(mrz.substring(i - 3, i) !== '<<<') { console.log(true)}
    // }

    var fori = givenName1.length; 
    while (fori--) { 
        if ((givenName1.charAt(fori) == ' ') && (givenName2.charAt(fori) == '-')) givenName2 = givenName2.substring(0, fori) + ' ' + givenName2.substring(fori + 1);
    } // ambele stringuri fara '-'
    if(mrz.substring(prenume.length -3) !== '<<<') { 
        console.log(true)
        console.log(mrz.substring(prenume.length  - 3, prenume.length))
        if(givenName1.length === givenName2.length && givenName1 == givenName2) {
            return
        } else {
            if(givenName2.length > givenName1.length) {
                givenName1 = givenName1 + givenName2.substring(givenName1.length, givenName2.length)
            }
            if((givenName2.match(/^[A-Za-z]*$/))) {
                givenName1 = givenName2
            }
        }
        console.log(givenName1)
    } else {  
        console.log(false) 
    }

    

    // for(let i = prenume.length; i > 0 ; i--) {
    //     console.log(prenume.substring(i, i - 3));
    // }
    // console.log('prenume: ' + prenume + ' ' + prenume.length)
})

server.listen(port, () => {
    console.log('Server is on port ' + port)    
})