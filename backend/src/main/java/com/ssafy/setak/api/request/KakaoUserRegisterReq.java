package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserRegisterRequest")
public class KakaoUserRegisterReq {

    @ApiModelProperty(name = "지갑주소", example = "1234223x23a231")
    private String walletAddr;
    @ApiModelProperty(name = "이메일", example = "dbwowo@naver.com")
    private String email;
}