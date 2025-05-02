document.addEventListener("DOMContentLoaded", function () {
	// Generate pricing tabs
	generateBookingTabs();

	// Generate trust elements
	generateTrustElements();

	// Book now button functionality
	setupBookNowButtons();

	// Setup form submission
	setupFormSubmission();

	// Initialize package carousel
	initializePackageCarousel();
});

function generateBookingTabs() {
	const tabsContainer = document.getElementById("bookingTabs");
	if (!tabsContainer) return;

	const tabs = [
		{ id: "packages", icon: "fas fa-box", text: "חבילות מוכנות" },
		{ id: "custom", icon: "fas fa-edit", text: "בניית חבילה" },
		{ id: "groups", icon: "fas fa-users", text: "קבוצות" },
	];

	tabs.forEach((tab, index) => {
		const li = document.createElement("li");
		li.className = "nav-item";

		const a = document.createElement("a");
		a.className = `nav-link ${index === 0 ? "active" : ""}`;
		a.id = `${tab.id}-tab`;
		a.setAttribute("data-bs-toggle", "pill");
		a.setAttribute("href", `#${tab.id}`);
		a.setAttribute("role", "tab");
		a.setAttribute("aria-controls", tab.id);
		a.setAttribute("aria-selected", index === 0 ? "true" : "false");

		a.innerHTML = `<i class="${tab.icon} me-2"></i>${tab.text}`;

		li.appendChild(a);
		tabsContainer.appendChild(li);
	});
}

function generateTrustElements() {
	const trustContainer = document.getElementById("trust-elements-container");
	if (!trustContainer) return;

	const elements = [
		{ icon: "fas fa-check-circle", text: "ביטול חינם עד 48 שעות לפני הטיול" },
		{ icon: "fas fa-shield-alt", text: "ביטוח מלא כלול במחיר" },
		{ icon: "fas fa-credit-card", text: "תשלום מאובטח" },
		{ icon: "fas fa-history", text: "אישור הזמנה מיידי" },
	];

	const row = document.createElement("div");
	row.className = "row text-center";

	elements.forEach((element) => {
		const div = document.createElement("div");
		div.className = "col-md-3 col-6 mb-3";

		div.innerHTML = `
            <div class="trust-item">
                <i class="${element.icon} text-primary mb-2"></i>
                <p class="small mb-0">${element.text}</p>
            </div>
        `;

		row.appendChild(div);
	});

	trustContainer.appendChild(row);
}

function setupBookNowButtons() {
	// Setup booking buttons in pricing cards
	const bookNowButtons = document.querySelectorAll(".book-now");
	bookNowButtons.forEach((button) => {
		button.addEventListener("click", function (e) {
			e.preventDefault();
			const packageName = this.getAttribute("data-package");
			const packagePrice = this.getAttribute("data-price");

			// Update package selection in form
			document.getElementById("selectedPackageName").textContent =
				getPackageDisplayName(packageName);
			document.getElementById(
				"selectedPackagePrice"
			).textContent = `₪${packagePrice}`;

			// Show booking form
			const bookingForm = document.getElementById("bookingForm");
			bookingForm.classList.remove("d-none");

			// Scroll to booking form
			bookingForm.scrollIntoView({ behavior: "smooth" });
		});
	});
}

function getPackageDisplayName(packageCode) {
	const packageNames = {
		basic: "חבילה בסיסית",
		premium: "חבילה פרימיום",
		extreme: "חבילה אקסטרים",
	};

	return packageNames[packageCode] || "חבילה מותאמת אישית";
}

function setupFormSubmission() {
	const bookingForm = document.getElementById("bookingDetailsForm");
	if (!bookingForm) return;

	bookingForm.addEventListener("submit", function (e) {
		e.preventDefault();

		// Here you would typically send the form data to your server
		// For demo purposes, we'll just show a success message

		// Basic validation
		const requiredFields = bookingForm.querySelectorAll("[required]");
		let isValid = true;

		requiredFields.forEach((field) => {
			if (!field.value.trim()) {
				isValid = false;
				field.classList.add("is-invalid");
			} else {
				field.classList.remove("is-invalid");
			}
		});

		if (!isValid) {
			alert("אנא מלאו את כל השדות הנדרשים");
			return;
		}

		// Success handling (replace with your actual booking logic)
		const bookingSection = document.querySelector(".payment-section");
		bookingSection.innerHTML = `
            <div class="container py-5 text-center">
                <div class="booking-success">
                    <i class="fas fa-check-circle text-success display-1 mb-4"></i>
                    <h2 class="mb-4">ההזמנה התקבלה בהצלחה!</h2>
                    <p class="lead mb-4">אישור הזמנה נשלח לאימייל שלך.</p>
                    <p>צוות אקשן במדבר יצור איתך קשר בהקדם לאישור סופי של ההזמנה.</p>
                    <a href="index.html" class="btn btn-primary mt-4">חזרה לדף הבית</a>
                </div>
            </div>
        `;

		// Scroll to success message
		bookingSection.scrollIntoView({ behavior: "smooth" });
	});
}

function initializePackageCarousel() {
	const packageCarousel = document.getElementById("packageCarousel");
	if (!packageCarousel) return;

	// Initialize the Bootstrap carousel
	const carousel = new bootstrap.Carousel(packageCarousel, {
		interval: 6000, // Change slides every 6 seconds
		wrap: true, // Continuously cycle through slides
		touch: true, // Allow swiping on touch devices
	});

	// Add swipe support for mobile
	if ("ontouchstart" in window) {
		let startX, endX;
		const minSwipeDistance = 50;

		packageCarousel.addEventListener(
			"touchstart",
			function (e) {
				startX = e.touches[0].clientX;
			},
			false
		);

		packageCarousel.addEventListener(
			"touchend",
			function (e) {
				if (!startX) return;

				endX = e.changedTouches[0].clientX;
				const distance = endX - startX;

				if (Math.abs(distance) >= minSwipeDistance) {
					if (distance > 0) {
						// Swiped right, go to previous slide
						carousel.prev();
					} else {
						// Swiped left, go to next slide
						carousel.next();
					}
				}

				startX = null;
			},
			false
		);
	}

	// Handle custom indicators
	const indicators = document.querySelectorAll(
		".carousel-indicators-custom button"
	);
	indicators.forEach(function (indicator) {
		indicator.addEventListener("click", function () {
			const slideIndex = this.getAttribute("data-bs-slide-to");
			carousel.to(parseInt(slideIndex));
		});
	});
}
