package com.mvp.products_service.service;

import com.mvp.products_service.model.Producto;
import com.mvp.products_service.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public Producto crearProducto(Producto producto) {
        return repository.save(producto);
    }

    public List<Producto> listarProductos() {
        return repository.findAll();
    }

    public Producto obtenerProducto(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Producto actualizarProducto(Long id, Producto productoActualizado) {
        Producto producto = repository.findById(id).orElse(null);

        if (producto != null) {
            producto.setNombre(productoActualizado.getNombre());
            producto.setDescripcion(productoActualizado.getDescripcion());
            producto.setPrecio(productoActualizado.getPrecio());
            producto.setStock(productoActualizado.getStock());
            return repository.save(producto);
        }

        return null;
    }

    public void eliminarProducto(Long id) {
        repository.deleteById(id);
    }
}