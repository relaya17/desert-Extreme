const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const bookingsFile = 'bookings.json';

// בדיקה אם קובץ ההזמנות קיים, אחרת יצירה
if (!fs.existsSync(bookingsFile)) {
  fs.writeFileSync(bookingsFile, '[]');
}

// החזרת כל ההזמנות (רק לצורכי בדיקה)
app.get('/api/bookings', (req, res) => {
  const data = fs.readFileSync(bookingsFile);
  res.json(JSON.parse(data));
});

// בדיקה אם שעה תפוסה
app.post('/api/check', (req, res) => {
  const { date, time } = req.body;
  const data = JSON.parse(fs.readFileSync(bookingsFile));
  const isTaken = data.some(b => b.date === date && b.time === time);
  res.json({ available: !isTaken });
});

// שמירת הזמנה
app.post('/api/book', (req, res) => {
  const { date, time } = req.body;
  const data = JSON.parse(fs.readFileSync(bookingsFile));
  const isTaken = data.some(b => b.date === date && b.time === time);
  if (isTaken) {
    return res.status(400).json({ error: 'השעה הזו כבר תפוסה.' });
  }
  data.push({ date, time });
  fs.writeFileSync(bookingsFile, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
