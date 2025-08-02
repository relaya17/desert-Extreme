# 🔗 מדריך יצירת קישורי Stripe - Desert Extreme

## 📋 שלבים ליצירת קישורי תשלום אמיתיים

### שלב 1: כניסה ל-Stripe Dashboard
1. היכנס ל-[Stripe Dashboard](https://dashboard.stripe.com/)
2. התחבר לחשבון שלך (או צור חשבון חדש)
3. ודא שאתה ב-**Live Mode** (לא Test Mode)

### שלב 2: יצירת Payment Links

#### חבילה בסיסית - ₪350
1. עבור ל-**Payment Links** בתפריט הצד
2. לחץ על **"Create payment link"**
3. מלא את הפרטים:
   - **Product name**: "Basic Package - Jeep Tour (2 hours)"
   - **Price**: ₪350
   - **Currency**: ILS (Israeli Shekel)
   - **Description**: "טיול ג'יפים למשך 2 שעות"
4. לחץ על **"Create link"**
5. העתק את הקישור שנוצר

#### חבילת פרימיום - ₪650
1. צור payment link חדש
2. מלא את הפרטים:
   - **Product name**: "Premium Package - Jeep Tour (4 hours)"
   - **Price**: ₪650
   - **Currency**: ILS
   - **Description**: "טיול ג'יפים למשך 4 שעות"
3. העתק את הקישור

#### חבילת אקסטרים - ₪850
1. צור payment link חדש
2. מלא את הפרטים:
   - **Product name**: "Extreme Package - Combined Jeeps and ATVs"
   - **Price**: ₪850
   - **Currency**: ILS
   - **Description**: "טיול משולב ג'יפים ואופנועים"
3. העתק את הקישור

### שלב 3: הגדרת Redirect URLs
לכל payment link שיצרת:
1. לחץ על **"Edit"** ליד הקישור
2. עבור לטאב **"After payment"**
3. הגדר:
   - **Success URL**: `https://yourdomain.com/pages/success.html`
   - **Cancel URL**: `https://yourdomain.com/pages/cancel.html`

### שלב 4: עדכון הקוד
החלף את הקישורים בקובץ `assets/js/stripe-config.js`:

```javascript
paymentLinks: {
  basic: "https://buy.stripe.com/YOUR_REAL_BASIC_LINK",
  premium: "https://buy.stripe.com/YOUR_REAL_PREMIUM_LINK", 
  extreme: "https://buy.stripe.com/YOUR_REAL_EXTREME_LINK",
},
```

## ⚠️ חשוב לזכור:

### לפני השקה:
- [ ] ודא שאתה ב-**Live Mode** ב-Stripe
- [ ] בדוק שכל הקישורים עובדים
- [ ] בדוק שהמחירים נכונים
- [ ] בדוק שה-currency הוא ILS

### אחרי השקה:
- [ ] בדוק תשלום אמיתי קטן
- [ ] ודא שהכסף מגיע לחשבון שלך
- [ ] בדוק שדפי ההצלחה/ביטול עובדים

## 🆘 אם אתה צריך עזרה:

1. **צור קשר**: 053-3919193
2. **WhatsApp**: https://wa.me/9720533919193
3. **אימייל**: contact@desertextreme.com

## 📝 דוגמה לקישורים אמיתיים:

```javascript
// דוגמה - החלף עם הקישורים האמיתיים שלך
paymentLinks: {
  basic: "https://buy.stripe.com/28o5lScUV7Vo6UE6oo",
  premium: "https://buy.stripe.com/28o3ds8Ez5Ngcf6fYZ", 
  extreme: "https://buy.stripe.com/dR65lS8Ez8Zs6UE5kl",
},
```

**הערה**: הקישורים בדוגמה הם TEST - אתה צריך להחליף אותם בקישורי PRODUCTION אמיתיים מ-Stripe Dashboard שלך. 