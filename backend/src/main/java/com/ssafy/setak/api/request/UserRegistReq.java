package com.ssafy.setak.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRegistRequest")
public class UserRegistReq {

    @ApiModelProperty(name = "지갑주소", example = "1234223x23a231")
    private  String walletAddr;
    @ApiModelProperty(name = "이메일", example = "dbwowo@naver.com")
    private  String email;
    @ApiModelProperty(name = "비밀번호", example = "yoojaeyeol1234!")
    private  String pwd;


}
