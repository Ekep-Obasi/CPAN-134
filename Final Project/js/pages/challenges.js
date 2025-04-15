document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Filter toggle functionality
    const allCategoryCheckbox = document.getElementById('categoryAll');
    const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="category"]:not(#categoryAll)');
    
    const allDifficultyCheckbox = document.getElementById('difficultyAll');
    const difficultyCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="difficulty"]:not(#difficultyAll)');
    
    const allDurationCheckbox = document.getElementById('durationAll');
    const durationCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="duration"]:not(#durationAll)');
    
    // Category filtering
    if (allCategoryCheckbox) {
        allCategoryCheckbox.addEventListener('change', function() {
            categoryCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = this.checked;
            });
        });
        
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const anyChecked = Array.from(categoryCheckboxes).some(cb => cb.checked);
                allCategoryCheckbox.checked = !anyChecked;
            });
        });
    }
    
    // Difficulty filtering
    if (allDifficultyCheckbox) {
        allDifficultyCheckbox.addEventListener('change', function() {
            difficultyCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = this.checked;
            });
        });
        
        difficultyCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const anyChecked = Array.from(difficultyCheckboxes).some(cb => cb.checked);
                allDifficultyCheckbox.checked = !anyChecked;
            });
        });
    }
    
    // Duration filtering
    if (allDurationCheckbox) {
        allDurationCheckbox.addEventListener('change', function() {
            durationCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.disabled = this.checked;
            });
        });
        
        durationCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const anyChecked = Array.from(durationCheckboxes).some(cb => cb.checked);
                allDurationCheckbox.checked = !anyChecked;
            });
        });
    }
    
    // Challenge search functionality
    const searchInput = document.getElementById('challengeSearch');
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            
            challengeCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const description = card.querySelector('.card-text').textContent.toLowerCase();
                const cardParent = card.closest('.col-md-6');
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    cardParent.style.display = '';
                } else {
                    cardParent.style.display = 'none';
                }
            });
        });
    }
    
    // Challenge detail modal dynamic content
    const challengeDetailModal = document.getElementById('challengeDetailModal');
    if (challengeDetailModal) {
        challengeDetailModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const card = button.closest('.challenge-card');
            
            // Get challenge details from the clicked card
            const title = card.querySelector('.card-title').textContent;
            const description = card.querySelector('.card-text').textContent;
            const image = card.querySelector('.card-img-top').src;
            const category = card.querySelector('.category-badge').textContent;
            const difficulty = card.querySelector('.difficulty .small').textContent;
            const duration = card.querySelector('.duration .small').textContent;
            const participants = card.querySelector('.participants .small').textContent;
            const impact = card.querySelector('.impact .small').textContent;
            
            // Set modal content
            const modal = this;
            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.challenge-detail-img').src = image;
            
            // Set category badge color
            const categoryBadge = modal.querySelector('.badge');
            categoryBadge.textContent = category;
            categoryBadge.className = 'badge';
            
            // Add appropriate class based on category
            switch (category.toLowerCase()) {
                case 'food':
                    categoryBadge.classList.add('bg-primary');
                    break;
                case 'transport':
                    categoryBadge.classList.add('bg-warning', 'text-dark');
                    break;
                case 'energy':
                    categoryBadge.classList.add('bg-warning', 'text-dark');
                    break;
                case 'waste':
                    categoryBadge.classList.add('bg-danger');
                    break;
                case 'water':
                    categoryBadge.classList.add('bg-info', 'text-dark');
                    break;
                default:
                    categoryBadge.classList.add('bg-success');
            }
            
            // Set other challenge metadata
            const metaItems = modal.querySelectorAll('.challenge-meta div');
            metaItems[1].querySelector('span').textContent = difficulty;
            metaItems[2].querySelector('span').textContent = duration;
            metaItems[3].querySelector('span').textContent = participants;
            metaItems[4].querySelector('span').textContent = impact;
        });
    }
    
    // Create challenge form validation
    const createChallengeForm = document.getElementById('createChallengeForm');
    if (createChallengeForm) {
        createChallengeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation is handled by validation.js
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating...';
            
            setTimeout(() => {
                // Show success message
                const modal = bootstrap.Modal.getInstance(document.getElementById('createChallengeModal'));
                modal.hide();
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Reset form
                this.reset();
                
                // Show success alert
                const alertHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> Your challenge has been created and is pending approval.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                document.querySelector('.categories-section .container').insertAdjacentHTML('afterbegin', alertHTML);
            }, 2000);
        });
    }
});