// Silai Srijan - Website Functionality
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Language Toggle ---
    const langToggleBtn = document.getElementById('langToggle');
    const body = document.body;

    // Check localStorage for saved preference
    const savedLang = localStorage.getItem('silai-lang');
    if (savedLang === 'lang-en' || savedLang === 'lang-hi') {
        body.classList.remove('lang-hi', 'lang-en');
        body.classList.add(savedLang);
        document.documentElement.lang = savedLang === 'lang-en' ? 'en' : 'hi';
    } else {
        localStorage.removeItem('silai-lang');
        body.classList.remove('lang-en');
        if (!body.classList.contains('lang-hi')) {
            body.classList.add('lang-hi');
        }
        document.documentElement.lang = 'hi';
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('lang-hi')) {
                body.classList.replace('lang-hi', 'lang-en');
                localStorage.setItem('silai-lang', 'lang-en');
                document.documentElement.lang = 'en';
            } else {
                if (body.classList.contains('lang-en')) {
                    body.classList.replace('lang-en', 'lang-hi');
                } else {
                    body.classList.add('lang-hi');
                }
                localStorage.setItem('silai-lang', 'lang-hi');
                document.documentElement.lang = 'hi';
            }
        });
    }

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });


    // --- Tab Filtering for Featured Designs ---
    const filterTabs = document.querySelectorAll('.filter-tab');
    const masonryItems = document.querySelectorAll('.masonry-item');

    if (filterTabs.length > 0 && masonryItems.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                const filterValue = tab.getAttribute('data-filter');

                masonryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        // Add animation class if desired
                        item.animate([
                            { opacity: 0, transform: 'scale(0.9)' },
                            { opacity: 1, transform: 'scale(1)' }
                        ], {
                            duration: 300,
                            easing: 'ease-out'
                        });
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }


    // --- Gallery/Design Image Modal (Lightbox) ---
    const modal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    // Select both masonry items and standard gallery items if they exist
    const zoomableItems = document.querySelectorAll('.masonry-item, .gallery-item, .service-card'); 
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal) {
        // Open Modal
        zoomableItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Don't open if clicking a button inside (if any)
                if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;

                const img = item.querySelector('img');
                if (img) {
                    fullImage.src = img.src;
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Disable scroll
                }
            });
        });

        // Close Modal Function
        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scroll
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Close when clicking outside the image
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }


    // --- Smooth Scroll Correction ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Adjusted for new header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Intersection Observer for Fade-in Animation (Optional Polish) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .masonry-item, .price-card, .review-card').forEach(el => {
        el.classList.add('fade-in-section'); // Add CSS class for this in style.css if not present
        observer.observe(el);
    });

});
