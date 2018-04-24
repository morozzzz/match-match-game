class GameElement {
	constructor(element,elementClassName) {
		this.body = document.createElement(`${element}`);
		this.body.classList.add(`${elementClassName}`);
	}

	pushInto(parentSelector) {
		if(typeof parentSelector === 'string') {
			const targetParent = document.querySelector(`${parentSelector}`);
			targetParent.appendChild(this.body);
		} else {
			parentSelector.appendChild(this.body);
		}       
	}

	addContent(content) {
		this.body.innerHTML = `${content}`;
	}

	addEvent(eventName, calledFunction) {
		this.body.addEventListener(`${eventName}`, calledFunction);
	}

	removeFrom(parentSelector) {
		if(typeof parentSelector === 'string') {
			const targetParent = document.querySelector(`${parentSelector}`);
			targetParent.removeChild(this.body);
		} else {
			parentSelector.removeChild(this.body);
		}       
	}
}

class Timer extends GameElement {
	constructor(element,elementClassName) {
		super(element,elementClassName);
		this.timerId = null;
		this.timerScreenValue = null;
		this.timerCounter = 0;
	}

	start() {    
		const timerScreen = this.body;
		timerScreen.innerHTML = '0:0';
		let m = 0, s = 0;        
		const refreshTimer = () => {
			this.timerCounter++;                       
			s++;
			if(s > 59) {
				m++;
				s = 0;
			}		        
			this.timerValue = [m, s];
			this.timerScreenValue = this.timerValue.join(':');
			timerScreen.innerHTML = this.timerScreenValue;
		};
		this.timerId = setInterval(refreshTimer,1000);                      
	}
    
	stop() {    
		clearInterval(this.timerId);        
	}  
    
	saveValue() {
		const numberOfLastUser = localStorage.length;
		const currentUserIdentifier = `user${numberOfLastUser}`;
		let currentUserProfile = JSON.parse(localStorage[currentUserIdentifier]);
		currentUserProfile['time'] = this.timerScreenValue;
		currentUserProfile['counter'] = this.timerCounter;
		localStorage.setItem(currentUserIdentifier, JSON.stringify(currentUserProfile));	
	}
}

class OptionItem extends GameElement {
	constructor(element,elementClassName,itemId,itemUrl) {
		super(element,elementClassName);
		this.body.id = itemId;
		this.body.style.backgroundImage = itemUrl;
	}
}

class Card extends GameElement {
	constructor(element,elementClassName,cardId,pairIdentificator) {
		super(element,elementClassName);
		this.body.classList.add(pairIdentificator);
		this.body.id = cardId;
	}

	setShirt(shirtUrl) {
		const shirt = document.createElement('div');
		shirt.className = 'card-shirt'
		shirt.style.backgroundImage = shirtUrl;
		this.body.appendChild(shirt);

	}

	setFace(faceUrl) {
		const face = document.createElement('div');
		face.className = 'card-face'
		face.style.backgroundImage = faceUrl;
		this.body.appendChild(face);
	}
}