package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.response.AuthRes;
import com.ssafy.setak.api.service.JwtService;
import com.ssafy.setak.api.service.KakaoService;
import com.ssafy.setak.api.service.UserService;
import com.ssafy.setak.common.util.CookieUtil;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

public class AuthController {
    @Autowired
    private KakaoService kakaoService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieUtil cookieUtil;

    @GetMapping("/login")
    @ApiOperation(value = "카카오 로그인", notes = "카카오로 로그인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 403, message = "탈퇴한 회원입니다."),
            @ApiResponse(code = 409, message = "존재하지 않는 회원입니다."),
            @ApiResponse(code = 500, message = "카카오 로그인 실패")
    })
    public ResponseEntity<? extends AuthRes> kakaoLogin(@RequestParam String code, HttpServletResponse response) {
        try {
            String kakaoEmail = kakaoService.getKakaoEmail(code);
            User user = userService.getUserByEmail(kakaoEmail);
            if (user.isWithdrawn()) {
                return ResponseEntity.status(403).body(AuthRes.of(403, "탈퇴한 회원입니다.", null, false, user.getId()));
            }
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("id", user.getId() + "");

            String accessToken = jwtService.createAccessToken("user", userInfo, "user");
            Cookie accessCookie = cookieUtil.addAccessCookie(accessToken);
            response.addCookie(accessCookie);

            String refreshToken = jwtService.createRefreshToken("user", userInfo, "user");
            Cookie refreshCookie = cookieUtil.addRefreshCookie(refreshToken);
            response.addCookie(refreshCookie);

            return ResponseEntity.status(200).body(AuthRes.of(200, "Success", accessToken, true, user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AuthRes.of(500, "카카오 로그인 실패", null, false, 0L));
        }
    }
}
