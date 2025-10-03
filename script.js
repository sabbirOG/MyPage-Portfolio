// Hamburger menu toggle
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    const isOpen = menu.classList.contains("open");
    
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    
    // Update ARIA attributes for accessibility
    icon.setAttribute("aria-expanded", !isOpen);
    menu.setAttribute("aria-hidden", isOpen);
}

// Smooth scrolling for navigation links
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Close mobile menu when clicking nav links
function closeMobileMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.remove("open");
    icon.classList.remove("open");
    
    // Update ARIA attributes for accessibility
    icon.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
}

// Add click event listeners to all navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for desktop nav
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
        
        // Add keyboard support for navigation
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Close mobile menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('#hamburger-nav .menu-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Add loading state for external links (excluding contact section links)
    const externalLinks = document.querySelectorAll('a[href^="http"]:not(.contact-info-container a)');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading indicator
            const originalText = this.textContent;
            const originalAriaLabel = this.getAttribute('aria-label');
            this.textContent = 'Loading...';
            this.setAttribute('aria-label', 'Loading, please wait...');
            this.style.opacity = '0.7';
            
            // Reset after a short delay (simulate loading)
            setTimeout(() => {
                this.textContent = originalText;
                this.setAttribute('aria-label', originalAriaLabel);
                this.style.opacity = '1';
            }, 1000);
        });
    });

    // Add error handling for external links
    externalLinks.forEach(link => {
        link.addEventListener('error', function() {
            console.log('Failed to load external link:', this.href);
            // You could show a toast notification here
        });
    });

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add typing animation to main title
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        const titleText = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid #333';
        
        let i = 0;
        const typeWriter = () => {
            if (i < titleText.length) {
                titleElement.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                titleElement.style.borderRight = 'none';
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top-btn';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 80px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #333;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Back to top functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Add keyboard support for buttons
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add click ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add keyboard support for arrow navigation
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach(arrow => {
        arrow.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

});