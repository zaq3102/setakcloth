package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
}
