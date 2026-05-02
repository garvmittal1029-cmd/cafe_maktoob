/* ========================================
   CAFE MAKTOOB — Premium JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Loader ──
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2000);
  });
  // Fallback if load already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader.classList.add('hidden'), 2000);
  }

  // ── Custom Cursor ──
  const cursorDot = document.getElementById('cursorDot');
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });
  }

  // ── Coffee Particles ──
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 60;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = Math.random() * -0.5 - 0.1;
      this.opacity = Math.random() * 0.3 + 0.05;
      this.hue = Math.random() * 30 + 20; // warm coffee tones
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= 0.0005;
      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
        this.y = canvas.height + 10;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 60%, 40%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ── Sticky Navbar ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ── Mobile Menu ──
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Smooth Scroll Nav ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll Reveal ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 120;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Initial check

  // ── Counter Animation ──
  const counters = document.querySelectorAll('.stat-number');
  let countersDone = false;

  function animateCounters() {
    if (countersDone) return;
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      countersDone = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        function updateCounter(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(eased * target) + '+';
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }
        requestAnimationFrame(updateCounter);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);

  // ── Parallax Scrolling ──
  function handleParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    parallaxElements.forEach(el => {
      const parent = el.parentElement;
      const rect = parent.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const scrolled = (rect.top / window.innerHeight) * 50;
        el.style.transform = `translateY(${scrolled}px)`;
      }
    });
  }

  window.addEventListener('scroll', handleParallax);

  // ── Button Ripple Effect ──
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // ── Menu Filter ──
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Testimonial Carousel ──
  const slides = document.getElementById('testimonialSlides');
  const allSlides = slides.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  let currentSlide = 0;
  const totalSlides = allSlides.length;
  let autoSlideInterval;

  // Create dots
  allSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function goToSlide(index) {
    currentSlide = index;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  startAutoSlide();

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  slides.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slides.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      nextSlide();
      resetAutoSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevSlide();
      resetAutoSlide();
    }
  }, { passive: true });

  // ── Back to Top ──
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Contact Form ──
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'SENDING...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = '✓ MESSAGE SENT';
      submitBtn.style.background = 'linear-gradient(135deg, #2e7d32, #43a047)';
      submitBtn.style.opacity = '1';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2500);
    }, 1500);
  });

  // ── Active Nav Link Highlight ──
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.style.color = 'var(--caramel)';
        } else {
          link.style.color = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // ── Tilt Effect on Menu Cards ──
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ── Magnetic Effect on Buttons ──
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ── Chatbot Widget ──
  const chatbotWidget = document.getElementById('chatbotWidget');
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotIcon = document.getElementById('chatbotIcon');

  chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('open');
    chatbotIcon.textContent = chatbotWidget.classList.contains('open') ? '✕' : '💬';
  });

  chatbotClose.addEventListener('click', () => {
    chatbotWidget.classList.remove('open');
    chatbotIcon.textContent = '💬';
  });

});
