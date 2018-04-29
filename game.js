import  { GameElement, Timer, OptionItem, Card } from './js/classes.js';

const shirts = {
	'shirt1' : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/shirt1.jpg',
	'shirt2' : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/shirt2.jpg',
	'shirt3' : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/shirt3.jpg',
	'shirt4' : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/shirt4.jpg',
	'shirt5' : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/shirt5.jpg',
	'shirt6' : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/shirt6.jpg',
	'shirt7' : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/shirt7.jpg'
};

const cardFaces = {
	1 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face1.jpg',
	2 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face2.jpg',
	3 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face3.jpg',
	4 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face4.jpg',
	5 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face5.jpg',
	6 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face6.jpg',
	7 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face7.jpg',
	8 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face8.jpg',
	9 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face9.jpg',
	10 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face10.jpg',
	11 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face11.jpg',
	12 : 'https://raw.githubusercontent.com/morozzzz/match-match-game/master/img/face12.jpg'
};

const difficulties = {
	'low' : 8,
	'medium' : 16,
	'hight' : 24
};

const userFirstNameInput = document.querySelector('#first-name');
const userLastNameInput = document.querySelector('#last-name');
const userEmailInput = document.querySelector('#email');
const shirtButton = document.querySelector('#shirt-button');
const difficultyButton = document.querySelector('#difficulty-button'); 
const form = document.querySelector('form');
let firstName = null;
let lastName = null;
let email = null;
let chosenCardShirt = shirts['shirt1']; 
let chosenGameDifficulty = difficulties['low'];
let currentUserTimerValue = null;


const getUserInformation = () => {
	firstName = userFirstNameInput.value;
	lastName = userLastNameInput.value;
	email = userEmailInput.value;	
	let users = localStorage['users'] ? JSON.parse(localStorage['users']) : [];
	const newUserInfo = {
		'first name' : firstName,
		'last name' : lastName,
		'email' : email
	};
	
	users = users.map((user) => JSON.parse(user));
	users.push(newUserInfo);
	users = users.map((user) => JSON.stringify(user));
	localStorage['users'] = JSON.stringify(users);
};

const closeMainMenu = () => {
	const mainMenuToRemove = document.querySelector('main');
	document.querySelector('.game-body').removeChild(mainMenuToRemove);
};

const chooseShirt = () => {
	const shirtListWrapper = new GameElement('div', 'option-list-wrapper');
	const shirtList = new GameElement('div', 'option-list');
	const closeShirtList = () => {
		shirtListWrapper.removeFrom('.game-body');
	};
	const chooseShirtByClick = () => {
		const shirtId = event.target.id;
		chosenCardShirt = shirts[shirtId];
		shirtListWrapper.body.classList.add('disappear'); //to set animation 
		setTimeout(closeShirtList,500);							
	};
	shirtListWrapper.pushInto('.game-body');
	shirtList.pushInto('.option-list-wrapper');	
	for(let shirtId in shirts) {
		const shirtUrl = shirts[shirtId];
		const cardShirt = new OptionItem('div', 'shirt-in-list', shirtId, shirtUrl);
		cardShirt.pushInto('.option-list');
		cardShirt.addEvent('click', chooseShirtByClick);
	}
};

const chooseDifficulty = () => {
	const difficultyListWrapper = new GameElement('div', 'option-list-wrapper');
	const difficultyList = new GameElement('div', 'option-list');
	const closeDifficultyList = () => {
		difficultyListWrapper.removeFrom('.game-body');
	};
	const chooseDifficultyByClick = () => {
		const difficultyId = event.target.id;
		chosenGameDifficulty = difficulties[difficultyId];
		difficultyListWrapper.body.classList.add('disappear'); //to set animation 
		setTimeout(closeDifficultyList,500);											
	};
	difficultyListWrapper.pushInto('.game-body');
	difficultyList.pushInto('.option-list-wrapper');	
	for(let difficulty in difficulties) {		
		const gameDifficultyItem = new OptionItem('div', 'difficulty', `${difficulty}`);
		const numberOfCards = difficulties[difficulty];
		gameDifficultyItem.addContent(`${difficulty} : ${numberOfCards}`);
		gameDifficultyItem.pushInto('.option-list');
		gameDifficultyItem.addEvent('click', chooseDifficultyByClick);
	}
};

