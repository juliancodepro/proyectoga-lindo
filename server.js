const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Lista de productos
let productos = [
    // { nombre: 'Iphone 13 Pro Max', precio: 50.00, imagen: '' },

];

// Obtener productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Agregar un producto con imagen
app.post('/agregar-producto', upload.single('imagen'), (req, res) => {
    const nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        imagen: `/uploads/${req.file.filename}`
    };
    productos.push(nuevoProducto);
    res.json({ mensaje: 'Producto agregado con éxito', producto: nuevoProducto });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});