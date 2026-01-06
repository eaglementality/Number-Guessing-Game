const { time } = require("console");
const rl = require("readline");

const interface = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let chances = 0;
let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 0;
let timelapse = 0;
let intervalId = 0;

function startTimer() {
  intervalId = setInterval(() => {
    timelapse++;
  }, 1000);
}
function stopTimer() {
  clearInterval(intervalId);
}

function Restart() {
  attempts = 0;
  console.log(`\n\nWelcome to the Number Guessing Game!\n
I'm thinking of a number between 1 and 100.\n
You have 5 chances to guess the correct number.\n
Please select the difficulty level:\n
1. Easy (10 chances)\n
2. Medium (5 chances)\n
3. Hard (3 chances)\n\n`);
  interface.question("Enter your choice: ", (answer) => {
    switch (answer.trim()) {
      case "1":
        chances = 10;
        console.log(`\nGreat! You have selected the Easy difficulty level.\n
        Let's start the game!\n`);
        break;
      case "2":
        chances = 5;
        console.log(`Great! You have selected the Medium difficulty level.\n
        Let's start the game!\n`);
        break;
      case "3":
        chances = 3;
        console.log(`Great! You have selected the Hard difficulty level.\n
        Let's start the game!\n`);
        break;
      default:
        console.log("Invalid choise");
        interface.close();
        return;
    }
    IsCorrectGuess();
  });
}

function IsCorrectGuess() {
  interface.question("Enter your guess:", (answer) => {
    let guessedNumber = Number(answer.trim());
    attempts++;
    chances -= 1;
    startTimer();
    if (chances == 0) {
      console.log("You lost. Game over!!");
      stopTimer();
      interface.question(
        "Would you like to play again ? (yes/no) :",
        (answer) => {
          if (answer.trim() == "yes") {
            Restart();
          } else {
            interface.close();
          }
        }
      );
    } else if (randomNumber == guessedNumber) {
      console.log(
        `Congratulations! You guessed the correct number in ${attempts} attempts and ${timelapse} seconds`
      );
      stopTimer();
      interface.question(
        "Would you like to play again ? (yes/no) :",
        (answer) => {
          if (answer.trim() == "yes") {
            Restart();
          } else {
            interface.close();
          }
        }
      );
    } else {
      console.log(
        `Incorrect! The number is ${
          randomNumber < answer ? "less" : "greater"
        } than ${answer}.\n`
      );
      Hint(answer);
      stopTimer();
      IsCorrectGuess();
    }
  });
}

Restart();


// // r = 5    a = 2        i = 3     3>5 = false =>  between 3 and 6
// // r = 5    a = 6        i = -1     1>5 = false =>  between 3 and 6

// function Hint(answer){
//     const interval = randomNumber - Number(answer);
//     if (interval >= 0 && interval < randomNumber && interval > Number(answer)){
//         console.log(`Hint: choose number between  ${answer} and ${randomNumber}`)
//     }
//     else if(interval < 0){
//         console.log(`Hint: choose number from  ${randomNumber} below`)
//     }
//     else if(interval >= 0 && interval < randomNumber && interval < Number(answer)){
//         console.log(`Hint: choose number from  ${Number(interval)} to ${Number(answer)}`)
//     }
// }