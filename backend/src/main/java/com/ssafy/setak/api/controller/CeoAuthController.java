package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.LoginPostReq;
import com.ssafy.setak.api.response.AuthRes;
import com.ssafy.setak.api.service.CeoUserService;
import com.ssafy.setak.api.service.JwtService;
import com.ssafy.setak.api.service.KakaoService;
import com.ssafy.setak.common.util.CookieUtil;
import com.ssafy.setak.db.entity.CeoUser;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Api(value = "CEO 인증 API", tags = {"CeoAuth"})
@RestController
@RequestMapping("/ceo/auth")
public class CeoAuthController {
    @Autowired
    private KakaoService kakaoService;

    @Autowired
    private CeoUserService ceoUserService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CookieUtil cookieUtil;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/login/kakao")
    @ApiOperation(value = "CEO 카카오 로그인", notes = "CEO 카카오 로그인을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 403, message = "탈퇴한 회원입니다."),
            @ApiResponse(code = 409, message = "존재하지 않는 회원입니다."),
            @ApiResponse(code = 500, message = "CEO 카카오 로그인 실패")
    })
    public ResponseEntity<? extends AuthRes> kakaoLogin(@RequestParam String code, HttpServletResponse response) {
        try {
            String kakaoEmail = kakaoService.getKakaoEmail(code);
            CeoUser ceoUser = ceoUserService.getCeoUserByEmail(kakaoEmail);
            if (ceoUser.isWithdrawn()) {
                return ResponseEntity.status(403).body(AuthRes.of(403, "탈퇴한 회원입니다.", null, false, ceoUser.getId()));
            }
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("id", ceoUser.getId() + "");

            String accessToken = jwtService.createAccessToken("user", userInfo, "user");
            Cookie accessCookie = cookieUtil.addAccessCookie(accessToken);
            response.addCookie(accessCookie);

            String refreshToken = jwtService.createRefreshToken("user", userInfo, "user");
            Cookie refreshCookie = cookieUtil.addRefreshCookie(refreshToken);
            response.addCookie(refreshCookie);

            return ResponseEntity.status(200).body(AuthRes.of(200, "Success", accessToken, true, ceoUser.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AuthRes.of(500, "CEO 카카오 로그인 실패", null, false, -1l));
        }
    }

    @PostMapping("/login")
    @ApiOperation(value = "CEO 일반 로그인", notes = "CEO 일반 로그인을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 401, message = "잘못된 비밀번호입니다."),
            @ApiResponse(code = 403, message = "탈퇴한 회원입니다."),
            @ApiResponse(code = 404, message = "존재하지 않는 계정입니다."),
            @ApiResponse(code = 500, message = "CEO 일반 로그인 실패")
    })
    public ResponseEntity<AuthRes> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) LoginPostReq loginInfo, HttpServletResponse response) {
        try {
            String email = loginInfo.getEmail();
            String pwd = loginInfo.getPwd();
            CeoUser ceoUser = ceoUserService.getCeoUserByEmail(email);

            if (ceoUser.isWithdrawn()) {
                return ResponseEntity.status(403).body(AuthRes.of(403, "탈퇴한 회원입니다.", null, false, ceoUser.getId()));
            }

            // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
            if (passwordEncoder.matches(pwd, ceoUser.getPwd())) {
                Map<String, String> userInfo = new HashMap<>();
                userInfo.put("id", ceoUser.getId() + "");

                String accessToken = jwtService.createAccessToken("user", userInfo, "user");
                Cookie accessCookie = cookieUtil.addAccessCookie(accessToken);
                response.addCookie(accessCookie);

                String refreshToken = jwtService.createRefreshToken("user", userInfo, "user");
                Cookie refreshCookie = cookieUtil.addRefreshCookie(refreshToken);
                response.addCookie(refreshCookie);
                // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
                return ResponseEntity.status(200).body(AuthRes.of(200, "Success", accessToken, true, ceoUser.getId()));
            }

            // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
            return ResponseEntity.status(401).body(AuthRes.of(401, "잘못된 비밀번호입니다.", null, false, -1l));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(AuthRes.of(404, "존재하지 않는 계정입니다.", null, false, -1l));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AuthRes.of(500, "CEO 일반 로그인 실패", null, false, -1l));
        }
    }

    @GetMapping("/logout")
    @ApiOperation(value = "CEO 로그아웃", notes = "CEO 로그아웃을 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "CEO 로그아웃 실패")
    })
    public ResponseEntity<? extends AuthRes> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            String accessToken = null;
            String refreshToken = null;
            String bearer = request.getHeader("Authorization");
            if (bearer != null && !"".equals(bearer)) {
                accessToken = bearer.split(" ")[1];
            }
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                for (Cookie c : cookies) {
                    if ("accessToken".equals(c.getName())) {
                        accessToken = c.getValue();
                    } else if ("refreshToken".equals(c.getName())) {
                        refreshToken = c.getValue();
                    }
                }

                Cookie accessCookie = new Cookie("accessToken", null);
                accessCookie.setMaxAge(0);
                accessCookie.setPath("/");
                response.addCookie(accessCookie);

                Cookie refreshCookie = new Cookie("refreshToken", null);
                refreshCookie.setMaxAge(0);
                refreshCookie.setPath("/");
                response.addCookie(refreshCookie);
            }
            return ResponseEntity.status(200).body(AuthRes.of(200, "Success", null, true, -1l));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(AuthRes.of(500, "CEO 로그아웃 실패", null, false, -1l));
        }
    }
}