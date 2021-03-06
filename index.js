
var Word = require("./js/word.js");
var inquirer = require("inquirer");

var possibleAnswers = ["Persephone", "Morpheus", "Trinity", "Neo", "Smith", "Niobe", "Twins"]

var currentWord;
var remainingGuesses = 5;
var guessedLetters = [];
var usedWords = [];
var firstGame = true;

var letterArray = /[a-zA-Z]/;

function selectRandomWord() {

    var selectedWord = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
    
    if (usedWords.indexOf(selectedWord) < 0) {
        currentWord = new Word();
        currentWord.wordToArray(selectedWord);
        usedWords.push(selectedWord);
    }
    
    else if (usedWords.length !== possibleAnswers.length) {
        selectRandomWord();
    }
    
    else {
        console.log("There are no more words to guess!");
        playAgain();
    }
}


function wordGuessed() {

    var word = currentWord.wordArray;
    
    for (var i = 0; i < word.length; i++) {

        if (!word[i].guessed && word[i] !== " ") {
            return false;
        }
    }
    
    return true;
}


function guessPrompt() {
    
    if (remainingGuesses <= 0) {
        console.log("You run out of guesses! You lose!");
        playAgain();
    }
    
    else if (!wordGuessed()) {
        
        if (firstGame) {
            console.log("\n---------------------------------------");
            console.log("\n            Matrix Game");
            console.log("Guess All Characters From Matrix Movie");
            console.log("\n---------------------------------------");
            currentWord.displayWord();
            firstGame = false;
        }
        
        inquirer.prompt([

            {
                type: "input",
                name: "guess",
                message: "Guess a letter: ",
                
                validate: function(input) {
                    
                    if (guessedLetters.indexOf(input.trim().toLowerCase()) >= 0) {
                        console.log("\n You already enter this letter!");
                        return false;
                    }
                    
                    else if (letterArray.test(input) && input.trim().length === 1) {
                        return true;
                    }
                    
                    else {
                        console.log("\n Please enter a letter A-Z");
                        return false;
                    }
                }
            }
            
        ]).then(function(input) {
            
            currentWord.checkGuess(input.guess);
            currentWord.displayWord();
            
            if (currentWord.checkGuess(input.guess)){
                console.log("CORRECT! You guessed a letter!");
            }
            
            else {
                
                remainingGuesses--;
                console.log("INCORRECT! You have " + remainingGuesses + " guesses left!");
            }
            
            guessedLetters.push(input.guess);
            guessPrompt();
    
        })
    }

    else {
        console.log("\n---------------------------------------");
        console.log("CONGRATULATIONS! You guessed the word!");
        console.log("\n---------------------------------------");
        playAgain();
    }
}


function playAgain() {

    inquirer.prompt([

        {
            type: "list",
            message: "Would you like to play again?",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }

    ]).then(function(input) {
        
        if (input.restart === "Play Again") {
            firstGame = true;
            guessedLetters = [];
            remainingGuesses = 10;
            selectRandomWord();
            guessPrompt();

            if (usedWords.length === possibleAnswers.length) {
                usedWords = [];
            }
        }
        
        else {
            console.log("Thank you for playing!");
            return;
        }
    })
}

selectRandomWord();
guessPrompt();
