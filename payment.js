// Stripe Checkout Link Integration
document.addEventListener("DOMContentLoaded", function () {
	// Package data with Stripe Checkout links
	// NOTE: Replace these URLs with your actual Stripe Checkout links created in the Stripe Dashboard
	const packages = {
		basic: {
			name: "חבילה בסיסית - טיול ג'יפים",
			description: "טיול ג'יפים למשך 2 שעות",
			price: 350,
			currency: "ILS",
			checkoutUrl: "https://buy.stripe.com/test_yourLinkForBasicPackage", // Replace with actual link
		},
		premium: {
			name: "חבילת פרימיום - טיול ג'יפים",
			description: "טיול ג'יפים למשך 4 שעות",
			price: 650,
			currency: "ILS",
			checkoutUrl: "https://buy.stripe.com/test_yourLinkForPremiumPackage", // Replace with actual link
		},
		extreme: {
			name: "חבילת אקסטרים",
			description: "טיול משולב ג'יפים ואופנועים",
			price: 850,
			currency: "ILS",
			checkoutUrl: "https://buy.stripe.com/test_yourLinkForExtremePackage", // Replace with actual link
		},
	};

	// Get DOM elements
	const packageButtons = document.querySelectorAll(".package-button");
	const checkoutButton = document.getElementById("checkout-button");

	// Track selected package
	let selectedPackage = null;

	// Add click event to package buttons
	packageButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Remove active class from all buttons
			packageButtons.forEach((btn) => {
				btn.classList.remove("active", "btn-primary");
				btn.classList.add("btn-outline-light");
			});

			// Add active class to clicked button
			this.classList.add("active", "btn-primary");
			this.classList.remove("btn-outline-light");

			// Store selected package
			selectedPackage = this.dataset.package;

			// Enable checkout button
			checkoutButton.disabled = false;
		});
	});

	// Add click event to checkout button
	checkoutButton.addEventListener("click", function () {
		if (!selectedPackage) {
			alert("אנא בחר חבילה תחילה");
			return;
		}

		// Show loading state
		checkoutButton.disabled = true;
		checkoutButton.innerHTML =
			'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> מעבד...';

		// For demonstration purposes only
		// In a real implementation, uncomment below to redirect to the Stripe Checkout link
		// window.location.href = packages[selectedPackage].checkoutUrl;

		// For demo purposes, show success message after delay
		// In production, remove this and uncomment the redirect above
		setTimeout(() => {
			showPaymentSuccessMessage();
		}, 1500);
	});
});

// Show success message after payment submission
function showPaymentSuccessMessage() {
	const paymentCard = document.querySelector(".payment-card");
	const originalContent = paymentCard.innerHTML;

	// Save original content
	paymentCard.dataset.originalContent = originalContent;

	// Replace with success message
	paymentCard.innerHTML = `
        <div class="text-center py-5">
            <i class="fas fa-check-circle text-success" style="font-size: 5rem;"></i>
            <h3 class="mt-4">נרשמת בהצלחה!</h3>
            <p>בדיונת זו, במציאות הייתם מועברים לדף התשלום המאובטח של Stripe.</p>
            <p>כדי להשלים את האינטגרציה האמיתית:</p>
            <ol class="text-start">
                <li>צור חשבון ב-Stripe אם אין לך כבר</li>
                <li>צור קישורי תשלום ב-Stripe Dashboard</li>
                <li>החלף את הקישורים הדמיוניים בקוד עם הקישורים האמיתיים</li>
                <li>הסר את קוד ההדגמה הזה</li>
            </ol>
            <p>לשאלות ובירורים: 052-8747305</p>
            <button class="btn btn-primary mt-3" onclick="resetPaymentForm()">חזרה לטופס</button>
        </div>
    `;
}

// Reset payment form to original state
function resetPaymentForm() {
	const paymentCard = document.querySelector(".payment-card");
	if (paymentCard.dataset.originalContent) {
		paymentCard.innerHTML = paymentCard.dataset.originalContent;

		// Reattach event listeners
		initializeListeners();
	}
}

// Initialize event listeners
function initializeListeners() {
	const packageButtons = document.querySelectorAll(".package-button");
	const checkoutButton = document.getElementById("checkout-button");

	// Add click event to package buttons
	packageButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Remove active class from all buttons
			packageButtons.forEach((btn) => {
				btn.classList.remove("active", "btn-primary");
				btn.classList.add("btn-outline-light");
			});

			// Add active class to clicked button
			this.classList.add("active", "btn-primary");
			this.classList.remove("btn-outline-light");

			// Enable checkout button
			checkoutButton.disabled = false;
		});
	});

	// Add click event to checkout button
	checkoutButton.addEventListener("click", function () {
		if (checkoutButton.disabled) return;

		// Show loading state
		checkoutButton.disabled = true;
		checkoutButton.innerHTML =
			'<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> מעבד...';

		// For demonstration only
		setTimeout(() => {
			showPaymentSuccessMessage();
		}, 1500);
	});
}
