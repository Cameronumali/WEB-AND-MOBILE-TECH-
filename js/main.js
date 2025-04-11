/**
 * Main JavaScript for Web and Mobile Technology Portfolio
 * Author: Cameron Umali
 * Course: Business Web and Mobile Technology
 * Semester: 1, 2025
 */

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu functionality
    initMobileMenu();
    
    // Initialize project card animations
    initProjectCards();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScroll();
});

/**
 * Initializes the mobile menu toggle functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
        });
    }
}

/**
 * Initializes animations for project cards
 */
function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    // Add intersection observer for card animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );
    
    cards.forEach(card => observer.observe(card));
}

/**
 * Initializes smooth scrolling for navigation links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Export functions for potential module usage
export { initMobileMenu, initProjectCards, initSmoothScroll };