const switchOffTheLight = () => { document.querySelector('.light-switching-off').classList.add('switch-off'); };

const startGame = () => {
	let numberOfCards = chosenGameDifficulty;
	let cardDeck = [];
	const gameFieldWrapper = new GameElement('div', 'game-field-wrapper');
	const gameField = new GameElement('div', 'game-field');
	const goToMainMenuButton = new GameElement('div', 'main-menu-button');
	const gameTimer = new Timer('div', 'game-timer');

	const goToMainMenu = () => { 
		const getMainMenu = () => { location.href = 'index.html'; };
		switchOffTheLight();
		setTimeout(getMainMenu,400);
	};

	const processTheCard = (target) => {
		const card = target;
		const cardId = card.id;
		const cardPairIdentifier = card.classList.value;
		card.classList.add('flip');
		if(processTheCard.chosenCards) {			
			if(processTheCard.firstTryCardId === cardId) return; // click on the same card
			processTheCard.chosenCards.push(card);
			if(cardPairIdentifier === processTheCard.firstTryValue) {								
				const hideCards = () => {
					processTheCard.chosenCards.forEach((card) => {
						const cardFace = card.querySelector('.card-face');
						cardFace.classList.add('disappear');	
						card.style.visibility = 'hidden';
					});
					processTheCard.firstTryValue = null;
					processTheCard.firstTryCardId = null;
					processTheCard.chosenCards = null;
				};				
				setTimeout(hideCards,400);	
				numberOfCards -= 2;
				checkForEndOfTheGame();										
			} else {
				const flipBack = () => {
					processTheCard.chosenCards.forEach((card) => {
						card.classList.remove('flip');
					});
					processTheCard.firstTryValue = null;
					processTheCard.firstTryCardId = null;	
					processTheCard.chosenCards = null;
				};
				setTimeout(flipBack,800);
			}
		} else {
			processTheCard.chosenCards = [];
			processTheCard.chosenCards.push(card);
			processTheCard.firstTryCardId = cardId;
			processTheCard.firstTryValue = cardPairIdentifier;
		} 		
	};
	
	const checkForTwoOpenedCards = () => processTheCard.chosenCards && processTheCard.chosenCards.length === 2;

	const checkForEndOfTheGame = () => {
		if(numberOfCards === 0) {
			gameTimer.stop();
			currentUserTimerValue = gameTimer.saveValue();
			setTimeout(switchOffTheLight, 1000);
			setTimeout(processTheResults, 2000);
		} 		
	};
	
	const processTheResults = () => {				
		const finalGameScreen = new GameElement('div','final-game-screen');
		const congratulation = new GameElement('div','congratulation');
		const scoreTableWrapper = new GameElement('table','score-table-wrapper');
		const scoreTable = new GameElement('table','score-table');
		const scoreTableHead = new GameElement('tr','score-table-head');
		const scoreTableUserHead = new GameElement('th','score-table-cell');
		const scoreTableTimeHead = new GameElement('th','score-table-cell');
		const scoreTableLabel = new GameElement('div','score-table-label');
		const scoreTableIdentifier = Object.keys(difficulties).find(key => difficulties[key] === chosenGameDifficulty);
		const compareUsersTime = (a,b) => a['counter'] - b['counter'];
		const currentUserScore = {
			'user' : `${firstName} ${lastName}`,
			'time' : currentUserTimerValue['time'],
			'counter' : currentUserTimerValue['counter']
		};
		let currentScoreTable = [];		
		
		congratulation.addContent('WIN');
		congratulation.pushInto(finalGameScreen.body);
		scoreTableLabel.addContent('BEST SCORES');
		scoreTableLabel.pushInto(finalGameScreen.body);
		scoreTableUserHead.addContent('USER');
		scoreTableTimeHead.addContent('TIME');
		scoreTableUserHead.pushInto(scoreTableHead.body);
		scoreTableTimeHead.pushInto(scoreTableHead.body);
		scoreTableHead.pushInto(scoreTable.body);
		goToMainMenuButton.body.classList.add('menu-button-final-screen');

		if(localStorage[`${scoreTableIdentifier} score table`]) {
			currentScoreTable = JSON.parse(localStorage[`${scoreTableIdentifier} score table`]);
			currentScoreTable = currentScoreTable.map((user) => JSON.parse(user));
		}

		currentScoreTable.push(currentUserScore);		
		currentScoreTable = currentScoreTable.sort(compareUsersTime);
		if(currentScoreTable.length > 10) currentScoreTable.pop();
		currentScoreTable = currentScoreTable.map((user) => {
			const scoreTableRow = new GameElement('tr','score-table-row');
			const scoreTableNameCell = new GameElement('td','score-table-cell');
			const scoreTableTimeCell = new GameElement('td','score-table-cell');
			scoreTableNameCell.addContent(user['user']);
			scoreTableTimeCell.addContent(user['time']);
			scoreTableNameCell.pushInto(scoreTableRow.body);
			scoreTableTimeCell.pushInto(scoreTableRow.body);
			scoreTableRow.pushInto(scoreTable.body);
			return JSON.stringify(user);
		});
		localStorage[`${scoreTableIdentifier} score table`] = JSON.stringify(currentScoreTable);
		
		scoreTable.pushInto(scoreTableWrapper.body);
		goToMainMenuButton.pushInto(scoreTableWrapper.body);
		scoreTableWrapper.pushInto(finalGameScreen.body);
		finalGameScreen.pushInto('body');
	};

	const checkForPair = (event) => {			
		if(checkForTwoOpenedCards()) return;	
		let target = event.target;		
		while(target != this) {
			if(target.classList && target.classList.contains('card')) {
				processTheCard(target);
			}
			target = target.parentNode;
		}
	};
	
	
	const shuffleDeck = (deck) => { 
		for (let i = deck.length - 1; i > 0; i--) { 
			let j = Math.floor(Math.random() * (i + 1)); 
			[deck[i], deck[j]] = [deck[j], deck[i]]; 
		} 
	};
	
	getUserInformation();
	closeMainMenu();
	
	for(let i = 1; i <=  numberOfCards; i++) {
		const pairIdentificator = Math.ceil(i/2);
		const card = new Card('div', 'card', `card${i}`, `card${pairIdentificator}`);
		card.setShirt(chosenCardShirt);	
		card.setFace(cardFaces[pairIdentificator]);	
		cardDeck.push(card);	
	}

	shuffleDeck(cardDeck);
	cardDeck.forEach((card) => {
		card.pushInto(gameField.body);
	});	
	
	gameTimer.pushInto(gameFieldWrapper.body);
	gameField.pushInto(gameFieldWrapper.body);
	gameField.addEvent('click', checkForPair);
	gameFieldWrapper.pushInto('.game-body');
	goToMainMenuButton.addContent('Main Menu');
	goToMainMenuButton.pushInto('.game-body');		
	goToMainMenuButton.addEvent('click', goToMainMenu);	
	gameTimer.start();
};

const preloadImage = (url) => {
	const img = new Image();
	img.src=url;
};

for(let item in shirts) {
	preloadImage(shirts[item]);
}
for(let item in cardFaces) {
	preloadImage(cardFaces[item]);
}

shirtButton.addEventListener('click', chooseShirt);
difficultyButton.addEventListener('click', chooseDifficulty);
form.addEventListener('submit', startGame);


