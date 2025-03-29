// Intersection Observer for scroll animations
const animateOnScroll = () => {
  const sections = document.querySelectorAll('section');
  const options = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll animations
  animateOnScroll();

  // Touch event for gallery navigation
  const gallery = document.querySelector('#gallery');
  if (gallery) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    gallery.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);

    const handleSwipe = () => {
      if (touchEndX < touchStartX) {
        // Swipe left - next image
        console.log('Swiped left');
      }
      if (touchEndX > touchStartX) {
        // Swipe right - previous image
        console.log('Swiped right');
      }
    };
  }

  // Form submission handling
  const rsvpForm = document.querySelector('#rsvp form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
      
      // Simulate form submission
      setTimeout(() => {
        submitBtn.textContent = 'Thank You!';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          rsvpForm.reset();
        }, 2000);
      }, 1500);
    });
  }
});