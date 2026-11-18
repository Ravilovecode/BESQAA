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

    // Useful Links Modal
    const usefulLinksBtn = document.getElementById('usefulLinksBtn');
    const usefulLinksModal = document.getElementById('usefulLinksModal');
    const usefulLinksModalOverlay = document.getElementById('usefulLinksModalOverlay');
    const usefulLinksModalClose = document.getElementById('usefulLinksModalClose');

    if (usefulLinksBtn && usefulLinksModal) {
        usefulLinksBtn.addEventListener('click', function() {
            usefulLinksModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeUsefulLinksModal() {
            usefulLinksModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        usefulLinksModalClose.addEventListener('click', closeUsefulLinksModal);
        usefulLinksModalOverlay.addEventListener('click', closeUsefulLinksModal);

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && usefulLinksModal.classList.contains('active')) {
                closeUsefulLinksModal();
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
    document.querySelectorAll('.feature-card, .management-card, .category-card, .flow-item, .bq-card, .bq-benefit, .bq-cat').forEach(el => {
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
                alert('Contact Support:\nEmail: besqaa4india@gmail.com\nPhone: +91-7368919823');
            }
        });
    });

    // ============================================
    // BUY-BACK DATE FORM (date required, amount optional)
    // ============================================
    const buybackForm = document.getElementById('buybackForm');

    if (buybackForm) {
        const dateInput = document.getElementById('buybackDate');
        const amountInput = document.getElementById('buybackAmount');
        const dateError = document.getElementById('buybackDateError');
        const amountError = document.getElementById('buybackAmountError');
        const result = document.getElementById('buybackResult');
        const resultDate = document.getElementById('resultBuybackDate');
        const resultReminder = document.getElementById('resultReminderDate');
        const calendarBtn = document.getElementById('buybackCalendarBtn');
        const whatsappBtn = document.getElementById('buybackWhatsappBtn');
        const STORAGE_KEY = 'besqaa_buyback';
        const REMINDER_DAYS = 15;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const maxDate = new Date(today);
        maxDate.setFullYear(maxDate.getFullYear() + 10);

        const toISO = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        const parseISO = s => {
            const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
            if (!m) return null;
            const d = new Date(+m[1], +m[2] - 1, +m[3]);
            return (d.getMonth() === +m[2] - 1 && d.getDate() === +m[3]) ? d : null;
        };
        const formatDate = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

        dateInput.min = toISO(today);
        dateInput.max = toISO(maxDate);

        let saved = null;

        function setError(input, el, msg) {
            el.textContent = msg;
            input.classList.toggle('bq-invalid', !!msg);
        }

        function validate() {
            let ok = true;
            const d = parseISO(dateInput.value);
            if (!dateInput.value) {
                setError(dateInput, dateError, 'Please enter your Buy-Back Date.'); ok = false;
            } else if (!d) {
                setError(dateInput, dateError, 'Please enter a valid date.'); ok = false;
            } else if (d < today) {
                setError(dateInput, dateError, 'Buy-Back Date cannot be in the past.'); ok = false;
            } else if (d > maxDate) {
                setError(dateInput, dateError, 'Please enter a date within the next 10 years.'); ok = false;
            } else {
                setError(dateInput, dateError, '');
            }

            const amt = amountInput.value.trim();
            if (amt !== '' && (!/^\d+(\.\d{1,2})?$/.test(amt) || Number(amt) <= 0)) {
                setError(amountInput, amountError, 'Enter a positive amount, or leave it blank.'); ok = false;
            } else {
                setError(amountInput, amountError, '');
            }
            return ok ? { date: d, amount: amt } : null;
        }

        function showResult(data) {
            const reminder = new Date(data.date);
            reminder.setDate(reminder.getDate() - REMINDER_DAYS);
            const effectiveReminder = reminder < today ? today : reminder;
            saved = { date: data.date, amount: data.amount, reminder: effectiveReminder };

            resultDate.textContent = formatDate(data.date);
            resultReminder.textContent = formatDate(effectiveReminder);

            let msg = 'Hello BESQAA, please remind me before my Buy-Back Date: ' + formatDate(data.date) + '.';
            if (data.amount) msg += ' Buy-Back Amount (optional): Rs ' + data.amount + '.';
            whatsappBtn.href = 'https://wa.me/917368919823?text=' + encodeURIComponent(msg);
            result.hidden = false;
        }

        buybackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = validate();
            if (!data) return;
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: toISO(data.date), amount: data.amount }));
            } catch (err) { /* storage unavailable - still show the result */ }
            showResult(data);
        });

        dateInput.addEventListener('change', function() { if (dateError.textContent) validate(); });

        calendarBtn.addEventListener('click', function() {
            if (!saved) return;
            const fmt = d => toISO(d).replace(/-/g, '');
            const next = d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n; };
            const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            const ev = (uid, d, summary, desc) => [
                'BEGIN:VEVENT',
                'UID:' + uid + '@besqaa.in',
                'DTSTAMP:' + stamp,
                'DTSTART;VALUE=DATE:' + fmt(d),
                'DTEND;VALUE=DATE:' + fmt(next(d)),
                'SUMMARY:' + summary,
                'DESCRIPTION:' + desc,
                'END:VEVENT'
            ].join('\r\n');
            const ics = [
                'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//BESQAA.in//Buy-Back Reminder//EN',
                ev('reminder-' + fmt(saved.date), saved.reminder, 'BESQAA: Buy-Back Date coming up',
                   'Your Buy-Back Date is ' + formatDate(saved.date) + '. Start comparing products at https://besqaa.in'),
                ev('buyback-' + fmt(saved.date), saved.date, 'My Buy-Back Date',
                   'First eligible purchase date. Visit https://besqaa.in'),
                'END:VCALENDAR'
            ].join('\r\n');
            const blob = new Blob([ics], { type: 'text/calendar' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'besqaa-buyback-reminder.ics';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
        });

        // Restore a previously saved date on this device
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
            const d = stored && parseISO(stored.date);
            if (d && d >= today) {
                dateInput.value = stored.date;
                amountInput.value = stored.amount || '';
                showResult({ date: d, amount: stored.amount || '' });
            }
        } catch (err) { /* ignore */ }
    }

    // Contact form - opens the user's email app with the message
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const f = contactForm.querySelectorAll('input, textarea');
            const [name, email, phone, subject, message] = Array.from(f).map(el => el.value.trim());
            const body = 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\n' + message;
            window.location.href = 'mailto:besqaa4india@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        });
    }

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
            // Use reliable counter with local persistence
            let visitorCount;
            
            if (!isReturningVisitor) {
                // New visitor - try to get global count from API
                try {
                    const response = await fetch('https://api.counterapi.dev/v1/besqaa-furniture-psu/unique-visitors-v2/up', {
                        mode: 'cors',
                        cache: 'no-cache'
                    });
                    const data = await response.json();
                    visitorCount = data.count || parseInt(localStorage.getItem(GLOBAL_COUNT_KEY)) || 1;
                    localStorage.setItem(GLOBAL_COUNT_KEY, visitorCount.toString());
                } catch (apiError) {
                    // API failed, use local counter with last known value
                    visitorCount = parseInt(localStorage.getItem(GLOBAL_COUNT_KEY)) || 1;
                }
                
                // Mark this device as visited
                localStorage.setItem(VISITOR_KEY, 'true');
                localStorage.setItem(VISITOR_ID_KEY, deviceFingerprint);
            } else {
                // Returning visitor - just show stored count
                visitorCount = parseInt(localStorage.getItem(GLOBAL_COUNT_KEY)) || 1;
            }
            
            // Animate counter
            animateCounter(counterElement, visitorCount);
            
        } catch (error) {
            console.error('Counter failed:', error);
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

    // ============================================
    // WORKING MODEL ROADMAP ACCORDION
    // ============================================
    const roadmapSteps = document.querySelectorAll('.roadmap-step');
    
    if (roadmapSteps.length > 0) {
        roadmapSteps.forEach(step => {
            const header = step.querySelector('.step-header');
            
            if (header) {
                header.addEventListener('click', function() {
                    // Check if this step is already active
                    const isActive = step.classList.contains('active');
                    
                    // Close all other steps
                    roadmapSteps.forEach(otherStep => {
                        otherStep.classList.remove('active');
                    });
                    
                    // Toggle current step
                    if (!isActive) {
                        step.classList.add('active');
                        
                        // Smooth scroll to the step
                        setTimeout(() => {
                            step.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }, 100);
                    }
                });
            }
        });
        
        // Open first step by default
        if (roadmapSteps[0]) {
            roadmapSteps[0].classList.add('active');
        }
    }

    // App Announcement Popup — auto-appears on page load
    const appAnnounce = document.getElementById('appAnnounce');
    const appAnnounceClose = document.getElementById('appAnnounceClose');
    const appAnnounceOverlay = document.getElementById('appAnnounceOverlay');

    if (appAnnounce) {
        function showAppAnnounce() {
            appAnnounce.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function hideAppAnnounce() {
            appAnnounce.classList.add('closing');
            setTimeout(function() {
                appAnnounce.classList.remove('active', 'closing');
                document.body.style.overflow = '';
            }, 320);
        }

        // Show on every page load, shortly after the page opens
        setTimeout(showAppAnnounce, 1200);

        appAnnounceClose.addEventListener('click', hideAppAnnounce);
        appAnnounceOverlay.addEventListener('click', hideAppAnnounce);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && appAnnounce.classList.contains('active')) {
                hideAppAnnounce();
            }
        });
    }

    // Log console message for developer
    console.log('%c🛒 BESQAA.in Website Loaded Successfully! 🛒',
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
