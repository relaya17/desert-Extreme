# 🚀 מדריך הגדרת מערכת התשלומים - Desert Extreme

## 📋 סטטוס נוכחי

### ✅ מה כבר מוכן:

- [x] כפתורי בחירת חבילות (3 חבילות)
- [x] כפתור תשלום ראשי עם אנימציית loading
- [x] אינטגרציה עם Stripe Checkout
- [x] דפי הצלחה/ביטול בכל השפות (5 שפות)
- [x] טופס יצירת קשר
- [x] תמיכה בשפות: עברית, אנגלית, רוסית, צרפתית, ערבית
- [x] אבטחה בסיסית וולידציה

### ⚠️ מה צריך להשלים לפני השקה:

## 🔧 שלבים להשלמת המערכת

### 1. יצירת חשבון Stripe

1. היכנס ל-[Stripe Dashboard](https://dashboard.stripe.com/)
2. צור חשבון חדש או התחבר לחשבון קיים
3. עבור ל-**Payment Links** בתפריט הצד

### 2. יצירת קישורי תשלום

צור 3 קישורי תשלום עבור החבילות:

#### חבילה בסיסית - ₪350

- שם: "Basic Package - Jeep Tour (2 hours)"
- מחיר: ₪350
- תיאור: "טיול ג'יפים למשך 2 שעות"

#### חבילת פרימיום - ₪650

- שם: "Premium Package - Jeep Tour (4 hours)"
- מחיר: ₪650
- תיאור: "טיול ג'יפים למשך 4 שעות"

#### חבילת אקסטרים - ₪850

- שם: "Extreme Package - Combined Jeeps and ATVs"
- מחיר: ₪850
- תיאור: "טיול משולב ג'יפים ואופנועים"

### 3. עדכון הקוד

החלף את הקישורים בקובץ `assets/js/stripe-config.js`:

```javascript
paymentLinks: {
  basic: "https://buy.stripe.com/YOUR_REAL_LINK_HERE",
  premium: "https://buy.stripe.com/YOUR_REAL_LINK_HERE",
  extreme: "https://buy.stripe.com/YOUR_REAL_LINK_HERE",
},
```

### 4. הגדרת דפי Redirect

בכל קישור תשלום ב-Stripe, הגדר:

- **Success URL**: `https://yourdomain.com/pages/success.html`
- **Cancel URL**: `https://yourdomain.com/pages/cancel.html`

### 5. בדיקות

1. בדוק שכל הכפתורים עובדים
2. בדוק שהמעבר ל-Stripe עובד
3. בדוק שדפי ההצלחה/ביטול עובדים
4. בדוק שטופס יצירת הקשר עובד

## 🛡️ אבטחה

### הגדרות אבטחה מומלצות:

- ✅ השתמש ב-HTTPS בלבד
- ✅ הגדר Webhook Endpoints ב-Stripe
- ✅ הוסף Rate Limiting
- ✅ הוסף CSRF Protection

### הגדרת Webhooks:

1. ב-Stripe Dashboard, עבור ל-**Webhooks**
2. צור endpoint חדש: `https://yourdomain.com/webhook`
3. בחר את האירועים: `payment_intent.succeeded`, `payment_intent.payment_failed`

## 📞 תמיכה

### פרטי קשר:

- **טלפון**: 053-3919193
- **אימייל**: contact@desertextreme.com
- **WhatsApp**: https://wa.me/9720533919193

### קבצים חשובים:

- `assets/js/payment.js` - לוגיקת התשלומים
- `assets/js/stripe-config.js` - הגדרות Stripe
- `pages/success.html` - דף הצלחה
- `pages/cancel.html` - דף ביטול

## 🎯 בדיקות סופיות

### לפני השקה:

- [ ] כל קישורי Stripe הם PRODUCTION (לא TEST)
- [ ] כל דפי ההצלחה/ביטול עובדים
- [ ] טופס יצירת קשר עובד
- [ ] תמיכה בשפות עובדת
- [ ] אבטחה מופעלת
- [ ] Webhooks מוגדרים

### בדיקות פונקציונליות:

- [ ] בחירת חבילה
- [ ] מעבר ל-Stripe
- [ ] תשלום מוצלח
- [ ] ביטול תשלום
- [ ] יצירת קשר

## 🚀 השקה

לאחר השלמת כל השלבים:

1. העלה את הקוד ל-Netlify
2. בדוק שהכל עובד בסביבת הייצור
3. בדוק תשלומים אמיתיים
4. עקוב אחר לוגים ו-Webhooks

---

**הערה**: מערכת התשלומים מוכנה לשימוש! רק צריך להחליף את קישורי TEST בקישורי PRODUCTION אמיתיים.
