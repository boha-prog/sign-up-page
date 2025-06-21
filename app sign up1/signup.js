const step1 = document.querySelector('.step-1');
const step2 = document.querySelector('.step-2');
const step3 = document.querySelector('.step-3');
const thankyou = document.querySelector('.thankyou-message');
const form = document.getElementById('signupForm');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const genderInputs = document.getElementsByName('gender');
const ageInput = document.getElementById('age');
const countryInput = document.getElementById('country');

const nextToEmail = document.getElementById('nextToEmail');
const nextToPassword = document.getElementById('nextToPassword');

// Add alert element
let alertBox = document.querySelector('.alert');
if (!alertBox) {
  alertBox = document.createElement('div');
  alertBox.className = 'alert';
  document.querySelector('.signup-container').insertBefore(alertBox, form);
}
function showAlert(msg) {
  alertBox.textContent = msg;
  alertBox.style.display = 'block';
  setTimeout(() => {
    alertBox.style.display = 'none';
  }, 2200);
}

function showStep(hideStep, showStep) {
  hideStep.classList.add('fade-out');
  setTimeout(() => {
    hideStep.style.display = 'none';
    hideStep.classList.remove('fade-out');
    showStep.style.display = 'flex';
    showStep.classList.add('fade-in');
    setTimeout(() => showStep.classList.remove('fade-in'), 400);
  }, 350);
}

nextToEmail.addEventListener('click', () => {
  if (nameInput.value.trim() === '') {
    nameInput.focus();
    nameInput.style.borderColor = '#ff3860';
    showAlert('Please enter your name.');
    return;
  }
  // Gender validation
  let genderSelected = false;
  for (const g of genderInputs) {
    if (g.checked) genderSelected = true;
  }
  if (!genderSelected) {
    showAlert('Please select your gender.');
    return;
  }
  // Age validation
  if (!ageInput.value || Number(ageInput.value) < 18) {
    ageInput.focus();
    ageInput.style.borderColor = '#ff3860';
    showAlert('Age must be 18 or older.');
    return;
  }
  ageInput.style.borderColor = '';
  // Country validation
  if (!countryInput.value) {
    countryInput.focus();
    countryInput.style.borderColor = '#ff3860';
    showAlert('Please select your country.');
    return;
  }
  countryInput.style.borderColor = '';
  nameInput.style.borderColor = '';
  showStep(step1, step2);
  emailInput.focus();
});

nextToPassword.addEventListener('click', () => {
  if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
    emailInput.focus();
    emailInput.style.borderColor = '#ff3860';
    showAlert('Please enter a valid email address.');
    return;
  }
  emailInput.style.borderColor = '';
  showStep(step2, step3);
  passwordInput.focus();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (passwordInput.value.length < 6) {
    passwordInput.focus();
    passwordInput.style.borderColor = '#ff3860';
    showAlert('Password must be at least 6 characters.');
    return;
  }
  passwordInput.style.borderColor = '';
  form.classList.add('fade-out');
  setTimeout(() => {
    form.style.display = 'none';
    form.classList.remove('fade-out');
    thankyou.style.display = 'block';
    thankyou.classList.add('fade-in');
    thankyou.textContent = `Thank you, ${nameInput.value.trim()}! Your account has been created.`;
    setTimeout(() => thankyou.classList.remove('fade-in'), 400);
  }, 350);
});
