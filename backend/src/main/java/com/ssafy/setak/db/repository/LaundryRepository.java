package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.Laundry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaundryRepository extends JpaRepository<Laundry, Long> {
}
