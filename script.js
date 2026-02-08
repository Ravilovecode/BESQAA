// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    
    // Government Approvals Modal
    const govtBtn = document.getElementById('govtApprovalsBtn');
    const govtModal = document.getElementById('govtModal');
    const govtModalOverlay = document.getElementById('govtModalOverlay');
    const govtModalClose = document.getElementById('govtModalClose');

    if (govtBtn && govtModal) {
        govtBtn.addEventListener('click', function() {
            govtModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeGovtModal() {
            govtModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        govtModalClose.addEventListener('click', closeGovtModal);
        govtModalOverlay.addEventListener('click', closeGovtModal);

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && govtModal.classList.contains('active')) {
                closeGovtModal();
            }
        });
    }
    
    // Navigation Drawer functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navDrawer = document.getElementById('navDrawer');
    const navOverlay = document.getElementById('navOverlay');
    const closeDrawer = document.getElementById('closeDrawer');
    const navItems = document.querySelectorAll('.nav-item');

    // Open drawer
    hamburgerMenu.addEventListener('click', function() {
        navDrawer.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close drawer
    function closeNav() {
        navDrawer.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeDrawer.addEventListener('click', closeNav);
    navOverlay.addEventListener('click', closeNav);

    // Close drawer when clicking nav items
    navItems.forEach(item => {
        item.addEventListener('click', closeNav);
    });

    // Bottom Navigation Active State
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const sections = document.querySelectorAll('section[id], header[id]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .management-card, .category-card, .flow-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            ripple.style.animation = 'ripple 0.6s';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle button actions
            if (this.textContent.includes('Check Eligible')) {
                alert('Feature coming soon! Please contact support for eligibility details.');
            } else if (this.textContent.includes('Contact Support')) {
                alert('Contact Support:\nEmail: forsupportpsu@besqaa.in\nPhone: +91-7368919823');
            }
        });
    });

    // Category card interactions
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            alert(`Exploring ${categoryName} category. Full catalog coming soon!`);
        });
    });

    // Handle image loading errors with placeholder
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.minHeight = '200px';
            this.alt = 'Image placeholder - Add your image here';
        });
    });

    // Global Visitor Counter - Robust Unique Visitor Tracking
    async function initVisitorCounter() {
        const counterElement = document.getElementById('visitorCount');
        if (!counterElement) return;
        
        // Generate a unique device fingerprint
        const deviceFingerprint = generateDeviceFingerprint();
        const VISITOR_KEY = 'besqaa_visitor_' + deviceFingerprint;
        const VISITOR_ID_KEY = 'besqaa_device_id';
        const GLOBAL_COUNT_KEY = 'besqaa_global_count';
        
        // Check if this specific device has visited before
        const hasVisited = localStorage.getItem(VISITOR_KEY) === 'true';
        const storedDeviceId = localStorage.getItem(VISITOR_ID_KEY);
        
        // Double check with device ID
        const isReturningVisitor = hasVisited && storedDeviceId === deviceFingerprint;
        
        try {
            // Use CountAPI.xyz - Free counter API with CORS support
            const namespace = 'besqaa.in';
            const key = 'unique-visitors';
            
            let visitorCount;
            
            if (!isReturningVisitor) {
                // New visitor - increment the global count
                const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
                const data = await response.json();
                visitorCount = data.value || 1;
                
                // Mark this device as visited
                localStorage.setItem(VISITOR_KEY, 'true');
                localStorage.setItem(VISITOR_ID_KEY, deviceFingerprint);
                localStorage.setItem(GLOBAL_COUNT_KEY, visitorCount.toString());
            } else {
                // Returning visitor - get count without incrementing
                const response = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
                const data = await response.json();
                visitorCount = data.value || parseInt(localStorage.getItem(GLOBAL_COUNT_KEY)) || 1;
            }
            
            // Animate counter
            animateCounter(counterElement, visitorCount);
            
        } catch (error) {
            console.error('Counter API failed:', error);
            // Fallback to robust local counter
            fallbackLocalCounter(counterElement, isReturningVisitor, deviceFingerprint);
        }
    }
    
    // Generate a unique device fingerprint based on browser characteristics
    function generateDeviceFingerprint() {
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            navigator.hardwareConcurrency || 'unknown',
            navigator.platform || 'unknown'
        ];
        
        // Create a simple hash from the components
        const fingerprint = components.join('|');
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(36);
    }
    
    // Fallback to localStorage if API is unavailable
    function fallbackLocalCounter(element, isReturningVisitor, deviceFingerprint) {
        const COUNTER_KEY = 'besqaa_visitor_count_local';
        const DEVICES_KEY = 'besqaa_known_devices';
        const GLOBAL_COUNT_KEY = 'besqaa_global_count';
        
        // Get known devices list
        let knownDevices = [];
        try {
            knownDevices = JSON.parse(localStorage.getItem(DEVICES_KEY)) || [];
        } catch (e) {
            knownDevices = [];
        }
        
        // Start from last known global count or local count, whichever is higher
        const lastGlobalCount = parseInt(localStorage.getItem(GLOBAL_COUNT_KEY)) || 0;
        const localCount = parseInt(localStorage.getItem(COUNTER_KEY)) || 0;
        let visitorCount = Math.max(lastGlobalCount, localCount);
        
        // Check if this device is already known
        if (!knownDevices.includes(deviceFingerprint) && !isReturningVisitor) {
            visitorCount++;
            knownDevices.push(deviceFingerprint);
            localStorage.setItem(COUNTER_KEY, visitorCount.toString());
            localStorage.setItem(DEVICES_KEY, JSON.stringify(knownDevices));
        }
        
        animateCounter(element, Math.max(1, visitorCount));
    }
    
    // Animate counter with smooth counting effect
    function animateCounter(element, target) {
        if (target <= 0) target = 1;
        let current = 0;
        const increment = Math.max(1, target / 50); // 50 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }
    
    // Initialize visitor counter
    initVisitorCounter();

    // Log console message for developer
    console.log('%c🪑 BESQAA Furniture Website Loaded Successfully! 🪑', 
        'color: #1a4d7c; font-size: 16px; font-weight: bold;');
    console.log('%cAdd your images to the /images folder', 
        'color: #ff9800; font-size: 14px;');
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
