// ===== ANIMATIONS JAVASCRIPT =====

// Additional animation utilities and effects

// ===== PARALLAX EFFECT =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Card hover effects
    const cards = document.querySelectorAll('.skill-card, .project-card, .certification-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== TEXT REVEAL ANIMATION =====
function initTextReveal() {
    const textElements = document.querySelectorAll('.reveal-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                const content = text.textContent;
                text.textContent = '';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < content.length) {
                        text.textContent += content.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50);
                    }
                };
                
                typeWriter();
                observer.unobserve(text);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== IMAGE LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SCROLL TRIGGERED ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animation');
                
                element.classList.add('animate', animation);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== MOUSE FOLLOW EFFECT =====
function initMouseFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===== PROGRESS BAR ANIMATION =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                const fill = progressBar.querySelector('.progress-fill');
                
                if (fill) {
                    fill.style.width = progress + '%';
                    fill.style.transition = 'width 1s ease-in-out';
                }
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== MODAL ANIMATIONS =====
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// ===== TOOLTIP ANIMATIONS =====
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
}

// ===== 3D TILT EFFECT =====
function init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===== MAGNETIC EFFECT =====
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });
}

// ===== PARTICLE TRAIL EFFECT =====
function initParticleTrail() {
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create particle trail
        if (Math.random() > 0.7) {
            createParticle(e.clientX, e.clientY);
        }
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle-trail';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);
        
        particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            particles = particles.filter(p => p !== particle);
        }, 1000);
    }
}

// ===== TEXT SCRAMBLE EFFECT =====
function initTextScramble() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    
    scrambleElements.forEach(element => {
        const originalText = element.textContent;
        element.setAttribute('data-text', originalText);
        
        let isScrambling = false;
        
        element.addEventListener('mouseenter', function() {
            if (!isScrambling) {
                isScrambling = true;
                scrambleText(this, originalText);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            isScrambling = false;
            this.textContent = originalText;
        });
    });
}

function scrambleText(element, originalText) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let iterations = 0;
    const maxIterations = 20;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        iterations += 1/3;
        
        if (iterations >= originalText.length) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, 50);
}

// ===== ENHANCED PARALLAX EFFECT =====
function initEnhancedParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== INTERACTIVE CURSOR =====
function initInteractiveCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .skill-card, .project-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===== MORPHING SHAPES =====
function initMorphingShapes() {
    const shapes = document.querySelectorAll('.morphing-shape');
    
    shapes.forEach(shape => {
        let morphing = false;
        
        shape.addEventListener('mouseenter', function() {
            if (!morphing) {
                morphing = true;
                this.style.animationDuration = '1s';
            }
        });
        
        shape.addEventListener('mouseleave', function() {
            morphing = false;
            this.style.animationDuration = '8s';
        });
    });
}

// ===== ENHANCED COUNTER ANIMATION =====
function initEnhancedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                        // Add completion effect
                        counter.style.transform = 'scale(1.2)';
                        setTimeout(() => {
                            counter.style.transform = 'scale(1)';
                        }, 200);
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== ENHANCED HOVER EFFECTS =====
function initEnhancedHoverEffects() {
    // Card hover effects with 3D
    const cards = document.querySelectorAll('.skill-card, .project-card, .certification-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            this.style.boxShadow = '';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// ===== ENHANCED TEXT REVEAL ANIMATION =====
function initEnhancedTextReveal() {
    const textElements = document.querySelectorAll('.reveal-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                const content = text.textContent;
                text.textContent = '';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < content.length) {
                        text.textContent += content.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50);
                    } else {
                        // Add completion effect
                        text.style.animation = 'glow 1s ease-in-out';
                    }
                };
                
                typeWriter();
                observer.unobserve(text);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== ENHANCED IMAGE LAZY LOADING =====
function initEnhancedLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ENHANCED SCROLL TRIGGERED ANIMATIONS =====
function initEnhancedScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animation');
                
                element.classList.add('animate', animation);
                
                // Add stagger effect for multiple elements
                const siblings = element.parentElement.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling.hasAttribute('data-animation')) {
                        setTimeout(() => {
                            sibling.classList.add('animate', sibling.getAttribute('data-animation'));
                        }, index * 100);
                    }
                });
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== ENHANCED MOUSE FOLLOW EFFECT =====
function initEnhancedMouseFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===== ENHANCED PROGRESS BAR ANIMATION =====
function initEnhancedProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                const fill = progressBar.querySelector('.progress-fill');
                
                if (fill) {
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = progress + '%';
                        fill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 200);
                }
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(progressBar => {
        observer.observe(progressBar);
    });
}

