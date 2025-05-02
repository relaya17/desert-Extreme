document.addEventListener("DOMContentLoaded", function () {
	// Mobile Nav and Smooth Scrolling
	const navLinks = document.querySelectorAll('a[href^="#"]');
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			// Only if within the same page
			if (this.getAttribute("href").charAt(0) === "#") {
				e.preventDefault();

				const targetId = this.getAttribute("href");
				const targetElement = document.querySelector(targetId);

				if (targetElement) {
					// Close mobile nav if open
					const navbarCollapse = document.querySelector(".navbar-collapse");
					if (navbarCollapse.classList.contains("show")) {
						document.querySelector(".navbar-toggler").click();
					}

					// Smooth scroll to target
					targetElement.scrollIntoView({ behavior: "smooth" });
				}
			}
		});
	});

	// Form Submission
	const bookingDetailsForm = document.getElementById("bookingDetailsForm");
	if (bookingDetailsForm) {
		bookingDetailsForm.addEventListener("submit", function (e) {
			e.preventDefault();

			// Validate form
			if (this.checkValidity() === false) {
				e.stopPropagation();
				this.classList.add("was-validated");
				return;
			}

			// Show success message
			alert(
				"תודה על ההזמנה! נציג יצור איתך קשר בהקדם לאישור הפרטים ולתיאום התשלום."
			);

			// Reset form
			this.reset();
			document.getElementById("bookingForm").classList.add("d-none");
		});
	}

	// Countdown Timer
	function startCountdown() {
		const countdownElement = document.getElementById("timer");
		if (!countdownElement) return;

		// Set countdown for 24 hours from now
		const countDownDate = new Date();
		countDownDate.setHours(countDownDate.getHours() + 24);

		const x = setInterval(function () {
			const now = new Date().getTime();
			const distance = countDownDate - now;

			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			countdownElement.innerHTML = hours + ":" + minutes + ":" + seconds;

			if (distance < 0) {
				clearInterval(x);
				countdownElement.innerHTML = "הצעה הסתיימה";
			}
		}, 1000);
	}

	startCountdown();

	// Gallery/Carousel Auto Play
	const carouselElement = document.querySelector("#carouselExampleAutoplaying");
	if (carouselElement) {
		const carousel = new bootstrap.Carousel(carouselElement, {
			interval: 3000,
			ride: "carousel",
		});
	}

	// Show phone number animation
	window.showPhoneNumber = function () {
		const phoneNumber = document.getElementById("phone-number");
		if (phoneNumber) {
			phoneNumber.classList.add("visible");
		}
	};

	// Parallax effect for header
	function handleParallax() {
		window.addEventListener("scroll", function () {
			const scrollPosition = window.scrollY;
			const parallaxElements = document.querySelectorAll(".parallax-element");

			parallaxElements.forEach((el, index) => {
				const speed = 0.2 + index * 0.1;
				el.style.transform = `translateY(${scrollPosition * speed}px)`;
			});
		});
	}

	handleParallax();

	// Add class to navbar when scrolling
	window.addEventListener("scroll", function () {
		const navbar = document.querySelector(".navbar");
		if (window.scrollY > 100) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}
	});

	// Initialize all tooltips
	const tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
});
