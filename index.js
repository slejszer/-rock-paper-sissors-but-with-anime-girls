let player_score = 0;
let cpu_score = 0;

function cpuMove() {
 const rand = Math.floor(Math.random() * 3 + 1)
  switch(rand) {
    case 1:
      return "pyro";
    case 2:
      return "hydro";
    case 3:
      return "cryo";
  }
}

function updateScore() {
  document.querySelector(".player-score-js").innerHTML = player_score;
  document.querySelector(".cpu-score-js").innerHTML = cpu_score;
}

// controls which gifs should be visible
// and what the result text should say
// e.g you win! or its a tie!
function updateResults(play, cpu, result) {
  const player_div = document.querySelector(".player-gif");
  const cpu_div = document.querySelector(".cpu-gif");
  const result_div = document.querySelector(".result");

  player_div.innerHTML = `<img src="img/${play}.gif">`;
  cpu_div.innerHTML = `<img src="img/${cpu}.gif">`;
  
  switch(result) {
    case 1:
      result_div.innerHTML = "It's a Tie!";
      break;
    case 2:
      result_div.innerHTML = "You Lost!"
      break;
    case 3:
      result_div.innerHTML = "You Win!";
      break;
  }
}

function playGame(play) {
  let cpu_play = cpuMove();
  let result = 1; // 1 = tie, 2 = cpu win, 3 = player win
  console.log(cpu_play);

  if (play === "pyro") {
    if(cpu_play === "hydro") {
      cpu_score++;
      result = 2;
    } else if (cpu_play === "cryo") {
      player_score++;
      result = 3;
    }
  } else if(play === "hydro"){
    if (cpu_play === "cryo") {
      cpu_score++;
      result = 2;
    } else if(cpu_play === "pyro") {
      player_score++;
      result = 3;
    } 
  } else if(play === "cryo"){
    if (cpu_play === "pyro") {
      cpu_score++;
      result = 2;
    } else if(cpu_play === "hydro") {
      player_score++;
      result = 3;
    }
  }
  
  updateResults(play, cpu_play, result);
  updateScore();
}

let auto_ON = false;
let auto_interval;

function auto() {
    const auto_text = document.querySelector(".auto-button div");
    const auto_img = document.querySelector(".auto-button img");
    
    if(!auto_ON){
      auto_text.style.display = "none";
      auto_img.style.display= "block";
      auto_ON = true;

      auto_interval = setInterval(() => {
      playGame(cpuMove());
      }, 1000);
    } else {
      auto_text.style.display = "block";
      auto_img.style.display= "none";
      auto_ON = false;
      clearInterval(auto_interval);
    }
  }

document.querySelector(".choose-play-pyro").addEventListener("click", () => {
  playGame("pyro");
});

document.querySelector(".choose-play-hydro").addEventListener("click", () => {
  playGame("hydro");
});

document.querySelector(".choose-play-ice").addEventListener("click", () => {
  playGame("cryo");
});

document.querySelector(".auto-button").addEventListener("click", auto);
