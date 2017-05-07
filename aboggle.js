'use strict'
//import words from "./data.js"

class BoggleBoard {
  constructor() {
    //this.dict = words;
    //this.init = this.shake();
    this.dict = ['REX','FOX','FAN','SORE','SEX','SOX','NOSE'];
    this.init = [['R','E','X'],['I','O','S'],['F','A','N']];
    this.result = [];
  }

  //  shake(n) {
  //    let board = [];
  //    for (let i=0; i<n; i++) {
  //      board [i] = [];
  //      for (let j=0; j<n; j++) {
  //        board[i][j] = String.fromCharCode(Math.floor(Math.random()*26+65));
  //      }
  //    }
  //    let finalBoard = this.printBoard(board);
  //    return finalBoard;
  //  }
  //
  //  printBoard(board) {
  //    let printBoard = "";
  //    let dashLine = "-------------"
  //    printBoard += dashLine+"\n";
  //    for (let i=0; i<board.length;i++){
  //      printBoard += "| ";
  //      printBoard += board[i].join(" | ") + " |" + "\n";
  //      printBoard += dashLine + "\n";
  //    }
  //    return printBoard;
  //  }

  solve() {
    for (let i=0; i<this.init.length; i++) {
      for (let j=0; j<this.init.length; j++) {
        let curLetters = this.init[i][j];
        let curPos = [i,j];
        let crumPos = [`${i},${j}`];
        let dict = this.firstFilter(this.dict,this.init[i][j]);
        if (dict.length) {
          this.checkWord(dict,curLetters,curPos,crumPos); 
        }
      }
    }
  }

  firstFilter (dict, letter) {
    let filterOne = "^" + letter;
    let regexOne = new RegExp(filterOne);
    dict = dict.filter(key => regexOne.test(key));
    return dict;
  }

  checkWord(dict,curLetters,curPos,crumPos){
    let visited = [`${curPos[0]},${curPos[1]}`];
    for (let k=-1;k<=1;k++){
      for (let l=-1;l<=1;l++) {
        if (k===0&&l===0) continue;
        console.log(`curPos = ${curPos}`);
        let row = k+curPos[0];
        let col = l+curPos[1];
        if (row>=0 && col>=0 && row<this.init.length && col<this.init.length && !visited.includes(`${row},${col}`)&& !crumPos.includes(`${row},${col}`)) {
          visited.push(`${row},${col}`);
          let filterDict = "^"+curLetters+this.init[row][col];
          let regexDict = new RegExp(filterDict);
          let dict2 = dict.filter(key => regexDict.test(key));
          console.log("row, col: ");
          console.log(row,col);
          console.log("crumPos ");
          console.log(crumPos);
          if (dict2.length) {
          console.log(dict2);
            curPos = [row,col];
            curLetters += this.init[row][col];
            crumPos.push(`${row},${col}`);
            if (dict2.includes(curLetters)) {
              this.result.push(curLetters);
            }
            this.checkWord(dict,curLetters,curPos,crumPos);
          }
          else {
            continue;
          }
        }
      }
    }
  }
}

let boggle = new BoggleBoard();
//console.log(boggle.shake(3));
boggle.solve();
console.log(boggle.result);
