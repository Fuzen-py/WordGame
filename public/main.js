//(function() {

// Minimum Length
const minLength = 4;
let highScore = 0;
// Common Words
let words = [
  "the","of","and","a","to","in","is","you","that","it","he",
  "was","for","on","are","as","with","his","they","I","at","be",
  "this","have","from","or","one","had","by","word","but","not",
  "what","all","were","we","when","your","can","said","there",
  "use","an","each","which","she","do","how","their","if","will",
  "up","other","about","out","many","then","them","these","so",
  "some","her","would","make","like","him","into","time","has",
  "look","two","more","write","go","see","number","no","way",
  "could","people","my","than","first","water","been","call",
  "who","oil","its","now","find","long","down","day","did","get",
  "come","made","may","part"];

let filteredWords = words.filter((word) => word.length >= minLength)

// Gets a random word and returns it as an array
function getWord() {
    return filteredWords[Math.random()*filteredWords.length>>0].split("")
}

// TODO: Create a loss screen
function lossScreen() {
    document.querySelector('#word_line').innerText = `You lose, it was "${word.join('')}"`
    document.querySelector('#remaining').innerText = ''
}

// TODO: Create a win screen
function winScreen() {
    score = attemptsRemaining/(word.length+2)*100>>0
    document.querySelector('#word_line').innerText = `"${word.join('')}" You win!`
    document.querySelector("#remaining").innerText = `Score: ${score}`
    if (score > highScore){document.querySelector("#high_score").innerText = score}
}

let word = getWord();
let blanks = Array(word.length).fill('_');
let attemptsRemaining = word.length + 2
let validKeys = 'abcdefghijklmnopqrstuvwxyz'.split('')


function doRender() {
    console.log(blanks)
    document.querySelector('#word_line').innerText = blanks.join(' ')
    document.querySelector('#remaining').innerText = attemptsRemaining
}
function reset() {
    word = getWord()
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
        if (blanks.join('') === word.join('')) {return}
        console.log(letter, word)
        if (word.includes(letter.toLowerCase())) {
            for (var i = 0; i < word.length; i++) {
                if (letter === word[i]) {
                    blanks[i] = letter;
                }
            }
            if (blanks.join('') === word.join('')) {
                winScreen()
                return
            }
            return doRender()
        }
        attemptsRemaining--
        if (attemptsRemaining === 0) {
            lossScreen()
            return
        }
        doRender();
        return
        
    }
    // Reset
    if ('~' === e.key) {
        reset()
    }
    // TODO: Add a watcher for arrowUp and arrowDown for a new word
}

// Update render
doRender()
 
// Register Keypress Handler
document.getElementsByTagName("body")[0].addEventListener('keypress',onKeyPress)


//}())
