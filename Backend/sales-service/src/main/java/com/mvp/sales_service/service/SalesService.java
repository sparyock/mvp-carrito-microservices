package com.mvp.sales_service.service;

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

    public SalesService(CarritoRepository carritoRepository,
                        CarritoDetalleRepository carritoDetalleRepository,
                        FacturaRepository facturaRepository,
                        DetalleFacturaRepository detalleFacturaRepository) {
        this.carritoRepository = carritoRepository;
        this.carritoDetalleRepository = carritoDetalleRepository;
        this.facturaRepository = facturaRepository;
        this.detalleFacturaRepository = detalleFacturaRepository;
    }

    public Carrito crearCarrito(Carrito carrito) {
        carrito.setEstado("ABIERTO");
        return carritoRepository.save(carrito);
    }

    public CarritoDetalle agregarProducto(Long carritoId, CarritoDetalle detalle) {
        detalle.setCarritoId(carritoId);
        detalle.setSubtotal(detalle.getCantidad() * detalle.getPrecioUnitario());
        return carritoDetalleRepository.save(detalle);
    }

    public List<CarritoDetalle> verCarrito(Long carritoId) {
        return carritoDetalleRepository.findByCarritoId(carritoId);
    }

    public Factura generarFactura(Long carritoId) {
        Carrito carrito = carritoRepository.findById(carritoId).orElse(null);

        if (carrito == null) {
            return null;
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
        }

        carrito.setEstado("FACTURADO");
        carritoRepository.save(carrito);

        return facturaGuardada;
    }
}