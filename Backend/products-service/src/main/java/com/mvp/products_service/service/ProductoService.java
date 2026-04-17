package com.mvp.products_service.service;

import com.mvp.products_service.exception.ResourceNotFoundException;
import com.mvp.products_service.model.Producto;
import com.mvp.products_service.model.ProductoDTO;
import com.mvp.products_service.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository repository;

    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    public Producto crearProducto(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());
        return repository.save(producto);
    }

    public List<Producto> listarProductos() {
        return repository.findAll();
    }

    public Producto obtenerProducto(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
    }

    public Producto actualizarProducto(Long id, ProductoDTO dto) {
        Producto producto = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));

        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());
        return repository.save(producto);
    }

    public void eliminarProducto(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }

    public void reducirStock(Long id, Integer cantidad) {
        Producto producto = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));

        if (producto.getStock() < cantidad) {
            throw new IllegalArgumentException("Stock insuficiente para el producto ID: " + id);
        }

        producto.setStock(producto.getStock() - cantidad);
        repository.save(producto);
    }
}