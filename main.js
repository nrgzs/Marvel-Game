class character {
  constructor(name) {
    this.name = name;

    this.lives = this.randomLives();

    this.power = this.randomPower();

    this.score = 0;
    
    this.img = this.img();
  }

  img() {
    return `<img src=./img/${this.name}.jfif class = "character-img " id="${this.name}"/>`;
  }

  randomLives() {
    return Math.floor(Math.random() * (200 - 100) + 100);
  }

  randomPower() {
    return Math.floor(Math.random() * (50 - 10) + 10);
  }

  display() {
    $('.character-all').append(this.img);
  }

  attack(bP, idNum) {
    this.lives -= bP;

    $('.player-' + idNum + '-live').text(this.lives);
  }

  loss() {
    if (this.lives < 0) {
      alert('You Loss!!');
      this.lives = 0;
      $('.player-1-live').text(this.lives);
    }
  }
  win() {
    if (this.lives < 0) {
      alert('You Win!!');
      this.score++;
      this.lives = 0;
      $('.player-2-live').text(this.lives);
    }
  }

  set(idNum) {
    $('.player-img-' + idNum).html(this.img);
    $('.player-' + idNum + '-live').text(this.lives);
    $('.player-' + idNum + '-power').text(this.power);
  }
}

const characters = {
  BlackWidow: new character('BlackWidow'),
  IronMan: new character('IronMan'),
  Vision: new character('Vision'),
  Wanda: new character('Wanda'),
  'Dr.Strange': new character('Dr.Strange'),
};

const objectPlayer = Object.values(characters);

for (player of objectPlayer) {
  player.display();
}

let attacker;
let defender;

$('.character-all').click(function (e) {
  let id = $(e.target).attr('id');
  attacker = characters[id];
  attacker.set(1);
  e.target.style.display = 'none';
  $('.defenders').append(this.children);
});

$('.defenders').click(function (e) {
  let id = $(e.target).attr('id');
  defender = characters[id];
  defender.set(2);
  if (defender.lives == 0) {
    e.target.style.display = 'none';
  }
});

$('.btn-attack').click(function () {
  if (defender.lives > 0 && attacker.lives > 0) {
    attacker.attack(defender.power, 1);
    defender.attack(attacker.power, 2);
    attacker.loss();
    defender.win();
    $('.player-1-score').text(this.score);
  }
});
