package com.ssafy.setak.api.service;

import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.CeoWallet;
import com.ssafy.setak.db.entity.UserWallet;
import com.ssafy.setak.db.repository.CeoUserRepository;
import com.ssafy.setak.db.repository.CeoWalletRepository;
import com.ssafy.setak.db.repository.UserWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
@Service
public class CeoUserWalletService {



    @Autowired
    private CeoWalletRepository ceoUserWalletRepository;
    public CeoWallet createWallet(String walletAddr ) throws IOException {

        CeoWallet ceoWallet = new CeoWallet();
        ceoWallet.setWalletAddr(walletAddr);
        ceoWallet.setBalance(0);
        ceoUserWalletRepository.save(ceoWallet);

        return ceoWallet;

    }
}
