package com.ssafy.setak.api.response;

import com.ssafy.setak.common.model.response.BaseResponseBody;
import com.ssafy.setak.db.entity.Order;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("OrderAddrResponse")

public class OrderAddrRes extends BaseResponseBody {

    @ApiModelProperty(name = "블록 주소1")
    String fromAddr1;

    float price;



    public static OrderAddrRes of(Integer statusCode, String message, Order order) {
        OrderAddrRes res = new OrderAddrRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.fromAddr1 =order.getUser().getWalletAddr();
        res.price = order.getTotalPrice();

        return res;
    }
}
