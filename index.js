const Word = require('Word.js');
const inquire = require('inquirer');

var target;
var targetWord;
var guesses;
var guessesLeft;

const wordList = ["Extrasy", "Neviros"];


function randomWord(wordList){
    var index = Math.floor(Math.random() *wordList.length);
    return wordList[index];
}

const questions = [
    {
        name: 'letterGuessed',
        message: 'Guess a letter',
        validate: function (value){
            var valid = (value.length === 1) && ([ab-z].indexOf(value.charAt(0).toLowerCase()) !== -1);
            return valid || 'enter a single letter';
        },
        when: function () {
            return (!target.allGuessed() && guessesLeft > 0);
        }
    },
    {
        type: 'confirm',
        name: 'playAgain',
        message: 'Want to play again?',
        when: function () {
            return (target.allGuessed() || guessesLeft <= 0);
        }
    }
];

function resetGame() {
    targetWord = randomWord(wordList);
    target = new Word(targetWord);
    target.makeGuess(' ');
    guesses = [];
    guessesLeft = 9;
}

function ask() {
    if (!target.allGuessed() && guessesLeft > 0) {
        console.log(target + '');
    }
    
    inquirer.prompt(questions).then(answers => {
        if ('playAgain' in answers && !answers.playAgain) {
            console.log('thanks for playing');
            process.exit();
        }
        if (answers.playAgain) {
            resetGame();
        }

        if (answers.hasOwnProperty('letterGuessed')) {
            var currentGuess = answers.letterGuessed.toLowerCase();
            
            if (guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                target.makeGuess(currentGuess);
                if (targetWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    guessesLeft--;
                }
            } else {
                console.log('you already guessed', currentGuess);
                
            }
        }

        if (!target.allGuessed()) {
            if (guessesLeft < 1) {
                console.log('no more guesses');
                console.log(targetWord, 'was correct.');

            } else {
                console.log('guesses so far:', guesses.join(' '));
                console.log('guesses remaining:', guessesLeft);
            }

        } else {
            console.log(targetWord, 'is correct!');
            
        }

        ask();
    }); 
}
resetGame();
ask();