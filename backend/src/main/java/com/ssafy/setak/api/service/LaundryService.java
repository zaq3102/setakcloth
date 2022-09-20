package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.LaundryCreateReq;
import com.ssafy.setak.api.request.LaundryUpdateReq;
import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.User;
import com.ssafy.setak.db.repository.CeoUserRepository;
import com.ssafy.setak.db.repository.LaundryRepository;
import com.ssafy.setak.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class LaundryService {

    @Autowired
    private CeoUserRepository ceoUserRepository;

    @Autowired
    private LaundryRepository laundryRepository;

    @Transactional
    public void createLaundry(Long ceoUserId, LaundryCreateReq laundryInfo){
        CeoUser ceoUser = ceoUserRepository.findById(ceoUserId).orElseThrow(NullPointerException::new);

        laundryRepository.save(Laundry.builder()
                        .regNum(laundryInfo.getRegNum())
                        .laundryName(laundryInfo.getLaundryName())
                        .ceoName(laundryInfo.getCeoName())
                        .regDate(LocalDate.now())
                        .addr(laundryInfo.getAddr())
                        .addrDetail(laundryInfo.getAddrDetail())
                        .addrLat(laundryInfo.getAddrLat())
                        .addrLng(laundryInfo.getAddrLng())
                        .ceoUser(ceoUser)
                        .build());
    }

    @Transactional
    public boolean updateLaundry(Long laundryId, LaundryUpdateReq laundryInfo){
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);
        System.out.println(laundry.getLaundryName());
        if(laundry != null){
            laundry.setRegNum(laundryInfo.getRegNum());
            laundry.setLaundryName(laundryInfo.getLaundryName());
            laundry.setCeoName(laundryInfo.getCeoName());
            laundry.setAddr(laundryInfo.getAddr());
            laundry.setAddrDetail(laundryInfo.getAddrDetail());
            laundry.setAddrLat(laundryInfo.getAddrLat());
            laundry.setAddrLng(laundryInfo.getAddrLng());
            laundry.setDescription(laundryInfo.getDescription());
            laundry.setContact(laundryInfo.getContact());
            laundry.setDeliver(laundryInfo.isDeliver());
            laundry.setMinCost(laundryInfo.getMinCost());
            laundry.setDeliveryCost(laundryInfo.getDeliveryCost());
            laundry.setPickup(laundryInfo.isPickup());
            return true;
        }

        return false;
    }
}
