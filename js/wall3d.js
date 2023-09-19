{
	const stageElem = document.querySelector('.stage');
	const houseElem = document.querySelector('.house');
	const barElem = document.querySelector('.progress-bar');
	const mousePosition = { x: 0, y: 0 };
	let maxScrollValue = 0;

	window.addEventListener('scroll', scrollHandler);

	// 스크롤 이벤트 핸들러
	function scrollHandler(e) {
		// 현재 스크롤 위치를 계산해서 Z축 이동, 즉 스크롤로 앞뒤로 왔다갔다하기
		const zMove = (window.scrollY / maxScrollValue) * 1000 - 490;
		houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

		// 프로그레스 바 넓이
		let zMoveRate = (window.scrollY / maxScrollValue) * 100;
		if(isNaN(zMoveRate)) zMoveRate = 0;
		barElem.style.width = zMoveRate + '%';
	}
	scrollHandler();

	window.addEventListener('mousemove', (e) => {
		// console.log(e.clientX, e.clientY);

		// center를 기준으로 x축, y축의 이동 거리를 계산
		mousePosition.x = -1 + (e.clientX / window.innerWidth) * 2;
		mousePosition.y = 1 - (e.clientY / window.innerHeight) * 2;
		stageElem.style.transform = 'rotateX(' + mousePosition.y * 5 + 'deg) rotateY(' + mousePosition.x * 5 + 'deg)';
	});

	window.addEventListener('resize', resizeHandler);

	function resizeHandler(e) {
		// 스크롤 가능한 범위 계산
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}
	resizeHandler();
}
