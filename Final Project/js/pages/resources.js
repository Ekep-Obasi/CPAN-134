document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const hashValue = window.location.hash;
    if (hashValue) {
        const triggerEl = document.querySelector(`button[data-bs-target="${hashValue}"]`);
        if (triggerEl) {
            const tab = new bootstrap.Tab(triggerEl);
            tab.show();
        }
    }

    const articleCategoryButtons = document.querySelectorAll('.article-categories .btn');
    if (articleCategoryButtons) {
        articleCategoryButtons.forEach(button => {
            button.addEventListener('click', function() {

                articleCategoryButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');
                
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

    const videoCategoryButtons = document.querySelectorAll('.video-categories .btn');
    if (videoCategoryButtons) {
        videoCategoryButtons.forEach(button => {
            button.addEventListener('click', function() {

                videoCategoryButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');
                
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

    const guideCategoryButtons = document.querySelectorAll('.guide-categories .btn');
    if (guideCategoryButtons) {
        guideCategoryButtons.forEach(button => {
            button.addEventListener('click', function() {

                guideCategoryButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');
                
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

    const researchCategoryButtons = document.querySelectorAll('.research-categories .btn');
    if (researchCategoryButtons) {
        researchCategoryButtons.forEach(button => {
            button.addEventListener('click', function() {

                researchCategoryButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');
               
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

   const searchInput = document.querySelector('.search-box input');
   if (searchInput) {
       searchInput.addEventListener('keyup', function(e) {
           if (e.key === 'Enter') {
               e.preventDefault();
               
               const searchTerm = this.value.trim();
               if (searchTerm) {

                    alert(`Searching for: "${searchTerm}"`);
                   
                   this.value = '';
               }
           }
       });
   }

   const videoThumbnails = document.querySelectorAll('.video-thumbnail, .video-thumbnail-large');
   if (videoThumbnails) {
       videoThumbnails.forEach(thumbnail => {
           thumbnail.addEventListener('click', function() {
               const title = this.closest('.card').querySelector('.card-title').textContent;
               alert(`Playing video: "${title}"`);
           });
       });
   }

   const newsletterForm = document.querySelector('.newsletter-form');
   if (newsletterForm) {
       newsletterForm.addEventListener('submit', function(e) {
           e.preventDefault();
           
           const emailInput = this.querySelector('input[type="email"]');
           const email = emailInput.value.trim();
           
           if (email) {
               emailInput.disabled = true;
               this.querySelector('button[type="submit"]').innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Subscribing...';
               
               setTimeout(() => {
                   const alertHTML = `
                       <div class="alert alert-success mt-3" role="alert">
                           <i class="fas fa-check-circle me-2"></i> Thanks for subscribing! We've sent a confirmation email to ${email}.
                       </div>
                   `;
                   this.insertAdjacentHTML('beforeend', alertHTML);
                   
                   this.reset();
                   emailInput.disabled = false;
                   this.querySelector('button[type="submit"]').textContent = 'Subscribe';
               }, 1500);
           }
       });
   }

   const loadMoreButtons = document.querySelectorAll('.btn-outline-primary:contains("Load More")');
   if (loadMoreButtons.length > 0) {
       loadMoreButtons.forEach(button => {
           button.addEventListener('click', function() {
               this.disabled = true;
               this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
               
               setTimeout(() => {
                   this.innerHTML = 'Load More';
                   this.disabled = false;
                   
                   alert('In a real application, this would load more content.');
               }, 1500);
           });
       });
   }
});