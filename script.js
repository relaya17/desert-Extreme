function scrollToActivities() {
    document.getElementById("activities").scrollIntoView({ behavior: "smooth" });
  }
  
  // 🎞️ סרטוני וידאו מתחלפים לפי זמן
  const videos = [
    "images/kobiVideo.mp4",
    "images/kkk.mp4",
    "images/hhh.mp4"
  ];
  
  function getVideoIndex() {
    const currentTime = new Date().getTime();
    const timeSlot = Math.floor(currentTime / (15 * 60 * 1000)); // כל 15 דקות
    return timeSlot % videos.length;
  }
  
  function updateVideo() {
    const videoElement = document.getElementById("headerVideo");
    const sourceElement = document.getElementById("videoSource");
    if (videoElement && sourceElement) {
      sourceElement.src = videos[getVideoIndex()];
      videoElement.load();
    }
  }
  
  // 📞 הצגת מספר טלפון
  function showPhoneNumber() {
    const phoneNumber = document.getElementById("phone-number");
    phoneNumber.style.display = "block";
  }
  
  // ⏳ טיימר מבצע
  const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 שעות מההרצה
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const countdownElement = document.getElementById("countdown");
  
    if (distance <= 0) {
      countdownElement.innerHTML = "⏳ המבצע הסתיים!";
      return;
    }
  
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    document.getElementById("timer").innerText = `${hours} שעות ${minutes} דקות ${seconds} שניות`;
  }
  
  // ♿ פונקציות נגישות
  let fontSizeIncreased = false;
  let contrastEnabled = false;
  let linksHighlighted = false;
  
  function increaseTextSize() {
    document.body.style.fontSize = fontSizeIncreased ? "" : "1.3em";
    fontSizeIncreased = !fontSizeIncreased;
  }
  
  function toggleContrast() {
    document.body.classList.toggle("high-contrast");
    contrastEnabled = !contrastEnabled;
  }
  
  function highlightLinks() {
    document.querySelectorAll("a").forEach(link => {
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
    document.querySelectorAll("a").forEach(link => {
      link.style.backgroundColor = link.dataset.originalBg || "";
      link.style.color = link.dataset.originalColor || "";
    });
    fontSizeIncreased = false;
    contrastEnabled = false;
    linksHighlighted = false;
  }
  
  // 🎬 לולאת וידאו מתחלף אוטומטית
  const loopVideos = [
    "https://res.cloudinary.com/dora8sxcb/video/upload/v1739733574/one.mp4_nabbdp.mp4",
    "https://res.cloudinary.com/dora8sxcb/video/upload/v1739794183/action2.png_ftcfgr.mp4"
  ];
  let currentLoopIndex = 0;
  
  function setupLoopVideo() {
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource");
  
    if (!videoPlayer || !videoSource) return;
  
    videoPlayer.addEventListener("ended", function () {
      currentLoopIndex = (currentLoopIndex + 1) % loopVideos.length;
      videoSource.src = loopVideos[currentLoopIndex];
      videoPlayer.load();
      videoPlayer.play();
    });
  
    videoPlayer.play();
  }
  
  // 🎯 בעת טעינת הדף
  document.addEventListener("DOMContentLoaded", function () {
    updateVideo();
    updateCountdown();
    setupLoopVideo();
    setInterval(updateCountdown, 1000);
  
    // תיבת נגישות צפה
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
  
    document.getElementById("accessibility-btn").addEventListener("click", function () {
      document.getElementById("accessibility-panel").classList.toggle("hidden");
    });
  });
  