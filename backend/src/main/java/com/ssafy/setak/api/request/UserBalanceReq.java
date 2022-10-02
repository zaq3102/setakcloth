package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserBalanceReq")
public class UserBalanceReq {


    @ApiModelProperty(name = "잔고", example = "200")
    private float balance;
}
