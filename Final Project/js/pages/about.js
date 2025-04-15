document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Check for hash in URL to scroll to section on page load
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            // Small delay to ensure all elements are loaded
            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            const consent = document.getElementById('contactConsent').checked;
            
            if (!name || !email || !subject || !message || !consent) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            setTimeout(() => {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = `
                    <h5 class="alert-heading">Message Sent!</h5>
                    <p>Thank you for reaching out, ${name}. We'll respond to your inquiry within 24-48 hours.</p>
                `;
                
                // Insert success message and reset form
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Animate impact statistics on scroll
    const impactStats = document.querySelectorAll('.impact-item .h2');
    if (impactStats.length > 0) {
        // Store original values
        const originalValues = Array.from(impactStats).map(stat => {
            const value = stat.textContent;
            stat.textContent = '0';
            return value;
        });
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to animate the counters
        function animateCounters() {
            impactStats.forEach((stat, index) => {
                const target = parseFloat(originalValues[index].replace(/[^\d.-]/g, ''));
                const suffix = originalValues[index].replace(/[\d.-]/g, '');
                const duration = 2000;
                const frameDuration = 1000 / 60;
                const totalFrames = Math.round(duration / frameDuration);
                let frame = 0;
                
                const animateCounter = () => {
                    frame++;
                    const progress = frame / totalFrames;
                    const currentValue = progress < 1 
                        ? Math.floor(progress * target) 
                        : target;
                    
                    stat.textContent = currentValue + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateCounter);
                    }
                };
                
                requestAnimationFrame(animateCounter);
            });
        }
        
        // Check if stats are in viewport
        function checkStats() {
            if (isInViewport(impactStats[0])) {
                animateCounters();
                window.removeEventListener('scroll', checkStats);
            }
        }
        
        // Add scroll listener
        window.addEventListener('scroll', checkStats);
        
        // Check on page load
        checkStats();
    }
});