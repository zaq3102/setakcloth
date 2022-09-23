package com.ssafy.setak.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("OrderDetailResponse")
public class OrderDetailRes {

    @ApiModelProperty(name = "주문 상세 ID")
    Long orderDetailId;

    @ApiModelProperty(name = "블록 주소1")
    String blockAddr1;

    @ApiModelProperty(name = "블록 주소2")
    String blockAddr2;

    @ApiModelProperty(name = "블록 주소3")
    String blockAddr3;

    public static OrderDetailRes of(Long orderDetailId, String blockAddr1, String blockAddr2, String blockAddr3) {
        OrderDetailRes res = new OrderDetailRes();
        res.setOrderDetailId(orderDetailId);
        res.setBlockAddr1(blockAddr1);
        res.setBlockAddr2(blockAddr2);
        res.setBlockAddr3(blockAddr3);
        return res;
    }
}
