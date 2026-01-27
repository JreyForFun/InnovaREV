async function loadComponent(id, file) {
    // Show loading spinner
    const placeholder = document.getElementById(id);
    placeholder.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const response = await fetch(file);
        if (response.ok) {
            const content = await response.text();
            placeholder.innerHTML = content;
        } else {
            console.error(`Failed to load ${file}`);
            placeholder.innerHTML = `<div style="text-align:center; padding: 20px; background: #fee; color: #c00;">Error: Could not load ${file}. Please ensure you are running this via a local server (http://localhost:8000), not directly from a file.</div>`;
        }
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
        placeholder.innerHTML = `<div style="text-align:center; padding: 20px; background: #fee; color: #c00;">
            <strong>Component Loading Error</strong><br>
            Browsers block loading external files (like header/footer) when opening HTML files directly.<br>
            Please use the <strong>Preview</strong> feature or run a local server (python -m http.server).
        </div>`;
    }
}

function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav ul li a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

const init = async () => {
    // Load Header and Footer
    await loadComponent('header-placeholder', 'header.html');
    await loadComponent('footer-placeholder', 'footer.html');

    // Initialize Navigation Active State
    setActiveLink();

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you shortly.');
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Mobile Menu Toggle (Must be re-initialized after header load)
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });
    }

    // Lightbox for Project Gallery
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImg = document.getElementById('modalImg');
        const captionText = document.getElementById('caption');
        const closeBtn = document.getElementsByClassName('close')[0];

        // Get all work items
        const workItems = document.querySelectorAll('.work-item');

        workItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3').innerText;
                const desc = item.querySelector('p').innerText;

                modal.style.display = 'block';
                modalImg.src = img.src;
                captionText.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
            });
        });

        // Close modal when clicking X
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            }
        }

        // Close modal when clicking outside image
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }

    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Re-select sections to include the newly loaded footer
    const sections = document.querySelectorAll('.section, .hero, footer');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Back to Top Button
    let backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTop';
        backToTopBtn.title = 'Go to top';
        document.body.appendChild(backToTopBtn);
    
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        };
    
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // WhatsApp Button
    const waBtn = document.createElement('a');
    waBtn.href = "https://wa.me/123456789"; // Replace with real number
    waBtn.className = "whatsapp-float";
    waBtn.target = "_blank";
    waBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(waBtn);

    // Cookie Consent Banner
    if (!localStorage.getItem('cookieConsent')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to ensure you get the best experience on our website.</p>
                <button id="acceptCookie" class="cookie-btn">Accept</button>
            </div>
        `;
        document.body.appendChild(cookieBanner);
        
        // Show with a slight delay
        setTimeout(() => {
            cookieBanner.style.display = 'block';
        }, 1000);

        document.getElementById('acceptCookie').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.style.display = 'none';
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}