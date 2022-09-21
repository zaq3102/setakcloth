package com.ssafy.setak.api.controller;


import com.ssafy.setak.api.request.UserRegisterReq;
import com.ssafy.setak.api.response.KakaoEmailRes;
import com.ssafy.setak.api.response.UserPostRes;
import com.ssafy.setak.api.service.CeoUserService;
import com.ssafy.setak.api.service.KakaoService;
import com.ssafy.setak.db.entity.CeoUser;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Api(value = "CEO유저 API", tags = {"CeoUser"})
@RestController
@RequestMapping("/ceo/user")
public class CeoUserController {

    @Autowired
    CeoUserService ceoUserService;

    @Autowired
    private KakaoService kakaoService;

    @PostMapping("/signup")
    @ApiOperation(value = "고객 일반 회원 가입", notes = "고객 일반 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "고객 일반 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerUser(@RequestBody UserRegisterReq userInfo) {
        try {
            CeoUser ceoUser = ceoUserService.createCeoUser(userInfo);
            return ResponseEntity.status(201).body(
                    UserPostRes.of(201, "Created", ceoUser.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "고객 일반 회원 가입 실패", -1l)
            );
        }
    }

    @GetMapping("/kakao/email")
    @ApiOperation(value = "고객 카카오 이메일 조회", notes = "고객 카카오 이메일을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "고객 카카오 이메일 조회 실패")
    })
    public ResponseEntity<? extends KakaoEmailRes> getKakaoEmail(@RequestParam String code, HttpServletResponse response) {
        try {
            String kakaoEmail = kakaoService.getKakaoEmail(code);
            return ResponseEntity.status(200).body(KakaoEmailRes.of(200, "Success", kakaoEmail));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    KakaoEmailRes.of(500, "고객 카카오 이메일 조회 실패", null)
            );
        }

    }

}
