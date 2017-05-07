'use strict'

class BoogleBoard {
  constructor() {
    //this.kamus = {"","",""}
    this.board = []
  }

	shake(number) {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let board = [];
		for (let i = 0; i < number; i++) {
      board[i] = [];
      for (let j = 0; j < number; j++) {
        board[i].push(str[Math.floor(str.length * Math.random())].toUpperCase())
      }
		}
		console.log(board);
  }

  solve() {
    let board = this.board
  }
}
let play = new BoogleBoard();
play.shake(4);