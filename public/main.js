// TODO: Async API Request
// TODO: Use a https API
(function() {


const apiURL = "http://setgetgo.com/randomword/get.php"
// Minimum Length
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

// Displays a loss screen
function lossScreen() {
    wordLine.innerText = `You lose, it was "${word.join('')}"`;
    remainingSelector.innerText = '';
}

// Displays a win screen
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
// Creates an array of `_` of the same length of word
let blanks = Array(word.length).fill('_');
let attemptsRemaining = word.length + 2;
// Array of valid keys
let validKeys = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Updates the page to show the new content
function doRender() {
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