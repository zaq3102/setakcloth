package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("LaundryItemAddRequest")
public class LaundryItemAddReq {
    @ApiModelProperty(name = "품목명")
    String name;

    @ApiModelProperty(name = "가격")
    long price;
}
