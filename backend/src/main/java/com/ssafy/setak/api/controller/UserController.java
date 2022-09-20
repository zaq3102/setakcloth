package com.ssafy.setak.api.controller;

import com.ssafy.setak.api.request.UserRegistReq;
import com.ssafy.setak.api.response.UserPostRes;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    @ApiOperation(value = "회원 가입", notes = "회원가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "Success"),
            @ApiResponse(code = 500, message = "회원가입실패")
    })
    public ResponseEntity<? extends UserPostRes> registerUser(@RequestBody UserRegistReq userInfo){
        try{
            User user =userService.createUser(userInfo);
            return ResponseEntity.status(200).body(
                    UserPostRes.of(200,"Success",user.getId())
            );
        }catch (Exception e){
            return ResponseEntity.status(500).body(
                    UserPostRes.of(500,"맞지않습니다.",-1l)
            );

        }


    }


}
