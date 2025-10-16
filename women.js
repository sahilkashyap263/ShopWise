// ===== WOMEN'S PAGE SPECIFIC FUNCTIONALITY =====

// Generate random order ID for success modal
function generateOrderId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `#SW-${year}-${month}-${day}-${random}`;
}

// Update order ID in success modal
const orderIdElement = document.querySelector('.order-id');
if (orderIdElement) {
    orderIdElement.textContent = `Order ID: ${generateOrderId()}`;
}

// ===== FILTER FUNCTIONALITY =====
const filterButtons = document.querySelectorAll('.filter-btn');
const itemLinks = document.querySelectorAll('.item-link');

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.dataset.filter;
        
        // Filter items with animation
        itemLinks.forEach((item, index) => {
            const category = item.dataset.category;
            
            if (filterValue === 'all' || category === filterValue) {
                // Show item with staggered animation
                setTimeout(() => {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                }, index * 50);
            } else {
                // Hide item
                item.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Scroll to items section smoothly
        const womensItems = document.querySelector('.womens-items');
        if (womensItems) {
            womensItems.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== SORT FUNCTIONALITY =====
const sortSelect = document.getElementById('sortSelect');
const womensItemsContainer = document.querySelector('.womens-items');

if (sortSelect && womensItemsContainer) {
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const itemsArray = Array.from(itemLinks);
        
        // Sort items based on selected option
        itemsArray.sort((a, b) => {
            switch(sortValue) {
                case 'price-low':
                    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                case 'price-high':
                    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                case 'rating':
                    const ratingA = a.querySelector('.rating').textContent.split('★').length - 1;
                    const ratingB = b.querySelector('.rating').textContent.split('★').length - 1;
                    return ratingB - ratingA;
                default:
                    return 0;
            }
        });
        
        // Clear and re-append sorted items with animation
        womensItemsContainer.innerHTML = '';
        itemsArray.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'fadeInUp 0.5s ease forwards';
                womensItemsContainer.appendChild(item);
            }, index * 50);
        });
    });
}

// ===== ADD TO FAVORITES FUNCTIONALITY =====
function toggleFavorite(event, element) {
    event.preventDefault();
    event.stopPropagation();
    
    const icon = element.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = '#ff4444';
        
        // Show notification
        showNotification('Added to favorites!');
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = '#666';
        
        showNotification('Removed from favorites');
    }
}

// Notification function
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #2ecc40;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.5s;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== ITEM QUICK VIEW =====
itemLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const item = this.querySelector('.item');
        item.style.transform = 'translateY(-8px)';
    });
    
    link.addEventListener('mouseleave', function() {
        const item = this.querySelector('.item');
        item.style.transform = 'translateY(0)';
    });
});

// ===== LAZY LOADING ENHANCEMENT =====
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.animation = 'fadeIn 0.5s ease forwards';
            imageObserver.unobserve(img);
        }
    });
}, observerOptions);

document.querySelectorAll('.womens-items img').forEach(img => {
    imageObserver.observe(img);
});

// ===== BREADCRUMB ANIMATION =====
const breadcrumb = document.querySelector('.breadcrumb');
if (breadcrumb) {
    breadcrumb.style.animation = 'slideInLeft 0.5s ease';
}

// ===== CATEGORY HEADER ANIMATION =====
const categoryHeader = document.querySelector('.category-header');
if (categoryHeader) {
    categoryHeader.style.animation = 'fadeInDown 0.6s ease';
}

// ===== SCROLL TO TOP WITH PROGRESS =====
let scrollProgress = 0;
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    if (backToTopBtn) {
        if (scrollTop > 300) {
            backToTopBtn.style.background = `linear-gradient(90deg, #f4a640 ${scrollProgress}%, #37475a ${scrollProgress}%)`;
        } else {
            backToTopBtn.style.background = '#37475a';
        }
    }
});

// ===== PRICE FORMATTING =====
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(price);
}

// ===== ADD ANIMATION KEYFRAMES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== ITEM COUNT DISPLAY =====
function updateItemCount() {
    const visibleItems = Array.from(itemLinks).filter(item => {
        return window.getComputedStyle(item).display !== 'none';
    });
    
    const countDisplay = document.querySelector('.item-count');
    if (countDisplay) {
        countDisplay.textContent = `Showing ${visibleItems.length} items`;
    }
}

// ===== ENHANCED PAYMENT MODAL FOR WOMEN'S PAGE =====
const paymentModalEnhanced = document.getElementById('paymentModal');

if (paymentModalEnhanced) {
    // Add selected item info to payment modal
    itemLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const itemTitle = this.querySelector('h3').textContent;
            const itemPrice = this.querySelector('.price').textContent.split(' ')[0];
            
            // Store selected item data
            sessionStorage.setItem('selectedItem', JSON.stringify({
                title: itemTitle,
                price: itemPrice
            }));
        });
    });
}

