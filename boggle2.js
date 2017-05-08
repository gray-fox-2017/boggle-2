'use strict'
class BoggleBoard {
  constructor() {
    this._line = '\n==============';
    this._allStr = [];
    this._dict = ['APPLE','SIT','TRIP','TURN','SUPER'];
    this._words = [
      //y1 y2 y3 y4
      ['D','G','H','I'], //x1
      ['K','L','P','S'], //x2
      ['Y','E','U','T'], //x3
      ['E','O','R','N'] //4
    ];
    this.init();
  }

  init() {
    console.log('init')
    this.print_board()
    this.startingPosition();
  }

  startingPosition() {
    // let arrw = ;
    console.log('startingPosition')
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let pos = {x:i,y:j};
        let str = this._words[i][j];
        console.log(pos);
        console.log(this._words.slice(0));
        this.randomWalk(pos,this._words,0,str);
      }
    }
    console.log('this._words')
    console.log(this._words)

    console.log('this._allStr')
    console.log(this._allStr)

  }

  moves(idx) {
    let moves = [];
    idx = parseInt(idx);
    switch(idx){
      case 0 : moves.push(idx+1); break;
      case 3 : moves.push(idx-1); break;
      case 1: case 2 : {
        moves.push(idx+1);
        moves.push(idx-1);
        break;
      }
    }
    return moves;
  }
  randomWalk(pos,arr,step = 0,str = '') {
    let _arr = arr.map(x=> x.slice());
    // if(arr.length === 0) arr = this._words;
    if (step < 15) {
      let x = pos.x;
      let y = pos.y;
      let movesY = [];
      let movesX = [];
      movesY = this.moves(y);;
      movesX = this.moves(x);
        if (x === 1 && y === 3 && step === 0) {
          console.log(str);
          console.log(pos);
          console.log('movesY')
          console.log(movesY)
          console.log('movesX')
          console.log(movesX)
        }
      step+= 1;
      //Y moves, x bisa move-stay
      movesY.forEach((dy)=>{
        //X stay
        if (_arr[x][dy] !== '_') {
          str += _arr[x][dy];
          _arr[x][dy] = '_';
          this.randomWalk({x:x,y:dy},_arr,step,str);
        }
        //X move
        movesX.forEach((dx)=>{
          if (x === 1 && y === 3 && step === 0) {
            console.log('every movesX')
            console.log('change x')
            console.log('dx'+dx)
            console.log('dy'+dy)
          }
          if (_arr[dx][dy] !== '_') {
            str += _arr[dx][dy];
            _arr[dx][dy] = '_';
            this.randomWalk({x:dx,y:dy},_arr,step,str);
          }
        });
      });
      //Y stay X move
      movesX.forEach((dx)=>{
        if (_arr[dx][y] !== '_') {
          str += _arr[dx][y];
          _arr[dx][y] = '_';
          this.randomWalk({x:dx,y:y},_arr,step,str);
        }
      });
    }//endIF16
    //
    else {
      console.log(str);
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
