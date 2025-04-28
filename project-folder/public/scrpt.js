// יצירת לוח שנה
flatpickr("#datePicker", {
    minDate: "today",
    dateFormat: "Y-m-d",
    locale: "he",
    onChange: function(selectedDates, dateStr) {
      generateTimeSlots();
    }
  });
  
  // יצירת רשימת שעות בין 09:00 ל־16:00 (כל שעה)
  function generateTimeSlots() {
    const timeSelect = document.getElementById("timeSelect");
    timeSelect.innerHTML = "";
    for (let hour = 9; hour < 17; hour++) {
      const option = document.createElement("option");
      option.value = `${hour}:00`;
      option.text = `${hour}:00`;
      timeSelect.appendChild(option);
    }
  }
  
  // דמה לבדיקה ולשמירה במקום שרת אמיתי
  async function fakeServer(endpoint, data) {
    console.log(`Fake server call to ${endpoint}`, data);
    await new Promise(res => setTimeout(res, 500));
    if (endpoint === "/api/check") {
      return { available: Math.random() > 0.2 };
    }
    if (endpoint === "/api/book") {
      return { success: true };
    }
    return {};
  }
  
  // קריאה בעת לחיצה על כפתור "הזמן"
  async function bookSlot() {
    const date = document.getElementById("datePicker").value;
    const time = document.getElementById("timeSelect").value;
    const confirmation = document.getElementById("confirmation");
  
    if (!date || !time) {
      confirmation.style.color = "red";
      confirmation.innerText = "אנא בחר תאריך ושעה תקפים.";
      return;
    }
  
    try {
      const checkResult = await fakeServer("/api/check", { date, time });
  
      if (!checkResult.available) {
        confirmation.style.color = "red";
        confirmation.innerText = "השעה שבחרת כבר תפוסה.";
        return;
      }
  
      const bookingResult = await fakeServer("/api/book", { date, time });
  
      if (bookingResult.success) {
        confirmation.style.color = "green";
        confirmation.innerText = `הזמנתך ליום ${date} בשעה ${time} נשמרה בהצלחה!`;
      } else {
        confirmation.style.color = "red";
        confirmation.innerText = "אירעה שגיאה בשמירת ההזמנה.";
      }
    } catch (error) {
      confirmation.style.color = "red";
      confirmation.innerText = "שגיאת תקשורת.";
      console.error(error);
    }
  }
  