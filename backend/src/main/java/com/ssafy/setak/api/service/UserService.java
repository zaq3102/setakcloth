package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.*;
import com.ssafy.setak.api.response.FavoriteGetRes;
import com.ssafy.setak.db.entity.*;
import com.ssafy.setak.db.repository.FavoriteRepository;
import com.ssafy.setak.db.repository.LaundryRepository;
import com.ssafy.setak.db.repository.UserRepository;
import jdk.jfr.internal.LongMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LaundryRepository laundryRepository;
    @Autowired
    private FavoriteRepository favoriteRepository;


    @Autowired
    PasswordEncoder passwordEncoder;

    public User createUser(UserRegisterReq userInfo) throws IOException {
        Address address = new Address("서울시 강남구" , "역상동 멀티캠퍼스" , (float) 37.5015, (float)127.0396 );
        User user = new User();
        user.setUserEmail(userInfo.getEmail());
        user.setWalletAddr(userInfo.getWalletAddr());
        user.setBalance(0f);
        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));
        user.setSocial(false);
        user.setWithdrawn(false);
        user.setUserType(UserType.USER);
        user.setAddress(address);
        userRepository.save(user);
        return user;
    }

    public User createKakaoUser(KakaoUserRegisterReq userInfo) throws IOException {
        Address address = new Address("서울시 강남구" , "역상동 멀티캠퍼스" , (float) 37.5015, (float)127.0396 );
        User user = new User();
        user.setUserEmail(userInfo.getEmail());
        user.setWalletAddr(userInfo.getWalletAddr());
        user.setBalance(0f);
        user.setSocial(true);
        user.setWithdrawn(false);
        user.setUserType(UserType.USER);
        user.setAddress(address);
        userRepository.save(user);
        return user;
    }

    public User getUserByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);


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
        Address address = new Address("서울시 강남구" , "역상동 멀티캠퍼스" , (float) 37.5015, (float)127.0396 );
        User user = new User();
        user.setCeoEmail(userInfo.getEmail());
        user.setWalletAddr(userInfo.getWalletAddr());
        user.setBalance(0f);
        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));
        user.setSocial(false);
        user.setWithdrawn(false);
        user.setUserType(UserType.CEO);
        user.setAddress(address);
        userRepository.save(user);
        return user;

    }

    public boolean existsByCeoEmail(String Email) {
        return userRepository.existsByCeoEmail(Email);
    }

    public User createCeoKakaoUser(KakaoUserRegisterReq userInfo) {
        User user = new User();
        Address address = new Address("서울시 강남구" , "역상동 멀티캠퍼스" , (float) 37.5015, (float)127.0396 );
        user.setCeoEmail(userInfo.getEmail());
        user.setWalletAddr(userInfo.getWalletAddr());
        user.setBalance(0f);
        user.setSocial(true);
        user.setWithdrawn(false);
        user.setUserType(UserType.CEO);
        user.setAddress(address);
        userRepository.save(user);
        return user;
    }

    public void updateCeoUser(User user, CeoUserUpdateReq userInfo) {

        user.setPwd(passwordEncoder.encode(userInfo.getPwd()));

        userRepository.save(user);
    }

    public void addFavorite(Long userId, AddFavoriteReq favoriteInfo) {
        Favorite favorite = new Favorite();
        User user = userRepository.findById(userId).orElse(null);
        Laundry laundry = laundryRepository.findById(favoriteInfo.getLaundryId()).orElse(null);
        favorite.setUser(user);
        favorite.setLaundry(laundry);
        favoriteRepository.save(favorite);

    }


    public List<Favorite> getFavorites(Long userId) {
        List<Favorite> favorites = favoriteRepository.findByUserId(userId);
        return favorites;
    }

    public void deleteFavorite(Long userId, AddFavoriteReq favoriteInfo) {


        Favorite favorite = favoriteRepository.findByUserIdAndLaundryId(userId,favoriteInfo.getLaundryId());

        favoriteRepository.delete(favorite);




    }

    public Boolean sarchFavorite(Long userId, Long laundryId) {
        return favoriteRepository.existsByUserIdAndLaundryId(userId,laundryId);


    }
}
