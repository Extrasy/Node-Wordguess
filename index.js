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
        }
    }
]