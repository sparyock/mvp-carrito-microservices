package com.mvp.sales_service.repository;

import com.mvp.sales_service.model.CarritoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarritoDetalleRepository extends JpaRepository<CarritoDetalle, Long> {
    List<CarritoDetalle> findByCarritoId(Long carritoId);
}