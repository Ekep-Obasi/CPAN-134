document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Impact chart initialization
    const impactChartCtx = document.getElementById('impactChart');
    if (impactChartCtx) {
        const impactChart = new Chart(impactChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Transportation', 'Energy Use', 'Food Choices', 'Waste Reduction'],
                datasets: [{
                    data: [1.4, 0.9, 0.8, 0.6],
                    backgroundColor: [
                        '#0d6efd',  // Primary
                        '#20c997',  // Success
                        '#ffc107',  // Warning
                        '#dc3545'   // Danger
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value * 100) / total) + '%';
                                return `${label}: ${value} tons CO₂e (${percentage})`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Tab navigation from URL hash
    const url = new URL(window.location.href);
    const hash = url.hash;
    
    if (hash && document.querySelector(`a[href="${hash}"]`)) {
        const tabTrigger = document.querySelector(`a[href="${hash}"]`);
        const tab = new bootstrap.Tab(tabTrigger);
        tab.show();
    }
    
    // Account settings form submission
    const accountSettingsForm = document.getElementById('accountSettingsForm');
    if (accountSettingsForm) {
        accountSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate saving changes
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';
            
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Account settings updated successfully!';
                
                this.appendChild(successMessage);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        });
    }
    
    // Password change form submission
    const passwordChangeForm = document.getElementById('passwordChangeForm');
    if (passwordChangeForm) {
        passwordChangeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Basic validation
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Please fill in all password fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match');
                return;
            }
            
            // Simulate password change
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Updating...';
            
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Password updated successfully!';
                
                this.appendChild(successMessage);
                
                // Reset form and button
                this.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        });
    }
    
    // Notification settings form submission
    const notificationSettingsForm = document.getElementById('notificationSettingsForm');
    if (notificationSettingsForm) {
        notificationSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate saving preferences
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Saving...';
            
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Notification preferences saved successfully!';
                
                this.appendChild(successMessage);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        });
    }
    
    // Copy profile link functionality
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            const linkInput = this.previousElementSibling;
            linkInput.select();
            document.execCommand('copy');
            
            // Show copied tooltip
            const originalTitle = this.getAttribute('data-bs-original-title');
            const tooltip = bootstrap.Tooltip.getInstance(this);
            
            this.setAttribute('data-bs-original-title', 'Copied!');
            tooltip.show();
            
            // Reset tooltip after 1.5 seconds
            setTimeout(() => {
                this.setAttribute('data-bs-original-title', originalTitle || '');
                tooltip.hide();
            }, 1500);
        });
    }
    
    // Delete account confirmation validation
    const deleteConfirmation = document.getElementById('deleteConfirmation');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    if (deleteConfirmation && confirmDeleteBtn) {
        deleteConfirmation.addEventListener('input', function() {
            if (this.value === 'DELETE') {
                confirmDeleteBtn.disabled = false;
            } else {
                confirmDeleteBtn.disabled = true;
            }
        });
        
        confirmDeleteBtn.addEventListener('click', function() {
            // Simulate account deletion (in a real app, this would be a more serious confirmation)
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...';
            
            setTimeout(() => {
                alert('Account deletion request received. For demonstration purposes, your account has not actually been deleted.');
                const modal = bootstrap.Modal.getInstance(document.getElementById('deleteAccountModal'));
                modal.hide();
                
                // Reset button and input
                this.textContent = 'Delete My Account';
                this.disabled = true;
                deleteConfirmation.value = '';
            }, 2000);
        });
    }
    
    // Profile photo upload preview
    const profilePhotoUpload = document.getElementById('profilePhotoUpload');
    const photoPreview = document.querySelector('.photo-preview');
    
    if (profilePhotoUpload && photoPreview) {
        profilePhotoUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    photoPreview.src = e.target.result;
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
});