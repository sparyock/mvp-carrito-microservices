package com.mvp.sales_service.repository;

import com.mvp.sales_service.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacturaRepository extends JpaRepository<Factura, Long> {
}