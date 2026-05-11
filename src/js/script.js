function toggleMobileMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('active');
}

/* cryptocurrencies.html */
(function() {
        function loadWidget() {
          if (typeof window.createMyWidget === 'function') {
            window.createMyWidget('price-chart-widget-container', {
                autoSize: true,
                chainId: '0x1',
                pairAddress: '0x56534741cd8b152df6d48adf7ac51f75169a83b2',
                showHoldersChart: true,
                defaultInterval: '1D',
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Etc/UTC',
                theme: 'moralis',
                locale: 'en',
                showCurrencyToggle: true,
                hideLeftToolbar: false,
                hideTopToolbar: false,
                hideBottomToolbar: false
            });
          } else {
            console.error('createMyWidget function is not defined.');
          }
        }

        if (!document.getElementById('moralis-chart-widget')) {
          var script = document.createElement('script');
          script.id = 'moralis-chart-widget';
          script.src = 'https://moralis.com/static/embed/chart.js';
          script.type = 'text/javascript';
          script.async = true;
          script.onload = loadWidget;
          document.body.appendChild(script);
        } else {
          loadWidget();
        }
})();

  window.addEventListener('load', updateOnlineStatus);
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

 function updateOnlineStatus() {
    const offlineMessage = document.getElementById("offline-message");
    if (!navigator.onLine) {
      offlineMessage.style.display = 'block';
    } else {
    offlineMessage.style.display = 'none';
  }
  }

/*learn.html */
document.addEventListener("DOMContentLoaded", function() {
  const iframe1 = document.getElementById("crypto-video-1");
  const iframe2 = document.getElementById("crypto-video-2");
  const errorMsg = document.getElementById("video-error");

  // Function to check if user is online
  function isOnline() {
    return navigator.onLine;
  }

  // Function to show error message
  function showErrorMessage() {
    if (iframe1) iframe1.style.display = "none";
    if (iframe2) iframe2.style.display = "none";
    
    if (errorMsg) {
      if (!isOnline()) {
        errorMsg.innerHTML = "⚠️ These videos are not available. Please check your internet connection and try again.";
      } else {
        errorMsg.innerHTML = "⚠️ These videos are not available. Please check your connection or try again later.";
      }
      errorMsg.hidden = false;
    }
  }

  // Function to check individual video loading
  function checkVideoAvailability() {
    let failedVideos = 0;
    // Check if videos failed to load
    if (iframe1 && (!iframe1.contentWindow || iframe1.style.display === "none")) {
      failedVideos++;
    }
    if (iframe2 && (!iframe2.contentWindow || iframe2.style.display === "none")) {
      failedVideos++;
    }
    
    if (failedVideos === 2) {// Both videos failed
      showErrorMessage();
    } else if (failedVideos === 1) {
      // Only one video failed - show partial error
      if (errorMsg) {
        errorMsg.innerHTML = "⚠️ One of the videos is not available. Please check your connection or try refreshing the page.";
        errorMsg.hidden = false;
      }
    }
  }

  // Check online status
  if (!isOnline()) {
    showErrorMessage();
    return;
  }

  // Listen for online/offline events
  window.addEventListener('online', function() {
    if (errorMsg && !errorMsg.hidden) {
      // Reload the page when coming back online
      location.reload();
    }
  });

  window.addEventListener('offline', function() {
    showErrorMessage();
  });

  // Simple check using timeout for YouTube iframe loading
  setTimeout(() => { // Check if iframes failed to load or if still offline
    if (!isOnline()) {
      showErrorMessage();
    } else {
      checkVideoAvailability();
    }
  }, 5000);

  // Additional check for individual iframe load errors
  if (iframe1) {
    iframe1.addEventListener('error', () => {
      setTimeout(checkVideoAvailability, 1000);
    });
  }
  if (iframe2) {
    iframe2.addEventListener('error', () => {
      setTimeout(checkVideoAvailability, 1000);
    });
  }
});

/* benefits.html */
const benefitItems = document.querySelectorAll('.benefit-item');
window.addEventListener('scroll', () => {
    benefitItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight - 50) {
            item.classList.add('visible');
        }
    });
});

