package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserLoginPostRequest")
public class LoginPostReq {
    @ApiModelProperty(name = "유저 이메일", example = "dbwowo@naver.com")
    String email;
    @ApiModelProperty(name = "유저 비밀번호", example = "dbwowo")
    String pwd;
}