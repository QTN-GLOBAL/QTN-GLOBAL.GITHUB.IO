/* =========================
   BASE + CART ENGINE (SOURCE OF TRUTH)
========================= */

const Cart = {

    key: "cart",

    get() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    },

    set(cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
        document.dispatchEvent(new Event("cartUpdated"));
    },

    add(item) {

        let cart = this.get();

        const exist = cart.find(i =>
            i.name === item.name && i.spec === item.spec
        );

        if (exist) {
            exist.quantity += item.quantity;
        } else {
            cart.push(item);
        }

        this.set(cart);
    },

    remove(index) {

        let cart = this.get();
        cart.splice(index, 1);
        this.set(cart);
    },

    clear() {
        this.set([]);
    }
};

/* =========================
   PRODUCTS
========================= */

function getProducts() {
    return window.products || [];
}

/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const cart = Cart.get();

    let total = 0;
    cart.forEach(i => total += i.quantity || 0);

    const el = document.getElementById("cartCount");
    if (el) el.innerText = total;
}

/* =========================
   NAVIGATION
========================= */

function goHomeAndCategory(category) {
    sessionStorage.setItem("filterCategory", category);
    window.location.href = "index.html";
}

function goHomeAndBrand(brand) {
    sessionStorage.setItem("filterBrand", brand