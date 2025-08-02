// 🔗 תבנית להחלפת קישורי Stripe - Desert Extreme
// העתק את הקישורים האמיתיים שלך מ-Stripe Dashboard והדבק כאן

const STRIPE_LINKS_TEMPLATE = {
  // החלף את הקישורים האלה בקישורי PRODUCTION אמיתיים שלך

  // חבילה בסיסית - ₪350
  basic: "https://buy.stripe.com/YOUR_REAL_BASIC_LINK_HERE",

  // חבילת פרימיום - ₪650
  premium: "https://buy.stripe.com/YOUR_REAL_PREMIUM_LINK_HERE",

  // חבילת אקסטרים - ₪850
  extreme: "https://buy.stripe.com/YOUR_REAL_EXTREME_LINK_HERE",
};

// הוראות:
// 1. היכנס ל-Stripe Dashboard
// 2. צור 3 Payment Links (אחד לכל חבילה)
// 3. העתק את הקישורים לכאן
// 4. החלף את הקישורים בקובץ assets/js/stripe-config.js

// דוגמה לקישורים אמיתיים:
/*
const STRIPE_LINKS_EXAMPLE = {
  basic: "https://buy.stripe.com/28o5lScUV7Vo6UE6oo",
  premium: "https://buy.stripe.com/28o3ds8Ez5Ngcf6fYZ", 
  extreme: "https://buy.stripe.com/dR65lS8Ez8Zs6UE5kl",
};
*/

// ⚠️ חשוב:
// - ודא שאתה ב-Live Mode ב-Stripe
// - בדוק שהמחירים נכונים (₪350, ₪650, ₪850)
// - בדוק שה-currency הוא ILS
// - הגדר Success/Cancel URLs ב-Stripe Dashboard
