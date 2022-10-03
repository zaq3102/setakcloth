package com.ssafy.setak.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@ApiModel("LaundryCreateRequest")
public class LaundryCreateReq {
    @ApiModelProperty(name = "사업자등록번호")
    String regNum;

    @ApiModelProperty(name = "상호명")
    String laundryName;

    @ApiModelProperty(name = "대표자성명")
    String ceoName;

    @JsonProperty("regDate")
    @ApiModelProperty(name = "개업일자")
    String regDate;

    @ApiModelProperty(name = "주소")
    String addr;

    @ApiModelProperty(name = "상세주소")
    String addrDetail;

    @ApiModelProperty(name = "위도")
    double addrLat;

    @ApiModelProperty(name = "경도")
    double addrLng;

    @ApiModelProperty(name = "배달")
    boolean deliver;

    @ApiModelProperty(name = "픽업")
    boolean pickup;
}
