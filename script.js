/* ============================================
   FUNDACIÓN VIDA CON DIOS — Enhanced Interactivity v2
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. SCROLL PROGRESS BAR
  // ============================================
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ============================================
  // 2. CURSOR GLOW FOLLOWER
  // ============================================
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) {
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
    }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ============================================
  // 3. NAVBAR SCROLL
  // ============================================
  const navbar = document.getElementById('navbar');
  function handleNavScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ============================================
  // 4. MOBILE NAV TOGGLE
  // ============================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ============================================
  // 5. SCROLL REVEAL (enhanced with stagger)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(el =>
            el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right')
          );
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // 6. ANIMATED COUNTERS
  // ============================================
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) statsObserver.observe(statsSection);

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.target);
      const duration = 2200;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        stat.textContent = Math.round(eased * target) + '+';
        if (progress < 1) requestAnimationFrame(updateCounter);
      }
      requestAnimationFrame(updateCounter);
    });
  }

  // ============================================
  // 7. HERO PARTICLES (more particles)
  // ============================================
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 35; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
      particle.style.animationDelay = `${Math.random() * 12}s`;
      particlesContainer.appendChild(particle);
    }
  }

  // ============================================
  // 8. GALLERY LIGHTBOX
  // ============================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // ============================================
  // 9. SCROLL-TO-TOP
  // ============================================
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) scrollTopBtn.classList.add('visible');
    else scrollTopBtn.classList.remove('visible');
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // 10. SMOOTH ANCHOR SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // 11. TILT EFFECT ON CARDS (3D hovering)
  // ============================================
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });

  // ============================================
  // 12. PARALLAX ON HERO BG
  // ============================================
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.4}px) scale(1.05)`;
    }
  }, { passive: true });

  // ============================================
  // 13. ACTIVE NAV HIGHLIGHT
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach(link => {
          link.style.opacity = link.getAttribute('href') === `#${id}` ? '1' : '0.65';
        });
      }
    });
  }, { passive: true });

  // ============================================
  // 14. MAGNETIC BUTTONS (subtle pull effect)
  // ============================================
  document.querySelectorAll('.btn-glow').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ============================================
  // 15. WHATSAPP TOOLTIP AUTO-SHOW
  // ============================================
  const waTooltip = document.querySelector('.wa-tooltip');
  if (waTooltip) {
    setTimeout(() => {
      waTooltip.style.opacity = '1';
      waTooltip.style.transform = 'translateY(0)';
      setTimeout(() => {
        waTooltip.style.opacity = '0';
        waTooltip.style.transform = 'translateY(10px)';
      }, 4000);
    }, 3000);
  }

  // ============================================
  // 16. TEXT SCRAMBLE EFFECT ON STAT NUMBERS HOVER
  // ============================================
  document.querySelectorAll('.stat-item').forEach(item => {
    const numEl = item.querySelector('.stat-number');
    if (!numEl) return;
    const original = numEl.textContent;

    item.addEventListener('mouseenter', () => {
      const target = parseInt(numEl.dataset.target) || parseInt(original);
      let iterations = 0;
      const interval = setInterval(() => {
        numEl.textContent = Math.floor(Math.random() * target * 1.5) + '+';
        iterations++;
        if (iterations > 8) {
          clearInterval(interval);
          numEl.textContent = target + '+';
        }
      }, 50);
    });
  });

});