// ===== ADD SELECTED ITEM INFO TO MODAL =====
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    const selectedItemData = sessionStorage.getItem('selectedItem');
    if (selectedItemData) {
        const item = JSON.parse(selectedItemData);
        
        // Create order summary element if it doesn't exist
        let orderSummary = paymentForm.querySelector('.order-summary');
        if (!orderSummary) {
            orderSummary = document.createElement('div');
            orderSummary.className = 'order-summary';
            orderSummary.innerHTML = `
                <h3>Order Summary</h3>
                <div class="summary-item">
                    <span class="summary-label">${item.title}</span>
                    <span class="summary-value">${item.price}</span>
                </div>
                <div class="summary-item total">
                    <span class="summary-label">Total Amount</span>
                    <span class="summary-value">${item.price}</span>
                </div>
            `;
            orderSummary.style.cssText = `
                background: #f8f8f8;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 1px solid #ddd;
            `;
            paymentForm.insertBefore(orderSummary, paymentForm.firstChild);
        }
    }
}

// ===== RATING INTERACTION =====
document.querySelectorAll('.rating').forEach(rating => {
    rating.style.cursor = 'pointer';
    rating.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const count = this.querySelector('.rating-count');
        if (count) {
            const currentCount = parseInt(count.textContent.match(/\d+/)[0]);
            count.textContent = `(${currentCount + 1})`;
            showNotification('Thank you for your rating!');
        }
    });
});

// ===== DELIVERY INFO TOOLTIP =====
document.querySelectorAll('.delivery').forEach(delivery => {
    delivery.style.cursor = 'help';
    delivery.title = 'Delivered within 3-5 business days';
});

// ===== ITEM BADGE ANIMATION =====
document.querySelectorAll('.item-badge').forEach(badge => {
    badge.style.animation = 'pulse 2s ease-in-out infinite';
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ===== SEARCH ENHANCEMENT FOR WOMEN'S PAGE =====
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length > 2) {
            itemLinks.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                
                if (title.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
            
            updateItemCount();
        } else if (searchTerm.length === 0) {
            // Show all items when search is cleared
            itemLinks.forEach(item => {
                item.style.display = 'block';
            });
            updateItemCount();
        }
    });
}

// ===== PRICE RANGE INDICATOR =====
function calculatePriceRange() {
    const prices = Array.from(itemLinks).map(item => parseInt(item.dataset.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    return { min: minPrice, max: maxPrice };
}

// ===== SMOOTH ENTRY ANIMATION FOR ALL ITEMS =====
window.addEventListener('load', () => {
    itemLinks.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        }, index * 50);
    });
});

// ===== FILTER SECTION STICKY ON SCROLL =====
const filterSection = document.querySelector('.filter-section');
let filterSectionTop = 0;

if (filterSection) {
    filterSectionTop = filterSection.offsetTop;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > filterSectionTop) {
            filterSection.style.position = 'sticky';
            filterSection.style.top = '60px';
            filterSection.style.zIndex = '100';
            filterSection.style.backgroundColor = 'white';
            filterSection.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            filterSection.style.position = 'relative';
            filterSection.style.top = '0';
            filterSection.style.boxShadow = 'none';
        }
    });
}

// ===== PRINT FUNCTIONALITY =====
function printItem(itemElement) {
    const printWindow = window.open('', '', 'height=600,width=800');
    const itemHTML = itemElement.innerHTML;
    
    printWindow.document.write('<html><head><title>Print Item</title>');
    printWindow.document.write('<style>body{font-family:Arial;padding:20px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(itemHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// ===== SHARE FUNCTIONALITY =====
function shareItem(itemLink) {
    const itemTitle = itemLink.querySelector('h3').textContent;
    const itemPrice = itemLink.querySelector('.price').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: itemTitle,
            text: `Check out this amazing deal: ${itemTitle} for ${itemPrice}`,
            url: window.location.href
        }).then(() => {
            showNotification('Thanks for sharing!');
        }).catch(err => {
            console.log('Error sharing:', err);
        });
    } else {
        // Fallback: copy to clipboard
        const textToCopy = `${itemTitle} - ${itemPrice}\n${window.location.href}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification('Link copied to clipboard!');
        });
    }
}

// ===== INITIALIZE ITEM COUNT ON LOAD =====
updateItemCount();

// ===== CONSOLE LOG =====
console.log('Women\'s Page Enhanced Features Loaded');
console.log('Available features: Filter, Sort, Search, Animations');
console.log(`Total items: ${itemLinks.length}`);
console.log(`Price range: ₹${calculatePriceRange().min} - ₹${calculatePriceRange().max}`);