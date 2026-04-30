const deathsByTile = [11,351,1502,2929,3064,3189,3579,5156,5369,6095,6264,6364,6628,8367,8962,9345,10479,11066,11587,12489,13083,13329,13684,13909,14053,14087,14810,14958,14989,15161,15222,15339,15667,15854,16226,16279,16408,16437,16609,16900,17197,17363,17600,17953,18312,18422,18599,18967,19178,19535,19771,20012,20238,20332,20760,21357,22200,22533,22620,22883,23188,23597,23816,24120,24384,24698,24819,25075,25227,25459,25796,26361,26615];
const TOTAL_TILES = 73;

let descriptions = document.querySelectorAll('.description-block');
const titleBlock = document.querySelector('.description-block.title-splash');
const splash = document.querySelector('.description-block.splash');
const deathCounter = document.getElementById('deathCounter');
const counterNumber = document.getElementById('counterNumber');

let currentDisplayed = 0;
let targetCount = 0;
let animFrame = null;

function animateCounter(target) {
	if (animFrame) cancelAnimationFrame(animFrame);
	const start = currentDisplayed;
	const diff = target - start;
	const duration = 600;
	const startTime = performance.now();
	function step(now) {
		const elapsed = now - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const eased = 1 - Math.pow(1 - progress, 3);
		currentDisplayed = Math.round(start + diff * eased);
		counterNumber.textContent = currentDisplayed.toLocaleString();
		if (progress < 1) animFrame = requestAnimationFrame(step);
	}
	animFrame = requestAnimationFrame(step);
}

function init() {
	descriptions.forEach(el => {
		el.style.opacity = '0';
		el.style.pointerEvents = 'none';
	});
	titleBlock.style.opacity = '1';
	titleBlock.style.pointerEvents = 'auto';
}
init();

window.addEventListener('scroll', () => {
	const scrollLeft = window.scrollX;
	const docWidth = document.documentElement.scrollWidth;
	const winWidth = window.innerWidth;
	const scrollPercent = scrollLeft / (docWidth - winWidth);

	const allBlocks = Array.from(descriptions);
	const activeIndex = Math.round((allBlocks.length - 1) * scrollPercent);
	const activeBlock = allBlocks[activeIndex];

	descriptions.forEach(el => {
		el.style.opacity = '0';
		el.style.pointerEvents = 'none';
	});

	activeBlock.style.opacity = '1';
	activeBlock.style.pointerEvents = 'auto';

	if (activeIndex > 1) {
		splash.style.opacity = '0';
		splash.style.pointerEvents = 'none';
	}

	if (activeIndex > 1) {
		deathCounter.classList.add('visible');
		const tileIndex = Math.min(Math.floor(scrollPercent * TOTAL_TILES), TOTAL_TILES - 1);
		const newTarget = deathsByTile[tileIndex];
		if (newTarget !== targetCount) {
			targetCount = newTarget;
			animateCounter(targetCount);
		}
	} else {
		deathCounter.classList.remove('visible');
	}
});


window.addEventListener('wheel', (e) => {
	if (e.deltaX != 0) {
		// return
	}
	e.preventDefault();
	window.scrollTo({
		top: 0,
		left: window.scrollX += e.deltaY + e.deltaX,
		behavior: "instant"
	})
})