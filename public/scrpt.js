// אתחול לוח שנה עם הגדרה לעברית
flatpickr("#datePicker", {
  locale: "he",  // הגדרת השפה לעברית
  dateFormat: "Y-m-d",  // פורמט תאריך
  disable: [
    function(date) {
      return isDateUnavailable(date);  // אם התאריך חסום
    }
  ],
  onChange: function(selectedDates, dateStr, instance) {
    // עדכון שעות זמינות אחרי בחירת תאריך
    updateAvailableTimes(dateStr);
  }
});

// רשימת תאריכים חסומים
const unavailableDates = ["2025-04-30", "2025-05-01"]; // דוגמת תאריכים חסומים
function isDateUnavailable(date) {
  const formattedDate = date.toISOString().split("T")[0]; // פורמט YYYY-MM-DD
  return unavailableDates.includes(formattedDate);
}

// שעות זמינות לתאריך נבחר
const timeOptions = {
  "2025-04-28": ["08:00", "10:00", "12:00", "14:00"],  // שעות לתאריך מסוים
  "2025-04-29": ["09:00", "11:00", "13:00", "15:00"]
};

function updateAvailableTimes(date) {
  const timeSelect = document.getElementById("timeSelect");
  timeSelect.innerHTML = ''; // מנקה את אפשרויות השעות הקודמות

  // אם יש שעות זמינות לתאריך הנבחר
  if (timeOptions[date]) {
    timeOptions[date].forEach(time => {
      const option = document.createElement("option");
      option.value = time;
      option.textContent = time;
      timeSelect.appendChild(option);
    });
  } else {
    const option = document.createElement("option");
    option.value = '';
    option.textContent = "אין שעות זמינות לתאריך זה";
    option.disabled = true;
    timeSelect.appendChild(option);
  }
}

// פונקציה להזמנת טרקטורון
function bookSlot() {
  const name = document.getElementById("userName").value;
  const age = document.getElementById("userAge").value;
  const date = document.getElementById("datePicker").value;
  const time = document.getElementById("timeSelect").value;

  // בדיקת אם כל השדות מלאים
  if (!name || !age || !date || !time) {
    alert("אנא מלא את כל השדות.");
    return;
  }

  // הצגת אישור
  document.getElementById("confirmation").textContent = `ההזמנה בוצעה בהצלחה! שלום ${name}, ההזמנה שלך היא בתאריך ${date} בשעה ${time}.`;
  
  // הוספת כפתור להמשך לדף תשלום
  const paymentButton = document.createElement("button");
  paymentButton.textContent = "מעבר לדף תשלום";
  paymentButton.onclick = redirectToPayment;
  document.getElementById("booking-box").appendChild(paymentButton);
}

// הפניית המשתמש לדף תשלום
function redirectToPayment() {
  window.location.href = "payment.html"; // הפניית הדף לדף תשלום
}
