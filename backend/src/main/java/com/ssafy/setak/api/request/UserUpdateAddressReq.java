package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserUpdateRequest")
public class UserUpdateAddressReq {

    @ApiModelProperty(name = "유저 주소", example = "추후 수정 필요")
    private String addr;
    @ApiModelProperty(name = "유저 상세 주소", example = "추후 수정 필요2")
    private String addrDetail;
    @ApiModelProperty(name = "유저 주소의 위도", example = "37.241541")
    private float addrLat;
    @ApiModelProperty(name = "유저 주소의 경도", example = "131.864935")
    private float addrLng;
}
