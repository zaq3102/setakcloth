package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.CeoUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CeoUserRepository extends JpaRepository<CeoUser, Long> {

    boolean existsByEmail(String email);
}
