const express = require('express');
const res = require('express/lib/response');
const Producto = require('../models/Producto');
const path = require("path");
const { unlink } = require("fs-extra");
express.json();

exports.crearProducto = async (req, res) => {
    /* MONGO 
    try {
        let producto;
        producto = new Producto(req.body);
        await producto.save();
        res.send(producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error de insercion');
    }
    */
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('INSERT INTO products set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        });
    });
}

exports.obtenerProductos = async (req, res) => {
    /* MONGO
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ede consulta');
    }
    */
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM products', (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        });
    });
}

exports.actualizarProducto = async (req, res) => {
    /* MONGO
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
    */
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('UPDATE products SET ? WHERE id=?', [req.body, req.params.id], (err, row) => {
            if (err) return res.send(err)
            res.json(row)
        });
    });
}

exports.obtenerProducto = async (req, res) => {
    /* MONGO
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
    */
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM products WHERE id=?', [req.params.id], (err, row) => {
            if (err) return res.send(err)
            console.log(req.params.id)
            console.log(row)
            res.json(row[0])
        });
    });
}

exports.eliminarProducto = async (req, res) => {
    /* MONGO
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
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('DELETE FROM books WHERE id=?', [req.body.id], (err, rows) => {
            if (err) return res.send(err)
            res.send('libro eliminado....!!!')
        });
    });
    */
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM products WHERE id=?', [req.params.id], (err, row) => {
            if (err) return res.send(err)
            unlink(path.resolve("./image/"+row[0].imagen))
            console.log(req.params.id)
            conn.query('DELETE FROM products WHERE id=?', [req.params.id], (err, rows) => {
                if (err) return res.send(err)
                res.json({ msg: 'Producto eliminado con exito' });
            });
        });
    });
}
exports.eliminarImagen = async (req, res) => {
    /* MONGO
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
    */
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('SELECT * FROM products WHERE id=?', [req.params.id], (err, row) => {
            if (err) return res.send(err)
            unlink(path.resolve("./image/"+row[0].imagen))
            res.json({ msg: 'Producto eliminado con exito' });
        });
    });
}