/* register.html */
const username = document.getElementById("username");
const usermsg = document.getElementById("username-msg");
const email = document.getElementById("email");
const emailMsg = document.getElementById("email-msg");
const password = document.getElementById("password");
const pwdmsg = document.getElementById("pwd-msg");
const confirm = document.getElementById("confirm");
const confirmMsg = document.getElementById("confirm-msg");
const phone = document.getElementById("phone");
const phoneMsg = document.getElementById("phone-msg");
const gender = document.getElementById("gender");
const genderMsg = document.getElementById("gender-msg");
const country = document.getElementById('country');
const countryMsg = document.getElementById("country-msg");
const dob = document.getElementById("dob");
const dobMsg = document.getElementById("dob-msg");
const terms = document.getElementById("terms");
const termsMsg = document.getElementById("terms-msg");
const submit = document.getElementById("submit");

let username_flag = false;
let password_flag = false;
let email_flag = false;
let phone_flag = false;
let gender_flag = false;
let country_flag = false;
let dob_flag = false;
let confirm_flag = false;
let terms_flag = false;

username.addEventListener('input', () => {
   if(username.value.length == 0){
        usermsg.innerHTML = "Username can't be empty"
        username_flag = false
    } else if (username.value.length < 8) {
        usermsg.innerHTML = "Username must be at least 8 characters.";
        username_flag = false;
    } else {
        usermsg.innerHTML = "";
        username_flag = true;
    }
});

email.addEventListener('input', () => {
    let parts = email.value.split("@");
    if (parts.length !== 2 || parts[1].indexOf(".") === -1) {
        emailMsg.innerHTML = "Invalid email format. It must follow xxx@xxx.";
        email_flag = false;
    } else {
        emailMsg.innerHTML = "";
        email_flag = true;
    }
});

password.addEventListener('input', () => {
   if(password.value.length == 0){
        pwdmsg.innerHTML = "Password can't be empty"
        password_flag = false
    } else if (password.value.length < 8) {
        pwdmsg.innerHTML = "Password must be at least 8 characters.";
        password_flag = false;
    } else {
        pwdmsg.innerHTML = "";
        password_flag = true;
    }
});

  confirm.addEventListener('input', () => {
    if (confirm.value !== password.value) {
        confirmMsg.innerHTML = "Password confirmation does not match.";
        confirm_flag = false;
    } else {
        confirmMsg.innerHTML = "";
        confirm_flag = true;
    }
});

  gender.addEventListener('change', () => {
    if (gender.value === "") {
        genderMsg.innerHTML = "Select your gender!";
        gender_flag = false;
    } else {
        genderMsg.innerHTML = "";
        gender_flag = true;
    }
});

country.addEventListener('change', () => {
    if (country.value === "") {
        countryMsg.innerHTML = "Select your country!";
        country_flag = false;
    } else {
        countryMsg.innerHTML = "";
        country_flag = true;
    }
});

dob.addEventListener('change', () => {
    if (dob.value === "") {
        dobMsg.innerHTML = "Please fill in your date of birth!";
        dob_flag = false;
    } else {
        dobMsg.innerHTML = "";
        dob_flag = true;
    }
});

phone.addEventListener('input', () => {
    const val = phone.value;
    // Check if there is a '+', it can only be in the initial position
    const plusValid = val.indexOf('+') <= 0;
    // Remove the '+' sign if there is one, check the remaining numbers.
    let numberPart;
    if (val.startsWith('+')) {
    numberPart = val.slice(1);
  } else {
    numberPart = val;
}
    const allDigits = [...numberPart].every(c => !isNaN(c) && c !== ' ');
    
    if (!plusValid || numberPart.length < 10 || !allDigits) {
        phoneMsg.innerHTML = "Invalid phone number.";
        phone_flag = false;
    } else {
        phoneMsg.innerHTML = "";
        phone_flag = true;
    }
});


terms.addEventListener('change', () => {
    if (!terms.checked) {
        termsMsg.innerHTML = "You must agree to the Terms and Conditions";
        terms_flag = false;
    } else {
        termsMsg.innerHTML = "";
        terms_flag = true;
    }
});

submit.addEventListener('click', (e) => {
    e.preventDefault();

    if (
        username_flag &&
        password_flag &&
        email_flag &&
        phone_flag &&
        gender_flag &&
        country_flag &&
        dob_flag &&
        confirm_flag &&
        terms_flag
    ) {
        alert("Registration Success!");
    } else {
        alert("Registration Failed! Please provide the data correctly!");
    }
});
