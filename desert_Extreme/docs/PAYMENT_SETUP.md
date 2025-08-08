# Stripe Payment Setup

This document explains how to configure Stripe Payment Links with the project and verify the integration end-to-end.

---

## Prerequisites
- A Stripe account with Payments enabled
- Products created for each package you offer (e.g., Basic, Premium, Extreme)
- Generated Payment Links for each product/price
- HTTPS in production (mandatory)

---

## Create Products and Payment Links
1. In the Stripe Dashboard, go to Products → Add product.
2. Create products/prices for your packages (currency: ILS or your choice).
3. Go to Payment Links → Create payment link for each product/price.
4. Copy the link for each package.

---

## Configure `stripe-config.js`
Edit `assets/js/stripe-config.js` and replace the placeholders with your real data:
```js
const STRIPE_CONFIG = {
  publishableKey: "pk_live_...", // Your live publishable key
  paymentLinks: {
    basic: "https://buy.stripe.com/live_basic",
    premium: "https://buy.stripe.com/live_premium",
    extreme: "https://buy.stripe.com/live_extreme",
  },
  successUrl: window.location.origin + "/pages/success.html",
  cancelUrl: window.location.origin + "/pages/cancel.html",
  demoMode: false,
  security: {
    validateOrigin: true,
    requireHTTPS: true,        // Enforce HTTPS in production
    sessionTimeout: 30 * 60 * 1000,
  },
};

// Expose globally
window.STRIPE_CONFIG = STRIPE_CONFIG;
```

Load order in HTML (recommended):
```html
<script src="/assets/js/stripe-config.js"></script>
<script src="/assets/js/payment.js"></script>
```

---

## Build the Payment UI
Add the required markup to your page:
```html
<div class="payment-card">
  <div class="d-flex gap-2">
    <button class="package-button btn btn-outline-light" data-package="basic">Basic</button>
    <button class="package-button btn btn-outline-light" data-package="premium">Premium</button>
    <button class="package-button btn btn-outline-light" data-package="extreme">Extreme</button>
  </div>

  <button id="checkout-button" class="btn btn-primary mt-3" disabled>
    Continue to Payment
  </button>
</div>
```

Behavior:
- Selecting a package enables the checkout button.
- Clicking the checkout button redirects to the matching Stripe Payment Link.

---

## Test vs Live
- Use test links and a test publishable key during development.
- Switch to live links and `pk_live_...` for production.
- Ensure `requireHTTPS: true` in production.

---

## Success and Cancel Pages
The config includes:
- `successUrl`: `/pages/success.html`
- `cancelUrl`: `/pages/cancel.html`

You can customize these pages (found under `pages/`) to match your branding and add tracking.

---

## Security Considerations
- Always serve the site over HTTPS in production.
- Keep secret keys on the server only (none are used in this client-only Payment Link flow).
- Consider adding Content Security Policy (CSP) headers.
- Validate `document.location.origin` if you embed the site elsewhere and set `validateOrigin: true`.

---

## Troubleshooting
- Checkout button stays disabled: Ensure one `.package-button` has been clicked and that it has a `data-package` value.
- Redirect doesn’t happen: Verify `window.STRIPE_CONFIG.paymentLinks[package]` contains a valid `https://buy.stripe.com/` URL and that scripts are loaded in order.
- Language is wrong: Confirm the `<html lang="...">` attribute matches one of the supported languages.