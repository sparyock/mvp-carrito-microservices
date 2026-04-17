package com.mvp.sales_service.controller;

import com.mvp.sales_service.model.AgregarProductoDTO;
import com.mvp.sales_service.model.Carrito;
import com.mvp.sales_service.model.CarritoDetalle;
import com.mvp.sales_service.model.Factura;
import com.mvp.sales_service.service.SalesService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Carrito> crearCarrito(@RequestParam Long usuarioId) {
        Carrito carrito = service.crearCarrito(usuarioId);
        return ResponseEntity.ok(carrito);
    }

    @PostMapping("/cart/{cartId}/items")
    public ResponseEntity<CarritoDetalle> agregarProducto(@PathVariable Long cartId, @Valid @RequestBody AgregarProductoDTO dto) {
        CarritoDetalle detalle = service.agregarProducto(cartId, dto);
        return ResponseEntity.ok(detalle);
    }

    @GetMapping("/cart/{cartId}")
    public ResponseEntity<List<CarritoDetalle>> verCarrito(@PathVariable Long cartId) {
        List<CarritoDetalle> detalles = service.verCarrito(cartId);
        return ResponseEntity.ok(detalles);
    }

    @PostMapping("/invoice/{cartId}")
    public ResponseEntity<Factura> generarFactura(@PathVariable Long cartId) {
        Factura factura = service.generarFactura(cartId);
        return ResponseEntity.ok(factura);
    }
}