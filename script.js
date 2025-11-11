// Product Data for GVLLOW Merchandise
const products = [
    {
        id: 1,
        name: 'CD LIT',
        price: 14.99,
        description: 'Official GVLLOW digital album featuring exclusive tracks and unreleased content. High-quality audio format included.',
        image: 'GVLLOW MERCH/CD LIT - 14.99 USD/CD LIT FRONT.png',
        hoverImage: 'GVLLOW MERCH/CD LIT - 14.99 USD/CD LIT OPENED.png',
        sizes: ['Digital'],
        category: 'music',
        productPage: 'product-cd-lit.html'
    },
    {
        id: 2,
        name: 'TSHIRT IE GVLLOW',
        price: 25.00,
        description: 'Premium cotton t-shirt featuring the iconic GVLLOW IE design. Comfortable fit with high-quality print that won\'t fade.',
        image: 'GVLLOW MERCH/TSHIRT IE GVLLOW - 25 USD/TSHIRT 1 FRONT.png',
        hoverImage: 'GVLLOW MERCH/TSHIRT IE GVLLOW - 25 USD/TSHIRT 1 FOLDED.png',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'apparel',
        productPage: 'product-tshirt-ie.html'
    },
    {
        id: 3,
        name: 'TSHIRT LIT GVLLOW',
        price: 30.00,
        description: 'Exclusive LIT collection t-shirt made from premium materials. Features bold GVLLOW branding with a modern streetwear aesthetic.',
        image: 'GVLLOW MERCH/THSHIRT LIT GVLLOW - 30 USD/TSHIRT LIT FRONT.png',
        hoverImage: 'GVLLOW MERCH/THSHIRT LIT GVLLOW - 30 USD/TSHIRT LIT FOLDED.png',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'apparel',
        productPage: 'product-tshirt-lit.html'
    },
    {
        id: 4,
        name: 'PULLOVER RIP GVLLOW',
        price: 45.00,
        description: 'Comfortable pullover from the RIP collection. Perfect for casual wear with distinctive GVLLOW styling. Soft fabric blend for maximum comfort.',
        image: 'GVLLOW MERCH/PULLOVER RIP GVLLOW - 45 USD/PULLOVER RIP FRONT.png',
        hoverImage: 'GVLLOW MERCH/PULLOVER RIP GVLLOW - 45 USD/PULLOVER RIP BACK.png',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'apparel',
        productPage: 'product-pullover-rip.html'
    },
    {
        id: 5,
        name: 'HOODIE LIT GVLLOW',
        price: 65.00,
        description: 'Premium hoodie from the LIT collection. Heavy-weight cotton blend with drawstring hood and kangaroo pocket. Perfect for any weather.',
        image: 'GVLLOW MERCH/HODDIE LIT GVLLOW - 65 USD/HODDIE LIT FRONT.png',
        hoverImage: 'GVLLOW MERCH/HODDIE LIT GVLLOW - 65 USD/HODDIE LIT BACK.png',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'apparel',
        productPage: 'product-hoodie-lit.html'
    },
    {
        id: 6,
        name: 'HOODIE RIP GVLLOW',
        price: 65.00,
        description: 'Exclusive RIP collection hoodie featuring unique design elements. Premium construction with reinforced stitching and premium materials.',
        image: 'GVLLOW MERCH/HODDIE RIP GVLLOW - 65 USD/HODDIE RIP FRONT.png',
        hoverImage: 'GVLLOW MERCH/HODDIE RIP GVLLOW - 65 USD/HODDIE RIP BACK.png',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'apparel',
        productPage: 'product-hoodie-rip.html'
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productElements = document.querySelectorAll('.product');
const productModal = document.getElementById('product-modal');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const orderConfirmationModal = document.getElementById('order-confirmation-modal');

const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');

// Product Modal Elements
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const sizeSelector = document.getElementById('size-selector');
const sizesDropdown = document.getElementById('sizes');
const addToCartButton = document.getElementById('add-to-cart');

// Cart Modal Elements
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

// Close Buttons
const productClose = document.getElementById('product-close');
const cartClose = document.getElementById('cart-close');
const checkoutClose = document.getElementById('checkout-close');
const orderConfirmationClose = document.getElementById('order-confirmation-close');
const closeConfirmationButton = document.getElementById('close-confirmation-button');

// Checkout Form
const checkoutForm = document.getElementById('checkout-form');

// Current Product
let currentProduct = null;

// Initialize Event Listeners
function initializeEventListeners() {
    // Product click events - direct navigation to product pages
    productElements.forEach(item => {
        item.addEventListener('click', (e) => {
            const productId = parseInt(item.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            // Navigate directly to the product page
            if (product) {
                const productPages = [
                    'cd-lit.html',         // id 1
                    'tshirt-ie.html',      // id 2
                    'tshirt-lit.html',     // id 3
                    'pullover-rip.html',   // id 4
                    'hoodie-lit.html',     // id 5
                    'hoodie-rip.html'      // id 6
                ];
                
                const pageIndex = productId - 1;
                if (productPages[pageIndex]) {
                    window.location.href = productPages[pageIndex];
                }
            }
        });
    });

    // Modal close events
    if (productClose) productClose.addEventListener('click', () => closeModal(productModal));
    if (cartClose) cartClose.addEventListener('click', () => closeModal(cartModal));
    if (checkoutClose) checkoutClose.addEventListener('click', () => closeModal(checkoutModal));
    if (orderConfirmationClose) orderConfirmationClose.addEventListener('click', () => closeModal(orderConfirmationModal));
    if (closeConfirmationButton) closeConfirmationButton.addEventListener('click', () => closeModal(orderConfirmationModal));

    // Cart button
    if (cartButton) {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            openCartModal();
        });
    }

    // Add to cart button (both modal and product page)
    const addToCartButtons = document.querySelectorAll('#add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            addProductToCart();
        });
    });

    // Checkout button
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            openCheckoutModal();
        });
    }

    // Checkout form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            processOrder();
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === productModal) closeModal(productModal);
        if (event.target === cartModal) closeModal(cartModal);
        if (event.target === checkoutModal) closeModal(checkoutModal);
        if (event.target === orderConfirmationModal) closeModal(orderConfirmationModal);
    });
}

