

function createBoard(shake) {
  let abjad = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = [];
  for (let i = 0 ; i < shake; i++){
    let baris = [];
    for (let j = 0; j < shake; j++){
      baris.push(abjad[Math.floor(Math.random()*25)])
    }
    result.push(baris);
  }
  return result;
}

console.log(createBoard());

function solve(createBoard(6)) {
  for (let i = 0;  ){

  }
}

let test =
