package com.mvp.sales_service.client;

import com.mvp.sales_service.model.Producto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "products-service", url = "http://localhost:8082")
public interface ProductServiceClient {

    @GetMapping("/products/{id}")
    Producto obtenerProducto(@PathVariable("id") Long id);

    @PutMapping("/products/{id}/stock")
    void reducirStock(@PathVariable("id") Long id, @RequestParam("cantidad") Integer cantidad);
}