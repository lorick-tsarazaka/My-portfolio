// INTRO LOADER
document.body.style.overflow = 'hidden';
  window.addEventListener("load", function() {
    setTimeout(() => {
      document.getElementById("intro-loader").style.display = "none";
      document.getElementById("main-content").style.display = "block";
      document.body.style.overflow = '';
    }, 4000); 
  });


  // PROGRESS BAR ANIMATION
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
  function animateProgressBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      if (isInViewport(bar)) {
        if (!bar.classList.contains('animated')) {
          bar.style.width = targetWidth + '%';
          bar.classList.add('animated');
        }
      } else {
        bar.style.width = '0';
        bar.classList.remove('animated');
      }
    });
  }
  window.addEventListener('scroll', animateProgressBars);
  window.addEventListener('load', animateProgressBars);

  // TEL FORM
  const countrySelect = document.getElementById('country');
  const phoneInput = document.getElementById('phone');
  const formats = {
    MG: { code: '+261', placeholder: '+261 34 79 870 93' },
    FR: { code: '+33',  placeholder: '+33 6 12 34 56 78' },
    US: { code: '+1',   placeholder: '+1 202 555 0187' }
  };

  function setCountryCode() {
    const country = countrySelect.value;
    const code = formats[country].code;
    phoneInput.value = code + ' ';
    phoneInput.setSelectionRange(phoneInput.value.length, phoneInput.value.length);
    phoneInput.placeholder = formats[country].placeholder;
  }
  countrySelect.addEventListener('change', setCountryCode);
  setCountryCode();

  phoneInput.addEventListener('input', () => {
    const country = countrySelect.value;
    const format = formats[country];
    let digits = phoneInput.value.replace(/\D/g, '');
    const codeDigits = format.code.replace('+','');
    if(digits.startsWith(codeDigits)) {
      digits = digits.slice(codeDigits.length);
    }
    if(country === 'MG' || country === 'FR') digits = digits.slice(0,9); // 9 chiffres restants
    if(country === 'US') digits = digits.slice(0,10); // 10 chiffres restants
    let formatted = '';
    if(country === 'MG') {
      const match = digits.match(/(\d{0,2})(\d{0,2})(\d{0,3})(\d{0,2})/);
      if(match) formatted = [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
    } else if(country === 'FR') {
      const match = digits.match(/(\d{0,1})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/);
      if(match) formatted = [match[1], match[2], match[3], match[4], match[5]].filter(Boolean).join(' ');
    } else if(country === 'US') {
      const match = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      if(match) formatted = [match[1], match[2], match[3]].filter(Boolean).join(' ');
    }
    phoneInput.value = `${format.code} ${formatted}`.trim();
  });


  // SCROLL TO TOP
  const scrollArrow = document.getElementById('scroll-arrow');

window.addEventListener('scroll', () => {
  // Si on atteint presque la fin de la page
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
    scrollArrow.classList.add('show');
  } else {
    scrollArrow.classList.remove('show');
  }
});

// Quand on clique sur la flèche
scrollArrow.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});







// MESSAGE FORM
const form = document.getElementById('contact-form');
const toastEl = document.getElementById('successToast');
const toast = new bootstrap.Toast(toastEl, { delay: 3000 }); // disparaît après 3s

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/mldppoqz', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      toast.show(); // affiche le toast
    } else {
      const data = await response.json();
      alert(data.error || 'Une erreur est survenue.');
    }

  } catch (error) {
    alert('Une erreur est survenue. Veuillez réessayer.');
    console.error(error);
  }
});
