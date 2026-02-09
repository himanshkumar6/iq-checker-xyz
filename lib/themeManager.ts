export type Theme = 'light' | 'dark' | 'system';

export const themeManager = {
  // Get current theme from localStorage
  getTheme(): Theme {
    return (localStorage.getItem('theme') as Theme) || 'system';
  },

  // Set theme and apply
  setTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
    this.applyTheme(theme);
  },

  // Apply theme to DOM
  applyTheme(theme: Theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System mode
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  },

  // Initialize on page load
  init() {
    const theme = this.getTheme();
    this.applyTheme(theme);

    // Listen for system preference changes (only if in system mode)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.getTheme() === 'system') {
        this.applyTheme('system');
      }
    });
  }
};
