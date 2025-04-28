// אתחול לוח שנה
flatpickr("#datePicker", {
  locale: "he",
  dateFormat: "Y-m-d",
  disable: [
    function(date) {
      // אם יש תאריכים חסומים, חזור true (חסום)
      return isDateUnavailable(date);  // פונקציה שתשווה אם התאריך חסום
    }
  ]
});

// פונקציה לבדוק אם תאריך חסום
const unavailableDates = ["2025-04-30", "2025-05-01"]; // תאריכים חסומים
function isDateUnavailable(date) {
  const formattedDate = date.toISOString().split("T")[0]; // פורמט YYYY-MM-DD
  return unavailableDates.includes(formattedDate);
}

// הוספת שעות זמינות לבחירה
const timeOptions = ["08:00", "10:00", "12:00", "14:00", "16:00"];
const timeSelect = document.getElementById("timeSelect");
timeOptions.forEach((time) => {
  const option = document.createElement("option");
  option.value = time;
  option.textContent = time;
  timeSelect.appendChild(option);
});

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

  // שמירה של ההזמנה
  const booking = {
    name,
    age,
    date,
    time
  };

  localStorage.setItem("booking", JSON.stringify(booking));

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
