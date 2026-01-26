/**
 * InnovaREV Analytics Handler
 * Version 1.0
 * 
 * This is a privacy-conscious analytics placeholder.
 * It currently logs events to the console when in development mode.
 * 
 * To enable real tracking:
 * 1. Replace GA_MEASUREMENT_ID with your actual Google Analytics ID.
 * 2. Uncomment the gtag() calls.
 */

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with real ID
const IS_DEV = true; // Set to false in production

// Initialize Data Layer
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Initialize GA4 (Commented out until ID is provided)
/*
if (!IS_DEV) {
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
    
    // Load Script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
}
*/

const Analytics = {
  /**
   * Log a custom event
   * @param {string} eventName - Name of the event (e.g., 'portfolio_filter')
   * @param {object} params - Additional parameters
   */
  logEvent: (eventName, params = {}) => {
    if (IS_DEV) {
      console.log(`[Analytics] Event: ${eventName}`, params);
    } else {
      // gtag('event', eventName, params);
    }
  },

  /**
   * Track a page view (handled automatically by GA usually, but good for SPAs)
   * @param {string} path - The page path
   */
  trackPageView: (path) => {
    if (IS_DEV) {
      console.log(`[Analytics] Page View: ${path}`);
    } else {
      // gtag('event', 'page_view', { page_path: path });
    }
  }
};

// Auto-track internal link clicks
document.addEventListener('DOMContentLoaded', () => {
  // Track portfolio filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        Analytics.logEvent('filter_click', {
          category: btn.getAttribute('data-filter')
        });
      });
    });
  }

  // Track contact form submissions (if any)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', () => {
      Analytics.logEvent('form_submit', {
        form_id: form.id || 'unknown_form'
      });
    });
  });
});

window.Analytics = Analytics;
