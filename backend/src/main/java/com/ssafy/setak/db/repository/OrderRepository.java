package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findByLaundryId(Long laundryId);

}
