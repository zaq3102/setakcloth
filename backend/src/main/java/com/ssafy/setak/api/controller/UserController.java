package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.*;
import com.ssafy.setak.api.response.*;
import com.ssafy.setak.api.service.JwtService;
import com.ssafy.setak.api.service.KakaoService;
import com.ssafy.setak.api.service.UserService;
import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Favorite;
import com.ssafy.setak.db.entity.Laundry;
import com.ssafy.setak.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private KakaoService kakaoService;

    @Autowired
    JwtService jwtService;

    @Value("${client.url}")
    private String clientUrl;

    @PostMapping("/signup")
    @ApiOperation(value = "고객 일반 회원 가입", notes = "고객 일반 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "고객 일반 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerUser(@RequestBody UserRegisterReq userInfo) {
        try {
            User user = userService.createUser(userInfo);
            return ResponseEntity.status(201).body(
                    UserPostRes.of(201, "Created", user.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "고객 일반 회원 가입 실패", -1l)
            );
        }
    }

    @PostMapping("/ceo/signup")
    @ApiOperation(value = "CEO 일반 회원 가입", notes = "CEO 일반 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "CEO 일반 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerCeoUser(@RequestBody UserRegisterReq userInfo) {
        try {
            User user = userService.createCeoUser(userInfo);
            return ResponseEntity.status(201).body(
                    UserPostRes.of(201, "Created", user.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "CEO 일반 회원 가입 실패", -1l)
            );
        }
    }

    @GetMapping("/kakao/email")
    @ApiOperation(value = "고객 카카오 이메일 조회", notes = "고객 카카오 이메일을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 409, message = "이미 존재하는 아이디입니다"),
            @ApiResponse(code = 500, message = "고객 카카오 이메일 조회 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> getKakaoEmail(@RequestParam String code, HttpServletResponse response) {
        try {
            String kakaoEmail = kakaoService.getKakaoEmail(code, clientUrl+"/kakao/signup");
            if (userService.existsByUserEmail(kakaoEmail)) {
                return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 존재 하는 아이디입니다."));

            } else {
                return ResponseEntity.status(200).body(KakaoEmailRes.of(200, "Success", kakaoEmail));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    KakaoEmailRes.of(500, "고객 카카오 이메일 조회 실패", null)
            );
        }
    }

    @GetMapping("/ceo/kakao/email")
    @ApiOperation(value = "CEO 카카오 이메일 조회", notes = "CEO 카카오 이메일을 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 409, message = "이미 존재하는 아이디입니다"),
            @ApiResponse(code = 500, message = "CEO 카카오 이메일 조회 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> getCeoKakaoEmail(@RequestParam String code, HttpServletResponse response) {
        try {
            String kakaoEmail = kakaoService.getKakaoEmail(code, clientUrl+"/kakao/signup/ceo");
            if (userService.existsByCeoEmail(kakaoEmail)) {
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
    @ApiOperation(value = "고객 카카오 회원 가입", notes = "고객 카카오 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "고객 카카오 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerKakaoUser(@RequestBody KakaoUserRegisterReq userInfo) {
        try {
            User user = userService.createKakaoUser(userInfo);
            return ResponseEntity.status(201).body(
                    UserPostRes.of(201, "Created", user.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "고객 카카오 회원 가입 실패", -1l)
            );
        }
    }

    @PostMapping("/ceo/signup/kakao")
    @ApiOperation(value = "CEO 카카오 회원 가입", notes = "CEO 카카오 회원 가입")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "CEO 카카오 회원 가입 실패")
    })
    public ResponseEntity<? extends UserPostRes> registerCeoKakaoUser(@RequestBody KakaoUserRegisterReq userInfo) {
        try {
            User user = userService.createCeoKakaoUser(userInfo);
            return ResponseEntity.status(201).body(
                    UserPostRes.of(201, "Created", user.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, " CEO 카카오 회원 가입 실패", -1l)
            );
        }
    }

    @GetMapping
    @ApiOperation(value = "고객 회원 정보 조회", notes = "고객 회원 정보 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "고객 회원 정보 조회 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> getUser() {
        try {
            Long userId = jwtService.getUserId();

            //Long userId = 1l;
            User user = userService.getUserByUserId(userId);

            return ResponseEntity.status(200).body(
                    UserGetRes.of(200, "Success", user)
            );
        } catch (Exception e) {
            System.out.print(e.getMessage());
            return ResponseEntity.status(500).body(


                    BaseResponseBody.of(500, "고객 회원 정보 조회 실패")
            );
        }
    }

    @PostMapping("/update")
    @ApiOperation(value = "고객 회원 정보 수정", notes = "고객 회원 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 409, message = "중복된 닉네임"),
            @ApiResponse(code = 500, message = "고객 회원 정보 수정 실패")
    })
    public ResponseEntity<? extends UserPostRes> updateUser(@RequestBody UserUpdateReq userInfo) {
        try {
            Long userId = jwtService.getUserId();
            //Long userId = 1l;
            User user = userService.getUserByUserId(userId);

            if (userService.existsBynickName(userInfo.getNickName())) {
                return ResponseEntity.status(409).body(UserPostRes.of(409, "중복된 닉네임", user.getId()));
            }

            userService.updateUser(user, userInfo);
            return ResponseEntity.status(201).body(UserPostRes.of(201, "Created", user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "고객 회원 정보 수정 실패", -1l)
            );
        }
    }

    @PostMapping("/ceo/update")
    @ApiOperation(value = "CEO 회원 정보 수정", notes = "CEO 회원 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "CEO 회원 정보 수정 실패")
    })
    public ResponseEntity<? extends UserPostRes> updateCeoUser(@RequestBody CeoUserUpdateReq userInfo) {
        try {
            Long userId = jwtService.getUserId();

            User user = userService.getUserByUserId(userId);
            userService.updateCeoUser(user, userInfo);
            return ResponseEntity.status(201).body(UserPostRes.of(201, "Created", user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "CEO 회원 정보 수정 실패", -1l)
            );
        }
    }

    @PostMapping("/update/address")
    @ApiOperation(value = "고객 주소 정보 등록/수정", notes = "고객 주소 정보를 등록 및 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "고객 주소 정보 등록/수정 실패")
    })
    public ResponseEntity<? extends UserPostRes> updateUserAddress(@RequestBody UserUpdateAddressReq userInfo) {
        try {
            Long userId = jwtService.getUserId();
            User user = userService.getUserByUserId(userId);

            userService.updateUserAddress(user, userInfo);
            return ResponseEntity.status(201).body(UserPostRes.of(201, "Created", user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "고객 주소 정보 등록/수정 실패", -1l)
            );
        }
    }

    @PostMapping("/delete")
    @ApiOperation(value = "고객 회원 탈퇴", notes = "고객 회원 탈퇴")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Created"),
            @ApiResponse(code = 500, message = "고객 회원 탈퇴 실패")
    })
    public ResponseEntity<? extends UserPostRes> deleteUser() {

        try {
            Long userId = jwtService.getUserId();
            System.out.println(userId);
            User user = userService.getUserByUserId(userId);

            userService.deleteUser(user);
            return ResponseEntity.status(201).body(UserPostRes.of(201, "Created", user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500, "고객 회원 탈퇴 실패", -1l)
            );
        }
    }

    @GetMapping("/signup/check")
    @ApiOperation(value = "아이디 중복 검사", notes = "아이디 중복 검사")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 202, message = "이미 존재하는 아이디입니다"),
            @ApiResponse(code = 500, message = "아이디 중복 검사 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> duplicateCheck(@RequestParam String email) {
        //        Long userId = jwtService.getUserId();-
        try {
            if (!userService.existsByUserEmail(email) && !userService.existsByCeoEmail(email)) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            } else {
                return ResponseEntity.status(202).body(BaseResponseBody.of(202, "이미 존재 하는 아이디입니다."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "아이디 중복 검사 실패"));
        }
    }


    @PostMapping("/favorite/add")
    @ApiOperation(value = "즐겨찾기 등록", notes = "즐겨찾기 등록")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Success"),

            @ApiResponse(code = 500, message = "즐겨 찾기 등록 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> addFavorite(@RequestBody AddFavoriteReq favorite) {
        //        Long userId = jwtService.getUserId();-
        try {
            Long userId = jwtService.getUserId();

            userService.addFavorite(userId, favorite);
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Success"));


        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "즐겨 찾기 등록 실패"));
        }
    }

    @GetMapping("/favorite")
    @ApiOperation(value = "즐겨찾기 조회", notes = "즐겨찾기 조회")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Success"),

            @ApiResponse(code = 500, message = "즐겨 찾기 조회 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> getFavorites() {

        try {
            Long userId = jwtService.getUserId();
            List<Favorite> res = userService.getFavorites(userId);
            return ResponseEntity.status(201).body(FavoriteGetRes.of(201, "Success", res));


        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "즐겨 찾기 조회"));
        }
    }


    @PostMapping("/favorite/delete")
    @ApiOperation(value = "즐겨찾기 삭제", notes = "즐겨찾기 삭제")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Create"),

            @ApiResponse(code = 500, message = "즐겨 삭제 실패")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteFavorites(@RequestBody AddFavoriteReq favorite) {

        try {
            Long userId = jwtService.getUserId();
            userService.deleteFavorite(userId, favorite);
            return ResponseEntity.status(201).body(BaseResponseBody.of(201, "Create"));


        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "즐겨 찾기 조회"));
        }
    }

    @PostMapping("/favorite/search")
    @ApiOperation(value = "즐겨찾기 조회", notes = "즐겨찾기 조회")
    @ApiResponses({
            @ApiResponse(code = 201, message = "Create"),

            @ApiResponse(code = 500, message = "즐겨찾기 조회실패")
    })
    public ResponseEntity<? extends BaseResponseBody> searchFavorites(@RequestBody AddFavoriteReq favorite) {

        try {
            Long userId = jwtService.getUserId();

            boolean state =userService.sarchFavorite(userId, favorite.getLaundryId());
            return ResponseEntity.status(201).body(FavoriteSearchRes.of(201, "Create",state));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "즐겨 찾기 조회 실패"));
        }
    }
}
