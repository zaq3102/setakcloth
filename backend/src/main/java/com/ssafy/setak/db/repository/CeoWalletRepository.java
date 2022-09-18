package com.ssafy.setak.db.repository;

import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.CeoWallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CeoWalletRepository extends JpaRepository<CeoWallet, Long> {
}
