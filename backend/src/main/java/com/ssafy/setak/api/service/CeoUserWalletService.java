package com.ssafy.setak.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CeoUserWalletService {


    @Autowired
    private CeoWalletRepository ceoUserWalletRepository;

    public CeoWallet createWallet(String walletAddr) throws IOException {

        CeoWallet ceoWallet = new CeoWallet();
        ceoWallet.setWalletAddr(walletAddr);
        ceoWallet.setBalance(0);
        ceoUserWalletRepository.save(ceoWallet);

        return ceoWallet;

    }
}
