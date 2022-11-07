function startGame() {
    const word = document.getElementById("inputWord").value;
    if (word.length > 1) {
        document.getElementById("startMessage").style.display = 'none';
        document.getElementById("startButton").onclick = null;
    
        createInterface();

        let underscore = [];
        for (let i = 0; i < word.length; ++i) {
            underscore[i] = document.createElement("div");
            underscore[i].innerHTML = "_";
            underscore[i].className = "underscore";
            document.body.appendChild(underscore[i]);
        }
        wrongGuesses = 15, correctGuesses = 0;
        let wrongLettersTried = [], validLettersTried = [];
        document.getElementById("guessButton").addEventListener('click', function() {
            let letter = document.getElementById("guessLetter").value;
            let position = word.indexOf(letter);
            if (position > -1) {
                replaceValidLetter(word, validLettersTried, letter, underscore);
            } else {
                handleWrongLetters(word, letter, wrongLettersTried, wrongGuesses);
            }
            checkEndGame(word);
            document.getElementById("guessLetter").value = '';
        })
    } else {
        alert("Please enter a word which has more than 1 letters!");
        document.getElementById("inputWord").value = '';
    }
}   

function createInterface() {
    document.getElementById("guessLetterLabel").innerHTML = "Try to guess a letter from the word: ";
    let guessLetterBox = document.createElement("input");
    guessLetterBox.type = "text";
    guessLetterBox.id = "guessLetter";
    document.body.appendChild(guessLetterBox);
    
    let btn = document.createElement("button");
    btn.type = "button";
    btn.id = "guessButton";
    btn.innerHTML = "Guess";
    btn.className = "guessButton";
    document.body.appendChild(btn);

    let newLine = document.createElement("div");
    newLine.innerHTML = "<br/>";
    document.body.appendChild(newLine);
}

function replaceValidLetter(word, validLettersTried, letter, underscore) {
    if (validLettersTried.indexOf(letter) > -1) {
        alert("You already tried the letter " + "'" + letter + "'" + ". Try another letter!");
    } else {
        for (let index = 0; index < word.length; ++index) {
            if (word[index] === letter) {
                underscore[index].innerHTML = word[index];
                ++correctGuesses;
            }
        }
        validLettersTried.push(letter);
    }
}

function handleWrongLetters(word, letter, wrongLettersTried) {
    if (wrongLettersTried.indexOf(letter) > -1) {
        alert("You already tried the letter " + "'" + letter + "'" + ". Try another letter!");
    } else {
        wrongLettersTried.push(letter);
        --wrongGuesses;
        if (wrongGuesses > 0) {
            document.getElementById("message").innerHTML = "The letter " + "'" + letter + "'" + " is not in this word! You have " + wrongGuesses + " more tries!";
            document.getElementById("wrongLettersTried").innerHTML = "Letters tried: " + wrongLettersTried;
        } else {
            checkEndGame(word);
        }
    }
}

function checkEndGame(word) {
    if (correctGuesses == word.length || wrongGuesses == 0) {
        if (correctGuesses == word.length) {
            document.getElementById("message").innerHTML = "Congratulations! You won!";
            document.getElementById("guessButton").style.display = 'none';
            document.getElementById("guessLetter").style.display = 'none';
            document.getElementById("guessLetterLabel").style.display = 'none';
        } else if (wrongGuesses == 0) {
            document.getElementById("message").innerHTML = "You lost! The word you were trying to guess is: " + "'" + word + "'";
            document.getElementById("guessButton").style.display = 'none';
            document.getElementById("guessLetter").style.display = 'none';
            document.getElementById("guessLetterLabel").style.display = 'none';
        }
        const resetButton = document.createElement("button");
        resetButton.className = "resetButton";
        resetButton.type = "button";
        resetButton.innerHTML = "Play again!";
        resetButton.onclick = function() {
            document.location.reload(true);
        }
        document.body.appendChild(resetButton);
    }
}
    
