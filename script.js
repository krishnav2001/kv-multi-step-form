// ==========================================
// SHARED STATE & PRICING DATA
// ==========================================
const PLANS = {
  arcade: { label: "Arcade", monthly: 9, yearly: 90 },
  advanced: { label: "Advanced", monthly: 12, yearly: 120 },
  pro: { label: "Pro", monthly: 15, yearly: 150 },
};

const ADDONS = {
  online: { label: "Online service", monthly: 1, yearly: 10 },
  storage: { label: "Larger storage", monthly: 2, yearly: 20 },
  profile: { label: "Customizable profile", monthly: 2, yearly: 20 },
};

const state = {
  step: 1,
  personal: { name: "", email: "", phone: "" },
  plan: "arcade",
  yearly: false,
  addons: new Set(["online", "storage"]),
};

const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const bottomBar = document.getElementById("bottom-bar");

function updateStepperUI(step) {
  const activeStep = step === 5 ? 4 : step;

  document.querySelectorAll("[data-step-indicator]").forEach((btn) => {
    const isActive = Number(btn.dataset.stepIndicator) === activeStep; // data- can be written as dataset and a-b-c class can be written as aBC
    btn.classList.toggle("bg-lightBlue", isActive);
    btn.classList.toggle("text-marine", isActive);
    btn.classList.toggle("border-lightBlue", isActive);
    btn.classList.toggle("text-white", !isActive);
  });
}

function goToStep(stepNumber) {
  state.step = stepNumber;

  document.querySelectorAll(".step-panel").forEach((panel, index) => {
    panel.classList.toggle("hidden", index + 1 !== state.step);
  });

  updateStepperUI(state.step);
  bottomBar.classList.toggle("hidden", state.step === 5);
  backBtn.classList.toggle("invisible", state.step === 1);
  nextBtn.textContent = state.step === 4 ? "Confirm" : "Next Step";
  nextBtn.classList.toggle("bg-purplish", state.step === 4);
  nextBtn.classList.toggle("hover:bg-purplish/90", state.step === 4);
  nextBtn.classList.toggle("bg-marine", state.step !== 4);
  nextBtn.classList.toggle("hover:bg-marine/90", state.step !== 4);
  if (state.step === 2) renderStep2();
  if (state.step === 3) renderStep3();
  if (state.step === 4) renderStep4();
}

// ==========================================
// PAGE 1: PERSONAL INFO (#step-1)
// ==========================================
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");

function setFieldError(input, errorEl, message) {
  const hasError = Boolean(message);
  errorEl.textContent = message || "This field is required";
  errorEl.classList.toggle("hidden", !hasError);
  input.classList.toggle("border-strawberry", hasError);
  input.classList.toggle("border-lightGray", !hasError);
}

function validateStep1() {
  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const phoneVal = phoneInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valid = true;

  if (!nameVal) {
    setFieldError(nameInput, nameError, "This field is required");
    valid = false;
  } else {
    setFieldError(nameInput, nameError, "");
  }

  if (!emailVal) {
    setFieldError(emailInput, emailError, "This field is required");
    valid = false;
  } else if (!emailRegex.test(emailVal)) {
    setFieldError(emailInput, emailError, "Invalid email address");
    valid = false;
  } else {
    setFieldError(emailInput, emailError, "");
  }

  if (!phoneVal) {
    setFieldError(phoneInput, phoneError, "This field is required");
    valid = false;
  } else {
    setFieldError(phoneInput, phoneError, "");
  }

  if (valid) {
    state.personal = { name: nameVal, email: emailVal, phone: phoneVal };
  }

  return valid;
}

[nameInput, emailInput, phoneInput].forEach((input) => {
  input.addEventListener("input", () => {
    if (input.classList.contains("border-strawberry")) {
      validateStep1();
    }
  });
});

// ==========================================
// PAGE 2: SELECT YOUR PLAN (#step-2)
// ==========================================
const billingToggle = document.getElementById("billing-toggle");
const billingKnob = document.getElementById("billing-knob");
const labelMonthly = document.getElementById("label-monthly");
const labelYearly = document.getElementById("label-yearly");

