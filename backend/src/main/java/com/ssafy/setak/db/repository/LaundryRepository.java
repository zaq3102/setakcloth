package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.Laundry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;

@Repository
public interface LaundryRepository extends JpaRepository<Laundry, Long> {

    @Query("SELECT l, round(6371 * acos(cos(l.address.addrLat * 3.141592653589793 / 180.0) * cos(u.address.addrLat * 3.141592653589793 / 180.0) * cos((u.address.addrLng * 3.141592653589793 / 180.0) - (l.address.addrLng * 3.141592653589793 / 180.0)) + sin(l.address.addrLat * 3.141592653589793 / 180.0) * sin(u.address.addrLat * 3.141592653589793 / 180.0)),1) as distance, " +
            "AVG(o.reviewScore) AS score " +
            "FROM Laundry l, User u, Order o " +
            "WHERE u.id = 1 " +
            "AND l.id = o.laundry.id " +
            "AND round(6371 * acos(cos(l.address.addrLat * 3.141592653589793 / 180.0) * cos(u.address.addrLat * 3.141592653589793 / 180.0) * cos((u.address.addrLng * 3.141592653589793 / 180.0) - (l.address.addrLng * 3.141592653589793 / 180.0)) + sin(l.address.addrLat * 3.141592653589793 / 180.0) * sin(u.address.addrLat * 3.141592653589793 / 180.0)),1) <= 1.5 " +
            "GROUP BY o.laundry " +
            "ORDER BY distance")
    List<Tuple> selectAllLaundryOrderByDistance(@Param("userId") Long userId);

    @Query("SELECT l, round(6371 * acos(cos(l.address.addrLat * 3.141592653589793 / 180.0) * cos(u.address.addrLat * 3.141592653589793 / 180.0) * cos((u.address.addrLng * 3.141592653589793 / 180.0) - (l.address.addrLng * 3.141592653589793 / 180.0)) + sin(l.address.addrLat * 3.141592653589793 / 180.0) * sin(u.address.addrLat * 3.141592653589793 / 180.0)),1) as distance," +
            "AVG(o.reviewScore) AS score, " +
            "COUNT(o) AS cnt " +
            "FROM Laundry l, User u, Order o " +
            "WHERE u.id = 1 " +
            "AND l.id = o.laundry.id " +
            "AND round(6371 * acos(cos(l.address.addrLat * 3.141592653589793 / 180.0) * cos(u.address.addrLat * 3.141592653589793 / 180.0) * cos((u.address.addrLng * 3.141592653589793 / 180.0) - (l.address.addrLng * 3.141592653589793 / 180.0)) + sin(l.address.addrLat * 3.141592653589793 / 180.0) * sin(u.address.addrLat * 3.141592653589793 / 180.0)),1) <= 1.5 " +
            "GROUP BY o.laundry " +
            "ORDER BY cnt DESC")
    List<Tuple> selectAllLaundryOrderByOrder(@Param("userId") Long userId);

    @Query("SELECT l, round(6371 * acos(cos(l.address.addrLat * 3.141592653589793 / 180.0) * cos(u.address.addrLat * 3.141592653589793 / 180.0) * cos((u.address.addrLng * 3.141592653589793 / 180.0) - (l.address.addrLng * 3.141592653589793 / 180.0)) + sin(l.address.addrLat * 3.141592653589793 / 180.0) * sin(u.address.addrLat * 3.141592653589793 / 180.0)),1) as distance," +
            "AVG(o.reviewScore) AS score " +
            "FROM Laundry l, User u, Order o " +
            "WHERE u.id = 1 " +
            "AND l.id = o.laundry.id " +
            "AND round(6371 * acos(cos(l.address.addrLat * 3.141592653589793 / 180.0) * cos(u.address.addrLat * 3.141592653589793 / 180.0) * cos((u.address.addrLng * 3.141592653589793 / 180.0) - (l.address.addrLng * 3.141592653589793 / 180.0)) + sin(l.address.addrLat * 3.141592653589793 / 180.0) * sin(u.address.addrLat * 3.141592653589793 / 180.0)),1) <= 1.5 " +
            "GROUP BY o.laundry " +
            "ORDER BY score DESC")
    List<Tuple> selectAllLaundryOrderByScore(@Param("userId") Long userId);
}
