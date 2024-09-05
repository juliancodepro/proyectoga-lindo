document.getElementById('abrirModal').addEventListener('click', function() {
    document.getElementById('modalProducto').style.display = 'flex';
});

document.getElementById('cerrarModal').addEventListener('click', function() {
    document.getElementById('modalProducto').style.display = 'none';
});

document.getElementById('formularioProducto').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombreProducto').value);
    formData.append('precio', document.getElementById('precioProducto').value);
    formData.append('imagen', document.getElementById('imagenProducto').files[0]);

    const response = await fetch('/agregar-producto', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    alert(result.mensaje);
    document.getElementById('modalProducto').style.display = 'none';
    cargarProductos();
});

async function cargarProductos() {
    const response = await fetch('/productos');
    const productos = await response.json();
    const productosContainer = document.getElementById('listaProductos');
    productosContainer.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <img src="${producto.imagen}" alt="${producto.nombre}">
        `;
        productosContainer.appendChild(productoDiv);
    });
}

cargarProductos();