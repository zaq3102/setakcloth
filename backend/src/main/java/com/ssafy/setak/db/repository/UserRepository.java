package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.Order;
import com.ssafy.setak.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByNickName(String nickName);

    Optional<User> findByEmail(String email);
}
