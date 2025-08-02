# מבנה תיקיות מומלץ - Desert Extreme

## מבנה התיקיות הנוכחי המומלץ:

```
actionsInTheDesert/
├── 📁 assets/                    # נכסי האתר
│   ├── 📁 css/                   # קבצי עיצוב
│   │   └── style.css
│   ├── 📁 js/                    # קבצי JavaScript
│   │   ├── script.js             # פונקציות כלליות
│   │   ├── payment.js            # מערכת תשלומים
│   │   └── stripe-config.js      # הגדרות Stripe
│   └── 📁 images/                # תמונות ומדיה
│       ├── bbb.png
│       ├── blou.png
│       ├── geep.png
│       └── ...
├── 📁 locales/                   # גרסאות שפות
│   ├── 📁 he/                    # עברית (ברירת מחדל)
│   │   ├── index.html
│   │   ├── blog.html
│   │   ├── success.html
│   │   └── cancel.html
│   ├── 📁 en/                    # English
│   │   ├── index.html
│   │   ├── blog.html
│   │   ├── success.html
│   │   └── cancel.html
│   ├── 📁 ru/                    # Русский
│   │   └── ...
│   ├── 📁 fr/                    # Français
│   │   └── ...
│   └── 📁 ar/                    # العربية
│       └── ...
├── 📁 pages/                     # דפים מיוחדים
│   ├── 📁 legal/                 # דפים משפטיים
│   │   ├── privacy.html
│   │   ├── terms.html
│   │   └── copyright.html
│   └── 📁 blog/                  # דפי בלוג
│       ├── safety.html
│       ├── techniques.html
│       └── preparation.html
├── 📁 docs/                      # תיעוד
│   ├── PAYMENT_SETUP.md
│   ├── PROJECT_STRUCTURE.md
│   └── README.md
├── 📄 index.html                 # דף ראשי (הפניה לעברית)
├── 📄 netlify.toml               # הגדרות deployment
└── 📄 .gitignore                 # קבצים להתעלמות
```

## יתרונות המבנה:

### 🎯 **ארגון לפי תפקיד:**

- `assets/` - כל הנכסים הסטטיים
- `locales/` - הפרדה בין שפות
- `pages/` - דפים מיוחדים וקטגוריות
- `docs/` - תיעוד וזמונות

### 🌍 **תמיכה רב-לשונית:**

- כל שפה בתיקיה נפרדת
- קל להוסיף/להסיר שפות
- ניהול תרגומים נוח

### 🔧 **תחזוקה קלה:**

- מיקום ברור לכל סוג קובץ
- קל למצוא ולערוך
- מוכן להרחבות עתידיות

### 📱 **SEO ו-Performance:**

- מבנה URLs נקי
- קל לשרתים להבין
- אופטימיזציה לחיפוש

## קבצים שצריך ליצור/לשחזר:

### ✅ קיימים:

- ✅ style.css
- ✅ index.html (עברית)
- ✅ images/ (תיקיית תמונות)
- ✅ success.html, cancel.html
- ✅ privacy.html, terms.html, copyright.html

### ❌ חסרים (נמחקו):

- ❌ payment.js
- ❌ stripe-config.js
- ❌ index-en.html, index-ru.html, index-fr.html, index-ar.html
- ❌ PAYMENT_SETUP.md

## השלבים הבאים:

1. **יצור מחדש קבצי JavaScript חסרים**
2. **יצור מחדש גרסאות רב-לשוניות**
3. **העבר קבצים לתיקיות הנכונות**
4. **עדכן נתיבים בקבצי HTML**
5. **צור קובץ README.md**

## הגדרות URL routing:

```
/ → /locales/he/index.html (ברירת מחדל עברית)
/en → /locales/en/index.html
/ru → /locales/ru/index.html
/fr → /locales/fr/index.html
/ar → /locales/ar/index.html
```