// Open Product Modal
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;

    modalImage.src = currentProduct.image;
    modalImage.alt = currentProduct.name;
    modalTitle.textContent = currentProduct.name;
    modalDescription.textContent = currentProduct.description;
    modalPrice.textContent = `$${currentProduct.price.toFixed(2)} USD`;

    // Handle size selection
    if (currentProduct.sizes.length > 1 && currentProduct.sizes[0] !== 'Digital') {
        sizeSelector.style.display = 'block';
        sizesDropdown.innerHTML = '';
        currentProduct.sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizesDropdown.appendChild(option);
        });
    } else {
        sizeSelector.style.display = 'none';
    }

    showModal(productModal);
}

// Add Product to Cart
function addProductToCart() {
    let product = currentProduct;
    
    // If we're on a product page, get product from button data
    const addButton = document.querySelector('#add-to-cart');
    if (addButton && addButton.dataset.productId && !currentProduct) {
        const productId = parseInt(addButton.dataset.productId);
        product = products.find(p => p.id === productId);
    }
    
    if (!product) return;

    let selectedSize = 'One Size';
    const sizeSelector = document.querySelector('#sizes');
    
    if (product.sizes.length > 1 && product.sizes[0] !== 'Digital') {
        selectedSize = sizeSelector ? sizeSelector.value : product.sizes[0];
    } else if (product.sizes[0] === 'Digital') {
        selectedSize = 'Digital';
    }

    const existingItem = cart.find(item => 
        item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            size: selectedSize,
            quantity: 1
        });
    }

    updateCartCount();
    
    // Close modal if we're in one
    if (productModal && productModal.style.display === 'block') {
        closeModal(productModal);
    }
    
    // Show success feedback
    showNotification('Added to cart!');
}

// Open Cart Modal
function openCartModal() {
    renderCartItems();
    showModal(cartModal);
}

// Render Cart Items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
        cartTotal.textContent = 'Total: $0.00 USD';
        checkoutButton.style.display = 'none';
        return;
    }

    checkoutButton.style.display = 'block';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>
                <p><strong>${item.name}</strong></p>
                <p>Size: ${item.size} | Qty: ${item.quantity}</p>
            </div>
            <div style="text-align: right;">
                <p><strong>$${(item.price * item.quantity).toFixed(2)} USD</strong></p>
                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 0.9rem;">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)} USD`;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Open Checkout Modal
function openCheckoutModal() {
    closeModal(cartModal);
    showModal(checkoutModal);
}

// Process Order
function processOrder() {
    // Simulate order processing
    const formData = new FormData(checkoutForm);
    const orderData = Object.fromEntries(formData);
    
    // In a real application, you would send this data to your backend
    console.log('Order Data:', orderData);
    console.log('Cart Items:', cart);

    // Clear cart and show confirmation
    cart = [];
    updateCartCount();
    
    closeModal(checkoutModal);
    showModal(orderConfirmationModal);
    
    // Reset form
    checkoutForm.reset();
}

// Modal Helper Functions
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        font-weight: 600;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth Scrolling for Internal Links
function initializeSmoothScrolling() {
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
}

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize Everything When DOM is Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeSmoothScrolling();
    updateCartCount();
    
    // Add loading states for better UX
    document.body.classList.add('loaded');
    
    console.log('GVLLOW Store initialized successfully!');
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModals = [productModal, cartModal, checkoutModal, orderConfirmationModal];
        openModals.forEach(modal => {
            if (modal.style.display === 'block') {
                closeModal(modal);
            }
        });
    }
});

// Export functions for global access
window.removeFromCart = removeFromCart;
