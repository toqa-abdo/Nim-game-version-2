document.getElementById('easyMode').addEventListener('click', () => setModes('easyMode'));
document.getElementById('mediumMode').addEventListener('click', () => setModes('mediumMode'));
document.getElementById('hardMode').addEventListener('click', () => setModes('hardMode'));
document.getElementById('reset').addEventListener('click', () => reset(''));
document.getElementById('button1').addEventListener('click', () => userSelect(1));
document.getElementById('button2').addEventListener('click', () => userSelect(2));
document.getElementById('button3').addEventListener('click', () => userSelect(3));

let sum = 21;
let NowMode='';
const easyMode = 'easyMode';
const mediumMode = 'mediumMode';
const hardMode = 'hardMode';


function setModes(mode) {
    console.log(`Modes selected: ${mode}`);
    NowMode = mode;
    document.getElementById('Modes').style.display = 'none';
    document.getElementById('playPage').style.display = 'block';
    document.getElementById('playingTurn').style.display = 'block';
    document.getElementById('playingTurn').innerText = `Your Turn`;
    document.getElementById('reset').style.display = 'none';
}

function userSelect(userChoice) {
    document.getElementById('playingTurn').innerText = `Your Turn`;
    deleteChoice(userChoice);
    enableButtons(false);
    if(sum == 0) {
      alert("PC WON!");
      document.getElementById('sum').innerText='PC win ';
      document.getElementById('reset').style.display = 'block';
    } else {
      document.getElementById('playingTurn').innerText = `PC Turn`;
      setTimeout(pcTurn, 1000);
    }
  }

function deleteChoice(n) {
  sum -= n;
  document.getElementById('sum').innerText = sum;
  disableIButtons();
}
function enableButtons(enabled) {
    document.getElementById('playingTurn').innerText = `Your Turn`;
  const userbuttons = document.getElementsByClassName('userbutton');
  for (const button of userbuttons) {
    button.disabled = !enabled;
  }

  if (enabled) {
    disableIButtons();
  }
}
function disableIButtons() {
    if (sum == 2) {
     
      document.getElementById('button3').disabled = true;
    }
  
         
  }

  function reset() {
    sum = 21;
    document.getElementById('sum').innerText = sum;
    enableButtons(true);
    document.getElementById('reset').style.display = 'none';
  }

  function pcTurn() {

    switch (NowMode) {
        case easyMode:
            easyPcMove();
            break;
        case mediumMode:
            mediumPCMove();
            break;
        case hardMode:
            hardPcMove();
            break;
        default:
            console.error("Invalid Modes mode");
            break;
    }

    
  }

 function easyPcMove(){
let userChoice;

    if(sum == 1)
      userChoice=1;
      else if(sum == 2) {
        userChoice = 1;
      } else if (sum == 3) {
        userChoice = 1 + Math.floor(Math.random() * 2);
      }
      else {
        userChoice = 1 + Math.floor(Math.random() * 3);
      }
    deleteChoice(userChoice);
     
    if (sum == 0) {
      alert("You WON!");
      document.getElementById('sum').innerText='You win ';
      enableButtons(false);
      document.getElementById('reset').style.display = 'block';
    } else {
      enableButtons(true);
    }
 }
 function mediumPCMove(){
    let bestMove = -1;
    let bestValue = -Infinity;

    for (let move = 1; move <= 3; move++) {
        let moveValue = nimAlphaBeta(sum - move, 3, -Infinity, Infinity, false);
        if (moveValue > bestValue) {
            bestValue = moveValue;
            bestMove = move;
        }
    }
    deleteChoice(bestMove);
    if (sum == 0) {
        alert("You WON!");
        document.getElementById('sum').innerText='You win ';
        enableButtons(false);
        document.getElementById('reset').style.display = 'block';
      } else {
        enableButtons(true);
      }
 }

 function hardPcMove(){
    let bestMove = -1;
    let bestValue = -Infinity;

    for (let move = 1; move <= 3; move++) {
        let moveValue = nimAlphaBeta(sum - move, 6, -Infinity, Infinity, false);
        if (moveValue > bestValue) {
            bestValue = moveValue;
            bestMove = move;
        }
    }
    deleteChoice(bestMove);
    if (sum == 0) {
        alert("You WON!");
        document.getElementById('sum').innerText='You win ';
        enableButtons(false);
        document.getElementById('reset').style.display = 'block';
      } else {
        enableButtons(true);
      }

 }

 function nimAlphaBeta(allston, depth, alpha, beta, isMaximizing) {
  

    if (depth === 0) {
        
        if(allston <=1)
        return 1;
        else
        return -1;
    }

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let move = 1; move <= 3; move++) {
            let eval = nimAlphaBeta(sum - move, depth - 1, alpha, beta, !isMaximizing);
            maxEval = Math.max(maxEval, eval);
            alpha = Math.max(alpha, eval);
            if (beta <= alpha) {
                break; // Beta cut-off
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let move = 1; move <= 3; move++) {
            let eval = nimAlphaBeta(sum - move, depth - 1, alpha, beta, !isMaximizing);
            minEval = Math.min(minEval, eval);
            beta = Math.min(beta, eval);
            if (beta <= alpha) {
                break; // Alpha cut-off
            }
        }
        return minEval;
    }
}
