// ===== MOBILE MENU FUNCTIONALITY =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const closeMobileMenu = document.getElementById('closeMobileMenu');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenuFunc() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
}

if (closeMobileMenu) {
    closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);
}

// ===== BACK TO TOP FUNCTIONALITY =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

if (searchIcon && searchInput) {
    searchIcon.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Searching for:', searchTerm);
            // Add your search logic here
            alert(`Searching for: ${searchTerm}`);
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching for:', searchTerm);
                alert(`Searching for: ${searchTerm}`);
            }
        }
    });
}

// ===== PAYMENT MODAL FUNCTIONALITY =====
const modal = document.getElementById('paymentModal');
const upiModal = document.getElementById('upiModal');
const successModal = document.getElementById('successModal');
const closeBtn = document.getElementsByClassName('close')[0];
const closeUpiBtn = document.getElementsByClassName('close-upi')[0];
const closeSuccessBtn = document.getElementsByClassName('close-success')[0];
const itemLinks = document.getElementsByClassName('item-link');
const paymentForm = document.getElementById('paymentForm');
const cardDetails = document.querySelector('.card-details');
const paymentOptions = document.getElementsByName('payment');
const upiBackBtn = document.getElementById('upiBackBtn');

// Show modal when clicking on any item
if (itemLinks) {
    Array.from(itemLinks).forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (modal) {
                modal.style.display = "block";
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

// Close modal functions
function closeModal(modalElement) {
    if (modalElement) {
        modalElement.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

if (closeBtn) {
    closeBtn.onclick = function() {
        closeModal(modal);
    }
}

if (closeUpiBtn) {
    closeUpiBtn.onclick = function() {
        closeModal(upiModal);
    }
}

if (closeSuccessBtn) {
    closeSuccessBtn.onclick = function() {
        closeModal(successModal);
    }
}

if (upiBackBtn) {
    upiBackBtn.onclick = function() {
        closeModal(upiModal);
        if (modal) {
            modal.style.display = "block";
        }
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal(modal);
    }
    if (event.target == upiModal) {
        closeModal(upiModal);
    }
    if (event.target == successModal) {
        closeModal(successModal);
    }
}

// Show/hide card details based on payment method
if (paymentOptions && cardDetails) {
    Array.from(paymentOptions).forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'credit' || this.value === 'debit') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

// Show success modal
function showSuccessModal() {
    if (successModal) {
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            closeModal(successModal);
        }, 2500);
    }
}

// Handle payment form submission
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const selected = Array.from(paymentOptions).find(opt => opt.checked);
        
        if (selected && selected.value === 'upi') {
            closeModal(modal);
            if (upiModal) {
                upiModal.style.display = "block";
                document.body.style.overflow = 'hidden';
            }
            return;
        }
        
        closeModal(modal);
        showSuccessModal();
    });
}

// UPI modal functionality
const upiOptionBtns = document.querySelectorAll('.upi-option-btn');
const upiQrSection = document.querySelector('.upi-qr-section');
const upiIdSection = document.querySelector('.upi-id-section');
const upiIdSubmitBtn = document.querySelector('.upi-id-section .pay-button');

if (upiOptionBtns.length > 0) {
    upiOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            upiOptionBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show/hide sections based on selection
            if (this.dataset.option === 'qr') {
                if (upiQrSection) {
                    upiQrSection.style.display = 'block';
                    upiQrSection.classList.add('active');
                }
                if (upiIdSection) {
                    upiIdSection.style.display = 'none';
                    upiIdSection.classList.remove('active');
                }
            } else {
                if (upiQrSection) {
                    upiQrSection.style.display = 'none';
                    upiQrSection.classList.remove('active');
                }
                if (upiIdSection) {
                    upiIdSection.style.display = 'block';
                    upiIdSection.classList.add('active');
                }
            }
        });
    });
}

// UPI ID submission
if (upiIdSubmitBtn) {
    upiIdSubmitBtn.onclick = function(e) {
        e.preventDefault();
        closeModal(upiModal);
        showSuccessModal();
    }
}

// ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== BOX HOVER ANIMATION =====
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== LAZY LOADING FOR IMAGES =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        }
    });
}, observerOptions);

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    img.classList.add('loading');
    imageObserver.observe(img);
});

// ===== FORM VALIDATION =====
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff0000';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Add validation to payment form
if (paymentForm) {
    const formInputs = paymentForm.querySelectorAll('input[type="text"], input[type="tel"]');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff0000';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(255, 0, 0)') {
                this.style.borderColor = '#ddd';
            }
        });
    });
}

// ===== SEARCH SUGGESTIONS (OPTIONAL) =====
const searchSuggestions = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Beauty Products',
    'Books',
    'Sports',
    'Toys',
    'Mobile Phones',
    'Laptops',
    'Furniture'
];

if (searchInput) {
    searchInput.addEventListener('focus', function() {
        // You can create a dropdown with suggestions here
        console.log('Search suggestions:', searchSuggestions);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== CONSOLE LOG FOR DEBUGGING =====
console.log('Shopwise Clone - Optimized Version Loaded');
console.log('Features: Mobile Menu, Payment Modal, Smooth Scrolling, Lazy Loading');

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Trap focus in modal when open
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
        
        if (e.key === 'Escape') {
            closeModal(element);
        }
    });
}

// Apply focus trap to modals
if (modal) trapFocus(modal);
if (upiModal) trapFocus(upiModal);
if (successModal) trapFocus(successModal);