// ===== ENHANCED MODAL ANIMATIONS =====
function initEnhancedModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const trigger = document.querySelector(`[data-modal="${modal.id}"]`);
        const closeBtn = modal.querySelector('.modal-close');
        
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add entrance animation
                modal.style.animation = 'modalSlideIn 0.3s ease-out';
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Add exit animation
                modal.style.animation = 'modalSlideOut 0.3s ease-in';
            });
        }
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// ===== ENHANCED TOOLTIPS =====
function initEnhancedTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.classList.add('active');
            
            // Add entrance animation
            tooltip.style.animation = 'tooltipFadeIn 0.3s ease-out';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
    });
}

// ===== WATER WAVES FLUID CURSOR =====
function initWaterWavesCursor() {
    // Check if device supports touch (mobile/tablet)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return; // Don't initialize on touch devices
    }
    
    // Create cursor container
    const cursor = document.createElement('div');
    cursor.className = 'water-cursor';
    document.body.appendChild(cursor);
    
    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.className = 'water-cursor-dot';
    cursor.appendChild(cursorDot);
    
    const cursorRing = document.createElement('div');
    cursorRing.className = 'water-cursor-ring';
    cursor.appendChild(cursorRing);
    
    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseSpeed = 0;
    
    // Trail positions for water effects
    const trailPositions = [];
    const maxTrailLength = 10;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse speed
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        mouseSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Add to trail
        trailPositions.push({ x: mouseX, y: mouseY, time: Date.now() });
        if (trailPositions.length > maxTrailLength) {
            trailPositions.shift();
        }
        
        // Create water particles based on speed
        if (mouseSpeed > 3 && Math.random() < 0.3) {
            createWaterParticle(mouseX, mouseY);
        }
        
        // Create water ripples occasionally
        if (Math.random() < 0.1) {
            createWaterRipple(mouseX, mouseY);
        }
        
        // Create cursor trail ripples based on speed
        if (mouseSpeed > 5 && Math.random() < 0.2) {
            createCursorTrailRipple(mouseX, mouseY);
        }
    });
    
    // Mouse click event
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
        createWaterSplash(mouseX, mouseY);
        createFullscreenRipple(mouseX, mouseY, true);
        createMultipleRippleRings(mouseX, mouseY, true);
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .skill-card, .project-card, .nav-link, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Animation loop
    function animateCursor() {
        // Fluid cursor movement with water-like lag
        const dotSpeed = 0.15;
        const ringSpeed = 0.08;
        
        cursorX += (mouseX - cursorX) * dotSpeed;
        cursorY += (mouseY - cursorY) * dotSpeed;
        
        ringX += (mouseX - ringX) * ringSpeed;
        ringY += (mouseY - ringY) * ringSpeed;
        
        // Update cursor dot position
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
        
        // Update ring position
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        // Create water waves based on movement
        if (trailPositions.length > 3 && mouseSpeed > 2) {
            createWaterWave();
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    // Create water particle
    function createWaterParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'water-particle';
        
        // Random positioning around cursor
        const spread = 10 + Math.random() * 20;
        const angle = Math.random() * Math.PI * 2;
        const offsetX = Math.cos(angle) * spread;
        const offsetY = Math.sin(angle) * spread;
        
        particle.style.left = (x + offsetX) + 'px';
        particle.style.top = (y + offsetY) + 'px';
        
        // Random size
        const size = 3 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
    
    // Create water ripple
    function createWaterRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'water-cursor-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1500);
    }
    
    // Create water wave
    function createWaterWave() {
        const trailIndex = Math.floor(Math.random() * (trailPositions.length - 1));
        const pos = trailPositions[trailIndex];
        
        if (pos && Math.random() < 0.2) {
            const wave = document.createElement('div');
            wave.className = 'water-cursor-wave';
            wave.style.left = pos.x + 'px';
            wave.style.top = pos.y + 'px';
            document.body.appendChild(wave);
            
            // Remove wave after animation
            setTimeout(() => {
                if (wave.parentNode) {
                    wave.parentNode.removeChild(wave);
                }
            }, 2000);
        }
    }
    
    // Create water splash on click
    function createWaterSplash(x, y) {
        const splashCount = 8 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < splashCount; i++) {
            const splash = document.createElement('div');
            splash.className = 'water-cursor-ripple';
            
            // Explosion effect
            const angle = (i / splashCount) * Math.PI * 2 + Math.random() * 0.5;
            const velocity = 25 + Math.random() * 35;
            const offsetX = Math.cos(angle) * velocity;
            const offsetY = Math.sin(angle) * velocity;
            
            splash.style.left = (x + offsetX) + 'px';
            splash.style.top = (y + offsetY) + 'px';
            
            // Random size for splash effect
            const size = 4 + Math.random() * 6;
            splash.style.width = size + 'px';
            splash.style.height = size + 'px';
            
            // Splash colors
            splash.style.background = 'radial-gradient(circle, #ff6b6b, #ee5a24)';
            splash.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.8)';
            
            document.body.appendChild(splash);
            
            // Remove splash after animation
            setTimeout(() => {
                if (splash.parentNode) {
                    splash.parentNode.removeChild(splash);
                }
            }, 1500);
        }
    }
    
    // Create fullscreen ripple effect
    function createFullscreenRipple(x, y, isClick = false) {
        const ripple = document.createElement('div');
        ripple.className = isClick ? 'fullscreen-ripple click' : 'fullscreen-ripple';
        
        // Position the ripple origin at click point
        const centerX = (x / window.innerWidth) * 100;
        const centerY = (y / window.innerHeight) * 100;
        ripple.style.background = isClick 
            ? `radial-gradient(circle at ${centerX}% ${centerY}%, transparent 0%, rgba(255, 107, 107, 0.15) 20%, transparent 100%)`
            : `radial-gradient(circle at ${centerX}% ${centerY}%, transparent 0%, rgba(79, 172, 254, 0.1) 20%, transparent 100%)`;
        
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, isClick ? 1200 : 1500);
    }
    
    // Create multiple ripple rings
    function createMultipleRippleRings(x, y, isClick = false) {
        const ringCount = isClick ? 5 : 3;
        
        for (let i = 0; i < ringCount; i++) {
            const ring = document.createElement('div');
            ring.className = isClick ? 'ripple-ring click' : 'ripple-ring';
            
            // Position rings at click point
            ring.style.left = (x - 50) + 'px';
            ring.style.top = (y - 50) + 'px';
            ring.style.width = '100px';
            ring.style.height = '100px';
            
            // Stagger animation delays
            ring.style.animationDelay = (i * 0.1) + 's';
            
            document.body.appendChild(ring);
            
            // Remove ring after animation
            setTimeout(() => {
                if (ring.parentNode) {
                    ring.parentNode.removeChild(ring);
                }
            }, 2000 + (i * 100));
        }
    }
    
    // Create cursor trail ripple
    function createCursorTrailRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-trail-ripple';
        ripple.style.left = (x - 4) + 'px';
        ripple.style.top = (y - 4) + 'px';
        
        // Random size variation
        const size = 6 + Math.random() * 6;
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        
        // Color variation
        const colors = [
            'radial-gradient(circle, #4facfe, #00f2fe)',
            'radial-gradient(circle, #00f2fe, #4facfe)',
            'radial-gradient(circle, #4facfe, #0099cc)'
        ];
        ripple.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }
    
    // Start animation
    animateCursor();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Reset cursor position on resize
        cursorX = mouseX;
        cursorY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
    });
}

