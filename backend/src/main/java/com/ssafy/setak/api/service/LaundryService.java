package com.ssafy.setak.api.service;

import com.ssafy.setak.api.request.LaundryCreateReq;
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
        //CeoUser ceoUser = ceoUserRepository.findById(cdoUserId).orElseThrow(NullPointerException::new) -> null이라면 함수 파라미터로 생성한 예외를 발생시킨다
        CeoUser ceoUser = ceoUserRepository.findById(ceoUserId).orElseThrow(NullPointerException::new);
        //Laundry laundry = new Laundry(laundryInfo.getLaundryName(), laundryInfo.getCeoName(), LocalDate.now(), laundryInfo.getAddr(), laundryInfo.getAddrDetail(), laundryInfo.getAddrLat(), laundryInfo.getAddrLat());
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
}
