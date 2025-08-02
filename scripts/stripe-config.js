// Stripe Configuration
// Replace these with your actual Stripe configuration

const STRIPE_CONFIG = {
  // Your Stripe Publishable Key (starts with pk_)
  publishableKey: "pk_test_your_publishable_key_here",

  // Payment Links for each package
  // Create these in your Stripe Dashboard under Products > Payment Links
  paymentLinks: {
    basic: "https://buy.stripe.com/test_your_basic_link_here",
    premium: "https://buy.stripe.com/test_your_premium_link_here",
    extreme: "https://buy.stripe.com/test_your_extreme_link_here",
  },

  // Success and Cancel URLs
  successUrl: window.location.origin + "/success.html",
  cancelUrl: window.location.origin + "/cancel.html",

  // Demo mode - set to false for production
  demoMode: true,
};

// Initialize Stripe (if using Stripe Elements instead of Payment Links)
// const stripe = Stripe(STRIPE_CONFIG.publishableKey);

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = STRIPE_CONFIG;
} else {
  window.STRIPE_CONFIG = STRIPE_CONFIG;
}
