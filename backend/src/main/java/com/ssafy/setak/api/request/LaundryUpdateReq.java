package com.ssafy.setak.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("LaundryUpdateRequest")
public class LaundryUpdateReq {
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

    @ApiModelProperty(name = "상세설명")
    String description;

    @ApiModelProperty(name = "전화번호")
    String contact;

    @ApiModelProperty(name = "배달가능")
    boolean deliver;

    @ApiModelProperty(name = "배달 최소 주문 금액")
    long minCost;

    @ApiModelProperty(name = "배달료")
    long deliveryCost;

    @ApiModelProperty(name = "픽업가능")
    boolean pickup;
}
