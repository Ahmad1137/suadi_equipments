function toggleLanguage(lang) {
  // Update active button styling
  document.querySelectorAll('.language-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active-language', 'text-[#FCB034]');
      btn.classList.remove('text-gray-700');
    } else {
      btn.classList.remove('active-language', 'text-[#FCB034]');
      btn.classList.add('text-gray-700');
    }
  });

  // Update URL with lang parameter
  const newUrl = window.location.pathname + '?lang=' + lang;
  window.history.pushState({}, document.title, newUrl);
  window.location.reload();

  // Call loadTranslations
  loadTranslations(lang);

  // Reinitialize Swiper sliders
  initializeSwipers(lang);
   
}

async function loadTranslations(lang) {
    // Get the current page name (e.g., 'index' from 'index.html')
    const page = window.location.pathname.split('/').pop().split('.')[0] || 'index';
    // Construct the path to the JSON file
    const translationFile = `translations/${page}_${lang}.json`;
    
    try {
        // Fetch the translation file
        const response = await fetch(translationFile);
        if (!response.ok) throw new Error('Translation file not found');
        const translations = await response.json();

        // Update the DOM with translations
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        // Update lang and dir attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}