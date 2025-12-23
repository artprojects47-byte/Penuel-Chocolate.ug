// ==========================================
// PENUEL CHOCOLATE - REVOLUTIONARY JAVASCRIPT
// ==========================================

// ========== INITIALIZATION ========== 
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-in-out'
    });
    
    // Preloader
    initPreloader();
    
    // Navigation
    initNavigation();
    
    // Smooth Scrolling
    initSmoothScroll();
    
    // Back to Top Button
    initBackToTop();
    
    // Gallery
    initGallery();
    
    // Form Handler
    initForms();
    
    // EmailJS Initialization
    emailjs.init("g-oyybz8JrLVFv1nz");
    
    // Dynamic Year
    updateYear();
    
    // Parallax Effects
    initParallax();
    
    // International Tel Input
    initIntlTelInput();
});

// ========== PRELOADER ========== 
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressFill = document.querySelector('.progress-fill');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        }
        progressFill.style.width = progress + '%';
    }, 200);
}

// ========== NAVIGATION ========== 
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    });
}

// ========== SMOOTH SCROLLING ========== 
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== BACK TO TOP BUTTON ========== 
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== GALLERY ========== 
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });
}

function openLightbox(imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-container">
            <button class="lightbox-close">&times;</button>
            <img src="${imgSrc}" alt="Gallery Image">
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => lightbox.classList.add('active'), 10);
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-modal.active {
        opacity: 1;
    }
    
    .lightbox-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
    }
    
    .lightbox-container {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        z-index: 1;
    }
    
    .lightbox-container img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 12px;
    }
    
    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        width: 50px;
        height: 50px;
        background: white;
        color: #8B4513;
        border: none;
        border-radius: 50%;
        font-size: 2rem;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .lightbox-close:hover {
        transform: rotate(90deg);
    }
`;
document.head.appendChild(lightboxStyles);

// ========== FORMS ========== 
function initForms() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phoneInput').value;
            const message = document.getElementById('message').value;
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Send email using EmailJS
            emailjs.send('service_r40gird', 'YOUR_TEMPLATE_ID', {
                to_email: 'penuelproducts@gmail.com',
                from_name: name,
                from_email: email,
                phone_number: phone,
                message: message,
                reply_to: email
            })
            .then(function(response) {
                // Success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                submitBtn.innerHTML = 'Send Message<i class="fas fa-paper-plane"></i>';
            }, function(error) {
                console.error('Failed to send email:', error);
                alert('Failed to send message. Please try again or contact us directly on WhatsApp.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                submitBtn.innerHTML = 'Send Message<i class="fas fa-paper-plane"></i>';
            });
        });
    }
}

// ========== PRODUCT ORDERING ========== 
function orderProduct(productName) {
    const message = encodeURIComponent(`Hello Penuel Chocolate! I'm interested in ordering: ${productName}. Please provide pricing and availability details. Thank you!`);
    const whatsappURL = `https://wa.me/256755831247?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// ========== QUICK VIEW ========== 
function openQuickView(product) {
    // Quick view functionality - can be expanded
}

// ========== PARALLAX EFFECTS ========== 
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========== UPDATE YEAR ========== 
function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// ========== CONSOLE BRANDING ========== 
console.log('%c🍫 Penuel Chocolate', 'color: #8B4513; font-size: 24px; font-weight: bold;');
console.log('%cBean to Bar Excellence from Uganda', 'color: #D2691E; font-size: 14px;');
console.log('%cWebsite crafted with ❤️', 'color: #6D4C41; font-size: 12px;');

// ========== INTL TEL INPUT INITIALIZATION ========== 
function initIntlTelInput() {
    const phoneInputField = document.querySelector("#phoneInput");
    if (phoneInputField && window.intlTelInput) {
        window.intlTelInput(phoneInputField, {
            initialCountry: "ug",
            preferredCountries: ["ug", "ke", "tz", "rw"],
            separateDialCode: true,
            formatOnDisplay: true,
            onlyCountries: undefined
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntlTelInput);
} else {
    initIntlTelInput();
}
