package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.LaundryCreateReq;
import com.ssafy.setak.api.request.LaundryUpdateReq;
import com.ssafy.setak.db.entity.Address;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.User;
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

    @Transactional
    public void createLaundry(Long ceoUserId, LaundryCreateReq laundryInfo){
//        User ceoUser = userRepository.findById(ceoUserId).orElseThrow(NullPointerException::new);

        laundryRepository.save(Laundry.builder()
                        .regNum(laundryInfo.getRegNum())
                        .laundryName(laundryInfo.getLaundryName())
                        .ceoName(laundryInfo.getCeoName())
                        .regDate(LocalDate.now())
                        .address(new Address(laundryInfo.getAddr(), laundryInfo.getAddrDetail(), laundryInfo.getAddrLat(), laundryInfo.getAddrLng()))
                        .userId(ceoUserId)
                        .build());
    }

    public List<Tuple> selectAllLaundryOrderByDistance(Long userId){
        List<Tuple> laundries = laundryRepository.selectAllLaundryOrderByDistance(userId);
        System.out.println(laundries.size());
        return laundries;
    }

    public Laundry selectLaundry(Long laundryId){
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);

        if(laundry != null){
            return laundry;
        }

        return null;
    }

    @Transactional
    public Laundry updateLaundry(Long laundryId, LaundryUpdateReq laundryInfo){
        Laundry laundry = laundryRepository.findById(laundryId).orElse(null);

        if(laundry != null){
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
}