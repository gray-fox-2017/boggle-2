const words = require('./data.js')

function shake(num) {
  if (num < 4) {
    return 'Error'
  }
  var barisan = []
  var jumlah = num * num;
  var alphabet = "SENINSELASARABUKAMISJUMATSABTUMINGGUAIUEOABCDEFGHIJKLMNOPQRSTUVWXYZ"
  for (let i = 0; i<jumlah;i++) {
    barisan.push(alphabet.charAt(Math.floor(Math.random()* alphabet.length)))
  }
  var papan = [];
  for (let i=0;i<jumlah;i+=num) {
    papan.push(barisan.slice(i,num+i));
  }
  return papan.map(x=> x.join(' ')).join('\n')

}

var kamus = words.words;

function kataKata(num) {
  var kataPilihan = [];
  for (let i=0; i<num; i++) {
    let index = Math.floor(Math.random()*kamus.length)
    kataPilihan.push(kamus[index])
  }
  return kataPilihan
}


function solve(papan, kata) {
  let barisPapan = papan.split('\n').join(' ').split(' ');
  let ukuranPapan = Math.sqrt(barisPapan.length);
  let sementara = [];
  let kataDicari = kata.map(x=>x.split(''))
  var countGagal = 0

  for (let i=0;i<kata.length;i++) {
    for (let a=0;a<kataDicari[i].length;a++) {
      let index = barisPapan.indexOf(kataDicari[i][a])
      if (index === -1) {
        countGagal++
      }
    }
    if (countGagal == 0) {
      sementara.push(kata[i])
    }
    countGagal = 0
  }

  return sementara;
}




var papannya = shake(4)
var katanya = kataKata(5)
console.log(`Daftar kata yang dicari:\n${katanya.join('\n')}\n`)
console.log(papannya)
var yangKetemu = solve(papannya, katanya);
if (yangKetemu = []) {
  yangKetemu = ['<kosong>']
}
console.log(`\ndan kata yang di temukan dipapan adalah:\n${yangKetemu.join('\n')}`)