document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    function animateCounters() {
        const counterElements = document.querySelectorAll('#userCounter, #challengeCounter, #co2Counter');
        counterElements.forEach(counter => {
            const target = parseInt(counter.textContent, 10);
            const duration = 2000;
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;
            
            const startValue = 0;
            const valueIncrement = Math.ceil(target / totalFrames);
            
            const counterAnimation = setInterval(() => {
                frame++;
                const currentValue = Math.min(startValue + (valueIncrement * frame), target);
                counter.textContent = currentValue.toLocaleString();
                
                if (currentValue >= target) {
                    clearInterval(counterAnimation);
                }
            }, frameDuration);
        });
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            const consent = document.getElementById('newsletterConsent').checked;
            const messageContainer = document.getElementById('newsletterMessage');
            
            if (!email || !consent) {
                messageContainer.innerHTML = '<div class="alert alert-danger">Please fill in all required fields.</div>';
                return;
            }
            
            setTimeout(() => {
                messageContainer.innerHTML = '<div class="alert alert-success">Thank you for subscribing! Please check your email to confirm your subscription.</div>';
                newsletterForm.reset();
            }, 1000);
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                window.location.href = 'pages/profile.html';
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const passwordInput = document.getElementById('signupPassword');
        const passwordFeedback = document.getElementById('passwordFeedback');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                let strength = 0;
                let feedback = '';
                
                if (password.length > 7) strength += 1;
                if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
                if (password.match(/\d/)) strength += 1;
                if (password.match(/[^a-zA-Z\d]/)) strength += 1;
                
                switch (strength) {
                    case 0:
                    case 1:
                        feedback = '<span class="text-danger">Weak password</span>';
                        break;
                    case 2:
                        feedback = '<span class="text-warning">Moderate password</span>';
                        break;
                    case 3:
                        feedback = '<span class="text-primary">Good password</span>';
                        break;
                    case 4:
                        feedback = '<span class="text-success">Strong password</span>';
                        break;
                }
                
                passwordFeedback.innerHTML = feedback;
            });
        }
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const termsAgreement = document.getElementById('termsAgreement').checked;
            
            if (!email || !password || !confirmPassword || !firstName || !lastName || !termsAgreement) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            window.location.href = 'pages/profile.html';
        });
    }

    const statsCounter = document.querySelector('.stats-counter');
    if (statsCounter) {
        let animated = false;
        
        function checkCounters() {
            if (!animated && isInViewport(statsCounter)) {
                animateCounters();
                animated = true;
                window.removeEventListener('scroll', checkCounters);
            }
        }
        
        window.addEventListener('scroll', checkCounters);
        checkCounters();
    }
});