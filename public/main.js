(function() {

// Minimum Length
const apiURL = "http://setgetgo.com/randomword/get.php"
const minLength = 4;
const wordLine = document.querySelector('#word_line');
const remainingSelector = document.querySelector('#remaining');
const highScoreSelector = document.querySelector("#high_score");

let highScore = 0;

// Gets a random word and returns it as an array
function getWord() {
    let request = new XMLHttpRequest();
    request.open("GET", apiURL, false)
    request.send(null)
    return request.responseText.toLocaleLowerCase().split(''); 
}

// TODO: Create a loss screen
function lossScreen() {
    wordLine.innerText = `You lose, it was "${word.join('')}"`;
    remainingSelector.innerText = '';
}

// TODO: Create a win screen
function winScreen() {
    score = attemptsRemaining / (word.length + 2) * 100 >> 0
    wordLine.innerText = `"${word.join('')}" You win!`;
    remainingSelector.innerText = `Score: ${score}`;
    if (score <= highScore) {
        return
    }
    highScoreSelector.innerText = score;
    highScore = score;
}

let word = getWord();
let blanks = Array(word.length).fill('_');
let attemptsRemaining = word.length + 2;
let validKeys = 'abcdefghijklmnopqrstuvwxyz'.split('');


function doRender() {
    console.log(blanks)
    wordLine.innerText = blanks.join(' ');
    remainingSelector.innerText = attemptsRemaining;
}

function reset() {
    word = getWord();
    blanks = Array(word.length).fill('_');
    attemptsRemaining = word.length + 2;
    doRender()
}

function onKeyPress(e) {
    if (validKeys.includes(e.key.toLowerCase())) {
        let letter = e.key;
        if (attemptsRemaining === 0) {
            return
        }
        if (blanks.join('') === word.join('')) {
            return
        }
        console.log(letter, word)
        if (word.includes(letter.toLowerCase())) {
            for (var i = 0; i < word.length; i++) {
                if (letter === word[i]) {
                    blanks[i] = letter;
                }
            }
            if (blanks.join('') === word.join('')) {
                return winScreen()
            }
            return doRender()
        }
        attemptsRemaining--
        if (attemptsRemaining === 0) {
            return lossScreen()
        }
        return doRender();
    }
    // Reset
    if ('`' === e.key) {
        reset()
    }
}

// Update render
doRender()

// Register Keypress Handler
document.body.addEventListener('keypress', onKeyPress)


}())