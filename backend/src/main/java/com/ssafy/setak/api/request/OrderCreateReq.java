package com.ssafy.setak.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@ApiModel("OrderCreateRequest")
public class OrderCreateReq {

    @ApiModelProperty(name = "세탁소 ID")
    Long laundryId;

    @ApiModelProperty(name = "주문 유형")
    int orderType;

    @ApiModelProperty(name = "주문 총액")
    Long totalPrice;

    @ApiModelProperty(name = "주문 상세")
    List<Long> orderDetails;
}
