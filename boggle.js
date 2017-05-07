'use strict'
import words from "./data.js"

class BoggleBoard {
  constructor() {
    this.dict = words;
    this.init = [];
    this.result = [];
  }

  shake(n) {
    let board = [];
    for (let i=0; i<n; i++) {
      board [i] = [];
      for (let j=0; j<n; j++) {
        board[i][j] = String.fromCharCode(Math.floor(Math.random()*26+65));
      }
    }
    this.init = board;
    let finalBoard = this.board(board);
    return finalBoard;
  }

  board(board) {
    let printBoard = "";
    let dashLine = "-".repeat(board.length*4+1)
    printBoard += dashLine+"\n";
    for (let i=0; i<board.length;i++){
      printBoard += "| ";
      printBoard += board[i].join(" | ") + " |" + "\n";
      printBoard += dashLine + "\n";
    }
    return printBoard;
  }

  solve() {
    for (let i=0; i<this.dict.length; i++) {
      let word = this.dict[i];
      let pos = this.initCheck(word);
      if (pos.length>0) {
        let suffix = word.slice(1);
        for (let j=0; j<pos.length; j++) {
          let visited = [`${pos[j][0]},${pos[j][1]}`];
          this.check(suffix,word,pos[j],visited);
        }
      }
    }
    // return only unique words
    this.result = [...new Set(this.result)];
    console.log(`${this.result.length} kata ditemukan`);
    for (let k=0; k<this.result.length; k++) {
      console.log(this.result[k]);
    }
  }

  initCheck(word) {
    let pos = [];
    for (let i=0; i<this.init.length; i++) {
      for (let j=0; j<this.init.length; j++) {
        if (this.init[i][j] == word[0]) {
          pos.push([i,j]);
        }
      }
    }
    return pos;
  }

  check(suffix,word,curPos,visited) {
    if (suffix.length === 0) {
      this.result.push(word);
      return ;
    }
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<= 1; j++) {
        if (i===0 && j===0) continue;
        let row = i + curPos[0];
        let col = j + curPos[1];
        if (row>=0 && col>=0 && row<this.init.length && col<this.init.length && !visited.includes(`${row},${col}`)) {
          if (this.init[row][col] == suffix[0]) {
            let newPos = [row,col];
            let newSuffix = suffix.slice(1);
            if (newSuffix.length == 0) {
              this.result.push(word);
              return ;
            }
            visited.push(`${row},${col}`);
            return this.check(newSuffix,word,newPos,visited);
          }
        }
      }
    }
  }
}

let boggle = new BoggleBoard();
console.log(boggle.shake(5));
boggle.solve();
