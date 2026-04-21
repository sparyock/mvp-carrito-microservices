package com.mvp.sales_service.controller;

import com.mvp.sales_service.model.Carrito;
import com.mvp.sales_service.model.CarritoDetalle;
import com.mvp.sales_service.model.Factura;
import com.mvp.sales_service.service.SalesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
public class SalesController {

    private final SalesService service;

    public SalesController(SalesService service) {
        this.service = service;
    }

    @PostMapping("/cart")
    public Carrito crearCarrito(@RequestBody Carrito carrito) {
        return service.crearCarrito(carrito);
    }

    @PostMapping("/cart/{cartId}/items")
    public CarritoDetalle agregarProducto(@PathVariable Long cartId, @RequestBody CarritoDetalle detalle) {
        return service.agregarProducto(cartId, detalle);
    }

    @GetMapping("/cart/{cartId}")
    public List<CarritoDetalle> verCarrito(@PathVariable Long cartId) {
        return service.verCarrito(cartId);
    }

    @PostMapping("/invoice/{cartId}")
    public Factura generarFactura(@PathVariable Long cartId) {
        return service.generarFactura(cartId);
    }
}