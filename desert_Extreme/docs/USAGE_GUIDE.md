# Usage Guide

This guide explains how to include and use the Desert Extreme scripts, configure payments, and integrate the components into your pages.

---

## File Inclusion and Order

Recommended order:
```html
<!-- Configuration first (optional but recommended for payments) -->
<script src="/assets/js/stripe-config.js"></script>

<!-- Payment logic (attaches listeners on DOMContentLoaded) -->
<script src="/assets/js/payment.js"></script>

<!-- General utilities and UI helpers -->
<script src="/assets/js/script.js"></script>
```

Tips:
- Place scripts right before `</body>` so the DOM elements they expect already exist.
- If you inject or replace markup dynamically, call `initializeListeners()` after the new content is in the DOM.

---

## Payment Flow (Stripe Payment Links)

1. Define your package links in `stripe-config.js` under `paymentLinks`:
   - Keys must match the `data-package` values used in your HTML.
2. Add package buttons and a checkout button to the page.
3. When a package is selected, the checkout button is enabled.
4. Clicking the checkout button redirects to the corresponding Stripe Payment Link.

Example HTML:
```html
<div class="payment-card">
  <div class="d-flex gap-2">
    <button class="package-button btn btn-outline-light" data-package="basic">Basic</button>
    <button class="package-button btn btn-outline-light" data-package="premium">Premium</button>
    <button class="package-button btn btn-outline-light" data-package="extreme">Extreme</button>
  </div>
  <button id="checkout-button" class="btn btn-primary mt-3" disabled>Continue to Payment</button>
</div>
```

Example configuration:
```js
// assets/js/stripe-config.js
const STRIPE_CONFIG = {
  publishableKey: "pk_live_...",
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
    requireHTTPS: true,
    sessionTimeout: 30 * 60 * 1000,
  },
};
window.STRIPE_CONFIG = STRIPE_CONFIG;
```

---

## i18n and Direction

Set the page language and direction on the `<html>` element:
```html
<html lang="he" dir="rtl"> <!-- Hebrew, right-to-left -->
```

- Supported languages in payment messages by default: `he`, `en`, `ru`, `fr`, `ar`.
- To add another language, extend the messages objects inside `payment.js`.

---

## Accessibility Helpers

Add your own UI or use the injected panel. Call anywhere:
```html
<button onclick="increaseTextSize()">Increase Text Size</button>
<button onclick="toggleContrast()">Toggle High Contrast</button>
<button onclick="highlightLinks()">Highlight Links</button>
<button onclick="resetAccessibility()">Reset</button>
```

---

## Countdown Timer

Add required container and start the timer:
```html
<div id="countdown" class="alert alert-warning">
  <span id="timer"></span>
</div>
<script>
  updateCountdown();
  setInterval(updateCountdown, 1000);
</script>
```

---

## Header Video Rotation

Set up the video elements and update the source:
```html
<video id="headerVideo" autoplay muted loop>
  <source id="videoSource" src="images/kobiVideo.mp4" type="video/mp4" />
</video>
<script>
  updateVideo();
</script>
```

---

## After-Payment UX (Demo)

To show a localized success message inside a `.payment-card` wrapper:
```html
<div class="payment-card"> ... original payment UI ... </div>
<script>
  // After a test flow or webhook confirmation on a real site
  showPaymentSuccessMessage();
</script>
```

Restore the original UI:
```html
<button onclick="resetPaymentForm()">Back to Form</button>
```