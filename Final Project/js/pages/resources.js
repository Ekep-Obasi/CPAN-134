document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Handle tab navigation from direct URL
    const hashValue = window.location.hash;
    if (hashValue) {
        const triggerEl = document.querySelector(`button[data-bs-target="${hashValue}"]`);
        if (triggerEl) {
            const tab = new bootstrap.Tab(triggerEl);
            tab.show();
        }
    }

    // Article category buttons
    const articleCategoryButtons = document.querySelectorAll('.article-categories .btn');
    if (articleCategoryButtons) {
        articleCategoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                articleCategoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real application, this would filter the articles
                // For the demo, we'll just show a loading indicator
                
                const articlesContainer = document.querySelector('#articles .row.g-4');
                if (articlesContainer) {
                    articlesContainer.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        articlesContainer.style.opacity = '1';
                    }, 500);
                }
            });
        });
    }

    // Video category buttons
    const videoCategoryButtons = document.querySelectorAll('.video-categories .btn');
    if (videoCategoryButtons) {
        videoCategoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                videoCategoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real application, this would filter the videos
                // For the demo, we'll just show a loading indicator
                
                const videosContainer = document.querySelector('#videos .row.g-4');
                if (videosContainer) {
                    videosContainer.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        videosContainer.style.opacity = '1';
                    }, 500);
                }
            });
        });
    }

    // Guide category buttons
    const guideCategoryButtons = document.querySelectorAll('.guide-categories .btn');
    if (guideCategoryButtons) {
        guideCategoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                guideCategoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // In a real application, this would filter the guides
                // For the demo, we'll just show a loading indicator
                
                const guidesContainer = document.querySelector('#guides .guide-list');
                if (guidesContainer) {
                    guidesContainer.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        guidesContainer.style.opacity = '1';
                    }, 500);
                }
            });
        });
    }

    // Research category buttons
    const researchCategoryButtons = document.querySelectorAll('.research-categories .btn');
    if (researchCategoryButtons) {
        researchCategoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
               researchCategoryButtons.forEach(btn => btn.classList.remove('active'));
               // Add active class to clicked button
               this.classList.add('active');
               
               // In a real application, this would filter the research papers
               // For the demo, we'll just show a loading indicator
               
               const researchContainer = document.querySelector('#research .research-list');
               if (researchContainer) {
                   researchContainer.style.opacity = '0.5';
                   
                   setTimeout(() => {
                       researchContainer.style.opacity = '1';
                   }, 500);
               }
           });
       });
   }

   // Search functionality
   const searchInput = document.querySelector('.search-box input');
   if (searchInput) {
       searchInput.addEventListener('keyup', function(e) {
           if (e.key === 'Enter') {
               e.preventDefault();
               
               const searchTerm = this.value.trim();
               if (searchTerm) {
                   // In a real application, this would perform a search
                   // For the demo, we'll just show an alert
                   alert(`Searching for: "${searchTerm}"`);
                   
                   // Clear the input
                   this.value = '';
               }
           }
       });
   }

   // Video playback simulation
   const videoThumbnails = document.querySelectorAll('.video-thumbnail, .video-thumbnail-large');
   if (videoThumbnails) {
       videoThumbnails.forEach(thumbnail => {
           thumbnail.addEventListener('click', function() {
               const title = this.closest('.card').querySelector('.card-title').textContent;
               alert(`Playing video: "${title}"`);
           });
       });
   }

   // Newsletter subscription
   const newsletterForm = document.querySelector('.newsletter-form');
   if (newsletterForm) {
       newsletterForm.addEventListener('submit', function(e) {
           e.preventDefault();
           
           const emailInput = this.querySelector('input[type="email"]');
           const email = emailInput.value.trim();
           
           if (email) {
               // Simulate API call
               emailInput.disabled = true;
               this.querySelector('button[type="submit"]').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Subscribing...';
               
               setTimeout(() => {
                   // Show success message
                   const alertHTML = `
                       <div class="alert alert-success mt-3" role="alert">
                           <i class="fas fa-check-circle me-2"></i> Thanks for subscribing! We've sent a confirmation email to ${email}.
                       </div>
                   `;
                   this.insertAdjacentHTML('beforeend', alertHTML);
                   
                   // Reset form
                   this.reset();
                   emailInput.disabled = false;
                   this.querySelector('button[type="submit"]').textContent = 'Subscribe';
               }, 1500);
           }
       });
   }

   // Load more functionality
   const loadMoreButtons = document.querySelectorAll('.btn-outline-primary:contains("Load More")');
   if (loadMoreButtons.length > 0) {
       loadMoreButtons.forEach(button => {
           button.addEventListener('click', function() {
               // Simulate loading
               this.disabled = true;
               this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
               
               setTimeout(() => {
                   this.innerHTML = 'Load More';
                   this.disabled = false;
                   
                   // In a real app, this would load more content
                   alert('In a real application, this would load more content.');
               }, 1500);
           });
       });
   }
});