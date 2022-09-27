package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.LaundryCreateReq;
import com.ssafy.setak.api.request.LaundryItemAddReq;
import com.ssafy.setak.api.request.LaundryUpdateReq;
import com.ssafy.setak.db.entity.Address;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.LaundryItem;
import com.ssafy.setak.db.entity.User;
import com.ssafy.setak.db.repository.LaundryItemRepository;
import com.ssafy.setak.db.repository.LaundryRepository;
import com.ssafy.setak.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Tuple;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class LaundryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LaundryRepository laundryRepository;

    @Autowired
    private LaundryItemRepository laundryItemRepository;

    @Transactional
    public void createLaundry(Long ceoUserId, LaundryCreateReq laundryInfo) {
//        User ceoUser = userRepository.findById(ceoUserId).orElseThrow(NullPointerException::new);

        laundryRepository.save(Laundry.builder()
                .regNum(laundryInfo.getRegNum())
                .laundryName(laundryInfo.getLaundryName())
                .ceoName(laundryInfo.getCeoName())
                .regDate(LocalDate.now())
                .address(new Address(laundryInfo.getAddr(), laundryInfo.getAddrDetail(), laundryInfo.getAddrLat(), laundryInfo.getAddrLng()))
                .userId(ceoUserId)
                .isDeliver(laundryInfo.isDeliver())
                .isPickup(laundryInfo.isPickup())
                .build());
    }

    public List<Laundry> selectAllByUserId(Long ceoUserId) {
        return laundryRepository.findByUserId(ceoUserId);
    }

    public List<Tuple> selectAllLaundryOrderByDistance(Long userId) {
        List<Tuple> laundries = laundryRepository.selectAllLaundryOrderByDistance(userId);
        return laundries;
    }

    public List<Tuple> selectAllLaundryOrderByOrder(Long userId) {
        List<Tuple> laundries = laundryRepository.selectAllLaundryOrderByOrder(userId);
        return laundries;
    }

    public List<Tuple> selectAllLaundryOrderByScore(Long userId) {
        List<Tuple> laundries = laundryRepository.selectAllLaundryOrderByScore(userId);
        return laundries;
    }

    public Laundry selectLaundry(Long laundryId) {
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);

        if (laundry != null && !laundry.isWithdrawn()) {
            return laundry;
        }

        return null;
    }

    @Transactional
    public Laundry updateLaundry(Long laundryId, LaundryUpdateReq laundryInfo) {
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);

        if (laundry != null && !laundry.isWithdrawn()) {
            laundry.setRegNum(laundryInfo.getRegNum());
            laundry.setLaundryName(laundryInfo.getLaundryName());
            laundry.setCeoName(laundryInfo.getCeoName());
            laundry.setAddress(new Address(laundryInfo.getAddr(), laundryInfo.getAddrDetail(), laundryInfo.getAddrLat(), laundryInfo.getAddrLng()));
            laundry.setDescription(laundryInfo.getDescription());
            laundry.setContact(laundryInfo.getContact());
            laundry.setDeliver(laundryInfo.isDeliver());
            laundry.setMinCost(laundryInfo.getMinCost());
            laundry.setDeliveryCost(laundryInfo.getDeliveryCost());
            laundry.setPickup(laundryInfo.isPickup());
            return laundry;
        }

        return null;
    }

    @Transactional
    public boolean deleteLaundry(Long laundryId) {
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);

        if (laundry != null && !laundry.isWithdrawn()) {
            laundry.setWithdrawn(true);

            return true;
        }

        return false;
    }

    @Transactional
    public void addLaundryItem(Long laundryId, LaundryItemAddReq laundryItemInfo) {
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);

        laundryItemRepository.save(LaundryItem.builder()
                .name(laundryItemInfo.getName())
                .price(laundryItemInfo.getPrice())
                .laundry(laundry)
                .build());
    }

    public List<LaundryItem> getLaundryItems(Long laundryId) {
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);

        if (laundry != null && !laundry.isWithdrawn()) {
            return laundry.getLaundryItems();
        }

        return null;
    }

    @Transactional
    public LaundryItem updateLaundryItem(Long laundryId, Long laundryItemId, LaundryItemAddReq laundryItemInfo) {
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);
        LaundryItem laundryItem = laundryItemRepository.findById(laundryItemId).orElse(null);

        if (laundry != null && laundryItem != null && !laundry.isWithdrawn() && !laundryItem.isWithdrawn()) {
            laundryItem.setName(laundryItemInfo.getName());
            laundryItem.setPrice(laundryItemInfo.getPrice());

            return laundryItem;
        }

        return null;
    }

    @Transactional
    public boolean deleteLaundryItem(Long laundryId, Long laundryItemId) {
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);
        LaundryItem laundryItem = laundryItemRepository.findById(laundryItemId).orElse(null);

        if (laundry != null && laundryItem != null && !laundry.isWithdrawn() && !laundryItem.isWithdrawn()) {
            laundryItem.setWithdrawn(true);

            return true;
        }

        return false;
    }
}