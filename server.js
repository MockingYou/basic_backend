const express = require('express');
const http = require('http')
const app = express();
const server = http.createServer(app)

const port = process.env.PORT || 10000;

app.get('/',  (req, res) => {
    // 1 - MRZ;       2 - VIZ  
    var givenName1="MIHAI AND"; var givenName2="|Hi^^H$%AI-An|pREI";
    var surName1="COSMA";
    var fullName1=""; 

    let mrz = 'PEROUCOSMA<<MIHAI<<<<<<<<<<<<<<<<<<<<<<<<<3<'

    var maxlength = 6 // verificare doar pentru ultimele "x" litere din string ul de nume
    var threshold = 5 // cate litere sa fie la fel ca sa adauge la final


    let name = checkNameComplete(mrz, givenName1, givenName2, surName1, fullName1, maxlength, threshold)
   fullName1 = name + ' ' + surName1
    console.log(name)
    // console.log(givenName2)
    console.log(fullName1)
})

function checkNameComplete(mrz, givenName1, givenName2, surName1, fullName1, maxlength, threshold) {
    var inc = 0 //increment pentru aceleasi litere
    var nameSubstring1 = ''
    var nameSubstring2 = ''
    if(mrz.substring(mrz.length -2) !== '<<') {
        var i = givenName2.length; 
        while (i--) { 
            if (/^[A-Za-z\s\-]*$/.test(givenName2.charAt(i)) == false) {
                givenName2 = givenName2.substring(0, i) + '' + givenName2.substring(i + 1);
                givenName2 = givenName2.toUpperCase()
            }
            if ((givenName2.charAt(i) == '-')) givenName2 = givenName2.substring(0, i) + ' ' + givenName2.substring(i + 1);
        }
        nameSubstring1 = givenName1.substring(givenName1.length - maxlength, givenName1.length)
        nameSubstring2 = givenName2.substring(givenName1.length - maxlength, givenName1.length)
        console.log(givenName1 + '    ' + givenName2)
        if(givenName2.length > givenName1.length) {
            for(let j = nameSubstring1.length; j > 0 ; j--) {
                console.log(nameSubstring1.substring(j-1, j) + '    ' + nameSubstring2.substring(j-1, j))
                if(nameSubstring1.substring(j-1, j) === nameSubstring2.substring(j-1, j)) {
                    inc++
                }
            }
            console.log(inc)

            if(inc >= threshold) {
                return givenName1 = givenName1 + givenName2.substring(givenName1.length, givenName2.length)
                    // console.log('concat'+givenName1)
                } else {
                    return givenName1 = givenName2
                    // console.log('replace'+givenName1)
                }
            }
            fullName1 = givenName1 + ' ' + surName1
            
            // console.log(givenName2)
            // console.log(fullName1)
    }
    
}









// verificare caz particular in care numele din mrz nu este complet 
if(mrz.substring(mrz.length -2) !== '<<') {
    givenName1 = checkFullName(givenName1, givenName2, 5, 6)
    fullName1 = givenName1 + ' ' + surName1
    dbModule.setAudit('Modificare nume', '-1','--',false,true,-1,'','','---','-','-',0,'-','Fullname modificat')
    }
    
                
                
                
                function checkFullName(givenName1, givenName2, maxlength, threshold) { // maxlength -> ultimele "x" caractere din string givenname; threshold -> cate caractere sa coincida ca sa adauge la sfarsitul stringului
      var inc = 0 //increment pentru aceleasi litere
      var nameSubstring1 = ''
      var nameSubstring2 = ''
      
      var i = givenName2.length; 
      while (i--) { 
        if (/^[A-Za-z\s\-]*$/.test(givenName2.charAt(i)) == false) {
          givenName2 = givenName2.substring(0, i) + '' + givenName2.substring(i + 1);
          givenName2 = givenName2.toUpperCase()
        }
        if ((givenName2.charAt(i) == '-')) givenName2 = givenName2.substring(0, i) + ' ' + givenName2.substring(i + 1);
      }
      nameSubstring1 = givenName1.substring(givenName1.length - maxlength, givenName1.length)
      nameSubstring2 = givenName2.substring(givenName1.length - maxlength, givenName1.length)
      if(givenName2.length > givenName1.length) {
        for(let j = nameSubstring1.length; j > 0 ; j--) {
          if(nameSubstring1.substring(j-1, j) === nameSubstring2.substring(j-1, j)) {
            inc++
          }
        }
        if(inc >= threshold) {
          dbModule.setAudit('Modificare nume', '-1','--',false,true,-1,'','','---','-','-',0,'-','Prenumele a fost completat cu prenumele din VIZ')
          return givenName1 = givenName1 + givenName2.substring(givenName1.length, givenName2.length)
        } else {
          dbModule.setAudit('Modificare nume', '-1','--',false,true,-1,'','','---','-','-',0,'-','Prenumele a fost inlocuit cu prenumele din VIZ')
          return givenName1 = givenName2
        }
      }
    }












server.listen(port, () => {
    console.log('Server is on port ' + port)    
})