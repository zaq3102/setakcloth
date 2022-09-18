package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.Order;
import com.ssafy.setak.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
