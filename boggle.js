function shake(dimension){
  let alphabetArray = [];
  for(let i='A'.charCodeAt(0), j='Z'.charCodeAt(0);i<=j;i++){
    alphabetArray.push(String.fromCharCode(i))
  }
  //console.log(alphabetArray);
  let randomizedArray = []
  for(let i=0;i<Math.pow(dimension,2);i++){
    let randomizer = Math.floor(Math.random()*26)
    randomizedArray.push(alphabetArray[randomizer])
  }
  //console.log(randomizedArray);
  let boggleArray = []
  for(let i=0;i<randomizedArray.length;i+=dimension){
    boggleArray.push(randomizedArray.slice(i,i+dimension))
  }
  return boggleArray
}

const fs = require('fs');
let data = fs.readFileSync('data.js','utf8').split('=');
let myDictionary = data[1].trim().slice(1,-1).replace(/(")([a-z\-]+)(")/gi,"$2").split(',');

let myBoard = shake(4);
console.log(myBoard);
let dimension = myBoard.length
let boardCheck = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
solve()

function solve() {
  let tempWord = []
  for (let i = 0; i < myDictionary.length; i++) {
    let currentWord = myDictionary[i]
    for (let j = 0; j < dimension; j++) {
      for (let k = 0; k < dimension; k++) {
        //tempWord = currentWord[0]
        if (currentWord[0] == myBoard[j][k]) {
          let remainingCharacter = currentWord.slice(1)
          let coordinate = [j, k]
          let coordinateArray = [coordinate]
          let cekKata = correctWord(remainingCharacter, coordinate, coordinateArray, currentWord[0], currentWord)
          if (cekKata === currentWord) {
            tempWord.push(cekKata)
          }
        }
      }
    }
  }
  if (tempWord.length == 0) {
      console.log('No word found');
  } else {
    console.log(`${tempWord.length} words found:`);
    for (let i = 0; i < tempWord.length; i++) {
        console.log(tempWord[i]);
    }
  }
}

function correctWord(remainingCharacter, coordinate, coordinateArray, tempWord, word) {
  if (remainingCharacter.length === 0) {
      return tempWord
  }
  for (let i = 0; i < boardCheck.length; i++) {
    if (coordinate[0] + boardCheck[i][0] >= 0 && coordinate[0] + boardCheck[i][0] < dimension) {
      if (coordinate[1] + boardCheck[i][1] >= 0 && coordinate[1] + boardCheck[i][1] < dimension) {
        let X = coordinate[0] + boardCheck[i][0]
        let Y = coordinate[1] + boardCheck[i][1]
        let tempCek = ((destination, visited) => {
            for (let a = 0; a < visited.length; a++) {
                if (destination[0] == visited[a][0] && destination[1] === visited[a][1]) {
                    return false
                }
            }
            return true
        })
        if (tempCek([X, Y], coordinateArray) == true) {
          if (myBoard[X][Y] == remainingCharacter[0]) {
            let cekKata = correctWord(remainingCharacter.slice(1), [X, Y], coordinateArray, tempWord + remainingCharacter[0], word)
            if (cekKata == word) {
              return cekKata
            } else {
              correctWord(remainingCharacter.slice(1), [X, Y], coordinateArray, tempWord + remainingCharacter[0], word)
            }
          }
        }
      }
    }
  }
}

