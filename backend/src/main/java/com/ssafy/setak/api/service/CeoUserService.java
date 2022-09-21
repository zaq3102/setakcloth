package com.ssafy.setak.api.service;
import com.ssafy.setak.api.request.UserRegisterReq;
import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.CeoWallet;
import com.ssafy.setak.db.entity.User;
import com.ssafy.setak.db.entity.UserWallet;
import com.ssafy.setak.db.repository.CeoUserRepository;

import com.ssafy.setak.db.repository.CeoWalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CeoUserService {

    @Autowired
    private CeoUserRepository ceoUserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private CeoUserWalletService ceoUserWalletService;

    public CeoUser createCeoUser(UserRegisterReq userInfo) throws IOException {
        CeoUser ceoUser = new CeoUser();
        ceoUser.setEmail(userInfo.getEmail());
        CeoWallet ceoWallet = ceoUserWalletService.createWallet(userInfo.getWalletAddr());

        ceoUser.setCeoWallet(ceoWallet);
        ceoUser.setPwd(passwordEncoder.encode(userInfo.getPwd()));
        ceoUser.setSocial(false);
        ceoUser.setWithdrawn(false);
        ceoUserRepository.save(ceoUser);
        return ceoUser;

    }


}
