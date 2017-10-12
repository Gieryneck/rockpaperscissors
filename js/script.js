

// przycisk new game, nadanie listenera
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);


// sekcja z wyborem rock-paper-scissors, nadanie listenerów na przyciski
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });




// zmienne okreslajace bloki gry 

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');


// zmienna gameState, która m. in. jest parametrem dla fcji okreslajacej widoczne na stronie bloki 
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };



// fcja okreslajaca jakie bloki pokazujemy, sterowana zmienna gameState

function setGameElements() {

  switch(gameState) {

    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;

    case 'ended':
    	newGameElem.style.display = 'block';
	    pickElem.style.display = 'none';
        newGameBtn.innerText = 'Play again';
      break;  

    case 'notStarted': // ten stan jest tylko przed rozpoczeciem pierwszej gry

    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}


// 
var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    matchResult = document.getElementById('js-matchResult');


// ROZPOCZECIE GRY

function newGame() {

  matchResult.classList.remove('badge-success', 'badge-danger');
  matchResult.style.display = 'none';	

  player.name = prompt('Please enter your name', 'John Doe');

  if (player.name) {  // sprawdzenie czy imie zostalo podane

    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements(); // zmieniamy widoczne na stronie bloki

    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }

}


// losowanie wyboru komputera rock-paper-scissors 

function getComputerPick(){

	var possiblePicks = ['rock', 'paper', 'scissors'];
	return possiblePicks[Math.floor(Math.random()*3)]; /* mnozymy
	losowa liczbe z przedziału <0,1) x3 i zaokrąglamy w dół;
	możliwe wyniki to 0, 1 lub 2. Tą sztuczką w losowy sposób
	wybieramy indeks [0] lub [1] lub [2] z tablicy possiblePicks. */


}


// tabela wyników, wyświetlanie wyborów graczy, wyświetlanie pktacji

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');


//  gracz kliknięciem na button-listener wybiera r-p-s, ORAZ tę fcję(trigger wyboru komputera):

function playerPick(playerPick) {

	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick; /* parametr playerPick będzie przybierał jedną z wartości ustalonych
	 w linijkach 13-15, w zaleznosci co kliknie gracz */
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
}






// SPRAWDZENIE KTO WYGRAŁ RUNDĘ, DOPISANIE PUNKTÓW


function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

/* Zakładamy na początku, że rundę wygrał gracz, a potem sprawdzamy ifem czy jednak jest inaczej,
dzięki temu nie musimy tyle kodować */

  var winnerIs = 'player';


  	// sprawdzenie czy jest remis i ew. korekta var winnerIs
    if (playerPick == computerPick) { 
        winnerIs = 'noone'; // remis

    // sprawdzenie czy wygrał komputer i ew. korekta var winnerIs
    } else if (						
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }



    //dopisanie pktów i rezultatu rundy

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;

    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }

    setGamePoints();


	// zakonczenie rozgrywki
	
	if (player.score == 10 || computer.score == 10){

		matchResult.style.display = 'inline';

		if (player.score == 10) {

			matchResult.classList.add('badge-success');
			matchResult.innerHTML = player.name + ' has won!';  

		} else if (computer.score == 10) {
	
			matchResult.classList.add('badge-danger');
			matchResult.innerHTML = 'Computer has won!';
		}

		gameState = 'ended';
		setGameElements();
	}
	     
}

function setGamePoints() {

    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

