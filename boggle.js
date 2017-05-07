class Boggle{
  constructor(matriks){
    this._matriks = matriks;
    this._fs = require('fs');
    this._dictionary = //this._fs.readFileSync('data.js', 'utf8');
    ["ABA","ABAD","ABADI","ABAH","ABAI","ABAL","ABANG","ABANGAN","ABDI","ABDIKASI","ABDOMEN","ABDOMINAL","ABDUKSI","ABDUKTOR"];
    this._boggle= //this.boggle();
    [['A','B','D','D'],
    ['H','A','I','D'],
    ['L','A','K','D'],
    ['L','A','K','D']];
    this._dilewati=this.dilewati();
  }

  boggle(){
    let papan=[];
    let acak=[];
    let huruf=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    for(let i=0; i<Math.pow(this._matriks,2);i++)
    {
      let index=Math.floor(Math.random()*huruf.length);
      acak.push(huruf[index]);
    }
    for(let i=0; i<this._matriks;i++)
    papan.push(acak.slice(i,i+this._matriks));

    return papan;
  }

  dilewati(){
    let papan=[];

    for(let i=0; i<this._matriks; i++){
      let arr=[];
      for(let j=0;j<this._matriks;j++)
      arr.push(false);
      papan.push(arr);
    }
    return papan;
  }

  kata(str)
  {
    for (let i=0; i<this._dictionary.length; i++)
    if (str===this._dictionary[i])
    return true;
    return false;
  }

  cariKataPerIndex(boggle,dilewati,i,j,str){
    dilewati[i][j]=true;
    str = str + boggle[i][j];

    if (this.kata(str))
    console.log(str);

    for (let baris=i-1; baris<=i+1 && baris<this._matriks; baris++)
    {
      for (let kol=j-1; kol<=j+1 && kol<this._matriks; kol++){
        if (baris>=0 && kol>=0 && !dilewati[baris][kol])
        this.cariKataPerIndex(boggle,dilewati, baris, kol, str);
      }
    }
    str="";
    dilewati[i][j] = false;
  }

  cariKata(boggle,dilewati){
    let i,j;
    let str = "";
    for (i=0; i<this._matriks; i++)
    for (j=0; j<this._matriks; j++)
    this.cariKataPerIndex(boggle, dilewati, i, j, str);

  }
}

let game = new Boggle(4);
console.log(game._boggle)
console.log(game._dictionary);
game.cariKata(game._boggle,game._dilewati);
