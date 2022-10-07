package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.LaundryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaundryItemRepository extends JpaRepository<LaundryItem, Long> {
}
