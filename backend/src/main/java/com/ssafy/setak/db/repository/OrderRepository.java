package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
