package com.ssafy.setak.api.service;
import com.ssafy.setak.db.entity.UserWallet;
import com.ssafy.setak.db.repository.UserWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class UserWalletService {

    @Autowired
    private UserWalletRepository userWalletRepository;

    public UserWallet createWallet(String walletAddr ) throws IOException {

        UserWallet userWallet = new UserWallet();
        userWallet.setWalletAddr(walletAddr);
        userWallet.setBalance(0);
        userWalletRepository.save(userWallet);
        System.out.println(userWallet.getId()+"테스트입니다");
        return userWallet;



    }


}
