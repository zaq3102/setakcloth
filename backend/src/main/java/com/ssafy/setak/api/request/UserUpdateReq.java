package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserUpdateRequest")
public class UserUpdateReq {

    @ApiModelProperty(name = "유저 비밀번호", example = "yoojaeyeol1234!")
    private String pwd;
    @ApiModelProperty(name = "유저 닉네임", example = "벙글재열")
    private String nickName;
}
