// ===== ORYKAS Product Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== Gallery Functionality =====
  const gallerySlider = document.getElementById('gallerySlider');
  const slides = document.querySelectorAll('.gallery-slide');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');
  let currentSlide = 0;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
  }

  prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => showSlide(index));
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  gallerySlider?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  gallerySlider?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showSlide(currentSlide + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      showSlide(currentSlide - 1);
    }
  }

  // ===== Read More Toggle =====
  const toggleLink = document.getElementById('toggleLink');
  const moreText = document.getElementById('moreText');

  toggleLink?.addEventListener('click', () => {
    moreText.classList.toggle('show');
    toggleLink.textContent = moreText.classList.contains('show') ? 'Show less' : 'Read more';
  });

  // ===== Size Selector =====
  const sizeOptions = document.getElementById('sizeOptions');
  const selectedSize = document.getElementById('selectedSize');
  const sizeBtns = document.querySelectorAll('.size-btn');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize.textContent = btn.dataset.size;
    });
  });

  // ===== Color Selector =====
  const colorBtns = document.querySelectorAll('.color-btn');
  const selectedColor = document.getElementById('selectedColor');

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedColor.textContent = btn.dataset.color;
    });
  });

  // ===== Quantity Selector =====
  const quantityInput = document.getElementById('quantity');
  const minusBtn = document.querySelector('.qty-btn.minus');
  const plusBtn = document.querySelector('.qty-btn.plus');

  minusBtn?.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value) || 1;
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  plusBtn?.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value) || 1;
    quantityInput.value = currentValue + 1;
  });

  quantityInput?.addEventListener('change', () => {
    if (parseInt(quantityInput.value) < 1 || isNaN(parseInt(quantityInput.value))) {
      quantityInput.value = 1;
    }
  });

  // ===== FOMO Counter =====
  const viewerCount = document.getElementById('viewerCount');
  const minViewers = 23;
  const maxViewers = 96;

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateViewerCount() {
    const newCount = getRandomInt(minViewers, maxViewers);
    viewerCount.textContent = newCount;
    viewerCount.style.transform = 'scale(1.1)';
    setTimeout(() => {
      viewerCount.style.transform = 'scale(1)';
    }, 200);
  }

  // Update viewer count periodically
  setInterval(updateViewerCount, getRandomInt(5000, 12000));

  // ===== FAQ Accordion =====
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
          otherItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

  // ===== Video Testimonials Hover Play =====
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  testimonialCards.forEach(card => {
    const video = card.querySelector('video');
    
    card.addEventListener('mouseenter', () => {
      video?.play();
    });
    
    card.addEventListener('mouseleave', () => {
      video?.pause();
      if (video) video.currentTime = 0;
    });

    // Touch support for mobile
    card.addEventListener('touchstart', () => {
      if (video?.paused) {
        video.play();
      } else {
        video?.pause();
      }
    }, { passive: true });
  });

  // ===== Add to Cart Animation =====
  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const cartCount = document.querySelector('.cart-count');
  let cartItems = 0;

  addToCartBtn?.addEventListener('click', () => {
    const quantity = parseInt(quantityInput?.value) || 1;
    cartItems += quantity;
    cartCount.textContent = cartItems;
    
    // Button animation
    addToCartBtn.textContent = 'Added!';
    addToCartBtn.style.background = '#28a745';
    
    setTimeout(() => {
      addToCartBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        Add to cart
      `;
      addToCartBtn.style.background = '';
    }, 2000);
  });

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== Intersection Observer for Animations =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // ===== Header Scroll Effect =====
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
  }, { passive: true });

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  menuToggle?.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
  });

  // ===== Preload Critical Images =====
  const criticalImages = [
    'https://orykas.com/cdn/shop/files/BOXER-ULTRA-ABSORBANT.jpg?v=1770039699&width=800'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  console.log('ORYKAS page loaded successfully!');
});
