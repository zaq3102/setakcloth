package com.ssafy.setak.api.controller;


import com.ssafy.setak.api.request.CeoUserUpdateReq;
import com.ssafy.setak.api.request.KakaoUserRegisterReq;
import com.ssafy.setak.api.request.UserRegisterReq;
import com.ssafy.setak.api.request.UserUpdateReq;
import com.ssafy.setak.api.response.*;
import com.ssafy.setak.api.service.CeoUserService;
import com.ssafy.setak.api.service.KakaoService;
import com.ssafy.setak.common.model.response.BaseResponseBody;
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
    @ApiOperation(value = "CEO 일반 회원 가입", notes = "CEO 일반 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "CEO 일반 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerCeoUser(@RequestBody UserRegisterReq userInfo) {
        try {
            CeoUser ceoUser = ceoUserService.createCeoUser(userInfo);
            return ResponseEntity.status(201).body(
                    UserPostRes.of(201, "Created", ceoUser.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "CEO 일반 회원 가입 실패", -1l)
            );
        }
    }

    @GetMapping("/kakao/email")
    @ApiOperation(value = "CEO 카카오 이메일 조회", notes = "CEO 카카오 이메일을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 409, message = "이미 존재하는 아이디입니다"),
            @ApiResponse(code = 500, message = "CEO 카카오 이메일 조회 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> getKakaoEmail(@RequestParam String code, HttpServletResponse response) {
        try {
            String kakaoEmail = kakaoService.getKakaoEmail(code);
            if (ceoUserService.existsByEmail(kakaoEmail)) {
                return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 존재 하는 아이디입니다."));
            } else {
                return ResponseEntity.status(200).body(KakaoEmailRes.of(200, "Success", kakaoEmail));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    KakaoEmailRes.of(500, "CEO 카카오 이메일 조회 실패", null)
            );
        }

    }

    @PostMapping("/signup/kakao")
    @ApiOperation(value = "CEO 카카오 회원 가입", notes = "CEO 카카오 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "CEO 카카오 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerKakaoCeoUser(@RequestBody KakaoUserRegisterReq userInfo) {
        try {
            CeoUser ceoUser = ceoUserService.createKakaoCeoUser(userInfo);
            return ResponseEntity.status(201).body(
                    UserPostRes.of(201, "Created", ceoUser.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, " CEO 카카오 회원 가입 실패", -1l)
            );
        }
    }


    @GetMapping
    @ApiOperation(value = "CEO 회원 정보 조회", notes = "CEO 회원 정보 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "CEO 회원 정보 조회 실패")
    })
    public ResponseEntity<? extends CeoUserGetRes> getCeoUser() {
        try {
            //        Long userId = jwtService.getUserId();
            Long userId = 1l;
            CeoUser ceoUser = ceoUserService.getCeoUserByUserId(userId);

            return ResponseEntity.status(200).body(
                    CeoUserGetRes.of(200, "Success", ceoUser)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    CeoUserGetRes.of(500, "CEO 회원 정보 조회 실패", null)
            );
        }
    }

    @PostMapping("/update")
    @ApiOperation(value = "CEO 회원 정보 수정", notes = "CEO 회원 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "CEO 회원 정보 수정 실패")
    })
    public ResponseEntity<? extends CeoUserPostRes> updateCeoUser(@RequestBody CeoUserUpdateReq userInfo) {
        try {
            //        Long userId = jwtService.getUserId();
            Long userId = 1l;
            CeoUser ceoUser = ceoUserService.getCeoUserByUserId(userId);
            ceoUserService.updateCeoUser(ceoUser, userInfo);
            return ResponseEntity.status(201).body(CeoUserPostRes.of(201, "Created", ceoUser.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    CeoUserPostRes.of(500, "CEO 회원 정보 수정 실패", -1l)
            );
        }
    }

    @PostMapping("/delete")
    @ApiOperation(value = "CEO 회원 탈퇴", notes = "CEO 회원 탈퇴")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "CEO 회원 탈퇴 실패")
    })
    public ResponseEntity<? extends CeoUserPostRes> deleteCeoUser() {
        //        Long userId = jwtService.getUserId();
        try {
            Long userId = 1l;
            CeoUser ceoUser = ceoUserService.getCeoUserByUserId(userId);

            ceoUserService.deleteCeoUser(ceoUser);
            return ResponseEntity.status(201).body(CeoUserPostRes.of(201, "Created", ceoUser.getId()));


        } catch (Exception e) {
            return ResponseEntity.status(500).body(CeoUserPostRes.of(500, "CEO 회원 탈퇴 실패", -1l));

        }
    }

    @GetMapping("/signup/check")
    @ApiOperation(value = "아이디 중복 검사", notes = "아이디 중복 검사")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 409, message = "이미 존재하는 아이디입니다"),
            @ApiResponse(code = 500, message = "아이디 중복 검사 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> duplicateCheck(@RequestParam String email) {
        //        Long userId = jwtService.getUserId();-
        try {
            if (!ceoUserService.existsByEmail(email)) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            } else {
                return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 존재 하는 아이디입니다."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "이미 존재 하는 아이디입니다."));
        }
    }

}
