# UI Components and Required Markup

This guide documents the HTML structures (components) expected by the JavaScript APIs so that they function correctly, plus examples to integrate them into pages.

---

## Payment Selection Card

Used by: `assets/js/payment.js`

Purpose: Allow users to select a tour package and proceed to Stripe Checkout.

Required elements:
- One or more package buttons with class `package-button` and `data-package` attributes.
- A checkout button with id `checkout-button`.
- An optional wrapper with class `payment-card` used by success/reset helpers.

Example:
```html
<div class="card payment-card p-4 bg-dark text-white">
  <div class="d-flex gap-2">
    <button class="package-button btn btn-outline-light" data-package="basic">Basic</button>
    <button class="package-button btn btn-outline-light" data-package="premium">Premium</button>
    <button class="package-button btn btn-outline-light" data-package="extreme">Extreme</button>
  </div>

  <div class="mt-3">
    <button id="checkout-button" class="btn btn-primary" disabled>
      Continue to Payment
    </button>
  </div>
</div>
```

Notes:
- The `data-package` value must match a key in either the internal `packages` map (demo) or in `window.STRIPE_CONFIG.paymentLinks` (recommended).
- On selection, the button gains `active` and `btn-primary` classes; others revert to `btn-outline-light`.

---

## Accessibility Panel

Used by: `assets/js/script.js`

Description: On page load, a floating accessibility panel is injected with controls to adjust text size, contrast, link highlighting, and reset.

Injected markup (simplified):
```html
<div class="accessibility-container">
  <button id="accessibility-btn">🛠️</button>
  <div id="accessibility-panel" class="hidden">
    <h3>אפשרויות נגישות</h3>
    <button onclick="increaseTextSize()">🔍 הגדלת טקסט</button>
    <button onclick="toggleContrast()">🌗 ניגודיות גבוהה</button>
    <button onclick="highlightLinks()">🔗 הדגשת קישורים</button>
    <button onclick="resetAccessibility()">🔄 איפוס</button>
  </div>
</div>
```

Expected CSS:
```css
.accessibility-container { position: fixed; bottom: 1rem; inset-inline-end: 1rem; z-index: 1000; }
#accessibility-panel.hidden { display: none; }
body.high-contrast { filter: contrast(1.3) brightness(0.9); }
```

You may override the injected UI and build your own buttons that call the same global helpers.

---

## Countdown Banner

Used by: `assets/js/script.js`

Required markup:
```html
<div id="countdown" class="alert alert-warning">
  <strong>Limited-time offer ends in</strong>
  <span id="timer"></span>
</div>
```

Behavior:
- `updateCountdown()` updates `#timer` every second.
- When expired, `#countdown` displays an end-of-offer message.

---

## Header Video Rotator

Used by: `assets/js/script.js`

Required markup:
```html
<video id="headerVideo" class="w-100" autoplay muted loop playsinline>
  <source id="videoSource" src="images/kobiVideo.mp4" type="video/mp4" />
</video>
```

Behavior:
- `updateVideo()` selects a source from the global `videos` list based on the current time slot and reloads the video element.

---

## Contact Reveal

Used by: `assets/js/script.js`

Required markup:
```html
<div id="phone-number" style="display:none;">053-3919193</div>
<button class="btn btn-outline-secondary" onclick="showPhoneNumber()">Show phone</button>
```

Behavior:
- Clicking the button reveals the phone number element by setting `display: block`.

---

## Internationalization Setup

Used by: `assets/js/payment.js`

Requirement:
```html
<html lang="he" dir="rtl"> <!-- or en / ru / fr / ar -->
```

- The `lang` attribute drives localized messages in payment flows.
- Set `dir="rtl"` for right-to-left languages (`he`, `ar`).