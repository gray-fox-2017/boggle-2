function generateRandomLetter() {
  let letterArr = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  let randomIndex = Math.floor(Math.random() * (letterArr.length - 0)) + 0;
  return letterArr[randomIndex]
}

function displayRandomBoard() {
  let boardLength = 4
  let boardArr = []
  for (let i = 0; i < boardLength; i++) {
    let tmpArr = []
    for (let j = 0; j < boardLength; j++) {
      let randomLetter = generateRandomLetter();
      tmpArr.push(randomLetter);
    }
    boardArr.push(tmpArr)
  }
  return boardArr;
}

function dummyBoard() {
  let row1 = "adaj".split("")
  let row2 = "pkmk".split("")
  let row3 = "ajkk".split("")
  let row4 = "hhhh".split("")
  let board = [row1, row2, row3, row4]
  return board;
}

function check(i, j, word) {
  // [kanan, DBKan, bawah, DBkir, Kiri, DAkir, atas, DAKan]
  let checkKoor = [[i+1,j], [i+1,j+1], [i, j+1], [i+1, j-1], [i, j-1], [i-1, j-1], [i-1, j],   [i-1, j+1]];
  return checkKoor;
}

var dict = ["ada", "apa", "kamu"]
let dummy = dummyBoard()
let k = dict.length - 1
let checkArr = []
while (k > 0) {
  for (let i = 0; i < dummy.length; i++) {
    for (let j = 0; j < dummy[i].length; j++) {
      // console.log(`huruf pertama ${dict[k].charAt(0)}`);
      if (dummy[i][j] == dict[k].charAt(0)) {
        checkArr.push([i, j])
      } else {continue}
    }
  }
  k -= 1
}
// console.log(dummy);
// console.log(checkArr);
console.log(check(1,1, "aku"));




// 1.
// console.log(dummyBoard());