function renderStep2() {
  const cycle = state.yearly ? "yearly" : "monthly";
  const suffix = state.yearly ? "/yr" : "/mo";

  document.querySelectorAll("[data-plan-price]").forEach((priceEl) => {
    const planKey = priceEl.dataset.planPrice;
    priceEl.textContent = `$${PLANS[planKey][cycle]}${suffix}`;
  });

  document.querySelectorAll("[data-yearly-promo]").forEach((promoEl) => {
    promoEl.classList.toggle("hidden", !state.yearly);
  });

  document.querySelectorAll(".plan-card").forEach((card) => {
    const isSelected = card.dataset.plan === state.plan;
    card.classList.toggle("border-purplish", isSelected);
    card.classList.toggle("bg-alabaster", isSelected);
    card.classList.toggle("border-lightGray", !isSelected);
    card.classList.toggle("bg-white", !isSelected);
  });

  billingToggle.setAttribute("aria-checked", String(state.yearly));
  billingKnob.classList.toggle("translate-x-4", state.yearly);
  billingKnob.classList.toggle("translate-x-0", !state.yearly);

  labelMonthly.classList.toggle("text-marine", !state.yearly);
  labelMonthly.classList.toggle("text-coolGray", state.yearly);
  labelYearly.classList.toggle("text-marine", state.yearly);
  labelYearly.classList.toggle("text-coolGray", !state.yearly);

}

document.querySelectorAll(".plan-card").forEach((card) => {
  card.addEventListener("click", () => {
    state.plan = card.dataset.plan;
    renderStep2();
  })
});

billingToggle.addEventListener("click", () => {
  state.yearly = !state.yearly;
  renderStep2();
});

// ==========================================
// PAGE 3: PICK ADD-ONS (#step-3)
// ==========================================

function renderStep3() {
  const cycle = state.yearly ? "yearly" : "monthly";
  const suffix = state.yearly ? "/yr" : "/mo";

  document.querySelectorAll("[data-addon-price]").forEach((priceEl) => {
    const addOnKey = priceEl.dataset.addonPrice;
    priceEl.textContent = `+$${ADDONS[addOnKey][cycle]}${suffix}`;
  });

  document.querySelectorAll(".addon-checkbox").forEach((checkbox) => {
    const key = checkbox.dataset.addon;
    const isChecked = state.addons.has(key);
    checkbox.checked = isChecked;

    const card = document.querySelector(`[data-addon-card="${key}"]`);
    if (card) {
      card.classList.toggle("border-purplish", isChecked);
      card.classList.toggle("bg-alabaster", isChecked);
      card.classList.toggle("border-lightGray", !isChecked);
      card.classList.toggle("bg-white", !isChecked);
    }
  });
}

document.querySelectorAll(".addon-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const key = checkbox.dataset.addon;
    if (checkbox.checked) {
      state.addons.add(key);
    } else {
      state.addons.delete(key);
    }
    renderStep3();
  });
})

// ==========================================
// PAGE 4: FINISHING UP (#step-4)
// ==========================================
const summaryPlanTitle = document.getElementById("summary-plan-title");
const summaryPlanPrice = document.getElementById("summary-plan-price");
const summaryAddons = document.getElementById("summary-addons");
const summaryTotalLabel = document.getElementById("summary-total-label");
const summaryTotalPrice = document.getElementById("summary-total-price");
const changePlanBtn = document.getElementById("change-plan-btn");

function renderStep4() {
  const cycle = state.yearly ? "yearly" : "monthly";
  const suffix = state.yearly ? "/yr" : "/mo";
  const planObj = PLANS[state.plan];

  summaryPlanTitle.textContent = `${planObj.label} (${state.yearly ? "Yearly" : "Monthly"})`;
  summaryPlanPrice.textContent = `$${planObj[cycle]}${suffix}`;

  summaryAddons.innerHTML = "";
  let total = planObj[cycle];

  state.addons.forEach((key) => {
    const addon = ADDONS[key];
    total += addon[cycle];

    const row = document.createElement("div");
    row.className = "flex items-center justify-between";

    const nameSpan = document.createElement("span");
    nameSpan.className = "text-coolGray";
    nameSpan.textContent = addon.label;

    const priceSpan = document.createElement("span");
    priceSpan.className = "text-marine font-medium";
    priceSpan.textContent = `+$${addon[cycle]}${suffix}`;

    row.append(nameSpan, priceSpan);
    summaryAddons.appendChild(row);
  });

  summaryTotalLabel.textContent = state.yearly ? "Total (per year)" : "Total (per month)";
  summaryTotalPrice.textContent = `+$${total}${suffix}`;
}

changePlanBtn.addEventListener("click", () => {
  goToStep(2);
});

// ==========================================
// PAGE 5: THANK YOU & NAVIGATION CONTROLS
// ==========================================

nextBtn.addEventListener("click", () => {
  if (state.step === 1 && !validateStep1()) return;

  if (state.step < 5) {
    goToStep(state.step + 1);
  }
});

backBtn.addEventListener("click", () => {
  if (state.step > 1) {
    goToStep(state.step - 1);
  }
});

// Start on Step 1
goToStep(1);
