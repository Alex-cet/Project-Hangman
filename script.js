function startGame() {
    const word = document.getElementById("inputWord").value;
    if (word.length > 1) {
        document.getElementById("startButton").onclick = null;

        document.getElementById("guessLetterLabel").innerHTML = "Try to guess a letter from the word: ";
        guessLetterBox = document.createElement("input");
        guessLetterBox.type = "text";
        guessLetterBox.id = "guessLetter";
        document.body.appendChild(guessLetterBox);
        
        const btn = document.createElement("button");
        btn.type = "button";
        btn.id = "guessButton";
        btn.innerHTML = "Guess";
        btn.className = "guessButton";
        document.body.appendChild(btn);

        let newLine = document.createElement("div");
        newLine.innerHTML = "<br/>";
        document.body.appendChild(newLine);

        var underscore = [];
        for (let i = 0; i < word.length; ++i) {
            underscore[i] = document.createElement("div");
            underscore[i].innerHTML = "_";
            underscore[i].className = "underscore";
            document.body.appendChild(underscore[i]);
        }
        let guesses = 15, correctGuesses = 0;
        var lettersTried = [];
        document.getElementById("guessButton").addEventListener('click', function() {
            let letter = document.getElementById("guessLetter").value;
            let position = word.indexOf(letter);
            if (position > -1) {
                for (let index = 0; index < word.length; ++index) {
                    if (word[index] === letter) {
                        underscore[index].innerHTML = word[index];
                        ++correctGuesses;
                    }
                }
            } else {
                if (lettersTried.indexOf(letter) > -1) {
                    alert("You already tried the letter " + "'" + letter + "'" + ". Try another letter!");
                } else {
                    lettersTried.push(document.getElementById("guessLetter").value);
                    --guesses;
                    if (guesses > 0) {
                        document.getElementById("message").innerHTML = "The letter " + "'" + letter + "'" + " is not in this word! You have " + guesses + " more tries!";
                    } else {
                        alert("You lost! The word you were trying to guess is: " + "'" + word + "'");
                        document.location.reload(true);
                    }
                    document.getElementById("lettersTried").innerHTML = "Letters tried: " + lettersTried;
                }
            }
            if (correctGuesses == word.length) {
                document.getElementById("message").innerHTML = "Congratulations! You won!";
                const resetButton = document.createElement("button");
                resetButton.className = "resetButton";
                resetButton.type = "button";
                resetButton.innerHTML = "Play again!";
                resetButton.onclick = function () {
                    document.location.reload(true);
                };
                document.body.appendChild(resetButton);
            }
            document.getElementById("guessLetter").value = '';
        })
    } else {
        alert("Please enter a word which has more than 1 letters!");
        document.getElementById("inputWord").value = '';
    }
}


    