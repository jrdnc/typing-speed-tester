const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++; // counts every 1/1000 sec

    timer[0] = Math.floor((timer[3] / 100) / 60); // total millisec / 100 == total sec, then total sec / 60 to get minutes
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60)); // total millisec / 100 == total sec, then every 60 sec, reset value to 0
    timer[2] = Math.floor((timer[3] - (timer[1] * 100) - timer[0] * 6000)); // reset value every time sec and/or minutes reach 60
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    // console.log(testArea.value);
    console.log(originText.value);

    if (textEntered == originText) { // if text completed and correct, turn green
        testWrapper.style.borderColor = "#429890";
    }
    else {
        if (textEntered == originTextMatch) { // if text entered so far matches original text up to that length, turn blue
            testWrapper.style.borderColor = "#64CCF3";
        }
        else { // if text entered does not match original text, turn orange
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
    console.log(textEntered);
}

// Start the timer:
function start() {
    // make sure only detecting very first keypress
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0) {
        setInterval(runTimer, 10); // run funciton 'runTimer' every 1/1000 sec
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset() {
    console.log("reset button has been pressed");
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);  // start timer on keypress
testArea.addEventListener("keyup", spellCheck, false); // checkspelling every time a letter is typed
resetButton.addEventListener("click", reset, false);
