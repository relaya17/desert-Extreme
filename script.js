function scrollToActivities() {
	document.getElementById("activities").scrollIntoView({ behavior: "smooth" });
}

const videos = ["images/kobiVideo.mp4", "images/kkk.mp4", "images/hhh.mp4"];

// מחשבים איזה סרטון להציג כל 10 שעות
function getVideoIndex() {
	const currentTime = new Date().getTime();
	const timeSlot = Math.floor(currentTime / (15 * 60 * 1000)); // מחלקים לזמן של 10 שעות
	return timeSlot % videos.length; // מחזוריות לפי מספר הסרטונים
}

// שינוי הסרטון בהתאם לזמן
function updateVideo() {
	const videoElement = document.getElementById("headerVideo");
	const sourceElement = document.getElementById("videoSource");

	if (videoElement && sourceElement) {
		const newVideo = videos[getVideoIndex()];
		sourceElement.src = newVideo;
		videoElement.load(); // טוען את הווידאו מחדש
	}
}
document.addEventListener("DOMContentLoaded", function () {
	// יצירת אלמנט הקונטיינר הצף לנגישות
	const accessibilityContainer = document.createElement("div");
	accessibilityContainer.classList.add("accessibility-container");

	accessibilityContainer.innerHTML = `
        <button id="accessibility-btn">🛠️</button>
        <div id="accessibility-panel" class="hidden">
            <h3>אפשרויות נגישות</h3>
            <button onclick="increaseTextSize()">🔍 הגדלת טקסט</button>
            <button onclick="toggleContrast()">🌗 ניגודיות גבוהה</button>
            <button onclick="highlightLinks()">🔗 הדגשת קישורים</button>
            <button onclick="resetAccessibility()">🔄 איפוס</button>
        </div>
    `;

	document.body.appendChild(accessibilityContainer);

	// הפעלת הפאנל בלחיצה
	document
		.getElementById("accessibility-btn")
		.addEventListener("click", function () {
			document.getElementById("accessibility-panel").classList.toggle("hidden");
		});
});

// פונקציות נגישות
let fontSizeIncreased = false;
function increaseTextSize() {
	document.body.style.fontSize = fontSizeIncreased ? "" : "1.3em";
	fontSizeIncreased = !fontSizeIncreased;
}

let contrastEnabled = false;
function toggleContrast() {
	document.body.classList.toggle("high-contrast");
	contrastEnabled = !contrastEnabled;
}

let linksHighlighted = false;
function highlightLinks() {
	document.querySelectorAll("a").forEach((link) => {
		if (!linksHighlighted) {
			link.dataset.originalBg = link.style.backgroundColor;
			link.dataset.originalColor = link.style.color;
			link.style.backgroundColor = "yellow";
			link.style.color = "black";
		} else {
			link.style.backgroundColor = link.dataset.originalBg || "";
			link.style.color = link.dataset.originalColor || "";
		}
	});
	linksHighlighted = !linksHighlighted;
}

function resetAccessibility() {
	document.body.style.fontSize = "";
	document.body.classList.remove("high-contrast");
	document.querySelectorAll("a").forEach((link) => {
		link.style.backgroundColor = link.dataset.originalBg || "";
		link.style.color = link.dataset.originalColor || "";
	});
	fontSizeIncreased = false;
	contrastEnabled = false;
	linksHighlighted = false;
}
// קביעת תאריך יעד (כאן לדוגמה זה 24 שעות מעכשיו)
const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000;

// פונקציה להפעלת הטיימר
function updateCountdown() {
	const now = new Date().getTime();
	const distance = countdownDate - now;

	if (distance <= 0) {
		document.getElementById("countdown").innerHTML = "⏳ המבצע הסתיים!";
		return;
	}

	// חישוב הזמן הנותר
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	// עדכון ה-HTML
	document.getElementById(
		"timer"
	).innerText = `${hours} שעות ${minutes} דקות ${seconds} שניות`;
}

// הפעלת הפונקציה מידית ואז בכל שנייה
updateCountdown();

setInterval(updateCountdown, 1000);
function showPhoneNumber() {
	const phoneNumber = document.getElementById("phone-number");
	phoneNumber.style.display = "block"; // נחשוף את המספר אחרי לחיצה
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
}
document.addEventListener("DOMContentLoaded", function () {
	const videoPlayer = document.getElementById("videoPlayer");
	const videoSource = document.getElementById("videoSource");

	// רשימת הסרטונים לסירוגין
	const videos = [
		"https://res.cloudinary.com/dora8sxcb/video/upload/v1739733574/one.mp4_nabbdp.mp4",
		"https://res.cloudinary.com/dora8sxcb/video/upload/v1739794183/action2.png_ftcfgr.mp4",
	];

	let currentVideoIndex = 0;

	videoPlayer.addEventListener("ended", function () {
		// עדכון לאינדקס הבא (בלולאה)
		currentVideoIndex = (currentVideoIndex + 1) % videos.length;
		videoSource.src = videos[currentVideoIndex];
		videoPlayer.load(); // טוען את הווידאו החדש
		videoPlayer.play(); // מפעיל אותו מחדש
	});
});

// Navbar scroll effect
document.addEventListener("DOMContentLoaded", function () {
	const navbar = document.querySelector(".navbar");

	if (navbar) {
		window.addEventListener("scroll", function () {
			if (window.scrollY > 20) {
				navbar.classList.add("scrolled");
			} else {
				navbar.classList.remove("scrolled");
			}
		});
	}
});

// Add parallax scroll effect
document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener("scroll", function () {
		const scrollY = window.scrollY;
		const headerContainer = document.querySelector(".header-container");

		if (headerContainer) {
			const overlay = document.querySelector(".parallax-overlay");
			const element1 = document.querySelector(".parallax-element-1");
			const element2 = document.querySelector(".parallax-element-2");

			if (overlay)
				overlay.style.transform = `translateY(${
					scrollY * 0.2
				}px) translateZ(-1px) scale(2)`;
			if (element1)
				element1.style.transform = `translateY(${
					scrollY * 0.1
				}px) translateZ(-0.5px) scale(1.5)`;
			if (element2)
				element2.style.transform = `translateY(${
					scrollY * 0.3
				}px) translateZ(-1.5px) scale(2.5)`;
		}
	});
});
=======
} 
>>>>>>> parent of 3d03e57 (Merge branch 'main' of https://github.com/relaya17/actionsInTheDesert)
=======
} 
>>>>>>> parent of 3d03e57 (Merge branch 'main' of https://github.com/relaya17/actionsInTheDesert)
=======
} 
>>>>>>> parent of 3d03e57 (Merge branch 'main' of https://github.com/relaya17/actionsInTheDesert)
