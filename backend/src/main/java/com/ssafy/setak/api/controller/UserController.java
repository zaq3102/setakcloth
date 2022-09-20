package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.UserRegistReq;
import com.ssafy.setak.api.response.KakaoEmailRes;
import com.ssafy.setak.api.response.UserPostRes;
import com.ssafy.setak.api.service.KakaoService;
import com.ssafy.setak.api.service.UserService;
import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
    @ApiOperation(value = "회원 가입", notes = "회원가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "회원가입실패")
    })
    public ResponseEntity<? extends UserPostRes> registerUser(@RequestBody UserRegistReq userInfo) {
        try {
            User user = userService.createUser(userInfo);
            return ResponseEntity.status(200).body(
                    UserPostRes.of(200, "Success", user.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "맞지않습니다.", -1l)
            );
        }
    }

    @GetMapping("/kakao/email")
    @ApiOperation(value = "카카오 이메일 조회", notes = "카카오 이메일을 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "카카오 이메일 조회 성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends KakaoEmailRes> getKakaoEmail(@RequestParam String code, HttpServletResponse response) {
        String kakaoEmail = kakaoService.getKakaoEmail(code);
        return ResponseEntity.status(200).body(KakaoEmailRes.of(200, "Success", kakaoEmail));
    }
}
