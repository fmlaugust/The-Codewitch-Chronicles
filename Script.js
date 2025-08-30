// ===== CODEWITCH CHRONICLES JAVASCRIPT ===== 

// === FLOATING STARS ANIMATION ===
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const numStars = 75; // More stars for extra magic
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random positioning
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random sizes (1-4px)
        const size = Math.random() * 3 + 1;
        star.style.width = star.style.height = size + 'px';
        
        // Random animation delay for natural twinkling
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// === SMOOTH SCROLLING NAVIGATION ===
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this.getAttribute('href'));
            }
        });
    });
}

// === ACTIVE NAVIGATION UPDATES ===
function updateActiveNavLink(targetHref) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`a[href="${targetHref}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// === SCROLL SPY FOR NAVIGATION ===
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// === MAGICAL HOVER EFFECTS FOR SPELL CARDS ===
function initSpellCardEffects() {
    document.querySelectorAll('.spell-card').forEach(card => {
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(199, 125, 255, 0.2)';
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(157, 78, 221, 0.15)';
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Mouse tracking for magical glow effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// === CRYSTAL BALL INTERACTIONS ===
function initCrystalBall() {
    const crystalBall = document.querySelector('.crystal-ball');
    if (!crystalBall) return;
    
    crystalBall.addEventListener('click', function() {
        // Add sparkle effect on click
        this.style.animation = 'float 6s ease-in-out infinite, sparkle-burst 0.6s ease-out';
        
        // Reset animation after burst
        setTimeout(() => {
            this.style.animation = 'float 6s ease-in-out infinite';
        }, 600);
        
        // Create temporary sparkles around the ball
        createSparkles(this);
    });
}

// === SPARKLE EFFECT ===
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + rect.width / 2) + 'px';
        sparkle.style.top = (rect.top + rect.height / 2) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.fontSize = '1.2rem';
        sparkle.style.color = '#c77dff';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle outward
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 80;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        sparkle.animate([
            { 
                transform: 'translate(0, 0) scale(0)',
                opacity: 1
            },
            { 
                transform: `translate(${endX}px, ${endY}px) scale(1)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        });
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

// === FADE-IN ANIMATION ON SCROLL ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for fade-in effect
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe spell cards for staggered animation
    document.querySelectorAll('.spell-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// === MOBILE MENU TOGGLE ===
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggle && navMenu) {
        toggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
        
        // Close menu when clicking nav links on mobile
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                toggle.classList.remove('active');
            });
        });
    }
}

// === TYPING EFFECT FOR HERO SUBTITLE ===
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid #c77dff';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
}

// === SPELL BUTTON INTERACTIONS ===
function initSpellButtons() {
    document.querySelectorAll('.spell-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// === PARALLAX EFFECT FOR BACKGROUND ===
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.crystal-ball, .section-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });
}

// === LOAD SCREEN EFFECT ===
function initLoadScreen() {
    window.addEventListener('load', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.animation = 'fadeInMagical 1.5s ease-out forwards';
        }
    });
}

// === ADD DYNAMIC CSS ANIMATIONS ===
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes sparkle-burst {
            0% { 
                box-shadow: 0 0 10px #9d4edd;
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 30px #c77dff, 0 0 60px #9d4edd;
                transform: scale(1.1);
            }
            100% { 
                box-shadow: 0 0 10px #9d4edd;
                transform: scale(1);
            }
        }
        
        @keyframes fadeInMagical {
            0% {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(26, 13, 38, 0.98);
                flex-direction: column;
                padding: 2rem;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                border-bottom: 2px solid #9d4edd;
            }
            
            .nav-menu.active {
                transform: translateY(0);
            }
            
            .mobile-menu-toggle {
                display: flex !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// === SECTION REVEAL ANIMATIONS ===
function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                
                // Animate spell cards within the section
                const cards = entry.target.querySelectorAll('.spell-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Set initial state for cards
        const cards = section.querySelectorAll('.spell-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    });
}

// === MAGICAL CURSOR TRAIL ===
function initCursorTrail() {
    let cursorTrail = [];
    const trailLength = 10;
    
    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = '#c77dff';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9998';
        trail.style.opacity = (trailLength - i) / trailLength * 0.5;
        trail.style.transition = 'all 0.1s ease';
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }
    
    // Update trail position
    document.addEventListener('mousemove', (e) => {
        cursorTrail.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = e.clientX + 'px';
                trail.style.top = e.clientY + 'px';
            }, index * 20);
        });
    });
}

// === EASTER EGG: KONAMI CODE ===
function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateSecretMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateSecretMode() {
    // Add rainbow effects to the entire page
    document.body.style.filter = 'hue-rotate(0deg)';
    
    let hue = 0;
    const rainbowInterval = setInterval(() => {
        hue += 2;
        document.body.style.filter = `hue-rotate(${hue}deg)`;
        
        if (hue >= 360) {
            clearInterval(rainbowInterval);
            document.body.style.filter = 'none';
        }
    }, 50);
    
    // Show secret message
    const secretMsg = document.createElement('div');
    secretMsg.innerHTML = '🌈 SECRET WITCH MODE ACTIVATED! 🪄';
    secretMsg.style.position = 'fixed';
    secretMsg.style.top = '50%';
    secretMsg.style.left = '50%';
    secretMsg.style.transform = 'translate(-50%, -50%)';
    secretMsg.style.background = 'rgba(0, 0, 0, 0.8)';
    secretMsg.style.color = '#c77dff';
    secretMsg.style.padding = '2rem';
    secretMsg.style.borderRadius = '15px';
    secretMsg.style.fontSize = '1.5rem';
    secretMsg.style.zIndex = '10000';
    secretMsg.style.textAlign = 'center';
    secretMsg.style.border = '2px solid #9d4edd';
    
    document.body.appendChild(secretMsg);
    
    setTimeout(() => {
        secretMsg.remove();
    }, 3000);
}

// === HEADER BACKGROUND EFFECT ON SCROLL ===
function initHeaderEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 100, 0.98);
        
        header.style.background = `rgba(26, 13, 38, ${opacity})`;
        
        if (scrolled > 50) {
            header.style.boxShadow = '0 5px 20px rgba(157, 78, 221, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// === TIMELINE ANIMATIONS ===
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Animate the dot
                const dot = entry.target.querySelector('.timeline-dot');
                if (dot) {
                    dot.style.animation = 'pulse-glow 1s ease-out';
                }
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        // Set initial transform based on position
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        timelineObserver.observe(item);
    });
    
    // Add pulse-glow animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-glow {
            0% { 
                box-shadow: 0 0 10px #9d4edd;
                transform: translateX(-50%) scale(1);
            }
            50% { 
                box-shadow: 0 0 25px #c77dff;
                transform: translateX(-50%) scale(1.3);
            }
            100% { 
                box-shadow: 0 0 10px #9d4edd;
                transform: translateX(-50%) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// === INITIALIZE EVERYTHING ===
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    createStars();
    initSmoothScrolling();
    initScrollSpy();
    addDynamicStyles();
    
    // Interactive effects
    initSpellCardEffects();
    initCrystalBall();
    initMobileMenu();
    
    // Animations
    initScrollAnimations();
    initSectionAnimations();
    initTimelineAnimations();
    initHeaderEffects();
    
    // Special effects
    initTypingEffect();
    initCursorTrail();
    initKonamiCode();
    
    console.log('🔮 CodeWitch Chronicles initialized! Magic is in the air... ✨');
});

// === UTILITY FUNCTIONS ===

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Random number generator
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
