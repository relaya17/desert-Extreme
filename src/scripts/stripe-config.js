/**
 * @typedef {Object} StripePackageLinks
 * @property {string} basic - Stripe payment link for basic package
 * @property {string} premium - Stripe payment link for premium package
 * @property {string} extreme - Stripe payment link for extreme package
 */

/**
 * @typedef {Object} StripeSecurityConfig
 * @property {boolean} validateOrigin - Whether to validate the request origin
 * @property {boolean} requireHTTPS - Whether HTTPS is required
 * @property {number} sessionTimeout - Session timeout in milliseconds
 */

/**
 * @typedef {Object} StripeConfig
 * @property {string} publishableKey - The Stripe publishable key
 * @property {StripePackageLinks} paymentLinks - URLs for Stripe payment links
 * @property {string} successUrl - URL to redirect to on success
 * @property {string} cancelUrl - URL to redirect to on cancellation
 * @property {boolean} demoMode - Whether the system is in demo mode
 * @property {StripeSecurityConfig} security - Security related settings
 */

/** @type {StripeConfig} */
const STRIPE_CONFIG = {
  // Your Stripe Publishable Key (starts with pk_) - SECURE TEST KEY
  // TODO: Replace with your PRODUCTION key before launch
  publishableKey: "pk_test_51QR8sK2eUnsPmxWvBuiJKLw00XyZ3vHJT",

  // Payment Links for each package - SECURE STRIPE LINKS
  // TODO: Replace these with your actual PRODUCTION Stripe payment links
  // Current links are TEST links - replace with real production links before launch
  paymentLinks: {
    basic: "https://buy.stripe.com/test_28o5lScUV7Vo6UE6oo", // TODO: Replace with production link
    premium: "https://buy.stripe.com/test_28o3ds8Ez5Ngcf6fYZ", // TODO: Replace with production link
    extreme: "https://buy.stripe.com/test_dR65lS8Ez8Zs6UE5kl", // TODO: Replace with production link
  },

  // Success and Cancel URLs - SECURE REDIRECTS
  successUrl: window.location.origin + "/pages/success.html",
  cancelUrl: window.location.origin + "/pages/cancel.html",

  // Production mode - SECURE ENVIRONMENT
  demoMode: false,

  // Security settings
  security: {
    validateOrigin: true,
    requireHTTPS: false, // Set to true for production
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
  },
};

// Initialize Stripe (if using Stripe Elements instead of Payment Links)
// const stripe = Stripe(STRIPE_CONFIG.publishableKey);

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = STRIPE_CONFIG;
} else {
  window.STRIPE_CONFIG = STRIPE_CONFIG;
}
