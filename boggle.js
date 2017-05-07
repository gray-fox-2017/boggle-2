"use strict"
let words = ["TEST", "WORD", "HOPE", "TRUE", "TOP", "HOST", "DED", "TROOPER", "IT"];

class Boggle {
  constructor() {
    this.dict = words;
    this.board = this.shake(4);
    this.exampleBoard =
    [['T', 'E', 'S', 'T'],
     ['W', 'O', 'R', 'D'],
     ['H', 'O', 'P', 'E'],
     ['T', 'R', 'U', 'E']]
  }

  shake(number) {
    let board = [];

    for(let i = 0; i < number; i++) {
      board[i] = [];
      for(let j = 0; j < number; j++) {
        board[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      }
    }
    return board;
  }

  solve() {
    let puzzle = this.exampleBoard;
    let solved = [];
    for(let i = 0; i < this.dict.length; i++) {
      let intact = this.dict[i];
      let index = this.checkFirstLetter(intact, puzzle);
      if(index.length > 0) {
        let sliced = intact.slice(1);
        for(let i = 0; i < index.length; i++) {
          this.checker(solved, sliced, intact, index[i], [index[i]], puzzle);
        }
      }
    }
    console.log("Found words are:");
    for(let i = 0; i < solved.length; i++) {
      console.log(solved[i]);
    }
  }

  checkFirstLetter(word, puzzle) {
    let index = [];
    for(let i = 0; i < puzzle.length; i++) {
      for(let j = 0; j < puzzle.length; j++) {
        if(puzzle[i][j] == word[0]) index.push([i, j])
      }
    }
    return index;
  }

  checker(solved, sliced, word, current, recordedMove, puzzle) {
    if(sliced.length == 0) {
      solved.push(word);
      return solved;
    }
    let neighborIndex = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]];

    for(let i = 0; i < neighborIndex.length; i++) {
      let row = current[0] + neighborIndex[i][0];
      let col = current[1] + neighborIndex[i][1];
      if(0 <= row && row < puzzle.length && 0 <= col && col < puzzle.length) {
        if(this.legalMove([row, col], recordedMove)) {
          if(puzzle[row][col] == sliced[0]) {
            let newCurrent = [row, col];
            let newSliced = sliced.slice(1);
            if(newSliced.length == 0) {
              solved.push(word);
              return solved;
            } else {
              recordedMove.push(newCurrent);
              return this.checker(solved, newSliced, word, newCurrent, recordedMove, puzzle)
            }
          }
        }
      }
    }
  }

  legalMove(tested, recordedMove) {
    for(let i = 0; i < recordedMove.length; i++) {
      if(tested[0] == recordedMove[i][0] && tested[1] == recordedMove[i][1]) {
        return false;
      }
    }
    return true;
  }
}

let boggle = new Boggle();

console.log(boggle.exampleBoard);
boggle.solve();
