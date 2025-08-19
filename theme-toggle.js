  … your page content …

  <script>
    (function() {
      const htmlEl      = document.documentElement;
      const toggleBtn   = document.getElementById('theme-toggle');
      const storedTheme = localStorage.getItem('theme');

      // 1. Initialize theme
      const currentTheme = storedTheme || 'light';
      htmlEl.setAttribute('data-theme', currentTheme);
      updateButtonText(currentTheme);

      // 2. Toggle on click
      toggleBtn.addEventListener('click', () => {
        const newTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateButtonText(newTheme);
      });

      // Helper to update button text
      function updateButtonText(theme) {
        toggleBtn.textContent = theme === 'dark'
          ? 'Switch to Light Mode'
          : 'Switch to Dark Mode';
      }
    })();
  </script>
</body>
