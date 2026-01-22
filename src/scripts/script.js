/**
 * Scrolls the page to the activities section smoothly.
 * @returns {void}
 */
export function scrollToActivities() {
  const activities = document.getElementById("activities");
  if (activities) {
    activities.scrollIntoView({ behavior: "smooth" });
  }
}

/** @type {string[]} */
const videos = [
  "/images/kobiVideo.mp4",
  "/images/kkk.mp4",
  "/images/hhh.mp4",
];

/**
 * Calculates the current video index based on 15-minute intervals.
 * @returns {number} The index of the video to display.
 */
function getVideoIndex() {
  const currentTime = new Date().getTime();
  const timeSlot = Math.floor(currentTime / (15 * 60 * 1000));
  return timeSlot % videos.length;
}

/**
 * Updates the header video source.
 * @returns {void}
 */
export function updateVideo() {
  /** @type {HTMLVideoElement | null} */
  const videoElement = document.querySelector("#headerVideo");
  /** @type {HTMLSourceElement | null} */
  const sourceElement = document.querySelector("#videoSource");
  if (videoElement && sourceElement) {
    sourceElement.src = videos[getVideoIndex()];
    videoElement.load();
  }
}

/**
 * Displays the hidden phone number element.
 * @returns {void}
 */
export function showPhoneNumber() {
  /** @type {HTMLElement | null} */
  const phoneNumber = document.getElementById("phone-number");
  if (phoneNumber) {
    phoneNumber.style.display = "block";
  }
}

/** @type {number} */
const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000;

/**
 * Updates the countdown timer display.
 * @returns {void}
 */
export function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;
  /** @type {HTMLElement | null} */
  const countdownElement = document.getElementById("countdown");
  /** @type {HTMLElement | null} */
  const timerElement = document.getElementById("timer");

  if (!countdownElement || !timerElement) return;

  if (distance <= 0) {
    countdownElement.innerHTML = "⏳ המבצע הסתיים!";
    return;
  }

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerElement.innerText = `${hours} שעות ${minutes} דקות ${seconds} שניות`;
}

/** @type {boolean} */
let fontSizeIncreased = false;
/** @type {boolean} */
let contrastEnabled = false;
/** @type {boolean} */
let linksHighlighted = false;

/**
 * Toggles the body font size for accessibility.
 * @returns {void}
 */
export function increaseTextSize() {
  document.body.style.fontSize = fontSizeIncreased ? "" : "1.3em";
  fontSizeIncreased = !fontSizeIncreased;
}

/**
 * Toggles high contrast mode for accessibility.
 * @returns {void}
 */
export function toggleContrast() {
  document.body.classList.toggle("high-contrast");
  contrastEnabled = !contrastEnabled;
}

/**
 * Toggles highlighting for all links on the page.
 * @returns {void}
 */
export function highlightLinks() {
  /** @type {NodeListOf<HTMLAnchorElement>} */
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
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

/**
 * Resets all accessibility settings to default.
 * @returns {void}
 */
export function resetAccessibility() {
  document.body.style.fontSize = "";
  document.body.classList.remove("high-contrast");
  /** @type {NodeListOf<HTMLAnchorElement>} */
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.style.backgroundColor = link.dataset.originalBg || "";
    link.style.color = link.dataset.originalColor || "";
  });
  fontSizeIncreased = false;
  contrastEnabled = false;
  linksHighlighted = false;
}

/** @type {string[]} */
const loopVideos = [
  "https://res.cloudinary.com/dora8sxcb/video/upload/v1739733574/one.mp4_nabbdp.mp4",
  "https://res.cloudinary.com/dora8sxcb/video/upload/v1739794183/action2.png_ftcfgr.mp4",
];
/** @type {number} */
let currentLoopIndex = 0;

/**
 * Sets up the video player loop.
 * @returns {void}
 */
export function setupLoopVideo() {
  /** @type {HTMLVideoElement | null} */
  const videoPlayer = document.getElementById("videoPlayer");
  /** @type {HTMLSourceElement | null} */
  const videoSource = document.getElementById("videoSource");

  if (!videoPlayer || !videoSource) return;

  videoPlayer.addEventListener("ended", function () {
    currentLoopIndex = (currentLoopIndex + 1) % loopVideos.length;
    videoSource.src = loopVideos[currentLoopIndex];
    videoPlayer.load();
    videoPlayer.play();
  });

  videoPlayer.play().catch(err => console.log("Auto-play blocked or failed", err));
}

// Attach functions to window object for HTML onclick compatibility
if (typeof window !== 'undefined') {
  window.scrollToActivities = scrollToActivities;
  window.updateVideo = updateVideo;
  window.showPhoneNumber = showPhoneNumber;
  window.updateCountdown = updateCountdown;
  window.increaseTextSize = increaseTextSize;
  window.toggleContrast = toggleContrast;
  window.highlightLinks = highlightLinks;
  window.resetAccessibility = resetAccessibility;
  window.setupLoopVideo = setupLoopVideo;
}

document.addEventListener("DOMContentLoaded", function () {
  updateVideo();
  updateCountdown();
  setupLoopVideo();
  setInterval(updateCountdown, 1000);

  const accessibilityContainer = document.createElement("div");
  accessibilityContainer.classList.add("accessibility-container");
  accessibilityContainer.innerHTML = `
		<button id="accessibility-btn" title="נגישות">🛠️</button>
		<div id="accessibility-panel" class="hidden">
			<h3>אפשרויות נגישות</h3>
			<button onclick="increaseTextSize()">🔍 הגדלת טקסט</button>
			<button onclick="toggleContrast()">🌗 ניגודיות גבוהה</button>
			<button onclick="highlightLinks()">🔗 הדגשת קישורים</button>
			<button onclick="resetAccessibility()">🔄 איפוס</button>
		</div>
	`;
  document.body.appendChild(accessibilityContainer);

  const accessibilityBtn = document.getElementById("accessibility-btn");
  const accessibilityPanel = document.getElementById("accessibility-panel");

  if (accessibilityBtn && accessibilityPanel) {
    accessibilityBtn.addEventListener("click", function () {
      accessibilityPanel.classList.toggle("hidden");
    });
  }
});
