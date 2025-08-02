// Stripe Checkout Link Integration with Multi-language Support - SECURE VERSION
document.addEventListener("DOMContentLoaded", function () {
  // Security check - validate environment
  if (!window.location.protocol.includes("http")) {
    console.error("Payment system requires HTTP/HTTPS protocol");
    return;
  }

  // Detect current language from HTML lang attribute
  const currentLang = document.documentElement.lang || "he";

  // Multi-language messages
  const messages = {
    he: {
      selectPackage: "אנא בחר חבילה תחילה",
      processing: "מעבד...",
      successTitle: "נרשמת בהצלחה!",
      successMessage:
        "בדימוי זה, במציאות הייתם מועברים לדף התשלום המאובטח של Stripe.",
      integrationSteps: "כדי להשלים את האינטגרציה האמיתית:",
      step1: "צור חשבון ב-Stripe אם אין לך כבר",
      step2: "צור קישורי תשלום ב-Stripe Dashboard",
      step3: "החלף את הקישורים הדמיוניים בקוד עם הקישורים האמיתיים",
      step4: "הסר את קוד ההדגמה הזה",
      backToForm: "חזרה לטופס",
    },
    en: {
      selectPackage: "Please select a package first",
      processing: "Processing...",
      successTitle: "Successfully registered!",
      successMessage:
        "In this demo, in reality you would be redirected to Stripe's secure payment page.",
      integrationSteps: "To complete the real integration:",
      step1: "Create a Stripe account if you don't have one",
      step2: "Create payment links in Stripe Dashboard",
      step3: "Replace the demo links in the code with real ones",
      step4: "Remove this demo code",
      backToForm: "Back to Form",
    },
    ru: {
      selectPackage: "Пожалуйста, сначала выберите пакет",
      processing: "Обработка...",
      successTitle: "Успешно зарегистрированы!",
      successMessage:
        "В этой демонстрации, в реальности вы были бы перенаправлены на защищенную страницу оплаты Stripe.",
      integrationSteps: "Для завершения реальной интеграции:",
      step1: "Создайте учетную запись Stripe, если у вас ее нет",
      step2: "Создайте ссылки для оплаты в Stripe Dashboard",
      step3: "Замените демо-ссылки в коде на реальные",
      step4: "Удалите этот демо-код",
      backToForm: "Назад к форме",
    },
    fr: {
      selectPackage: "Veuillez d'abord sélectionner un package",
      processing: "Traitement...",
      successTitle: "Inscription réussie!",
      successMessage:
        "Dans cette démo, en réalité vous seriez redirigé vers la page de paiement sécurisée de Stripe.",
      integrationSteps: "Pour compléter l'intégration réelle:",
      step1: "Créez un compte Stripe si vous n'en avez pas",
      step2: "Créez des liens de paiement dans le Stripe Dashboard",
      step3: "Remplacez les liens de démo dans le code par de vrais",
      step4: "Supprimez ce code de démo",
      backToForm: "Retour au formulaire",
    },
    ar: {
      selectPackage: "يرجى اختيار باقة أولاً",
      processing: "جاري المعالجة...",
      successTitle: "تم التسجيل بنجاح!",
      successMessage:
        "في هذا العرض التوضيحي، في الواقع سيتم توجيهك إلى صفحة الدفع الآمنة في Stripe.",
      integrationSteps: "لإكمال التكامل الحقيقي:",
      step1: "أنشئ حساب Stripe إذا لم يكن لديك واحد",
      step2: "أنشئ روابط الدفع في Stripe Dashboard",
      step3: "استبدل الروابط التجريبية في الكود بالحقيقية",
      step4: "احذف كود العرض التوضيحي هذا",
      backToForm: "العودة للنموذج",
    },
  };

  // Package data with SECURE Stripe Checkout links
  const packages = {
    basic: {
      name: "חבילה בסיסית - טיול ג'יפים",
      description: "טיול ג'יפים למשך 2 שעות",
      price: 350,
      currency: "ILS",
      checkoutUrl: "https://buy.stripe.com/test_28o5lScUV7Vo6UE6oo",
      id: "basic_package_350_ils",
    },
    premium: {
      name: "חבילת פרימיום - טיול ג'יפים",
      description: "טיול ג'יפים למשך 4 שעות",
      price: 650,
      currency: "ILS",
      checkoutUrl: "https://buy.stripe.com/test_28o3ds8Ez5Ngcf6fYZ",
      id: "premium_package_650_ils",
    },
    extreme: {
      name: "חבילת אקסטרים",
      description: "טיול משולב ג'יפים ואופנועים",
      price: 850,
      currency: "ILS",
      checkoutUrl: "https://buy.stripe.com/test_dR65lS8Ez8Zs6UE5kl",
      id: "extreme_package_850_ils",
    },
  };

  // Get DOM elements
  const packageButtons = document.querySelectorAll(".package-button");
  const checkoutButton = document.getElementById("checkout-button");

  // Track selected package
  let selectedPackage = null;

  // Add click event to package buttons
  packageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      packageButtons.forEach((btn) => {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-light");
      });

      // Add active class to clicked button
      this.classList.add("active", "btn-primary");
      this.classList.remove("btn-outline-light");

      // Store selected package
      selectedPackage = this.dataset.package;

      // Enable checkout button
      checkoutButton.disabled = false;
    });
  });

  // Add click event to checkout button - SECURE VERSION
  checkoutButton.addEventListener("click", function () {
    // Security validation
    if (!selectedPackage) {
      alert(messages[currentLang].selectPackage);
      return;
    }

    // Validate package exists and has secure URL
    if (!packages[selectedPackage] || !packages[selectedPackage].checkoutUrl) {
      alert("שגיאת אבטחה: חבילה לא תקינה");
      return;
    }

    // Validate Stripe URL
    if (
      !packages[selectedPackage].checkoutUrl.startsWith(
        "https://buy.stripe.com/"
      )
    ) {
      alert("שגיאת אבטחה: קישור תשלום לא תקין");
      return;
    }

    // Log secure transaction attempt
    console.log(
      `Secure payment initiated for package: ${packages[selectedPackage].id}`
    );

    // Show loading state
    checkoutButton.disabled = true;
    checkoutButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${messages[currentLang].processing}`;

    // Secure redirect to Stripe Checkout
    setTimeout(() => {
      window.location.href = packages[selectedPackage].checkoutUrl;
    }, 500); // Small delay for security logging
  });
});

// Show success message after payment submission
function showPaymentSuccessMessage() {
  const currentLang = document.documentElement.lang || "he";
  const messages = {
    he: {
      selectPackage: "אנא בחר חבילה תחילה",
      processing: "מעבד...",
      successTitle: "נרשמת בהצלחה!",
      successMessage:
        "בדימוי זה, במציאות הייתם מועברים לדף התשלום המאובטח של Stripe.",
      integrationSteps: "כדי להשלים את האינטגרציה האמיתית:",
      step1: "צור חשבון ב-Stripe אם אין לך כבר",
      step2: "צור קישורי תשלום ב-Stripe Dashboard",
      step3: "החלף את הקישורים הדמיוניים בקוד עם הקישורים האמיתיים",
      step4: "הסר את קוד ההדגמה הזה",
      backToForm: "חזרה לטופס",
    },
    en: {
      selectPackage: "Please select a package first",
      processing: "Processing...",
      successTitle: "Successfully registered!",
      successMessage:
        "In this demo, in reality you would be redirected to Stripe's secure payment page.",
      integrationSteps: "To complete the real integration:",
      step1: "Create a Stripe account if you don't have one",
      step2: "Create payment links in Stripe Dashboard",
      step3: "Replace the demo links in the code with real ones",
      step4: "Remove this demo code",
      backToForm: "Back to Form",
    },
    ru: {
      selectPackage: "Пожалуйста, сначала выберите пакет",
      processing: "Обработка...",
      successTitle: "Успешно зарегистрированы!",
      successMessage:
        "В этой демонстрации, в реальности вы были бы перенаправлены на защищенную страницу оплаты Stripe.",
      integrationSteps: "Для завершения реальной интеграции:",
      step1: "Создайте учетную запись Stripe, если у вас ее нет",
      step2: "Создайте ссылки для оплаты в Stripe Dashboard",
      step3: "Замените демо-ссылки в коде на реальные",
      step4: "Удалите этот демо-код",
      backToForm: "Назад к форме",
    },
    fr: {
      selectPackage: "Veuillez d'abord sélectionner un package",
      processing: "Traitement...",
      successTitle: "Inscription réussie!",
      successMessage:
        "Dans cette démo, en réalité vous seriez redirigé vers la page de paiement sécurisée de Stripe.",
      integrationSteps: "Pour compléter l'intégration réelle:",
      step1: "Créez un compte Stripe si vous n'en avez pas",
      step2: "Créez des liens de paiement dans le Stripe Dashboard",
      step3: "Remplacez les liens de démo dans le code par de vrais",
      step4: "Supprimez ce code de démo",
      backToForm: "Retour au formulaire",
    },
    ar: {
      selectPackage: "يرجى اختيار باقة أولاً",
      processing: "جاري المعالجة...",
      successTitle: "تم التسجيل بنجاح!",
      successMessage:
        "في هذا العرض التوضيحي، في الواقع سيتم توجيهك إلى صفحة الدفع الآمنة في Stripe.",
      integrationSteps: "لإكمال التكامل الحقيقي:",
      step1: "أنشئ حساب Stripe إذا لم يكن لديك واحد",
      step2: "أنشئ روابط الدفع في Stripe Dashboard",
      step3: "استبدل الروابط التجريبية في الكود بالحقيقية",
      step4: "احذف كود العرض التوضيحي هذا",
      backToForm: "العودة للنموذج",
    },
  };

  const paymentCard = document.querySelector(".payment-card");
  const originalContent = paymentCard.innerHTML;

  // Save original content
  paymentCard.dataset.originalContent = originalContent;

  const isRTL = currentLang === "he" || currentLang === "ar";
  const textAlign = isRTL ? "text-end" : "text-start";

  // Replace with success message
  paymentCard.innerHTML = `
        <div class="text-center py-5">
            <i class="fas fa-check-circle text-success" style="font-size: 5rem;"></i>
            <h3 class="mt-4">${messages[currentLang].successTitle}</h3>
            <p>${messages[currentLang].successMessage}</p>
            <p>${messages[currentLang].integrationSteps}</p>
            <ol class="${textAlign}">
                <li>${messages[currentLang].step1}</li>
                <li>${messages[currentLang].step2}</li>
                <li>${messages[currentLang].step3}</li>
                <li>${messages[currentLang].step4}</li>
            </ol>
            <p>לשאלות ובירורים: 053-3919193</p>
            <button class="btn btn-primary mt-3" onclick="resetPaymentForm()">${messages[currentLang].backToForm}</button>
        </div>
    `;
}

// Reset payment form to original state
function resetPaymentForm() {
  const paymentCard = document.querySelector(".payment-card");
  if (paymentCard.dataset.originalContent) {
    paymentCard.innerHTML = paymentCard.dataset.originalContent;

    // Reattach event listeners
    initializeListeners();
  }
}

// Initialize event listeners
function initializeListeners() {
  const packageButtons = document.querySelectorAll(".package-button");
  const checkoutButton = document.getElementById("checkout-button");

  // Add click event to package buttons
  packageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      packageButtons.forEach((btn) => {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-light");
      });

      // Add active class to clicked button
      this.classList.add("active", "btn-primary");
      this.classList.remove("btn-outline-light");

      // Enable checkout button
      checkoutButton.disabled = false;
    });
  });

  // Add click event to checkout button
  checkoutButton.addEventListener("click", function () {
    if (checkoutButton.disabled) return;

    const currentLang = document.documentElement.lang || "he";
    const messages = {
      he: { processing: "מעבד..." },
      en: { processing: "Processing..." },
      ru: { processing: "Обработка..." },
      fr: { processing: "Traitement..." },
      ar: { processing: "جاري المعالجة..." },
    };

    // Get selected package from button data or form
    const selectedPackageData = document.querySelector(
      ".package-button.active"
    );
    if (!selectedPackageData) {
      alert("Please select a package first");
      checkoutButton.disabled = false;
      checkoutButton.innerHTML = "Continue to Payment";
      return;
    }

    const selectedPackage = selectedPackageData.dataset.package;

    // Show loading state
    checkoutButton.disabled = true;
    checkoutButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${messages[currentLang].processing}`;

    // Redirect to Stripe Checkout using config
    if (
      window.STRIPE_CONFIG &&
      window.STRIPE_CONFIG.paymentLinks[selectedPackage]
    ) {
      window.location.href = window.STRIPE_CONFIG.paymentLinks[selectedPackage];
    } else {
      alert("אנא הגדר את קישורי Stripe תחילה");
      checkoutButton.disabled = false;
      checkoutButton.innerHTML = "Continue to Payment";
    }
  });
}
