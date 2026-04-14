package com.mvp.sales_service.repository;

import com.mvp.sales_service.model.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
} 