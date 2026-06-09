const recipes = [
	{
		title: "Shawarma",
		time: "30 min",
		difficulty: "Easy",
		image: "assets/images/arabic/chicken-shawarma.png"
	},
	{
		title: "Chinese Noodles",
		time: "25 min",
		difficulty: "Medium",
		image: "assets/images/chinese/noodles.jpg"
	},
	{
		title: "Mexican Tacos",
		time: "20 min",
		difficulty: "Easy",
		image: "assets/images/mexican/tacos.jpg"
	},
	{
		title: "Continental Pasta",
		time: "35 min",
		difficulty: "Medium",
		image: "assets/images/continental/pasta.jpg"
	},
	{
		title: "Arabic Hummus Plate",
		time: "15 min",
		difficulty: "Easy",
		image: "assets/images/arabic/hummus.jpg"
	},
	{
		title: "Chinese Fried Rice",
		time: "25 min",
		difficulty: "Easy",
		image: "assets/images/chinese/friedrice.jpg"
	}
];

const track = document.querySelector(".carousel-track");
const dotsContainer = document.querySelector(".dots");
const titleEl = document.querySelector(".recipe-title");
const metaEl = document.querySelector(".recipe-meta");

const leftBtn = document.querySelector(".nav-arrow.left");
const rightBtn = document.querySelector(".nav-arrow.right");

let currentIndex = 0;
let isAnimating = false;

/* CREATE CARDS */
recipes.forEach((recipe, i) => {
	const card = document.createElement("div");
	card.classList.add("card");
	card.dataset.index = i;

	card.innerHTML = `<img src="${recipe.image}" alt="${recipe.title}">`;

	card.addEventListener("click", () => updateCarousel(i));

	track.appendChild(card);

	const dot = document.createElement("div");
	dot.classList.add("dot");
	dot.dataset.index = i;
	dot.addEventListener("click", () => updateCarousel(i));
	dotsContainer.appendChild(dot);
});

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");

/* UPDATE CAROUSEL */
function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentIndex = (newIndex + cards.length) % cards.length;

	cards.forEach((card, i) => {
		const offset = (i - currentIndex + cards.length) % cards.length;

		card.classList.remove(
			"center",
			"left-1",
			"left-2",
			"right-1",
			"right-2",
			"hidden"
		);

		if (offset === 0) card.classList.add("center");
		else if (offset === 1) card.classList.add("right-1");
		else if (offset === 2) card.classList.add("right-2");
		else if (offset === cards.length - 1) card.classList.add("left-1");
		else if (offset === cards.length - 2) card.classList.add("left-2");
		else card.classList.add("hidden");
	});

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === currentIndex);
	});

	titleEl.style.opacity = 0;
	metaEl.style.opacity = 0;

	setTimeout(() => {
		const r = recipes[currentIndex];
		titleEl.textContent = r.title;
		metaEl.textContent = `${r.time} • ${r.difficulty}`;

		titleEl.style.opacity = 1;
		metaEl.style.opacity = 1;
	}, 250);

	setTimeout(() => {
		isAnimating = false;
	}, 800);
}

/* CONTROLS */
leftBtn.addEventListener("click", () => updateCarousel(currentIndex - 1));
rightBtn.addEventListener("click", () => updateCarousel(currentIndex + 1));

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") updateCarousel(currentIndex - 1);
	if (e.key === "ArrowRight") updateCarousel(currentIndex + 1);
});

/* TOUCH SWIPE */
let startX = 0;

document.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
	let diff = startX - e.changedTouches[0].clientX;

	if (Math.abs(diff) > 50) {
		if (diff > 0) updateCarousel(currentIndex + 1);
		else updateCarousel(currentIndex - 1);
	}
});

/* INIT */
updateCarousel(0);
