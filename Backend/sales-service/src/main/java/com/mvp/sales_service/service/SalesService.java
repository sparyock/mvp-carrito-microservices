package com.mvp.sales_service.service;

import com.mvp.sales_service.client.ProductServiceClient;
import com.mvp.sales_service.exception.ResourceNotFoundException;
import com.mvp.sales_service.model.*;
import com.mvp.sales_service.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SalesService {

    private final CarritoRepository carritoRepository;
    private final CarritoDetalleRepository carritoDetalleRepository;
    private final FacturaRepository facturaRepository;
    private final DetalleFacturaRepository detalleFacturaRepository;
    private final ProductServiceClient productServiceClient;

    public SalesService(CarritoRepository carritoRepository,
                        CarritoDetalleRepository carritoDetalleRepository,
                        FacturaRepository facturaRepository,
                        DetalleFacturaRepository detalleFacturaRepository,
                        ProductServiceClient productServiceClient) {
        this.carritoRepository = carritoRepository;
        this.carritoDetalleRepository = carritoDetalleRepository;
        this.facturaRepository = facturaRepository;
        this.detalleFacturaRepository = detalleFacturaRepository;
        this.productServiceClient = productServiceClient;
    }

    public Carrito crearCarrito(Long usuarioId) {
        Carrito carrito = new Carrito();
        carrito.setUsuarioId(usuarioId);
        carrito.setEstado("ABIERTO");
        return carritoRepository.save(carrito);
    }

    public CarritoDetalle agregarProducto(Long carritoId, AgregarProductoDTO dto) {
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con ID: " + carritoId));

        if (!"ABIERTO".equals(carrito.getEstado())) {
            throw new IllegalArgumentException("El carrito no está abierto");
        }

        Producto producto = productServiceClient.obtenerProducto(dto.getProductoId());

        CarritoDetalle detalle = new CarritoDetalle();
        detalle.setCarritoId(carritoId);
        detalle.setProductoId(dto.getProductoId());
        detalle.setCantidad(dto.getCantidad());
        detalle.setPrecioUnitario(producto.getPrecio());
        detalle.setSubtotal(dto.getCantidad() * producto.getPrecio());

        return carritoDetalleRepository.save(detalle);
    }

    public List<CarritoDetalle> verCarrito(Long carritoId) {
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con ID: " + carritoId));

        return carritoDetalleRepository.findByCarritoId(carritoId);
    }

    public Factura generarFactura(Long carritoId) {
        Carrito carrito = carritoRepository.findById(carritoId)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito no encontrado con ID: " + carritoId));

        if (!"ABIERTO".equals(carrito.getEstado())) {
            throw new IllegalArgumentException("El carrito ya fue facturado");
        }

        List<CarritoDetalle> detallesCarrito = carritoDetalleRepository.findByCarritoId(carritoId);

        double total = detallesCarrito.stream()
                .mapToDouble(CarritoDetalle::getSubtotal)
                .sum();

        Factura factura = new Factura();
        factura.setUsuarioId(carrito.getUsuarioId());
        factura.setFecha(LocalDateTime.now());
        factura.setTotal(total);

        Factura facturaGuardada = facturaRepository.save(factura);

        for (CarritoDetalle detalleCarrito : detallesCarrito) {
            DetalleFactura detalleFactura = new DetalleFactura();
            detalleFactura.setFacturaId(facturaGuardada.getId());
            detalleFactura.setProductoId(detalleCarrito.getProductoId());
            detalleFactura.setCantidad(detalleCarrito.getCantidad());
            detalleFactura.setPrecioUnitario(detalleCarrito.getPrecioUnitario());
            detalleFactura.setSubtotal(detalleCarrito.getSubtotal());
            detalleFacturaRepository.save(detalleFactura);

            // Reducir stock
            productServiceClient.reducirStock(detalleCarrito.getProductoId(), detalleCarrito.getCantidad());
        }

        carrito.setEstado("FACTURADO");
        carritoRepository.save(carrito);

        return facturaGuardada;
    }
}