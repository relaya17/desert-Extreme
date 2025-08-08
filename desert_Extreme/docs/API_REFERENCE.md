# Desert Extreme API Reference

This document describes the public JavaScript APIs, global functions, and configuration objects provided by the project. It also lists the expected DOM structure for each API and shows usage examples.

- Source directory: `assets/js/`
- Primary files:
  - `script.js` – general UI utilities and accessibility helpers
  - `payment.js` – payment package selection and Stripe Checkout redirection
  - `stripe-config.js` – global configuration for Stripe Payment Links and environment

---

## Global Configuration

### `window.STRIPE_CONFIG`
Defined in: `assets/js/stripe-config.js`

Shape:
```ts
interface StripeConfig {
  publishableKey: string;              // Your Stripe publishable key (pk_...)
  paymentLinks: {                      // Payment link per package key
    basic?: string;
    premium?: string;
    extreme?: string;
    [packageKey: string]: string | undefined;
  };
  successUrl: string;                  // Absolute URL to success page
  cancelUrl: string;                   // Absolute URL to cancel page
  demoMode: boolean;                   // If true, behaves in demo/sandbox mode
  security: {
    validateOrigin: boolean;           // Validate origin on usage
    requireHTTPS: boolean;             // Enforce HTTPS in production
    sessionTimeout: number;            // Milliseconds
  };
}
```

Example:
```html
<script src="/assets/js/stripe-config.js"></script>
<script>
  // Provided globally; can be read by payment.js
  console.log(window.STRIPE_CONFIG.paymentLinks.basic);
</script>
```

Notes:
- Ensure `stripe-config.js` is loaded before `payment.js` when using the config-based flow.
- For production, set `requireHTTPS: true` and use live Stripe links.

---

## Payment APIs (`assets/js/payment.js`)

The file provides two complementary flows for Stripe Checkout redirection:
- A built-in demo flow using a local `packages` map with `checkoutUrl` for each package.
- A configurable flow that reads package links from `window.STRIPE_CONFIG.paymentLinks`.

Both flows rely on the same DOM structure and language detection.

### Language detection
- Reads the current language from `document.documentElement.lang`.
- Supported keys out-of-the-box: `he`, `en`, `ru`, `fr`, `ar`.

### Expected DOM structure
```html
<!-- Package selector: one or more buttons with data-package -->
<button class="package-button btn btn-outline-light" data-package="basic">Basic</button>
<button class="package-button btn btn-outline-light" data-package="premium">Premium</button>
<button class="package-button btn btn-outline-light" data-package="extreme">Extreme</button>

<!-- Checkout button -->
<button id="checkout-button" class="btn btn-primary" disabled>Continue to Payment</button>

<!-- Optional payment card container used by success message helpers -->
<div class="payment-card"> ... </div>
```

### Initialization (automatic)
On `DOMContentLoaded`, event listeners are attached to `.package-button` and `#checkout-button`. Selecting a package enables the checkout button. Clicking checkout will redirect to Stripe.

Security checks include:
- Valid protocol (HTTP/HTTPS)
- Selected package presence
- Valid Stripe URL format (`https://buy.stripe.com/...`)

### Functions

#### `showPaymentSuccessMessage(): void`
Replaces the `.payment-card` content with a localized success message and integration checklist. Adds a button that calls `resetPaymentForm()`.

Usage:
```html
<div class="payment-card"> ... original form ... </div>
<script src="/assets/js/payment.js"></script>
<script>
  // After mock or test payment
  showPaymentSuccessMessage();
</script>
```

#### `resetPaymentForm(): void`
Restores the `.payment-card` content that existed prior to `showPaymentSuccessMessage()`. Re-attaches interactions by calling `initializeListeners()`.

Usage:
```html
<button onclick="resetPaymentForm()">Back to Form</button>
```

#### `initializeListeners(): void`
(Re)attaches click handlers to `.package-button` and `#checkout-button`. This is useful after the DOM is replaced by `showPaymentSuccessMessage()`.

Notes:
- When `window.STRIPE_CONFIG.paymentLinks[packageKey]` exists, checkout uses those links.
- Otherwise, it falls back to the built-in demo `packages` map defined in `payment.js`.

Usage:
```html
<script>
  // Call this after dynamically re-rendering the package HTML
  initializeListeners();
</script>
```

---

## General UI APIs (`assets/js/script.js`)

### Scrolling

#### `scrollToActivities(): void`
Smooth-scrolls to the element with id `activities`.

Usage:
```html
<section id="activities"> ... </section>
<button onclick="scrollToActivities()">See Activities</button>
```

---

### Header Video Rotation

Globals:
- `videos: string[]` – list of video source URLs.

#### `getVideoIndex(): number`
Returns the current index for `videos` based on time slots, providing rotation over time.

#### `updateVideo(): void`
Updates `#videoSource.src` with the result of `getVideoIndex()` and reloads `#headerVideo`.

Expected DOM:
```html
<video id="headerVideo" autoplay muted loop>
  <source id="videoSource" src="images/kobiVideo.mp4" type="video/mp4" />
</video>
<script>
  // After DOM ready
  updateVideo();
</script>
```

---

### Accessibility Utilities

State flags:
- `fontSizeIncreased: boolean`
- `contrastEnabled: boolean`
- `linksHighlighted: boolean`

Helpers:
- `increaseTextSize(): void` – toggles `document.body.style.fontSize`.
- `toggleContrast(): void` – toggles `high-contrast` class on `<body>`.
- `highlightLinks(): void` – toggles inline highlight styles on all `<a>` elements, preserving originals in `dataset`.
- `resetAccessibility(): void` – resets all the above to defaults.

An accessibility panel is auto-injected on `DOMContentLoaded` with buttons that invoke these functions.

Usage:
```html
<!-- Optional: Create your own UI and call the helpers -->
<button onclick="increaseTextSize()">Increase Text Size</button>
<button onclick="toggleContrast()">High Contrast</button>
<button onclick="highlightLinks()">Highlight Links</button>
<button onclick="resetAccessibility()">Reset</button>
```

CSS expectation for contrast mode:
```css
body.high-contrast { filter: contrast(1.3) brightness(0.9); }
```

---

### Countdown Timer

Globals:
- `countdownDate: number` – target timestamp (defaults to now + 24h).

#### `updateCountdown(): void`
Computes time remaining and updates `#timer` inside `#countdown`. If elapsed, sets the message to end-of-offer.

Expected DOM:
```html
<div id="countdown">
  <span id="timer"></span>
</div>
<script>
  updateCountdown();
  setInterval(updateCountdown, 1000);
</script>
```

---

### Contact Reveal

#### `showPhoneNumber(): void`
Reveals a hidden element with id `phone-number`.

Usage:
```html
<div id="phone-number" style="display:none;">053-3919193</div>
<button onclick="showPhoneNumber()">Show phone</button>
```

---

## Internationalization (i18n)

- `payment.js` contains localized strings for `he`, `en`, `ru`, `fr`, `ar` used by payment flows and success UI. The active language is derived from `<html lang="...">`.
- To add a new language, extend the messages maps in `payment.js` and set `<html lang="xx">` accordingly.

---

## Script Load Order

Recommended order when using payments:
```html
<script src="/assets/js/stripe-config.js"></script>
<script src="/assets/js/payment.js"></script>
<script src="/assets/js/script.js"></script>
```

- The payment initialization runs on `DOMContentLoaded`.
- Ensure the DOM elements exist before these scripts run, or place scripts at the end of `<body>`.