package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.KakaoUserRegisterReq;
import com.ssafy.setak.api.request.UserRegisterReq;
import com.ssafy.setak.api.response.KakaoEmailRes;
import com.ssafy.setak.api.response.UserGetRes;
import com.ssafy.setak.api.response.UserPostRes;
import com.ssafy.setak.api.service.KakaoService;
import com.ssafy.setak.api.service.UserService;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private KakaoService kakaoService;

    @PostMapping("/signup")
    @ApiOperation(value = "고객 일반 회원 가입", notes = "고객 일반 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "고객 일반 회원 가입 성공"),
            @ApiResponse(code = 500, message = "고객 일반 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerUser(@RequestBody UserRegisterReq userInfo) {
        try {
            User user = userService.createUser(userInfo);
            return ResponseEntity.status(200).body(
                    UserPostRes.of(200, "회원 가입 성공", user.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "회원 가입 실패", -1l)
            );
        }
    }

    @GetMapping("/kakao/email")
    @ApiOperation(value = "고객 카카오 이메일 조회", notes = "고객 카카오 이메일을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "고객 카카오 이메일 조회 성공"),
            @ApiResponse(code = 500, message = "고객 카카오 이메일 조회 실패")
    })
    public ResponseEntity<? extends KakaoEmailRes> getKakaoEmail(@RequestParam String code, HttpServletResponse response) {
        String kakaoEmail = kakaoService.getKakaoEmail(code);
        return ResponseEntity.status(200).body(KakaoEmailRes.of(200, "Success", kakaoEmail));
    }

    @PostMapping("/signup/kakao")
    @ApiOperation(value = "고객 카카오 회원 가입", notes = "고객 카카오 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "고객 카카오 회원 가입 성공"),
            @ApiResponse(code = 500, message = "고객 카카오 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerKakaoUser(@RequestBody KakaoUserRegisterReq userInfo) {
        try {
            User user = userService.createKakaoUser(userInfo);
            return ResponseEntity.status(200).body(
                    UserPostRes.of(200, "고객 카카오 회원 가입 성공", user.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "고객 카카오 회원 가입 실패", -1l)
            );
        }
    }

    @GetMapping
    @ApiOperation(value = "고객 회원 정보 조회", notes = "고객 회원 정보 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "고객 회원 정보 조회 성공"),
            @ApiResponse(code = 500, message = "고객 회원 정보 조회 실패")
    })
    public ResponseEntity<? extends UserGetRes> getUser() {
//        Long userId = jwtService.getUserId();
        Long userId = 1l;
        User user = userService.getUserByUserId(userId);

        return ResponseEntity.status(200).body(
                UserGetRes.of(200, "Success", user)
        );
    }
}
