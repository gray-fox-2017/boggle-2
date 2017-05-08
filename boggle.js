'use strict'
const { words } = require('./data.js');
class BoggleBoard {
  constructor() {
    this._line = '\n==============';
    this._allStr = [];
    // console.log(words);
    this._dicts = words;
    // console.log(this._dicts);
    // this._dicts = ['APPLE','SIT','TRIP','TURN','SUPER'];
    this._words = [];
    //TURN, SUPER
    // console.log('dicts')
    // console.log(this._dicts[0]);


  }

  init() {
    console.log('init')
    this.print_board();
    this.startingPosition();
  }
  shake(len) {
    this.len = len;
    for (let h = 0; h < len; h++){
      let baris = [];
      for (let i = 0; i < len; i++) {
        let num = Math.floor( (Math.random() * 26) +97);
        baris.push(String.fromCharCode(num).toUpperCase())
      }
      this._words.push(baris);
    }
  }
  startingPosition() {
    // console.log('startingPosition')
    for (let i = 0; i < this.len; i++) {
      for (let j = 0; j < this.len; j++) {
        let pos = {x:i,y:j};
        let str = this._words[i][j];
        this._dict = this._dicts.filter((x)=> x[0] === str);
        if (this._dict.length > 0){
          this.randomWalk(pos,this._words,0,str);
        }
      }
    }
    this._allStr = this._allStr.filter((v,i,a)=>a.indexOf(v)===i);
    console.log('result : ');
    console.log(this._allStr);
  }

  moves(idx) {
    let moves = [];
    idx = parseInt(idx);
    switch(idx){
      case 0 : moves.push(idx+1); break;
      case this.len-1 : moves.push(idx-1); break;
      default : {
        moves.push(idx+1);
        moves.push(idx-1);
        break;
      }
    }
    return moves;
  }

  continueWalk(str = '') {
    let idx = this._dict.findIndex((x)=> (x.startsWith(str)) );
    return (idx === - 1 ? false : true);
  }
  findWords(str = '') {
    let idx = this._dict.findIndex((x)=> x === str);
    if (idx !== -1) this._dict.splice(idx,1);
    return (idx === - 1 ? false : true);
  }
  randomWalk(pos,arr,step = 0,str = '') {
    let _arr = arr.map(x=> x.slice());
    if (step < 15) {
      let x = pos.x;
      let y = pos.y;
      let movesY = [];
      let movesX = [];
      movesY = this.moves(y);
      movesX = this.moves(x);

      if (step === 0) _arr[x][y] = '_';


      movesY.forEach((dy)=>{
        //X stay
        if (_arr[x][dy] !== '_') {

          if (this.continueWalk(str+_arr[x][dy])) {
            str = str+_arr[x][dy];
            _arr[x][dy] = '_';
            if (this.findWords(str)) {
              this._allStr.push(str);
            }
            else {
              step+= 1; this.randomWalk({x:x,y:dy},_arr,step,str);
            }
          }
        }
        //X move
        movesX.forEach((dx)=>{
          if (_arr[dx][dy] !== '_') {
            if (this.continueWalk(str+_arr[dx][dy])) {
              str += _arr[dx][dy];
              _arr[dx][dy] = '_';
              if (this.findWords(str)) {
                this._allStr.push(str);
              }
              else {
                step+= 1; this.randomWalk({x:dx,y:dy},_arr,step,str);
              }
            };
          }
        });
      });
      //Y stay X move
      movesX.forEach((dx)=>{
        if (_arr[dx][y] !== '_') {
          if (this.continueWalk(str+_arr[dx][y])) {
            str += _arr[dx][y];
            _arr[dx][y] = '_';
            if (this.findWords(str)) {
              this._allStr.push(str);
            }
            else {
              step+= 1; this.randomWalk({x:dx,y:y},_arr,step,str);
            }
          };
        }
      });
    }//endIF16
    //
    else {
      this._allStr.push(str);
    }
  }//end random

  print_board() {
    let board = this._line;
    board += `\n Boggle Board`;
    board += `${this._line}`;
    this._words.forEach( (x) =>{
      board += `\n|${x.join(' |')} |`;
    });
    board += `${this._line}`;
    console.log(board);
  }
}


let bb = new BoggleBoard();

bb.shake(8);
bb.init();