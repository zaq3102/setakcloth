package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CeoUserRepository extends JpaRepository<CeoUser, Long> {

    boolean existsByEmail(String email);

    Optional<CeoUser> findByEmail(String email);
}
