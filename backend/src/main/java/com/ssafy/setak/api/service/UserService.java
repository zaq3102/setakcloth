package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.UserRegistReq;
import com.ssafy.setak.db.entity.User;
import com.ssafy.setak.db.entity.UserWallet;
import com.ssafy.setak.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.time.LocalDate;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  UserWalletService userWalletService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public User createUser(UserRegistReq userInfo) throws IOException{

        User user = new User();
        user.setEmail(userInfo.getEmail());
        UserWallet userWallet =  userWalletService.createWallet(user.getAddr());
        user.setUserWallet(userWallet);
        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));
        userRepository.save(user);
        System.out.println(user.getId()+"테스트입니다");
        return (user);



    }
}
