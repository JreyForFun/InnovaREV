/**
 * InnovaREV - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('InnovaREV Website Loaded');
    
    // Initialize components
    initNavigation();
    
    // Future: initAnimations();
    // Future: initCarousel();
});

function initNavigation() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            
            // Icon toggle logic (if using different icons for open/close)
            mobileBtn.textContent = isExpanded ? '☰' : '✕';
        });
    }
}
