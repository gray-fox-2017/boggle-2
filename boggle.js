
//This TRUE
const fs = require('fs');

class BoggleBoard {
  constructor(size) {
    this.size = size;
    this.board = [];

    let huruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.alphabet = huruf.split("");
    this.elements = {};
    this.words = [];
    this.rawMatch = [];
    this.matchingWords = [];
  }

  shake() {
    for (let i = 0; i < this.size; i++) {
      let fill =[];
      for (let j = 0; j < this.size; j++) {
        let letter = this.alphabet[Math.floor(Math.random()*this.alphabet.length)];
        fill.push(letter);
      }
      this.board.push(fill);
    }
    return this.board;
  }

  createElem() {
  let index = 0;
    for (let i = 0; i < this.size; i++) {
    for (let j =0; j < this.size; j++) {
      let obj = {id: index,
              row: i,
              col: j,
              letter: this.board[i][j]
           };
      this.elements[`${i}-${j}`] = obj;
    }
  }
  }

  importWords(filename) {
    let data = fs.readFileSync(filename).toString();
    let arrayPattern = /[A-Z][A-Z]+/g;
    let words = data.match(arrayPattern);
    this.words = words;
  }

  possibleMoves(row, col, trMovs = []) {
    let posMov = [];
    let movCol = [];
    let movRow = [];

    movCol.push(col);
    movRow.push(row);

    if (col - 1 >= 0) {
      movCol.push(col - 1);
    }
    if (col + 1 < this.size) {
      movCol.push(col + 1);
    }
    if (row - 1 >= 0) {
      movRow.push(row - 1);
    }
    if (row + 1 < this.size) {
      movRow.push(row + 1);
    }

    for (let i = 0; i < movRow.length; i++) {
      for (let j = 0; j < movCol.length; j++) {
        posMov.push([movRow[i],movCol[j]]);
        for (let i = 0; i < posMov.length; i++) {
        if (posMov[i][0] === row && posMov[i][1] === col) {
          posMov.splice(i,1);
        }
      }
      for (let i = 0; i < posMov.length; i++) {
        if (this.PrevMoves(trMovs, posMov[i])) {
          posMov.splice(i, 1);
        }
      }

      }
    }
    return posMov;

  }


  possibleWords(string) {
    let words = [];
    let pattern = new RegExp(string);
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i].indexOf(string) === 0) {
        words.push(this.words[i]);
      }
    }
    return words;
  }

  PrevMoves(previousMoves, possibleMove) {
    let found = 0;
    if (previousMoves.length > 0) {
      for (let i = 0; i < previousMoves.length; i++) {
        if (previousMoves[i][0] === possibleMove[0]) {
          if (previousMoves[i][1] === possibleMove[1]) {
            found += 1;
          }
        }
      }
    }

    if (found > 0) {
      return true;
    } else {
      return false;
    }
  }

  genSolver(row, col, string = "", trMovs = []) {
    trMovs.push([row, col]);
    string += this.elements[`${row}-${col}`].letter;
    let posMovs = this.possibleMoves(row, col, trMovs);
    let posWords = this.possibleWords(string);
    if (posMovs.length === 0 || posWords.length == 0) {
      return false;
    } else if (posWords.length === 1) {
      if (String(posWords).length === string.length) {
        this.rawMatch.push(string);
        return true;
      } else {
        return false;
      }
    } else {
      for (let i = 0; i < posMovs.length; i++) {
        let newRow = posMovs[i][0];
        let newCol = posMovs[i][1];
        this.genSolver(newRow, newCol, string, trMovs);
      }
      for (let i = posMovs.length-1; i >= 0; i--) {
        let newRow = posMovs[i][0];
        let newCol = posMovs[i][1];
        this.genSolver(newRow, newCol, string, trMovs);
      }
    }
  }


  wordMatch() {
  let rawMatch = new Set(this.rawMatch);
  rawMatch.forEach((word) => {this.matchingWords.push(word)});
  this.matchingWords.sort();
  }

}

// Driver code
let boggle = new BoggleBoard(4);
let data = "data.js";

boggle.importWords(data);
boggle.shake();
boggle.createElem();

console.log("Boggle Board: ");
for (let i = 0; i < boggle.size; i++) {
  console.log(" " + boggle.board[i].join(" | "));
}

console.log();

for (let i = 0; i < boggle.size; i++) {
  for (let j = 0; j < boggle.size; j++) {
    boggle.genSolver(i,j);
  }
}

for (let i = boggle.size - 1 ; i > 0; i--) {
  for (let j = boggle.size - 1; j > 0; j--) {
    boggle.genSolver(i,j);
  }
}


boggle.wordMatch();
console.log(`Matching words based on ${data}`);
boggle.matchingWords.forEach((word) => {console.log(word)});
