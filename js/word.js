

var Letter = require("./letter");

function Word() {

    this.wordArray = [],
    
    this.wordToArray = function(currentWord) {

        for (var i = 0; i < currentWord.length; i++) {
            
            if (currentWord[i] !== " ") {
                var letterObject = new Letter(currentWord[i]);
                this.wordArray.push(letterObject);
            }

            else {
                this.wordArray.push(" ");
            }
        }
    }
    
    this.displayWord = function() {
        
        var word = [];
       
        for (var i = 0; i < this.wordArray.length; i++){
            
            if (this.wordArray[i] !== " "){
                var letterString = this.wordArray[i].display();
                word.push(letterString);
            }
            
            else {
                word.push(" ");
            }
        }
        
        console.log(word.join(" "));
    }
    
    this.checkGuess = function(input) {
       
        var correctGuess = false;
        
        for (var i = 0; i < this.wordArray.length; i++) {

            if (this.wordArray[i] !== " ") {

                if (this.wordArray[i].checkLetter(input)) {
                    
                    correctGuess = true;
                }
            }
        }
        if (correctGuess) {
            return true;
        }

        else {
            return false;
        }
    }
}

module.exports = Word;