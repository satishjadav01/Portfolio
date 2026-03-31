// Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initScrollAnimations();
    initFormValidation();
    initActiveNavLinks();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamMenu = document.querySelector('.ham-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamMenu && navLinks) {
        hamMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamMenu.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu on nav link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamMenu.innerHTML = '☰';
            });
        });
    }
}

// Smooth Scroll with offset for fixed header
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// Professional scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe sections and major elements
    document.querySelectorAll('section, .project-card, .skill-item, .contact-item, .experience-item').forEach(el => {
        observer.observe(el);
    });
}

// Active navigation links based on scroll position
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Form validation and submission
function initFormValidation() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Thank you for your message. I will get back to you soon.', 'success');

        // Reset form
        form.reset();
    });

    // Real-time validation
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const isValid = value.length > 0;

    field.style.borderColor = isValid ? 'var(--primary)' : 'var(--danger)';
    if (isValid) {
        field.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
    } else {
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    });

    if (type === 'success') {
        notification.style.backgroundColor = 'var(--success)';
    } else {
        notification.style.backgroundColor = '#ef4444';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS for danger color if not defined
const style = document.createElement('style');
style.textContent = `
    :root {
        --danger: #ef4444;
    }
`;
document.head.appendChild(style);

