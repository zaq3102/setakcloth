package com.ssafy.setak.db.repository;

import com.ssafy.setak.api.service.JwtService;
import com.ssafy.setak.db.entity.Order;
import com.ssafy.setak.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByCeoEmail(String email);


    boolean existsByNickName(String nickName);


    Optional<User> findByUserEmail(String email);

    boolean existsByUserEmail(String email);

    Optional<User> findByCeoEmail(String email);
}
