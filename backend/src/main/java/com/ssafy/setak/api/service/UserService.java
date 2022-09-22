package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.*;
import com.ssafy.setak.db.entity.Address;
import com.ssafy.setak.db.entity.User;
import com.ssafy.setak.db.entity.UserType;
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
        user.setUserEmail(userInfo.getEmail());
        user.setWalletAddr(userInfo.getWalletAddr());
        user.setBalance(0);
        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));
        user.setSocial(false);
        user.setWithdrawn(false);
        user.setUserType(UserType.USER);
        userRepository.save(user);
        return user;
    }

    public User createKakaoUser(KakaoUserRegisterReq userInfo) throws IOException {
        User user = new User();
        user.setUserEmail(userInfo.getEmail());
        user.setWalletAddr(userInfo.getWalletAddr());
        user.setBalance(0);
        user.setSocial(true);
        user.setWithdrawn(false);
        user.setUserType(UserType.USER);
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
        Address addr = new Address();
        addr.setAddr(userInfo.getAddr());
        addr.setAddrDetail(userInfo.getAddrDetail());
        addr.setAddrLat(userInfo.getAddrLat());
        addr.setAddrLng(userInfo.getAddrLng());
        user.setAddress(addr);
        userRepository.save(user);
    }

    public void deleteUser(User user) {
        user.setWithdrawn(true);
        userRepository.save(user);
    }

    public User getUserByUserEmail(String email) {
        User user = userRepository.findByUserEmail(email).get();
        return user;
    }

    public User getUserByCeoEmail(String email) {
        User user = userRepository.findByCeoEmail(email).get();
        return user;
    }

    public boolean existsByUserEmail(String email) throws IOException {
        return userRepository.existsByUserEmail(email);
    }

    public User createCeoUser(UserRegisterReq userInfo) {
        User user = new User();
        user.setCeoEmail(userInfo.getEmail());
        user.setWalletAddr(userInfo.getWalletAddr());
        user.setBalance(0);
        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));
        user.setSocial(false);
        user.setWithdrawn(false);
        user.setUserType(UserType.CEO);
        userRepository.save(user);
        return user;

    }

    public boolean existsByCeoEmail(String Email) {
        return userRepository.existsByCeoEmail(Email);
    }

    public User createCeoKakaoUser(KakaoUserRegisterReq userInfo) {
        User user = new User();
        user.setCeoEmail(userInfo.getEmail());
        user.setWalletAddr(userInfo.getWalletAddr());
        user.setBalance(0);
        user.setSocial(true);
        user.setWithdrawn(false);
        user.setUserType(UserType.CEO);
        userRepository.save(user);
        return user;
    }

    public void updateCeoUser(User user, CeoUserUpdateReq userInfo) {

        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));

        userRepository.save(user);
    }
}
