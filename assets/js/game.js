
//create the array of words, choose a random word, and display to the console
var words = ['method', 'function', 'statement', 'syntax', 'debugger', 'variable', 'javascript', 'argument', 'element', 'semicolon', 'boolean', 'integer', 'operator', 'expression'];
var playWord = words[Math.floor(Math.random() * words.length)];
console.log('The word is: \"'+playWord+'\". Hope you are happy now, cheater.');

//create the array of spaces and display it in html
var spaces = [];
for (var i = 0; i < playWord.length; i++) {
 	spaces[i] = '_'
}
var word = '<p> ' + spaces.join('') + ' </p>';
document.querySelector('#word').innerHTML = word;

//create the array for the alphabet and display it in html
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var alphaId = '<p> ' + alphabet.join('') + ' </p>';
document.querySelector('#alphabet').innerHTML = alphaId;

//create the wrongCounter and display with message in html
var wrongCounter = 10;
var wrong = '<p>You have ' + wrongCounter + ' wrong guesses.</p>';
document.querySelector('#alertWrong').innerHTML = wrong;

//create the correctCounter and display with message in html
var correctCounter = playWord.length;
var alertRight = '<p>You have ' + correctCounter + ' letters left to finish the word.</p>';
document.querySelector('#alertRight').innerHTML = alertRight;

// reload the page when the startAgain button is pushed
function startAgain() {
	location.reload();
}

// toggle visibility by div id
function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'none'){
      e.style.display = 'block';
   } else {
      e.style.display = 'none';
   }
}

// create guessLog and guessLogReverse
var guessLogCount = -1;
var guessLog = [];
var guessLogReverse = ['holder'];

// show directions automatically and input box with submit button when on non-Apple mobile browsers
if( /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	document.querySelector('#panel-body').style.display = "block";
	document.querySelector('#mobileEntry').style.display = "block";
}

// show directions automatically and input box without submit button when on Apple mobile browsers
if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
	document.querySelector('#panel-body').style.display = "block";
	document.querySelector('#mobileEntry').style.display = "block";
	document.querySelector('.mobileEntryButton').style.display = "none";
	document.querySelector('.mobileEntryText').style.width = "100% !important";
}


document.onkeypress = function (event) {
	// capture the user guess from key press
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	// pass the key press into function
	runGame(userGuess);
}

function mobileCapture() {
	// capture data from text input field upon submit on Android devices
	var mobileUserGuess = document.getElementById('textInputId').value;
	// lower case the entry to ensure proper recognition of character
	var mobileGuessLower = mobileUserGuess.toLowerCase();
	// pass the data into function
	runGame(mobileGuessLower);
	// empty the text Input field
	document.getElementById('textInputId').value = '';
}

function runGame(data) {
	
	//Create entry for guessLog
	var userGuess = data;
	var guess = 'You guessed: ' + userGuess;
	
	// Build the guess Log by saving the guess, reversing the order, and print to html
	guessLogCount++;
	guessLog[guessLogCount] = guess;
	for (var i = 0; i < guessLog.length; i++) {
		guessLogReverse[i] = guessLog[Math.abs(i-guessLog.length+1)] 
	}
	var guessLogDisplay = '<ul><li>' + guessLogReverse.join('</li><li>') + '</li></ul>';
	document.querySelector('#guessLog').innerHTML = guessLogDisplay;


	// get the index of the guess in the alphabet array to see if the guess still exists
	var j = alphabet.indexOf(userGuess);
	if (j >= 0) {

		// see if the guess is in the word
		if (playWord.indexOf(userGuess) >= 0) {

			// if it does ...
			// replace the letter in the alphabet array with the green check
			alphabet[j]= '<span class="correct">&#9745;</span>'
			
			// Hide the nope message and show the nice
			document.querySelector('#nope').style.display = "none";
			var nice = '<p>Nice Guess!</p>';
			document.querySelector('#nice').innerHTML = nice;
			document.querySelector('#nice').style.display = "block";

			// reflect the letter in the spaces array
			for (var i = 0; i < playWord.length; i++) {
				if (playWord[i] == userGuess) {
					spaces[i] = userGuess;
				}
			}
			
			// adjust correctCounter
			correctCounter = 0;
			for (var i = 0; i < spaces.length; i++) {
				if (spaces[i]=='_') {
					correctCounter++;
				}
			}

			// get the right pluarlization and message for the correctCounter
			if (correctCounter > 1){
				var alertRight = '<p>You have ' + correctCounter + ' letters left to finish the word.</p>';
			} else {
				var alertRight = '<p>You have ' + correctCounter + ' letter left to finish the word. Concentrate!</p>';
			}
			// display correctCounter
			document.querySelector('#alertRight').innerHTML = alertRight;
		
		} else {

			// if it doesn't ...
			// replace the guess in the alphabet with the red x
			alphabet[j]= '<span class="wrong">&#9746;</span>'
			
			// adjust wrongCounter
			wrongCounter = wrongCounter - 1;

			// get the right pluarlization and message for the wrongCounter
			if (wrongCounter > 1){
				var alertWrong = '<p>You have ' + wrongCounter + ' wrong guesses left. Be Careful!</p>';
			} else {
				var alertWrong = '<p>You have ' + wrongCounter + ' wrong guess left. Choose Wisely!</p>';
			}
			document.querySelector('#alertWrong').innerHTML = alertWrong;

			// hide the nice message and show the nope
			document.querySelector('#nice').style.display = "none";
			var nope = '<p>Not part of the word.</p>';
			document.querySelector('#nope').innerHTML = nope;
			document.querySelector('#nope').style.display = "block";

		}
	} else {
		// alert that you have already guessed that
		alert('You guessed that already or your not hitting letters.\n\nTry again.');
	}

	// display the adjusted alphabet array
	var alphaId = '<p> ' + alphabet.join('') + ' </p>';
	document.querySelector('#alphabet').innerHTML = alphaId;

	// display the adjusted spaces array
	var word = '<p> ' + spaces.join('') + ' </p>';
	document.querySelector('#word').innerHTML = word;

	// check if they have lost
	if (wrongCounter == 0) {
		// display negative notice
		var lostQuestion = confirm('Sorry, you ran out of guesses before finishing the word.\n\nThe word was: \"'+playWord+'\".\nTold you this was a \"JavaScript\" word guess game.\n\nWould you like to play again?');
		if (lostQuestion == true) {
			// if OK then reload page
			location.reload();
		} else {
			// if Cancel stay on page and display try again button
			document.querySelector("#startAgain").style.display = "block";
		}
	}

	//check if they have won
	if (correctCounter == 0) {
		// display positive notice
		var wonQuestion = confirm('Congrats, you guessed the word!\n\nWould you like to play again?');
		if (wonQuestion == true) {
			// if OK then reload page
			location.reload();
		} else {
			// if Cancel stay on page and display try again button
			document.querySelector("#startAgain").style.display = "block";
		}
	}
}