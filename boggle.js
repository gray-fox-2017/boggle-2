const fs = require('fs')

class BoogleBoard {
  constructor(size) {
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.boggleBoardSize = size
    this.dict = fs.readFileSync('data.js').toString().split('\n')
    this.boggle_board = this.shake()
    this.boardchoice = this.testboard()
  }

  testboard(){
    let test = [['W', 'O', 'I', 'R'],
                ['B', 'K', 'A', 'G'],
                ['S', 'I', 'U', 'A'],
                ['A', 'G', 'Z', 'A']];
    return test
  }

  kamusmanual(){
    let kamus = ['WOI','ASLI','INI','CHALLANGE','RIBET','BANGET','ANJER','UDA','SEHARIAN','KAGA','SOLVE','JUGA','MASA'
  ,'GW','AMPE','BIKIN','KAMUS','SENDIRI','GARA','GAK','TAU','CARA','SPLIT','SI','DATAJS']
    return kamus
  }
  
  shake() {
    let board = [];
    for (var i = 0; i < this.boggleBoardSize; i++) {
      let temp = [];
      for (var j = 0; j < this.boggleBoardSize; j++) {
        let generate = this.letters.split('')[Math.floor(Math.random() * 26)]
        temp.push(generate);
      }
      board.push(temp);
    }
    return board;
  }

  solve() {
    let result = [];
    let found;
    for (let i = 0; i < this.kamusmanual().length; i++) {
      found = this.kamusmanual()[i];
      for (let row = 0; row < this.boggleBoardSize; row++) {
        for (var col = 0; col < this.boggleBoardSize; col++) {
          if (this.boardchoice[row][col] == found[0]) {
            let word = this.checkletter(found.slice(1), found[0], found, [row, col], [[row, col]]);
            //console.log(word)
            if (word == found) {
              result.push(word);

            }
          }
        }

      }
    }
    // console.log(hasilArr.length);

    if (result.length == 0) {
      console.log('no word founded!');
    } else {
      console.log(`${result.length} words founded!`);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
      }
    }

  }

  checkletter(word, letter, found, position, prevmove) {
    if (word.length == 0) {
      return letter;
    }

    let areaCheck = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1. -1],
      [1, 0],
      [1, 1]
    ];



    for (let i = 0; i < areaCheck.length; i++) {
      let row = position[0] + areaCheck[i][0];
      let col = position[1] + areaCheck[i][1];

      if (row >= 0 && row < this.boggleBoardSize &&
        col >= 0 && col < this.boggleBoardSize &&
        this.checkmove([row, col], prevmove) === true) {

        if (this.boardchoice[row][col] == word[0]) {
          prevmove.push([row,col]);

          results = this.checkletter(word.slice(1), letter + word[0], found, [row,col], prevmove);
          if (results == found) {
            return results;
          } else {
            this.checkletter(word.slice(1), letter + word[0], found, [row,col], prevmove);
          }
        }

      }
    }
    return ''
  }

  checkmove(nextmove, prevmove) {
    for (let i = 0; i < prevmove; i++) {
      if (nextmove[0] === prevmove[i][0] && nextmove[1] === prevmove[i][1]) {
        return false;
      }
    }
    return true;
  }

}

let test= new BoogleBoard(4);
console.log(test.boardchoice);
test.solve();
//console.log(test.checkmove([0,0],[[0,0]]))

