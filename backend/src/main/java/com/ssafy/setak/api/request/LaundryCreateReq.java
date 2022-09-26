package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("LaundryCreateRequest")
public class LaundryCreateReq {
    @ApiModelProperty(name = "사업자등록번호")
    String regNum;

    @ApiModelProperty(name = "상호명")
    String laundryName;

    @ApiModelProperty(name = "대표자성명")
    String ceoName;

    @ApiModelProperty(name = "주소")
    String addr;

    @ApiModelProperty(name = "상세주소")
    String addrDetail;

    @ApiModelProperty(name = "위도")
    float addrLat;

    @ApiModelProperty(name = "경도")
    float addrLng;

    @ApiModelProperty(name = "배달")
    boolean deliver;

    @ApiModelProperty(name = "픽업")
    boolean pickup;
}
