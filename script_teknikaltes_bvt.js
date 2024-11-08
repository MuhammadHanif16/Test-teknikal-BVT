// Login valid
describe('Sauce Demo Login Test', () => {
  it('should login with valid credentials', () => {
    // Visit halaman login Sauce Demo
    cy.visit('https://www.saucedemo.com/');

    // Masukkan username dan password
    cy.get('#user-name').type('standard_user');  // Username valid
    cy.get('#password').type('secret_sauce');    // Password valid

    // Klik tombol login
    cy.get('#login-button').click();

    // Verifikasi halaman setelah login
    cy.url().should('include', '/inventory.html'); // Memastikan URL berisi '/inventory.html'
    cy.get('.inventory_list').should('be.visible'); // Memastikan daftar produk muncul
  });
});

// Login invalid
describe('Sauce Demo Login Invalid Test', () => {
  it('should show an error with invalid credentials', () => {
    // Visit halaman login Sauce Demo
    cy.visit('https://www.saucedemo.com/');

    // Masukkan username dan password yang salah
    cy.get('#user-name').type('invalid_user');  // Username tidak valid
    cy.get('#password').type('invalid_password'); // Password tidak valid

    // Klik tombol login
    cy.get('#login-button').click();

    // Verifikasi pesan error
    cy.get('.error-message-container')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });
});

// Logout test
describe('Sauce Demo Logout Test', () => {
  it('should allow user to logout successfully', () => {
    // Login terlebih dahulu
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verifikasi login berhasil
    cy.url().should('include', '/inventory.html');

    // Klik menu burger dan pilih logout
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();

    // Verifikasi halaman kembali ke login
    cy.url().should('include', '/index.html');
    cy.get('#login-button').should('be.visible'); // Pastikan tombol login muncul
  });
});

//Add item to cart
describe('Sauce Demo Add to Cart Test', () => {
  it('should add item to the cart', () => {
    // Login terlebih dahulu
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verifikasi halaman setelah login
    cy.url().should('include', '/inventory.html');

    // Tambahkan item pertama ke keranjang
    cy.get('.inventory_item').first().find('.btn_inventory').click();

    // Verifikasi jumlah item dalam keranjang
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });
});

//Checkout process
describe('Sauce Demo Checkout Test', () => {
  it('should complete the checkout process', () => {
    // Login terlebih dahulu
    cy.visit('https://www.saucedemo.com/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Verifikasi halaman setelah login
    cy.url().should('include', '/inventory.html');

    // Tambahkan item pertama ke keranjang
    cy.get('.inventory_item').first().find('.btn_inventory').click();

    // Pergi ke halaman keranjang
    cy.get('.shopping_cart_link').click();

    // Klik tombol checkout
    cy.get('.btn_action').click();

    // Isi detail pengiriman
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');

    // Klik tombol untuk melanjutkan
    cy.get('.btn_primary').click();

    // Verifikasi halaman konfirmasi
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
  });
});
commit
