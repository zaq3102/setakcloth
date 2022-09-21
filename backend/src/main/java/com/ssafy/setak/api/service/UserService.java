package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.KakaoUserRegisterReq;
import com.ssafy.setak.api.request.UserRegisterReq;
import com.ssafy.setak.api.request.UserUpdateAddressReq;
import com.ssafy.setak.api.request.UserUpdateReq;
import com.ssafy.setak.db.entity.User;
import com.ssafy.setak.db.entity.UserWallet;
import com.ssafy.setak.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserWalletService userWalletService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public User createUser(UserRegisterReq userInfo) throws IOException {
        User user = new User();
        user.setEmail(userInfo.getEmail());
        UserWallet userWallet = userWalletService.createWallet(user.getAddr());
        user.setUserWallet(userWallet);
        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));
        user.setSocial(false);
        user.setWithdrawn(false);
        userRepository.save(user);
        return user;
    }

    public User createKakaoUser(KakaoUserRegisterReq userInfo) throws IOException {
        User user = new User();
        user.setEmail(userInfo.getEmail());
        UserWallet userWallet = userWalletService.createWallet(user.getAddr());
        user.setUserWallet(userWallet);
        user.setSocial(true);
        user.setWithdrawn(false);
        userRepository.save(user);
        return user;
    }

    public User getUserByUserId(Long userId) {
        User user = userRepository.findById(userId).get();
        return user;
    }

    public boolean existsBynickName(String nickName) {
        return userRepository.existsByNickName(nickName);
    }

    public void updateUser(User user, UserUpdateReq userInfo) {
        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));
        user.setNickName(userInfo.getNickName());
        userRepository.save(user);
    }

    public void updateUserAddress(User user, UserUpdateAddressReq userInfo) {
        user.setAddr(userInfo.getAddr());
        user.setAddrDetail(userInfo.getAddrDetail());
        user.setAddrLat(userInfo.getAddrLat());
        user.setAddrLng(userInfo.getAddrLng());
        userRepository.save(user);
    }

    public void deleteUser(User user) {
        user.setWithdrawn(true);
        userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).get();
        return user;
    }
}
