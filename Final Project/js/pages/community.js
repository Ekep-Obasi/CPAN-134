document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Group sharing option toggle
    const shareOptions = document.querySelectorAll('input[name="shareOption"]');
    const groupSelection = document.getElementById('groupSelection');
    
    if (shareOptions && groupSelection) {
        shareOptions.forEach(option => {
            option.addEventListener('change', function() {
                if (this.value === 'groups' && this.checked) {
                    groupSelection.classList.remove('d-none');
                } else {
                    groupSelection.classList.add('d-none');
                }
            });
        });
    }
    
    // Post submission handling
    const newPostModal = document.getElementById('newPostModal');
    if (newPostModal) {
        const postButton = newPostModal.querySelector('.btn-success');
        const postContent = document.getElementById('modalPostContent');
        
        postButton.addEventListener('click', function() {
            if (!postContent.value.trim()) {
                postContent.classList.add('is-invalid');
                return;
            }
            
            // Simulate post submission
            const modal = bootstrap.Modal.getInstance(newPostModal);
            
            // Show loading state
            postButton.disabled = true;
            postButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Posting...';
            
            setTimeout(() => {
                // Hide modal and reset
                modal.hide();
                postContent.value = '';
                postButton.disabled = false;
                postButton.textContent = 'Post';
                
                // Show success alert
                const alertHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> Your post has been published to the community feed.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                document.querySelector('.posts-container').insertAdjacentHTML('beforebegin', alertHTML);
                
                // Add the new post to the feed (for demonstration)
                const newPostHTML = `
                    <div class="card border-0 shadow-sm mb-4 post-card">
                        <div class="card-body">
                            <div class="d-flex mb-3">
                                <img src="../assets/images/user-avatar.jpg" alt="Alex Johnson" class="rounded-circle avatar-sm me-3">
                                <div>
                                    <h4 class="h6 mb-1">Alex Johnson</h4>
                                    <p class="text-muted small mb-0">Posted just now</p>
                                </div>
                            </div>
                            <div class="post-content mb-3">
                                <p>${postContent.value}</p>
                            </div>
                            <div class="post-actions d-flex justify-content-between border-top border-bottom py-2 mb-3">
                                <button class="btn btn-sm btn-link text-decoration-none">
                                    <i class="far fa-heart me-1"></i> Like (0)
                                </button>
                                <button class="btn btn-sm btn-link text-decoration-none">
                                    <i class="far fa-comment me-1"></i> Comment (0)
                                </button>
                                <button class="btn btn-sm btn-link text-decoration-none">
                                    <i class="far fa-share-square me-1"></i> Share
                                </button>
                            </div>
                            <div class="add-comment d-flex">
                                <img src="../assets/images/user-avatar.jpg" alt="Alex Johnson" class="rounded-circle avatar-xs me-2">
                                <div class="flex-grow-1">
                                    <input type="text" class="form-control form-control-sm" placeholder="Add a comment...">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add the new post to the top of the feed
                document.querySelector('.posts-container').insertAdjacentHTML('afterbegin', newPostHTML);
            }, 1500);
        });
    }
    
    // Like post functionality
    const likeButtons = document.querySelectorAll('.post-actions .btn-link:first-child');
    if (likeButtons) {
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const likeText = this.textContent.trim();
                const liked = this.classList.contains('text-primary');
                
                if (liked) {
                    // Unlike
                    this.classList.remove('text-primary');
                    this.innerHTML = `<i class="far fa-heart me-1"></i> ${likeText.replace('Liked', 'Like')}`;
                } else {
                    // Like
                    this.classList.add('text-primary');
                    this.innerHTML = `<i class="fas fa-heart me-1"></i> ${likeText.replace('Like', 'Liked')}`;
                }
            });
        });
    }
    
    // Comment submission
    const commentInputs = document.querySelectorAll('.add-comment input');
    if (commentInputs) {
        commentInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim()) {
                    e.preventDefault();
                    
                    const commentText = this.value;
                    const commentsContainer = this.closest('.card-body').querySelector('.post-comments');
                    
                    // Create new comment HTML
                    const newCommentHTML = `
                        <div class="d-flex mb-3">
                            <img src="../assets/images/user-avatar.jpg" alt="Alex Johnson" class="rounded-circle avatar-xs me-2">
                            <div class="comment-bubble">
                                <div class="d-flex justify-content-between">
                                    <h5 class="h6 mb-1">Alex Johnson</h5>
                                    <span class="text-muted small">Just now</span>
                                </div>
                                <p class="mb-0">${commentText}</p>
                            </div>
                        </div>
                    `;
                    
                    // Ensure comments container exists, if not create it
                    if (!commentsContainer) {
                        const newCommentsContainer = document.createElement('div');
                        newCommentsContainer.className = 'post-comments mb-2';
                        this.closest('.add-comment').insertAdjacentElement('beforebegin', newCommentsContainer);
                        newCommentsContainer.innerHTML = newCommentHTML;
                    } else {
                        commentsContainer.insertAdjacentHTML('beforeend', newCommentHTML);
                    }
                    
                    // Clear input
                    this.value = '';
                    
                    // Update comment count
                    const commentButton = this.closest('.card-body').querySelector('.post-actions .btn-link:nth-child(2)');
                    const currentCount = parseInt(commentButton.textContent.match(/\d+/)[0]);
                    commentButton.innerHTML = `<i class="far fa-comment me-1"></i> Comment (${currentCount + 1})`;
                }
            });
        });
    }
    
    // Handle story submission
    const shareStoryModal = document.getElementById('shareStoryModal');
    if (shareStoryModal) {
        const submitButton = shareStoryModal.querySelector('.btn-success');
        const storyForm = document.getElementById('storyForm');
        
        submitButton.addEventListener('click', function() {
            // Basic validation
            const title = document.getElementById('storyTitle').value;
            const category = document.getElementById('storyCategory').value;
            const content = document.getElementById('storyContent').value;
            
            if (!title || !category || !content) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate submission
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...';
            
            setTimeout(() => {
                // Hide modal and reset
                const modal = bootstrap.Modal.getInstance(shareStoryModal);
                modal.hide();
                storyForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Story';
                
                // Show success alert
                const alertHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Thank you!</strong> Your story has been submitted for review and will be published soon.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                document.querySelector('#stories .card-body').insertAdjacentHTML('afterbegin', alertHTML);
            }, 1500);
        });
    }
    
    // Maintain active tab after page reload
    const url = new URL(window.location.href);
    const hash = url.hash;
    
    if (hash && document.querySelector(`a[href="${hash}"]`)) {
        const tabTrigger = document.querySelector(`a[href="${hash}"]`);
        const tab = new bootstrap.Tab(tabTrigger);
        tab.show();
    }
});