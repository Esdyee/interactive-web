function Character(info) {
	this.mainElem = document.createElement('div');
	this.mainElem.classList.add('character');
	this.mainElem.innerHTML = `
<div class="character">
\t<div class="character-face-con character-head">
\t\t<div class="character-face character-head-face face-front"></div>
\t\t<div class="character-face character-head-face face-back"></div>
\t</div>
\t<div class="character-face-con character-torso">
\t\t<div class="character-face character-torso-face face-front"></div>
\t\t<div class="character-face character-torso-face face-back"></div>
\t</div>
\t<div class="character-face-con character-arm character-arm-right">
\t\t<div class="character-face character-arm-face face-front"></div>
\t\t<div class="character-face character-arm-face face-back"></div>
\t</div>
\t<div class="character-face-con character-arm character-arm-left">
\t\t<div class="character-face character-arm-face face-front"></div>
\t\t<div class="character-face character-arm-face face-back"></div>
\t</div>
\t<div class="character-face-con character-leg character-leg-right">
\t\t<div class="character-face character-leg-face face-front"></div>
\t\t<div class="character-face character-leg-face face-back"></div>
\t</div>
\t<div class="character-face-con character-leg character-leg-left">
\t\t<div class="character-face character-leg-face face-front"></div>
\t\t<div class="character-face character-leg-face face-back"></div>
\t</div>
</div>
`

	document.querySelector('.stage').appendChild(this.mainElem);
	this.mainElem.style.left = info.xPos + '%';
	this.xPos = info.xPos;
	this.init(); // 초기화
}

Character.prototype = {
	constructor: Character,
	isScroll: false,
	isRunning: false,
	scrollNumber: 0,
	lastScrollTop: 0,
	xPos: 0,
	speed: 0.4,
	direction: "",
	init: function () { // 초기화를 해서 해당 캐릭터가 아래 이벤트를 갖도록 설정
		window.addEventListener('scroll', (e) => {
			clearTimeout(this.scrollNumber);

			if(!this.isScroll) {
				this.isScroll = true;
				this.mainElem.classList.add('running');
			}

			this.scrollNumber = setTimeout(() => {
				this.isScroll = false;
				this.mainElem.classList.remove('running');
			}, 500)


			// scrollup (lastScrollTop 사용)
			if(this.lastScrollTop > window.scrollY) {
				this.mainElem.setAttribute('data-direction', 'backward');
			}

			// scrolldown (lastScrollTop 사용)
			if(this.lastScrollTop < window.scrollY) {
				this.mainElem.setAttribute('data-direction', 'forward');
			}

			this.lastScrollTop = window.scrollY; // 현재 스크롤 위치를 저장
		});


		window.addEventListener('keydown', (e) => {


			// left arrow key down
			// Don't use keyCode, it's deprecated
			if(e.code === 'ArrowLeft') {
				this.direction = 'left';
				this.mainElem.setAttribute('data-direction', 'left');
				this.mainElem.classList.add('running');
				this.isRunning = true;
				this.run(this);
			}

			if(e.code === 'ArrowRight') {
				this.direction = 'right';
				this.mainElem.setAttribute('data-direction', 'right');
				this.mainElem.classList.add('running');
				this.isRunning = true;
				this.run(this);
			}
		});

		window.addEventListener('keyup', (e) => {
			this.mainElem.classList.remove('running');
			this.isRunning = false;
		});
	},
	run: function () {
		if(this.direction === 'left') {
			this.xPos -= this.speed;
		}
		if(this.direction === 'right') {
			this.xPos += this.speed;
		}

		if(this.xPos < 2) {
			this.xPos = 2;
		}

		if(this.xPos > 88) {
			this.xPos = 88;
		}

		// console.log(this.xPos, this.speed);
		this.mainElem.style.left = this.xPos + '%'; // 현재 캐릭터 Elem을 변경

		requestAnimationFrame( () => {
			if(this.isRunning) {
				this.run();
			}
		});
	}
}
