package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.LaundryCreateReq;
import com.ssafy.setak.api.request.LaundryItemAddReq;
import com.ssafy.setak.api.request.LaundryUpdateReq;
import com.ssafy.setak.db.entity.Address;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.LaundryItem;
import com.ssafy.setak.db.repository.LaundryItemRepository;
import com.ssafy.setak.db.repository.LaundryRepository;
import com.ssafy.setak.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Tuple;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    @Autowired
    FileService fileService;

    @Transactional
    public void createLaundry(Long ceoUserId, LaundryCreateReq laundryInfo) {
//        User ceoUser = userRepository.findById(ceoUserId).orElseThrow(NullPointerException::new);

        String regDate = laundryInfo.getRegDate();
        LocalDate regDateType = LocalDate.parse(regDate, DateTimeFormatter.ISO_LOCAL_DATE);

        laundryRepository.save(Laundry.builder()
                .regNum(laundryInfo.getRegNum())
                .laundryName(laundryInfo.getLaundryName())
                .ceoName(laundryInfo.getCeoName())
                .regDate(regDateType)
                .address(new Address(laundryInfo.getAddr(), laundryInfo.getAddrDetail(), laundryInfo.getAddrLat(), laundryInfo.getAddrLng()))
                .userId(ceoUserId)
                .isDeliver(laundryInfo.isDeliver())
                .isPickup(laundryInfo.isPickup())
                .joinDate(LocalDateTime.now())
                .build());
    }

    public List<Laundry> selectAllByUserId(Long ceoUserId) {
        return laundryRepository.findByUserId(ceoUserId);
    }

    public List<Tuple> selectAllLaundryLimitDistance(Long userId) {
        List<Tuple> laundries = laundryRepository.selectAllLaundryLimitDistance(userId);
        return laundries;
    }

    public List<Laundry> findTop5ByOrderByJoinDateDesc(){
        List<Laundry> laundries = laundryRepository.findTop5ByOrderByJoinDateDesc();

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
    public Laundry updateLaundry(Long laundryId, LaundryUpdateReq laundryInfo, MultipartFile multipartFile) {
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);

        String regDate = laundryInfo.getRegDate();
        LocalDate regDateType = LocalDate.parse(regDate, DateTimeFormatter.ISO_LOCAL_DATE);
        String imgUrl = fileService.uploadFile(multipartFile);

        if (laundry != null && !laundry.isWithdrawn()) {
            laundry.setRegNum(laundryInfo.getRegNum());
            laundry.setLaundryName(laundryInfo.getLaundryName());
            laundry.setCeoName(laundryInfo.getCeoName());
            laundry.setRegDate(regDateType);
            laundry.setAddress(new Address(laundryInfo.getAddr(), laundryInfo.getAddrDetail(), laundryInfo.getAddrLat(), laundryInfo.getAddrLng()));
            laundry.setDescription(laundryInfo.getDescription());
            laundry.setContact(laundryInfo.getContact());
            laundry.setDeliver(laundryInfo.isDeliver());
            laundry.setMinCost(laundryInfo.getMinCost());
            laundry.setDeliveryCost(laundryInfo.getDeliveryCost());
            laundry.setPickup(laundryInfo.isPickup());
            laundry.setImgUrl(imgUrl);
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