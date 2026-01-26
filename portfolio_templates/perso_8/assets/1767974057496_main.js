/* ===================================================================
 * Jackson - Main JS (Vanilla JavaScript)
 * Modernized version - No jQuery dependencies
 * ------------------------------------------------------------------- */

(function() {
    "use strict";

    /* Mobile Detection
     * -------------------------------------------------- */
    var isMobile = {
        Android: function() { return navigator.userAgent.match(/Android/i); },
        iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        any: function() { return (isMobile.Android() || isMobile.iOS()); }
    };

    /* Full Height Sections
     * -------------------------------------------------- */
    function initFullHeight() {
        var elements = document.querySelectorAll('.js-fullheight');

        function setHeight() {
            var vh = window.innerHeight;
            elements.forEach(function(el) {
                el.style.height = vh + 'px';
            });
        }

        if (elements.length) {
            setHeight();
            window.addEventListener('resize', setHeight);
        }
    }

    /* Counter Animation (replaces jquery.countTo)
     * -------------------------------------------------- */
    function animateCounter(element, target, duration) {
        var startTime = null;
        var startValue = 0;

        function easeOutQuad(t) {
            return t * (2 - t);
        }

        function step(currentTime) {
            if (!startTime) startTime = currentTime;
            var progress = Math.min((currentTime - startTime) / duration, 1);
            var easedProgress = easeOutQuad(progress);
            element.textContent = Math.floor(easedProgress * target);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    function initCounters() {
        var counterSection = document.getElementById('colorlib-counter');
        var counters = document.querySelectorAll('.js-counter');

        if (!counterSection || !counters.length) return;

        var animated = false;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    counters.forEach(function(counter) {
                        var target = parseInt(counter.getAttribute('data-to'), 10);
                        var duration = parseInt(counter.getAttribute('data-speed'), 10) || 5000;
                        animateCounter(counter, target, duration);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(counterSection);
    }

    /* Scroll Animations (replaces Waypoints + animate.css triggers)
     * -------------------------------------------------- */
    function initScrollAnimations() {
        var animatedElements = document.querySelectorAll('.animate-box');

        if (!animatedElements.length) return;

        // Respect reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            animatedElements.forEach(function(el) {
                el.classList.add('animated');
                el.style.opacity = '1';
            });
            return;
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    var el = entry.target;
                    var effect = el.getAttribute('data-animate-effect') || 'fadeInUp';

                    el.classList.add('item-animate');

                    setTimeout(function() {
                        el.classList.add(effect, 'animated');
                        el.classList.remove('item-animate');
                    }, 100);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    /* Bootstrap 5 Offcanvas Mobile Menu
     * -------------------------------------------------- */
    function initMobileMenu() {
        var mobileMenu = document.getElementById('mobileMenu');
        var mobileNavLinks = document.querySelectorAll('#mobileMenu a[data-nav-section]');

        if (!mobileMenu) return;

        // Get Bootstrap offcanvas instance
        var offcanvasInstance = bootstrap.Offcanvas.getOrCreateInstance(mobileMenu);

        // Close menu when nav link is clicked and scroll to section
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var section = this.getAttribute('data-nav-section');
                var target = document.querySelector('[data-section="' + section + '"]');

                // Close the offcanvas menu
                offcanvasInstance.hide();

                // Scroll to section after menu closes
                if (target) {
                    setTimeout(function() {
                        window.scrollTo({
                            top: target.offsetTop - 20,
                            behavior: 'smooth'
                        });
                    }, 300);
                }

                // Update active state in mobile menu
                mobileNavLinks.forEach(function(navLink) {
                    navLink.closest('.nav-item').classList.remove('active');
                });
                this.closest('.nav-item').classList.add('active');
            });
        });
    }

    /* Navigation Click Handler
     * -------------------------------------------------- */
    function initNavigation() {
        var navLinks = document.querySelectorAll('#navbar a[data-nav-section]');
        var navbar = document.getElementById('navbar');

        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var section = this.getAttribute('data-nav-section');
                var target = document.querySelector('[data-section="' + section + '"]');

                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 55,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu
                document.body.classList.remove('offcanvas');
                var toggle = document.querySelector('.js-colorlib-nav-toggle');
                if (toggle) toggle.classList.remove('active');
            });
        });
    }

    /* Active Navigation on Scroll
     * -------------------------------------------------- */
    function initNavigationHighlight() {
        var sections = document.querySelectorAll('section[data-section], div[data-section]');
        var desktopNavLinks = document.querySelectorAll('#navbar > ul > li');
        var mobileNavItems = document.querySelectorAll('#mobileMenu .nav-item');

        if (!sections.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var sectionName = entry.target.getAttribute('data-section');

                    // Update desktop nav
                    desktopNavLinks.forEach(function(li) {
                        li.classList.remove('active');
                        var link = li.querySelector('a[data-nav-section="' + sectionName + '"]');
                        if (link) {
                            li.classList.add('active');
                        }
                    });

                    // Update mobile nav
                    mobileNavItems.forEach(function(item) {
                        item.classList.remove('active');
                        var link = item.querySelector('a[data-nav-section="' + sectionName + '"]');
                        if (link) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        });

        sections.forEach(function(section) {
            observer.observe(section);
        });
    }

    /* Hero Slider (replaces Flexslider)
     * -------------------------------------------------- */
    function initHeroSlider() {
        var slider = document.querySelector('#colorlib-hero .flexslider');
        if (!slider) return;

        var slides = slider.querySelectorAll('.slides > li');
        var currentIndex = 0;
        var slideCount = slides.length;

        if (slideCount <= 1) {
            // Single slide - just show it
            if (slides[0]) {
                slides[0].style.display = 'block';
                slides[0].style.opacity = '1';
            }
            return;
        }

        // Initialize all slides
        slides.forEach(function(slide, i) {
            slide.style.position = i === 0 ? 'relative' : 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            slide.style.display = 'block';
            slide.style.opacity = i === 0 ? '1' : '0';
            slide.style.transition = 'opacity 0.8s ease';
            slide.style.zIndex = i === 0 ? '2' : '1';
        });

        function showSlide(index) {
            slides.forEach(function(slide, i) {
                slide.style.opacity = i === index ? '1' : '0';
                slide.style.zIndex = i === index ? '2' : '1';

                // Animate text
                var text = slide.querySelector('.slider-text');
                if (text) {
                    if (i === index) {
                        text.classList.add('animated', 'fadeInUp');
                    } else {
                        text.classList.remove('animated', 'fadeInUp');
                    }
                }
            });
        }

        // Create navigation arrows
        var nav = document.createElement('div');
        nav.className = 'flex-direction-nav';
        nav.innerHTML = '<a class="flex-prev" href="#" aria-label="Previous slide"><i class="icon-arrow-left3"></i></a>' +
                        '<a class="flex-next" href="#" aria-label="Next slide"><i class="icon-arrow-right3"></i></a>';
        slider.appendChild(nav);

        nav.querySelector('.flex-prev').addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            showSlide(currentIndex);
        });

        nav.querySelector('.flex-next').addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % slideCount;
            showSlide(currentIndex);
        });

        // Auto-play
        var autoPlayInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % slideCount;
            showSlide(currentIndex);
        }, 5000);

        // Pause on hover
        slider.addEventListener('mouseenter', function() {
            clearInterval(autoPlayInterval);
        });

        slider.addEventListener('mouseleave', function() {
            autoPlayInterval = setInterval(function() {
                currentIndex = (currentIndex + 1) % slideCount;
                showSlide(currentIndex);
            }, 5000);
        });
    }

    /* Dark Mode Toggle
     * -------------------------------------------------- */
    function initDarkMode() {
        var toggle = document.getElementById('darkModeToggle');
        var toggleMobile = document.getElementById('darkModeToggleMobile');
        var html = document.documentElement;

        // Check saved preference only - default to light mode
        var savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            html.setAttribute('data-bs-theme', savedTheme);
        } else {
            // Default to light mode
            html.setAttribute('data-bs-theme', 'light');
        }

        // Update label text based on current theme
        function updateLabels() {
            var isDark = html.getAttribute('data-bs-theme') === 'dark';
            var labelText = isDark ? 'Light' : 'Dark';

            if (toggle) {
                var label = toggle.querySelector('.theme-label');
                if (label) label.textContent = labelText;
            }
            if (toggleMobile) {
                var labelMobile = toggleMobile.querySelector('.theme-label');
                if (labelMobile) labelMobile.textContent = labelText;
            }
        }

        // Set initial label
        updateLabels();

        function handleToggle(e) {
            e.preventDefault();
            var currentTheme = html.getAttribute('data-bs-theme');
            var newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateLabels();
        }

        if (toggle) {
            toggle.addEventListener('click', handleToggle);
        }

        if (toggleMobile) {
            toggleMobile.addEventListener('click', handleToggle);
        }
    }

    /* Smooth Scroll for Anchor Links
     * -------------------------------------------------- */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#' || targetId === '') return;

                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    window.scrollTo({
                        top: target.offsetTop - 60,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /* Progress Bars Animation
     * -------------------------------------------------- */
    function initProgressBars() {
        var progressBars = document.querySelectorAll('.progress-bar');

        if (!progressBars.length) return;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var bar = entry.target;
                    var width = bar.getAttribute('aria-valuenow') + '%';
                    bar.style.width = width;
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        // Initially set width to 0
        progressBars.forEach(function(bar) {
            bar.style.width = '0';
            bar.style.transition = 'width 1.5s ease';
            observer.observe(bar);
        });
    }

    /* Portfolio Filter
     * -------------------------------------------------- */
    function initPortfolioFilter() {
        var filterLinks = document.querySelectorAll('.work-menu a[data-filter]');
        var portfolioItems = document.querySelectorAll('.portfolio-item');

        if (!filterLinks.length || !portfolioItems.length) return;

        filterLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                var filter = this.getAttribute('data-filter');

                // Update active state
                filterLinks.forEach(function(l) {
                    l.classList.remove('active');
                });
                this.classList.add('active');

                // Filter items
                portfolioItems.forEach(function(item) {
                    var category = item.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        item.classList.remove('portfolio-hidden');
                        item.classList.add('portfolio-visible');
                    } else {
                        item.classList.remove('portfolio-visible');
                        item.classList.add('portfolio-hidden');
                    }
                });
            });
        });
    }

    /* Initialize
     * -------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function() {
        initFullHeight();
        initCounters();
        initScrollAnimations();
        initMobileMenu();
        initNavigation();
        initNavigationHighlight();
        initHeroSlider();
        initDarkMode();
        initSmoothScroll();
        initProgressBars();
        initPortfolioFilter();
    });

})();
