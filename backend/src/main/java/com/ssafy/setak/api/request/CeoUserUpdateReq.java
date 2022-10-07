package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("CeoUserUpdateRequest")
public class CeoUserUpdateReq {

    @ApiModelProperty(name = "유저 비밀번호", example = "yoojaeyeol1234!")
    private String pwd;
}
