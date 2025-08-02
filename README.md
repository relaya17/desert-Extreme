# 🏜️ Desert Extreme - אתר הרפתקאות מדבריות

## 📋 תיאור הפרויקט

Desert Extreme הוא אתר מקצועי לחברת טיולים מדבריים באילת. האתר מציע חוויות אקסטרימיות עם ג'יפים, אופנועים ורכבי שטח במדבר יהודה.

## 🌍 תמיכה רב-לשונית

האתר תומך ב-5 שפות:

- 🇮🇱 **עברית** (ברירת מחדל)
- 🇺🇸 **English**
- 🇷🇺 **Русский**
- 🇫🇷 **Français**
- 🇸🇦 **العربية**

## 📁 מבנה הפרויקט

```
actionsInTheDesert/
├── 📄 index.html                 # דף ראשי - הפניה לשפות
├── 📄 netlify.toml               # הגדרות deployment
├── 📁 assets/                    # נכסי האתר
│   ├── 📁 css/
│   │   └── style.css             # עיצוב מרכזי
│   ├── 📁 js/
│   │   ├── script.js             # פונקציות כלליות
│   │   ├── payment.js            # מערכת תשלומים
│   │   └── stripe-config.js      # הגדרות Stripe
│   └── 📁 images/                # תמונות ווידאו
├── 📁 locales/                   # גרסאות שפות
│   ├── 📁 he/                    # עברית
│   ├── 📁 en/                    # English
│   ├── 📁 ru/                    # Русский
│   ├── 📁 fr/                    # Français
│   └── 📁 ar/                    # العربية
├── 📁 pages/                     # דפים מיוחדים
│   ├── 📁 legal/                 # דפים משפטיים
│   │   ├── privacy.html
│   │   ├── terms.html
│   │   └── copyright.html
│   ├── success.html              # אישור תשלום
│   └── cancel.html               # ביטול תשלום
└── 📁 docs/                      # תיעוד
    └── (קבצי תיעוד)
```

## 🚀 מאפיינים

### 💳 מערכת תשלומים

- אינטגרציה עם **Stripe Payment Links**
- תמיכה ב-3 חבילות טיול
- אבטחת SSL מלאה
- דפי הצלחה וביטול

### 🎨 עיצוב

- **Responsive Design** - מותאם לכל המכשירים
- **Bootstrap 5** - עיצוב מודרני
- **Font Awesome** - אייקונים מקצועיים
- **אנימציות CSS** - חוויית משתמש מעולה

### ♿ נגישות

- תמיכה בקוראי מסך
- ניווט במקלדת
- ניגודיות גבוהה
- פונט מותאם

### 📱 SEO ו-Performance

- **Meta tags** מותאמים לכל שפה
- **Open Graph** לרשתות חברתיות
- **Lazy loading** לתמונות
- **קבצים ממוטבים**

## 🛠️ טכנולוgiות

- **HTML5** - מבנה סמנטי
- **CSS3** - עיצוב מתקדם
- **JavaScript (ES6+)** - אינטראקטיביות
- **Bootstrap 5** - מסגרת עיצוב
- **Stripe API** - תשלומים
- **Font Awesome** - אייקונים

## ⚙️ התקנה והרצה

### דרישות מקדימות

- דפדפן מודרני
- שרת HTTP (לפיתוח מקומי)

### הרצה מקומית

```bash
# שיבוט הריפוזיטורי
git clone [repository-url]

# כניסה לתיקיה
cd actionsInTheDesert

# הרצה עם שרת מקומי
npx serve .
# או
python -m http.server 8000
```

### 🌐 URLs

```
/ → הפניה לעברית
/locales/he/ → עברית
/locales/en/ → English
/locales/ru/ → Русский
/locales/fr/ → Français
/locales/ar/ → العربية
```

## 💰 הגדרת תשלומים

### שלב 1: יצירת חשבון Stripe

1. רישום ב-[Stripe.com](https://stripe.com)
2. השלמת אימות זהות
3. קבלת API Keys

### שלב 2: יצירת Payment Links

1. **Products** → **Add Product**
2. יצירת 3 מוצרים (Basic, Premium, Extreme)
3. **Payment Links** → **Create payment link**

### שלב 3: עדכון הקוד

```javascript
// assets/js/stripe-config.js
const STRIPE_CONFIG = {
  publishableKey: "pk_live_your_real_key",
  paymentLinks: {
    basic: "https://buy.stripe.com/live_basic_link",
    premium: "https://buy.stripe.com/live_premium_link",
    extreme: "https://buy.stripe.com/live_extreme_link",
  },
  demoMode: false, // חשוב!
};
```

## 📞 פרטי יצירת קשר

- **טלפון**: 053-3919193
- **מייל**: contact@desertextreme.com
- **מיקום**: אילת, ישראל

## 📈 Analytics ו-Tracking

האתר מוכן לאינטגרציה עם:

- **Google Analytics**
- **Facebook Pixel**
- **Google Tag Manager**

## 🔒 אבטחה

- **HTTPS** חובה
- **CSP Headers** מומלץ
- **טפסים מאובטחים**
- **Stripe PCI Compliance**

## 🚀 Deployment

### Netlify (מומלץ)

```toml
# netlify.toml
[build]
  publish = "."

[[redirects]]
  from = "/"
  to = "/locales/he/index.html"
  status = 302

[[redirects]]
  from = "/en"
  to = "/locales/en/index.html"
  status = 302
```

### הגדרות נוספות

- **Custom Domain** - חיבור דומיין אישי
- **SSL Certificate** - הפעלה אוטומטית
- **CDN** - הפצת תוכן גלובלית

## 📝 רישיון

© 2024 Desert Extreme - כל הזכויות שמורות

---

**הערה**: האתר כרגע במצב דמו. להפעלת תשלומים אמיתיים, עקבו אחר המדריך בקובץ `docs/PAYMENT_SETUP.md`