// ===== MOBILE TOUCH ANIMATIONS =====
function initMobileTouchAnimations() {
    // Check if device supports touch
    if (!('ontouchstart' in window) && navigator.maxTouchPoints <= 0) {
        return; // Don't initialize on non-touch devices
    }
    
    // Interactive elements that should have touch animations
    const interactiveElements = document.querySelectorAll(
        'a, button, .btn, .skill-card, .project-card, .certification-card, .nav-link, .category-btn, .tab-btn, .social-link, .contact-item, input, textarea'
    );
    
    // Add touch event listeners
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', handleTouchStart, { passive: false });
        element.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
    
    // Touch start handler
    function handleTouchStart(e) {
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;
        
        // Create mobile touch effects
        createMobileTouchRipple(x, y);
        createMobileTouchSplash(x, y);
        createMobileTouchWave(x, y);
        
        // Add active class for visual feedback
        this.classList.add('touch-active');
    }
    
    // Touch end handler
    function handleTouchEnd(e) {
        // Remove active class
        this.classList.remove('touch-active');
    }
    
    // Create mobile touch ripple effect
    function createMobileTouchRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'mobile-touch-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // Create mobile touch splash effect
    function createMobileTouchSplash(x, y) {
        const splashCount = 3 + Math.random() * 3;
        
        for (let i = 0; i < splashCount; i++) {
            const splash = document.createElement('div');
            splash.className = 'mobile-touch-splash';
            
            // Random positioning around touch point
            const spread = 15 + Math.random() * 20;
            const angle = (i / splashCount) * Math.PI * 2 + Math.random() * 0.5;
            const offsetX = Math.cos(angle) * spread;
            const offsetY = Math.sin(angle) * spread;
            
            splash.style.left = (x + offsetX) + 'px';
            splash.style.top = (y + offsetY) + 'px';
            
            // Random size
            const size = 4 + Math.random() * 6;
            splash.style.width = size + 'px';
            splash.style.height = size + 'px';
            
            document.body.appendChild(splash);
            
            // Remove splash after animation
            setTimeout(() => {
                if (splash.parentNode) {
                    splash.parentNode.removeChild(splash);
                }
            }, 1000);
        }
    }
    
    // Create mobile touch wave effect
    function createMobileTouchWave(x, y) {
        const wave = document.createElement('div');
        wave.className = 'mobile-touch-wave';
        wave.style.left = x + 'px';
        wave.style.top = y + 'px';
        document.body.appendChild(wave);
        
        // Remove wave after animation
        setTimeout(() => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        }, 800);
    }
    
    // Add CSS for touch active state
    const style = document.createElement('style');
    style.textContent = `
        .touch-active {
            transform: scale(0.95) !important;
            transition: transform 0.1s ease !important;
        }
        
        .btn.touch-active {
            transform: scale(0.95) translateY(1px) !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
        }
        
        .skill-card.touch-active,
        .project-card.touch-active,
        .certification-card.touch-active {
            transform: scale(0.98) translateY(2px) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        }
        
        .nav-link.touch-active,
        .category-btn.touch-active,
        .tab-btn.touch-active {
            background: rgba(102, 126, 234, 0.1) !important;
        }
        
        .social-link.touch-active {
            transform: scale(0.9) !important;
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.4) !important;
        }
        
        .contact-item.touch-active {
            transform: scale(0.98) translateY(1px) !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZE ALL ANIMATIONS =====
function initAllAnimations() {
    // Initialize all animation functions
    init3DTilt();
    initMagneticEffect();
    initParticleTrail();
    initTextScramble();
    initEnhancedParallax();
    initInteractiveCursor();
    initMorphingShapes();
    initEnhancedCounters();
    initEnhancedHoverEffects();
    initEnhancedTextReveal();
    initEnhancedLazyLoading();
    initEnhancedScrollAnimations();
    initEnhancedMouseFollow();
    initEnhancedProgressBars();
    initEnhancedModals();
    initEnhancedTooltips();
    
    // Initialize water waves cursor (desktop only)
    initWaterWavesCursor();
    
    // Initialize mobile touch animations (mobile only)
    initMobileTouchAnimations();
    
    // Initialize existing functions
    initParallax();
    initCounters();
    initHoverEffects();
    initTextReveal();
    initLazyLoading();
    initScrollAnimations();
    initMouseFollow();
    initProgressBars();
    initModals();
    initTooltips();
}

// Export for use in main.js
window.initAllAnimations = initAllAnimations;

// ===== UTILITY FUNCTIONS =====

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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scroll utility
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Export functions for use in other files
window.AnimationUtils = {
    smoothScrollTo,
    debounce,
    throttle
}; 