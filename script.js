document.addEventListener('DOMContentLoaded', () => {
    // Get elements for navigation bar and cart icon
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');
    const cartIcon = document.querySelector('#lg-bag a');
    const cartCount = document.createElement('span');
    cartCount.classList.add('cart-count');
    cartIcon.appendChild(cartCount);

    // Add event listener to open navigation bar
    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }

    // Add event listener to close navigation bar
    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }

    // Handle "View Details" button click
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: button.getAttribute('data-price'),
                img: button.getAttribute('data-img'),
                description: button.getAttribute('data-description')
            };
            localStorage.setItem('product', JSON.stringify(product));
            window.location.href = 'product.html';
        });
    });

    // Handle "Add to Cart" button click
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const quantity = parseInt(document.querySelector('input[type="number"]').value);
            if (quantity <= 0) {
                alert('Invalid quantity');
                return;
            }

            const product = {
                id: Date.now(),
                name: document.getElementById('productName').textContent,
                price: parseFloat(document.getElementById('productPrice').textContent.replace('$', '')),
                size: document.querySelector('select').value,
                quantity: quantity,
                img: document.getElementById('MainImg').src
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert('Product added to cart');
        });
    }

    // Update cart count on page load
    updateCartCount();

    // Load cart items if on cart page
    if (window.location.pathname.includes('cart.html')) {
        loadCartItems();
    }

    // Load product details if on product page
    const product = JSON.parse(localStorage.getItem('product'));
    if (product) {
        document.getElementById('MainImg').src = product.img;
        const smallImgs = document.querySelectorAll('.small-img');
        smallImgs.forEach((img, index) => {
            img.src = product.img;
            img.addEventListener('click', () => {
                document.getElementById('MainImg').src = img.src;
            });
        });
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price}`;
        document.getElementById('productDescription').textContent = product.description;
    }
});

// Update cart count display
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline-block' : 'none';
    }
}

// Load cart items and display them in the cart table
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart tbody');
    if (cartTableBody) {
        cartTableBody.innerHTML = '';

        let subtotal = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><i class="fa-solid fa-circle-xmark" data-id="${item.id}"></i></td>
                <td><img src="${item.img}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" data-id="${item.id}"></td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
            subtotal += item.price * item.quantity;
        });

        const subtotalElement = document.querySelector('#subtotal td:nth-child(2)');
        const totalElement = document.querySelector('#subtotal td:nth-child(4)');
        if (subtotalElement && totalElement) {
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            totalElement.textContent = `$${subtotal.toFixed(2)}`;
        }
    }

    // Handle remove item from cart
    document.querySelectorAll('.fa-circle-xmark').forEach(icon => {
        icon.addEventListener('click', () => {
            removeCartItem(icon.getAttribute('data-id'));
        });
    });

    // Handle quantity change in cart
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', () => {
            const quantity = parseInt(input.value);
            if (quantity <= 0) {
                alert('Invalid quantity');
                return;
            }
            updateCartItemQuantity(input.getAttribute('data-id'), quantity);
        });
    });
}

// Remove item from cart
function removeCartItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

// Update item quantity in cart
function updateCartItemQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.map(item => {
        if (item.id == id) {
            item.quantity = quantity;
        }
        return item;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Handle coupon application
document.querySelector('#coupon #apply-coupon')?.addEventListener('click', () => {
    const couponCode = document.querySelector('#coupon input').value;
    let discount = 0;
    if (couponCode === 'DISCOUNT10') {
        alert('10% Discount applied')
        discount = 0.1;
    } else if (couponCode === 'DISCOUNT20') {
        alert('20% Discount applied')
        discount = 0.2;
    } else {
        alert('Invalid coupon code');
        return;
    }

    let subtotal = parseFloat(document.querySelector('#subtotal td:nth-child(2)').textContent.replace('$', ''));
    let total = subtotal - (subtotal * discount); // Calculate total after discount

    document.querySelector('#subtotal td:nth-child(4)').textContent = `$${total.toFixed(2)}`;
    alert('Coupon applied successfully');
});

// Handle checkout button click
document.querySelector('#subtotal button')?.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Cart is empty');
    } else {
        alert('Proceeding to checkout');
        // Add checkout logic here
    }
});


