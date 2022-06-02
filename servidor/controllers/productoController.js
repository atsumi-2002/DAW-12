const res = require('express/lib/response');
const Producto = require('../models/Producto');
const path = require("path");
const { unlink } = require("fs-extra");

exports.crearProducto = async (req, res) => {
    try {
        let producto;
        producto = new Producto(req.body);
        await producto.save();
        res.send(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de insercion');
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ede consulta');
    }
}

exports.actualizarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio, imagen } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;
        producto.imagen = imagen;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true });
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ede actualizacion');
    }
}

exports.obtenerProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio, imagen } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ede actualizacion');
    }
}

exports.eliminarProducto = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio, imagen } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }

        await Producto.findOneAndRemove({ _id: req.params.id })
        unlink(path.resolve("./image/"+producto.imagen))
        res.json({ msg: 'Producto eliminado con exito' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ede actualizacion');
    }
}
exports.eliminarImagen = async (req, res) => {
    try {
        const { nombre, categoria, ubicacion, precio, imagen } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' });
        }
        unlink(path.resolve("./image/"+producto.imagen))
        res.json({ msg: 'Producto eliminado con exito' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ede actualizacion');
    }
}
