class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem('cart')) || [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.actualizarLocalStorage();
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
        this.actualizarLocalStorage();
    }

    actualizarLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.productos));
    }

    obtenerTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    mostrarCarritoEnDOM() {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';
        this.productos.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - ${producto.precio}$`;
            cartItems.appendChild(li);
            
            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.addEventListener('click', () => this.eliminarProducto(producto.id));
            li.appendChild(eliminarButton);
        });
        this.mostrarTotalEnDOM();
    }

    mostrarTotalEnDOM() {
        const totalAmountElement = document.getElementById('totalAmount');
        totalAmountElement.textContent = this.obtenerTotal();
    }
}

const carrito = new Carrito();

const productos = [
    new Producto(1, 'Funda de Silicona', 10),
    new Producto(2, 'Funda de Cuero', 20),
    new Producto(3, 'Funda Transparente', 15),
    new Producto(4, 'Funda con Diseño', 25)
];

function mostrarProductosEnDOM() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: ${producto.precio}$</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productContainer.appendChild(div);
    });
}

function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    carrito.agregarProducto(producto);
    carrito.mostrarCarritoEnDOM();
}

mostrarProductosEnDOM();