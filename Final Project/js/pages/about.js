document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {

            setTimeout(() => {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            const consent = document.getElementById('contactConsent').checked;
            
            if (!name || !email || !subject || !message || !consent) {
                alert('Please fill in all required fields');
                return;
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            setTimeout(() => {

                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.innerHTML = `
                    <h5 class="alert-heading">Message Sent!</h5>
                    <p>Thank you for reaching out, ${name}. We'll respond to your inquiry within 24-48 hours.</p>
                `;
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    const impactStats = document.querySelectorAll('.impact-item .h2');
    if (impactStats.length > 0) {

        const originalValues = Array.from(impactStats).map(stat => {
            const value = stat.textContent;
            stat.textContent = '0';
            return value;
        });
        
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
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
        
        function checkStats() {
            if (isInViewport(impactStats[0])) {
                animateCounters();
                window.removeEventListener('scroll', checkStats);
            }
        }
        
        window.addEventListener('scroll', checkStats);
        
        checkStats();
    }
});