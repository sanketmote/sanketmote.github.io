class ScrollSpeedAnimations {
    constructor() {
        this.scrollSpeed = 0;
        this.lastScrollTop = 0;
        this.lastScrollTime = Date.now();
        this.scrollSpeedHistory = [];
        this.maxHistoryLength = 10;
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for AOS to be ready
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: false,
                mirror: false
            });
        }
        
        this.setupScrollListener();
        this.setupAnimationObserver();
        this.isInitialized = true;
    }

    setupScrollListener() {
        let scrollTimeout;
        let debugCounter = 0;
        
        window.addEventListener('scroll', () => {
            const currentTime = Date.now();
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Calculate scroll speed (pixels per millisecond)
            const timeDiff = currentTime - this.lastScrollTime;
            const scrollDiff = Math.abs(currentScrollTop - this.lastScrollTop);
            const currentSpeed = timeDiff > 0 ? scrollDiff / timeDiff : 0;
            
            // Update scroll speed history
            this.scrollSpeedHistory.push(currentSpeed);
            if (this.scrollSpeedHistory.length > this.maxHistoryLength) {
                this.scrollSpeedHistory.shift();
            }
            
            // Calculate average scroll speed
            this.scrollSpeed = this.scrollSpeedHistory.reduce((a, b) => a + b, 0) / this.scrollSpeedHistory.length;
            
            // Debug logging (every 10th scroll event)
            debugCounter++;
            if (debugCounter % 10 === 0) {
                console.log(`Scroll Speed: ${this.scrollSpeed.toFixed(3)} px/ms`);
            }
            
            // Update last values
            this.lastScrollTop = currentScrollTop;
            this.lastScrollTime = currentTime;
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Set timeout to update animations after scroll stops
            scrollTimeout = setTimeout(() => {
                this.updateAnimationDelays();
                console.log('Scroll stopped, updated animation delays');
            }, 200);
        });
    }

    setupAnimationObserver() {
        // Create intersection observer for elements entering viewport
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.adjustElementAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with data-aos attributes
        this.observeElements();
        
        // Re-observe when new elements are added
        const observer = new MutationObserver(() => {
            this.observeElements();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    observeElements() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            if (!element.hasAttribute('data-scroll-observed')) {
                this.observer.observe(element);
                element.setAttribute('data-scroll-observed', 'true');
            }
        });
    }

    adjustElementAnimation(element) {
        const baseDelay = this.getBaseDelay(element);
        const adjustedDelay = this.calculateAdjustedDelay(baseDelay);
        
        // Apply adjusted delay using CSS custom property
        element.style.setProperty('--aos-delay', `${adjustedDelay}ms`);
        
        // Force reflow to apply new delay
        element.offsetHeight;
        
        // Add class to indicate this element has been adjusted
        element.classList.add('scroll-adjusted');
    }

    getBaseDelay(element) {
        const aosDelay = element.getAttribute('data-aos-delay');
        if (aosDelay) {
            return parseInt(aosDelay);
        }
        
        // Default delays based on element type
        const elementType = element.className;
        if (elementType.includes('certification-card')) return 200;
        if (elementType.includes('skill-card')) return 150;
        if (elementType.includes('project-card')) return 250;
        if (elementType.includes('timeline-content')) return 300;
        if (elementType.includes('contact-item')) return 200;
        if (elementType.includes('stat-item')) return 200;
        if (elementType.includes('section-header')) return 100;
        
        return 200; // Default delay
    }

    calculateAdjustedDelay(baseDelay) {
        // Scroll speed thresholds (pixels per millisecond)
        const slowScroll = 0.3;   // Slow scrolling
        const fastScroll = 1.5;   // Fast scrolling
        const veryFastScroll = 3.0; // Very fast scrolling
        
        let multiplier = 1.0;
        
        if (this.scrollSpeed > veryFastScroll) {
            // Very fast scroll - minimal delay
            multiplier = 0.15;
        } else if (this.scrollSpeed > fastScroll) {
            // Fast scroll - reduced delay
            multiplier = 0.4;
        } else if (this.scrollSpeed > slowScroll) {
            // Medium scroll - slight reduction
            multiplier = 0.7;
        } else {
            // Slow scroll - normal delay
            multiplier = 1.0;
        }
        
        return Math.round(baseDelay * multiplier);
    }

    updateAnimationDelays() {
        // Update delays for all visible animated elements
        const visibleElements = document.querySelectorAll('[data-aos]');
        visibleElements.forEach(element => {
            if (this.isElementInViewport(element)) {
                this.adjustElementAnimation(element);
            }
        });
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Public method to get current scroll speed
    getScrollSpeed() {
        return this.scrollSpeed;
    }

    // Public method to manually adjust element animation
    adjustElement(element) {
        this.adjustElementAnimation(element);
    }

    // Debug method to log scroll speed
    logScrollSpeed() {
        console.log('Current scroll speed:', this.scrollSpeed, 'px/ms');
    }
}

// Initialize scroll speed animations
let scrollSpeedAnimations;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure AOS is loaded
    setTimeout(() => {
        scrollSpeedAnimations = new ScrollSpeedAnimations();
        console.log('Scroll speed animations initialized');
    }, 100);
});

// Export for use in other scripts
window.ScrollSpeedAnimations = ScrollSpeedAnimations; 